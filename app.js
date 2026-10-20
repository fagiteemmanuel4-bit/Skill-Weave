(function () {
  "use strict";
  var API = "https://api.github.com";
  var CACHE_TTL = 5 * 60 * 1000;
  var memoryCache = {};
  var activeController = null;
  var currentPage = 1;
  var currentQuery = "";
  var currentSort = "stars";
  var currentLanguage = "";
  var currentMinStars = 0;
  var currentRepo = null;
  var currentTree = [];
  var currentSkillPath = "";
  var currentSkillText = "";
  var page = document.body.getAttribute("data-page") || "library";
  function $(id) { return document.getElementById(id); }
  function escapeHTML(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (c) {
      return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];
    });
  }
  function number(value) {
    return Number(value || 0).toLocaleString();
  }
  function dateLabel(value) {
    if (!value) return "Unknown";
    var date = new Date(value);
    if (isNaN(date.getTime())) return "Unknown";
    return date.toLocaleDateString(undefined, {year:"numeric",month:"short",day:"numeric"});
  }
  function timeAgo(value) {
    if (!value) return "Unknown";
    var days = Math.floor((Date.now() - new Date(value).getTime()) / 86400000);
    if (days < 1) return "today";
    if (days === 1) return "yesterday";
    if (days < 30) return days + " days ago";
    if (days < 365) return Math.floor(days / 30) + " months ago";
    return Math.floor(days / 365) + " years ago";
  }
  function initials(value) {
    var words = String(value || "?").split(/[-_/\s]+/).filter(Boolean);
    return words.slice(0, 2).map(function (w) { return w.charAt(0).toUpperCase(); }).join("") || "?";
  }
  function readCache(key) {
    if (memoryCache[key] && Date.now() - memoryCache[key].time < CACHE_TTL) return memoryCache[key].value;
    try {
      var raw = localStorage.getItem("sw:" + key);
      if (raw) {
        var saved = JSON.parse(raw);
        if (Date.now() - saved.time < CACHE_TTL) {
          memoryCache[key] = saved;
          return saved.value;
        }
      }
    } catch (e) {}
    return null;
  }
  function writeCache(key, value) {
    var entry = {time:Date.now(),value:value};
    memoryCache[key] = entry;
    try { localStorage.setItem("sw:" + key, JSON.stringify(entry)); } catch (e) {}
  }
  async function getJSON(url, cacheKey) {
    if (cacheKey) {
      var cached = readCache(cacheKey);
      if (cached) return cached;
    }
    var response = await fetch(url, {headers:{"Accept":"application/vnd.github+json","X-GitHub-Api-Version":"2022-11-28"}});
    if (response.status === 403 || response.status === 429) {
      var limit = response.headers.get("x-ratelimit-reset");
      var message = "GitHub temporarily rate-limited this search. Wait a little and try again.";
      if (limit) message += " The current search window may reset around " + new Date(Number(limit) * 1000).toLocaleTimeString() + ".";
      throw new Error(message);
    }
    if (!response.ok) throw new Error("GitHub returned " + response.status + " for this request.");
    var data = await response.json();
    if (cacheKey) writeCache(cacheKey, data);
    return data;
  }
  function repoURL(repo) { return "https://github.com/" + repo.full_name; }
  function skillURL(repo, path) {
    return "skill.html?repo=" + encodeURIComponent(repo.full_name) + (path ? "&path=" + encodeURIComponent(path) : "");
  }
  function downloadURL(repo, path) {
    return "download.html?repo=" + encodeURIComponent(repo.full_name) + (path ? "&path=" + encodeURIComponent(path) : "");
  }
  function rating(repo) {
    var score = 35;
    var stars = Number(repo.stargazers_count || 0);
    score += Math.min(24, Math.log10(stars + 1) * 6);
    if (repo.license && repo.license.spdx_id && repo.license.spdx_id !== "NOASSERTION") score += 12;
    if (repo.description) score += 6;
    if (repo.topics && repo.topics.length) score += Math.min(8, repo.topics.length);
    if (repo.pushed_at) {
      var age = (Date.now() - new Date(repo.pushed_at).getTime()) / 86400000;
      if (age < 90) score += 10;
      else if (age < 365) score += 6;
      else if (age < 730) score += 2;
    }
    if (repo.archived) score -= 20;
    return Math.max(0, Math.min(100, Math.round(score)));
  }
  function signalLabel(score) {
    if (score >= 80) return "Strong public signals";
    if (score >= 60) return "Some positive signals";
    return "Limited public signals";
  }
  function card(repo) {
    var score = rating(repo);
    var lang = repo.language || "Not specified";
    var lic = repo.license && repo.license.spdx_id && repo.license.spdx_id !== "NOASSERTION" ? repo.license.spdx_id : "License unverified";
    var topics = (repo.topics || []).slice(0, 2).map(function (topic) { return '<span class="chip">' + escapeHTML(topic) + '</span>'; }).join("");
    return '<article class="skill-card">' +
      '<div class="card-top"><span class="avatar">' + escapeHTML(initials(repo.name)) + '</span><div style="min-width:0"><h3 class="card-title"><a href="' + skillURL(repo) + '">' + escapeHTML(repo.name) + '</a></h3><div class="card-source">' + escapeHTML(repo.full_name) + '</div></div></div>' +
      '<p class="card-desc">' + escapeHTML(repo.description || "No repository description provided. Open the source to inspect its skill files and instructions.") + '</p>' +
      '<div class="chips"><span class="chip">' + escapeHTML(lang) + '</span><span class="chip">' + escapeHTML(lic) + '</span>' + topics + (repo.archived ? '<span class="chip warn">Archived</span>' : "") + '</div>' +
      '<div class="card-foot"><div class="metric">★ ' + number(repo.stargazers_count) + ' · Updated ' + escapeHTML(timeAgo(repo.pushed_at)) + '<br><span class="score">Signal score ' + score + '/100</span></div><div class="card-actions"><a class="btn btn-small" href="' + skillURL(repo) + '">Inspect</a><a class="btn btn-small btn-primary" href="' + downloadURL(repo) + '">Get skill</a></div></div></article>';
  }
  function renderError(target, message) {
    if (!target) return;
    target.innerHTML = '<div class="errorbox"><strong>Could not load this data.</strong><br>' + escapeHTML(message) + '<br><button class="btn" type="button" onclick="location.reload()">Try again</button></div>';
  }
  function setLoading(target, count) {
    if (!target) return;
    var html = "";
    for (var i = 0; i < (count || 4); i++) html += '<div class="skeleton"></div>';
    target.innerHTML = html;
  }
  function buildQuery() {
    var bits = [];
    if (currentQuery.trim()) bits.push(currentQuery.trim());
    else bits.push('"SKILL.md"');
    bits.push("in:readme");
    if (currentLanguage) bits.push("language:" + currentLanguage);
    if (currentMinStars > 0) bits.push("stars:>=" + currentMinStars);
    return bits.join(" ");
  }
  async function searchRepos(reset) {
    var target = $("results");
    if (!target) return;
    if (reset) currentPage = 1;
    if (activeController) activeController.abort();
    activeController = new AbortController();
    setLoading(target, 4);
    var q = buildQuery();
    var key = "search:" + q + ":" + currentSort + ":" + currentPage;
    var url = API + "/search/repositories?q=" + encodeURIComponent(q) + "&sort=" + encodeURIComponent(currentSort) + "&order=desc&per_page=20&page=" + currentPage;
    try {
      var result = await getJSON(url, key);
      var items = result.items || [];
      if ($("result-count")) $("result-count").textContent = number(result.total_count) + " GitHub repositories match this query";
      if ($("page-count")) $("page-count").textContent = "Page " + currentPage + " · 20 results per page";
      if ($("previous-page")) $("previous-page").disabled = currentPage <= 1;
      if ($("next-page")) $("next-page").disabled = items.length < 20 || currentPage * 20 >= Math.min(result.total_count || 0, 1000);
      if ($("query-summary")) $("query-summary").textContent = currentQuery ? 'Search results for "' + currentQuery + '"' : "Repositories mentioning SKILL.md";
      if (!items.length) {
        target.innerHTML = '<div class="empty"><h3>No repositories found</h3>Try a broader query such as “agent skills”, “react”, or “claude”.</div>';
        return;
      }
      target.innerHTML = items.map(card).join("");
      if ($("data-note")) $("data-note").textContent = "Live GitHub repository search. A repository is not proof that every skill file exists; inspect its files before installing.";
    } catch (error) {
      if (error.name === "AbortError") return;
      renderError(target, error.message || "Network request failed. Check your connection.");
      if ($("data-note")) $("data-note").textContent = "Live GitHub data is temporarily unavailable. Cached results may be available for recent searches.";
    }
  }
  function initLibrary() {
    var input = $("search-input");
    if (!input) return;
    var params = new URLSearchParams(location.search);
    input.value = params.get("q") || "";
    currentQuery = input.value;
    var timer;
    input.addEventListener("input", function () {
      clearTimeout(timer);
      currentQuery = input.value;
      timer = setTimeout(function () {
        var url = new URL(location.href);
        if (currentQuery) url.searchParams.set("q", currentQuery); else url.searchParams.delete("q");
        history.replaceState({}, "", url);
        searchRepos(true);
      }, 500);
    });
    $("search-form").addEventListener("submit", function (event) {
      event.preventDefault();
      currentQuery = input.value;
      searchRepos(true);
    });
    $("sort-select").addEventListener("change", function () { currentSort = this.value; searchRepos(true); });
    $("language-select").addEventListener("change", function () { currentLanguage = this.value; searchRepos(true); });
    $("stars-select").addEventListener("change", function () { currentMinStars = Number(this.value || 0); searchRepos(true); });
    $("previous-page").addEventListener("click", function () { if (currentPage > 1) { currentPage--; searchRepos(false); window.scrollTo({top:260,behavior:"smooth"}); } });
    $("next-page").addEventListener("click", function () { currentPage++; searchRepos(false); window.scrollTo({top:260,behavior:"smooth"}); });
    document.querySelectorAll("[data-preset]").forEach(function (button) {
      button.addEventListener("click", function () { currentQuery = this.getAttribute("data-preset") || ""; input.value = currentQuery; searchRepos(true); });
    });
    searchRepos(true);
  }
  async function fetchRepo(repoName) {
    var data = await getJSON(API + "/repos/" + repoName, "repo:" + repoName);
    currentRepo = data;
    return data;
  }
  async function fetchTree(repo) {
    var branchName = repo.default_branch || "main";
    var data = await getJSON(API + "/repos/" + repo.full_name + "/git/trees/" + encodeURIComponent(branchName) + "?recursive=1", "tree:" + repo.full_name + ":" + branchName);
    if (data.truncated) throw new Error("GitHub truncated this repository tree. Open the source repository to inspect additional files.");
    return (data.tree || []).filter(function (item) { return item.type === "blob"; });
  }
  function rawURL(repo, path) {
    return "https://raw.githubusercontent.com/" + repo.full_name + "/" + encodeURIComponent(repo.default_branch || "main") + "/" + path.split("/").map(encodeURIComponent).join("/");
  }
  async function fetchText(url, key) {
    var cached = readCache(key);
    if (cached) return cached;
    var response = await fetch(url);
    if (!response.ok) throw new Error("Could not read this file (HTTP " + response.status + "). It may have moved or the repository may be private.");
    var text = await response.text();
    writeCache(key, text);
    return text;
  }
  function filePaths(tree) {
    return tree.filter(function (item) { return /(^|\/)skill\.md$/i.test(item.path); }).sort(function (a, b) {
      if (a.path.toLowerCase() === "skill.md") return -1;
      if (b.path.toLowerCase() === "skill.md") return 1;
      return a.path.localeCompare(b.path);
    });
  }
  function repoScoreHTML(repo) {
    var score = rating(repo);
    return '<div class="panel"><h2>Public signal score</h2><div class="score-ring">' + score + '/100</div><p class="small muted">' + escapeHTML(signalLabel(score)) + '. This is a transparent metadata heuristic, not a user rating, quality guarantee, or security certification.</p><div class="trust-list"><div class="trust-row"><span>GitHub stars</span><b class="trust-value">' + number(repo.stargazers_count) + '</b></div><div class="trust-row"><span>Last pushed</span><b class="trust-value">' + escapeHTML(dateLabel(repo.pushed_at)) + '</b></div><div class="trust-row"><span>License</span><b class="trust-value">' + escapeHTML(repo.license && repo.license.spdx_id || "Not verified") + '</b></div><div class="trust-row"><span>Archived</span><b class="trust-value">' + (repo.archived ? "Yes" : "No") + '</b></div><div class="trust-row"><span>Open issues</span><b class="trust-value">' + number(repo.open_issues_count) + '</b></div></div><hr style="border:0;border-top:1px solid #eff1f5;margin:15px 0"><p class="small muted">Score ingredients: stars (capped contribution), license metadata, description, topics, recent activity, and archive status. Popularity is not the same as quality.</p></div>';
  }
  async function initSkill() {
    var params = new URLSearchParams(location.search);
    var repoName = params.get("repo");
    var selectedPath = params.get("path") || "";
    if (!repoName || !/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(repoName)) {
      renderError($("detail-root"), "Choose a repository from the library first.");
      return;
    }
    $("detail-root").innerHTML = '<div class="loading">Loading repository metadata and discovering SKILL.md files from GitHub…</div>';
    try {
      var repo = await fetchRepo(repoName);
      var tree = await fetchTree(repo);
      currentTree = tree;
      var skills = filePaths(tree);
      currentSkillPath = selectedPath && tree.some(function (f) { return f.path === selectedPath; }) ? selectedPath : (skills[0] ? skills[0].path : "");
      var readme = tree.find(function (f) { return /^readme\.md$/i.test(f.path); });
      var previewPath = currentSkillPath || (readme ? readme.path : "");
      var fileText = previewPath ? await fetchText(rawURL(repo, previewPath), "file:" + repo.full_name + ":" + previewPath) : "";
      currentSkillText = fileText;
      var lang = repo.language || "Not specified";
      var license = repo.license && repo.license.spdx_id || "No license detected";
      var skillOptions = skills.length ? skills.map(function (f) { return '<option value="' + escapeHTML(f.path) + '"' + (f.path === currentSkillPath ? " selected" : "") + '>' + escapeHTML(f.path) + '</option>'; }).join("") : '<option value="">No SKILL.md detected in the default branch</option>';
      var chips = '<span class="chip">' + escapeHTML(lang) + '</span><span class="chip">' + escapeHTML(license) + '</span><span class="chip">★ ' + number(repo.stargazers_count) + '</span>' + (repo.archived ? '<span class="chip warn">Archived</span>' : '<span class="chip good">Public repository</span>');
      $("detail-root").innerHTML = '<div class="breadcrumbs"><a href="library.html">Library</a> / <span>' + escapeHTML(repo.full_name) + '</span></div>' +
        '<section class="detail-hero"><div class="detail-title-row"><span class="avatar">' + escapeHTML(initials(repo.name)) + '</span><div style="min-width:0"><h1 class="detail-title">' + escapeHTML(repo.name) + '</h1><div class="card-source">' + escapeHTML(repo.full_name) + '</div><div class="chips" style="margin-top:10px">' + chips + '</div></div></div><p class="detail-desc">' + escapeHTML(repo.description || "No description supplied by this repository.") + '</p><div class="hero-cta"><a class="btn btn-primary" href="' + downloadURL(repo, currentSkillPath) + '">Download / install</a><a class="btn" href="' + repo.html_url + '" target="_blank" rel="noopener noreferrer">Open GitHub ↗</a><button class="btn" id="copy-repo" type="button">Copy repository URL</button></div><div class="stat-grid"><div class="stat"><strong>' + number(repo.stargazers_count) + '</strong><span>GitHub stars</span></div><div class="stat"><strong>' + number(repo.forks_count) + '</strong><span>Forks</span></div><div class="stat"><strong>' + escapeHTML(timeAgo(repo.pushed_at)) + '</strong><span>Last activity</span></div></div></section>' +
        '<div class="detail-grid"><div class="panel"><h2>Skill instructions & repository files</h2><p class="small muted">SkillWeave reads public files from the repository’s default branch. Review instructions before using them with an AI agent.</p>' +
        (skills.length ? '<label for="skill-file" class="small"><strong>Detected SKILL.md files (' + skills.length + ')</strong></label><select id="skill-file" style="display:block;width:100%;margin:8px 0 15px;padding:10px;border:1px solid var(--line);border-radius:9px">' + skillOptions + '</select>' : '<div class="notice">No file named SKILL.md was found in this repository’s default branch. The preview below uses its README when available. This result is a repository candidate, not a verified skill.</div>') +
        '<div id="file-preview" class="markdown-preview">' + escapeHTML(fileText || "No readable SKILL.md or README was found.") + '</div><div class="hero-cta"><button class="btn" id="copy-file" type="button">Copy file contents</button><a class="btn btn-primary" href="' + downloadURL(repo, currentSkillPath) + '">Download options</a></div>' +
        '<h3>Detected files</h3><ul class="file-list">' + (tree.filter(function (f) { return /(^|\/)(skill\.md|readme\.md|license|license\.md|agents\.md|package\.json)$/i.test(f.path); }).slice(0, 20).map(function (f) { return '<li><code>' + escapeHTML(f.path) + '</code><a class="link" href="' + skillURL(repo, f.path) + '">Preview</a></li>'; }).join("") || '<li>No common documentation files found.</li>') + '</ul></div>' + repoScoreHTML(repo) + '</div>';
      var selector = $("skill-file");
      if (selector) selector.addEventListener("change", function () { location.href = skillURL(repo, this.value); });
      $("copy-repo").addEventListener("click", function () { copyText(repo.html_url, this); });
      $("copy-file").addEventListener("click", function () { copyText(currentSkillText, this); });
    } catch (error) {
      renderError($("detail-root"), error.message || "Unable to inspect this repository.");
    }
  }
  async function copyText(text, button) {
    try {
      await navigator.clipboard.writeText(text);
      var old = button.textContent; button.textContent = "Copied ✓";
      setTimeout(function () { button.textContent = old; }, 1400);
    } catch (e) {
      var area = document.createElement("textarea");
      area.value = text; area.style.position = "fixed"; area.style.opacity = "0";
      document.body.appendChild(area); area.select();
      try { document.execCommand("copy"); button.textContent = "Copied ✓"; } catch (ignore) { button.textContent = "Select text to copy"; }
      area.remove();
    }
  }
  async function initDownload() {
    var params = new URLSearchParams(location.search);
    var repoName = params.get("repo");
    var path = params.get("path") || "";
    if (!repoName || !/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(repoName)) {
      renderError($("download-root"), "Return to the library and choose a repository to download.");
      return;
    }
    $("download-root").innerHTML = '<div class="loading">Preparing download options…</div>';
    try {
      var repo = await fetchRepo(repoName);
      var tree = await fetchTree(repo);
      var skills = filePaths(tree);
      if (!path || !tree.some(function (f) { return f.path === path; })) path = skills.length ? skills[0].path : "";
      var readme = tree.find(function (f) { return /^readme\.md$/i.test(f.path); });
      var text = path ? await fetchText(rawURL(repo, path), "file:" + repo.full_name + ":" + path) : "";
      var zipURL = "https://codeload.github.com/" + repo.full_name + "/zip/refs/heads/" + encodeURIComponent(repo.default_branch || "main");
      $("download-root").innerHTML = '<div class="breadcrumbs"><a href="library.html">Library</a> / <a href="' + skillURL(repo, path) + '">' + escapeHTML(repo.name) + '</a> / Download</div><section class="detail-hero"><div class="eyebrow">Download center</div><h1 class="detail-title" style="margin-top:12px">Get ' + escapeHTML(repo.name) + '</h1><p class="detail-desc">Choose a download method. SkillWeave links to the public source and does not execute third-party instructions.</p><div class="chips"><span class="chip">' + escapeHTML(repo.full_name) + '</span><span class="chip">' + escapeHTML(path || "No SKILL.md detected") + '</span></div></section>' +
        '<div class="download-layout" style="margin-top:18px"><div class="panel"><h2>Download methods</h2>' +
        '<div class="download-option"><div class="iconbox">↓</div><div><h3>Download skill file</h3><p>' + escapeHTML(path || "No SKILL.md detected; choose a repository file in the skill detail page.") + '</p><button class="btn btn-primary" id="download-file"' + (!path ? " disabled" : "") + '>Download SKILL.md</button></div></div>' +
        '<div class="download-option"><div class="iconbox">ZIP</div><div><h3>Download full repository</h3><p>Downloads the source repository as a ZIP from GitHub. Review its contents before use.</p><a class="btn" href="' + zipURL + '" rel="noopener">Download repository ZIP ↗</a></div></div>' +
        '<div class="download-option"><div class="iconbox">CLI</div><div><h3>Install with the Skills CLI</h3><p>For compatible repositories, the Skills CLI can install skills into supported agent directories. Check its documentation before running commands.</p><code>npx skills add ' + escapeHTML(repo.full_name) + '</code><p style="margin-top:9px"><button class="btn btn-small" id="copy-command">Copy command</button><a class="btn btn-small" href="https://www.skills.sh/docs/cli" target="_blank" rel="noopener noreferrer">CLI docs ↗</a></p></div></div>' +
        '<div class="notice" style="margin-top:15px">Safety note: a skill is untrusted instruction text. Read it first, verify its license, and do not blindly run shell commands or grant access to secrets.</div></div>' +
        '<aside class="panel"><h2>File preview</h2><p class="small muted">Selected file from the repository default branch.</p><div class="markdown-preview" id="download-preview">' + escapeHTML(text || "No SKILL.md was detected. Open the detail page to choose another file.") + '</div><p class="small muted">Repository: <a class="link" href="' + repo.html_url + '" target="_blank" rel="noopener noreferrer">' + escapeHTML(repo.full_name) + ' ↗</a></p></aside></div>';
      if (path) $("download-file").addEventListener("click", function () { saveFile(path.split("/").pop(), text); });
      $("copy-command").addEventListener("click", function () { copyText("npx skills add " + repo.full_name, this); });
    } catch (error) {
      renderError($("download-root"), error.message || "Unable to prepare download options.");
    }
  }
  function saveFile(name, text) {
    var blob = new Blob([text], {type:"text/markdown;charset=utf-8"});
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url; a.download = name || "SKILL.md";
    document.body.appendChild(a); a.click(); a.remove();
    URL.revokeObjectURL(url);
  }
  if (page === "library") initLibrary();
  if (page === "skill") initSkill();
  if (page === "download") initDownload();
})();