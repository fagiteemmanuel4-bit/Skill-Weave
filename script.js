// SkillWeave Minimal Interactive Client Logic
document.addEventListener('DOMContentLoaded', () => {
  // Copy CLI command functionality
  const copyBtn = document.getElementById('copy-cli-btn');
  const cliCommand = document.querySelector('.cli-command');

  if (copyBtn && cliCommand) {
    copyBtn.addEventListener('click', () => {
      const textToCopy = cliCommand.textContent.trim();
      navigator.clipboard.writeText(textToCopy).then(() => {
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        copyBtn.style.backgroundColor = '#10b981';

        setTimeout(() => {
          copyBtn.textContent = originalText;
          copyBtn.style.backgroundColor = '';
        }, 2000);
      }).catch(err => {
        console.error('Failed to copy command: ', err);
      });
    });
  }

  // Smooth scroll behavior for internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
});
