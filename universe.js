(function(){
  "use strict";
  var canvas=document.getElementById("starfield");
  var ctx=canvas&&canvas.getContext?canvas.getContext("2d"):null;
  var reduced=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var stars=[],shooters=[],width=0,height=0,frame=0,lastShot=0;
  function resize(){
    if(!canvas||!ctx)return;
    var dpr=Math.min(window.devicePixelRatio||1,2);
    width=window.innerWidth;height=window.innerHeight;
    canvas.width=Math.floor(width*dpr);canvas.height=Math.floor(height*dpr);
    canvas.style.width=width+"px";canvas.style.height=height+"px";
    ctx.setTransform(dpr,0,0,dpr,0,0);
    var count=Math.min(240,Math.floor(width*height/5200));
    stars=Array.from({length:count},function(){return{x:Math.random()*width,y:Math.random()*height,z:.2+Math.random()*.8,r:.35+Math.random()*.8,a:.18+Math.random()*.62,phase:Math.random()*6.28};});
  }
  function draw(){
    if(!ctx)return;
    ctx.clearRect(0,0,width,height);
    stars.forEach(function(s){
      var drift=reduced?0:Math.sin(frame*.00025+s.phase)*.16*s.z;
      var x=(s.x+drift+width)%width;
      var alpha=s.a*(.82+(reduced?0:Math.sin(frame*.001+s.phase)*.18));
      ctx.beginPath();ctx.arc(x,s.y,s.r*s.z,0,Math.PI*2);ctx.fillStyle="rgba(255,255,255,"+Math.max(.08,alpha)+")";ctx.fill();
    });
    if(!reduced&&frame-lastShot>420&&Math.random()>.982){
      shooters.push({x:Math.random()*width*.8,y:Math.random()*height*.45,vx:4+Math.random()*5,vy:1.4+Math.random()*2,life:0,max:35+Math.random()*25});
      lastShot=frame;
    }
    shooters=shooters.filter(function(s){return s.life<s.max;});
    shooters.forEach(function(s){
      s.x+=s.vx;s.y+=s.vy;s.life++;
      var alpha=1-s.life/s.max;
      var g=ctx.createLinearGradient(s.x-s.vx*8,s.y-s.vy*8,s.x,s.y);
      g.addColorStop(0,"rgba(255,255,255,0)");g.addColorStop(1,"rgba(255,255,255,"+(alpha*.8)+")");
      ctx.beginPath();ctx.moveTo(s.x-s.vx*8,s.y-s.vy*8);ctx.lineTo(s.x,s.y);ctx.strokeStyle=g;ctx.lineWidth=1;ctx.stroke();
    });
    frame++;
    if(!reduced)window.requestAnimationFrame(draw);
  }
  if(ctx){resize();draw();window.addEventListener("resize",resize,{passive:true});}
  var dialog=document.getElementById("command-dialog");
  var trigger=document.getElementById("open-command");
  var input=document.getElementById("command-query");
  function openPalette(){if(!dialog)return;if(typeof dialog.showModal==="function")dialog.showModal();else dialog.setAttribute("open","");window.setTimeout(function(){if(input)input.focus();},20);}
  function closePalette(){if(!dialog)return;if(typeof dialog.close==="function")dialog.close();else dialog.removeAttribute("open");if(trigger)trigger.focus();}
  if(trigger)trigger.addEventListener("click",openPalette);
  if(dialog)dialog.addEventListener("click",function(e){if(e.target===dialog)closePalette();});
  document.addEventListener("keydown",function(e){
    var typing=e.target&&(/INPUT|TEXTAREA|SELECT/.test(e.target.tagName)||e.target.isContentEditable);
    if((e.key==="/"&&!typing)||(e.key.toLowerCase()==="k"&&(e.metaKey||e.ctrlKey))){e.preventDefault();openPalette();}
    if(e.key==="Escape"&&dialog&&dialog.hasAttribute("open"))closePalette();
  });
  document.querySelectorAll("[data-spotlight]").forEach(function(el){
    el.addEventListener("pointermove",function(e){var r=el.getBoundingClientRect();el.style.setProperty("--spot-x",(e.clientX-r.left)+"px");el.style.setProperty("--spot-y",(e.clientY-r.top)+"px");});
  });
  var numberFmt=function(n){return Number(n||0).toLocaleString();};
  var icons=[
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5.5 12 2l8 3.5v8L12 22l-8-8.5z"/><path d="m4 5.5 8 4 8-4M12 9.5V22"/></svg>',
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h16v16H4z"/><path d="m8 9 2 3-2 3m5 0h3"/></svg>',
    '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="m8.5 12 2.2 2.2 4.8-5"/></svg>',
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 19V5m0 14h16"/><path d="m7 15 4-4 3 2 5-6"/></svg>',
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 3.5 7.5 12 12l8.5-4.5z"/><path d="M3.5 12 12 16.5l8.5-4.5M3.5 16.5 12 21l8.5-4.5"/></svg>',
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19V5h14v14z"/><path d="M8 9h8M8 12h5M8 15h8"/></svg>'
  ];
  function wave(seed,scale){
    var points=[],n=48;
    for(var i=0;i<n;i++){var x=i/(n-1)*100;var y=8+Math.sin(i*.45+seed)*2.6+Math.sin(i*.19+seed*1.4)*2.1;points.push((i===0?"M":"L")+x.toFixed(1)+" "+(y*scale+8*(1-scale)).toFixed(2));}
    return '<svg class="waveform" viewBox="0 0 100 24" preserveAspectRatio="none" role="img" aria-label="Decorative public-signal waveform"><path d="'+points.join(" ")+'"/></svg>';
  }
  function escapeHTML(v){return String(v==null?"":v).replace(/[&<>"']/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];});}
  function fallbackRows(){
    return [
      {name:"Frontend design",repo:"anthropics/skills",path:"skills/frontend-design/SKILL.md",description:"Create distinctive interfaces with deliberate visual choices.",stars:0,avatar:"https://github.com/anthropics.png",updated:"Source file verified",contributors:[]},
      {name:"Skill creator",repo:"anthropics/skills",path:"skills/skill-creator/SKILL.md",description:"Build and refine reusable instructions for agent workflows.",stars:0,avatar:"https://github.com/anthropics.png",updated:"Source file verified",contributors:[]},
      {name:"Web app testing",repo:"anthropics/skills",path:"skills/webapp-testing/SKILL.md",description:"Test web applications with practical browser automation.",stars:0,avatar:"https://github.com/anthropics.png",updated:"Source file verified",contributors:[]}
    ];
  }
  function renderRows(repos){
    var root=document.getElementById("skill-leaderboard");
    if(!root)return;
    var head=root.querySelector(".table-head");
    root.innerHTML="";
    if(head)root.appendChild(head);
    if(!repos.length){root.insertAdjacentHTML("beforeend",'<div class="leaderboard-status">No public skill repositories were returned. Open the library to search GitHub directly.</div>');return;}
    repos.forEach(function(repo,i){
      var name=repo.skillName||repo.name||repo.full_name.split("/").pop();
      var owner=(repo.full_name||repo.repo||"").split("/")[0];
      var repoName=repo.full_name||repo.repo;
      var description=repo.description||"Public repository for reusable agent instructions.";
      var stars=Number(repo.stargazers_count||repo.stars||0);
      var url="skill.html?repo="+encodeURIComponent(repoName)+(repo.path?"&path="+encodeURIComponent(repo.path):"");
      var avatar=repo.owner&&repo.owner.avatar_url?repo.owner.avatar_url:(repo.avatar||"");
      var score=Math.max(.38,Math.min(1,Math.log10(stars+1)/5));
      var avatars=repo.contributors&&repo.contributors.length?repo.contributors.slice(0,3).map(function(c){return '<img src="'+escapeHTML(c.avatar_url)+'" alt="" loading="lazy" referrerpolicy="no-referrer">';}).join(""):(avatar?'<img src="'+escapeHTML(avatar)+'" alt="" loading="lazy" referrerpolicy="no-referrer">':'');
      var row=document.createElement("div");
      row.className="skill-row";
      row.innerHTML='<div class="skill-main"><span class="skill-rank">'+String(i+1).padStart(2,"0")+'</span><span class="skill-symbol">'+icons[i%icons.length]+'</span><div class="skill-copy"><h3 class="skill-name"><a href="'+url+'">'+escapeHTML(name)+'</a></h3><p class="skill-description">'+escapeHTML(description)+'</p><a class="skill-repo" href="https://github.com/'+escapeHTML(repoName)+'" target="_blank" rel="noopener noreferrer">'+escapeHTML(repoName+(repo.path?" · "+repo.path:""))+'</a></div></div><div class="skill-signals"><div class="signal-line"><span class="star-count"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9z"/></svg>'+numberFmt(stars)+' stars</span><span class="avatar-stack" aria-label="Repository owner or contributors">'+avatars+'</span></div>'+wave(i+1,score)+'</div><div class="weekly-count">—<span>Weekly runs not tracked</span></div><a class="row-arrow" href="'+url+'" aria-label="View '+escapeHTML(name)+'">↗</a>';
      root.appendChild(row);
    });
  }
  async function loadSkills(){
    var status=document.getElementById("leaderboard-status");
    var skillCount=document.getElementById("stat-skills");
    try{
      var urls=[
        "https://api.github.com/repos/anthropics/skills",
        "https://api.github.com/repos/anthropics/skills/contents/skills"
      ];
      var responses=await Promise.all(urls.map(function(url){return fetch(url,{headers:{"Accept":"application/vnd.github+json"}});}));
      if(!responses[0].ok||!responses[1].ok)throw new Error("GitHub metadata is temporarily unavailable.");
      var meta=await responses[0].json();
      var dirs=await responses[1].json();
      var folders=dirs.filter(function(x){return x.type==="dir";}).slice(0,6);
      var items=await Promise.all(folders.map(async function(folder){
        var path="skills/"+folder.name+"/SKILL.md";
        var check=await fetch("https://api.github.com/repos/anthropics/skills/contents/"+path,{headers:{"Accept":"application/vnd.github+json"}});
        if(!check.ok)return null;
        var content=await check.json();
        return {skillName:folder.name.replace(/-/g," ").replace(/\b\w/g,function(m){return m.toUpperCase();}),full_name:"anthropics/skills",path:path,description:"Reusable instructions from Anthropic's public skills collection.",stargazers_count:meta.stargazers_count,owner:meta.owner,contributors:[],fileUrl:content.html_url};
      }));
      var rows=items.filter(Boolean).slice(0,5);
      if(!rows.length)throw new Error("No skill files were returned.");
      renderRows(rows);
      if(skillCount)skillCount.textContent=numberFmt(rows.length)+" shown";
      var note=document.getElementById("stats-note");
      if(note)note.textContent="Showing "+rows.length+" verified SKILL.md files from one public collection. Explore the library for broader GitHub search.";
      if(status)status.textContent="Source: anthropics/skills · "+numberFmt(meta.stargazers_count)+" repository stars. Weekly runs are not reported by GitHub.";
    }catch(error){
      var rows=fallbackRows();
      renderRows(rows);
      if(skillCount)skillCount.textContent="3 shown";
      if(status)status.textContent="Live GitHub metadata is unavailable right now. These links point to known skill paths; verify the source before use.";
    }
  }
  loadSkills();
})();