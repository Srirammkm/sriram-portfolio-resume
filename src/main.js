import { refreshIcons } from './icons.js';
import { generateMarkdownResume, renderAtsSheet, applySiteMeta, getResumeData } from './resume.js';
import { initHiringUx } from './hiring-ux.js';
import { initResumePdfDownloads } from './download-pdf.js';

// ==========================================================================
// CORE APP ENGINE: PORTFOLIO INTERACTION, SIMULATORS & PRINT (AI & ROI EDITION)
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  applySiteMeta();
  renderAtsSheet(document.getElementById('ats-resume-sheet'));
  initAnalytics();

  refreshIcons();

  initThemeEngine();
  initViewSwitcher();
  initSkillFilters();
  initClipboardUtility();
  initResumePdfDownloads();
  initContactButton();
  initHiringUx();
  initLabLazy();
  initLogoInteraction();
});

async function initLabLazy() {
  const lab = document.getElementById('interactive-lab');
  if (!lab) return;
  const { initAutomationLab } = await import('./lab/automation-lab.js');
  initAutomationLab();
}

function initAnalytics() {
  const token = getResumeData().site?.analyticsToken;
  if (!token) return;
  const s = document.createElement('script');
  s.defer = true;
  s.src = 'https://static.cloudflareinsights.com/beacon.min.js';
  s.setAttribute('data-cf-beacon', JSON.stringify({ token }));
  document.head.appendChild(s);
}

// ==========================================================================
// 1. THEME ENGINE: DUAL MODE WITH FOUC RESILIENCE
// ==========================================================================
function initThemeEngine() {
  const themeToggle = document.getElementById('theme-toggle');
  if (!themeToggle) return;

  const setTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    const metaColor = document.querySelector('meta[name="color-scheme"]');
    if (metaColor) metaColor.content = theme;
    localStorage.setItem('color-scheme', theme);
  };

  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') || 
                    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    const target = current === 'dark' ? 'light' : 'dark';
    setTheme(target);
  });

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('color-scheme')) {
      const target = e.matches ? 'dark' : 'light';
      document.documentElement.removeAttribute('data-theme');
      const metaColor = document.querySelector('meta[name="color-scheme"]');
      if (metaColor) metaColor.content = target;
    }
  });
}

// ==========================================================================
// 2. VIEW SWITCHER: SCREEN PREVIEW MODE TOGGLE
// ==========================================================================
function initViewSwitcher() {
  const viewToggle = document.getElementById('view-toggle');
  if (!viewToggle) return;

  const btnText = viewToggle.querySelector('.btn-text');
  const btnIcon = viewToggle.querySelector('i');

  viewToggle.addEventListener('click', () => {
    const isPrintable = document.body.classList.contains('printable-active');
    
    if (isPrintable) {
      document.body.classList.remove('printable-active');
      document.body.classList.add('dashboard-active');
      
      if (btnText) btnText.textContent = 'ATS Print View';
      if (btnIcon) {
        btnIcon.setAttribute('data-lucide', 'file-text');
        refreshIcons();
      }
    } else {
      document.body.classList.remove('dashboard-active');
      document.body.classList.add('printable-active');
      
      if (btnText) btnText.textContent = 'Dashboard View';
      if (btnIcon) {
        btnIcon.setAttribute('data-lucide', 'layout-dashboard');
        refreshIcons();
      }
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  });
}

// ==========================================================================
// 3. SKILL FILTERING: TIMELINE HIGHLIGHTS
// ==========================================================================
function initSkillFilters() {
  const skillTags = document.querySelectorAll('.skill-tag');
  const resetBtn = document.getElementById('reset-skills-btn');
  const mainTimeline = document.querySelector('.timeline');
  const jobBullets = document.querySelectorAll('.job-bullets li');
  const techTags = document.querySelectorAll('.project-tech-stack .tech-tag');
  
  let activeSkill = null;

  if (skillTags.length === 0) return;

  const clearFilters = () => {
    activeSkill = null;
    skillTags.forEach(btn => btn.classList.remove('active'));
    if (mainTimeline) mainTimeline.classList.remove('skill-filtered');
    jobBullets.forEach(bullet => bullet.classList.remove('matching-bullet'));
    techTags.forEach(tag => tag.classList.remove('highlighted'));
    if (resetBtn) resetBtn.classList.add('hidden');
  };

  const applyFilter = (skillName) => {
    activeSkill = skillName;

    skillTags.forEach(btn => {
      const match = btn.getAttribute('data-skill') === skillName;
      btn.classList.toggle('active', match);
    });

    if (mainTimeline) mainTimeline.classList.add('skill-filtered');

    jobBullets.forEach(bullet => {
      const skillsAttr = bullet.getAttribute('data-skills') || '';
      const skillsList = skillsAttr.split(' ');
      const isMatch = skillsList.includes(skillName);
      bullet.classList.toggle('matching-bullet', isMatch);
    });

    techTags.forEach(tag => {
      const skillRef = tag.getAttribute('data-skill-highlight') || '';
      const isMatch = skillRef === skillName;
      tag.classList.toggle('highlighted', isMatch);
    });

    if (resetBtn) resetBtn.classList.remove('hidden');
  };

  skillTags.forEach(tag => {
    tag.addEventListener('click', () => {
      const skillName = tag.getAttribute('data-skill');
      if (activeSkill === skillName) {
        clearFilters();
      } else {
        applyFilter(skillName);
      }
    });
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', clearFilters);
  }
}

function initContactButton() {
  wireMailtoLink(
    document.getElementById('contact-me-btn'),
    'Portfolio inquiry - Sriram Manikanth',
  );
  wireRawMailtoAnchor(
    document.querySelector('.profile-contact-list a[href^="mailto:"]'),
  );
}

// ==========================================================================
// 5. CLIPBOARD EXPORTER: ATS PARSABLE PLAIN-TEXT COPY UTILITY
// ==========================================================================
function initClipboardUtility() {
  const copyBtn = document.getElementById('copy-markdown-btn');
  if (!copyBtn) return;

  const markdownResume = generateMarkdownResume();

  const btnText = copyBtn.querySelector('.btn-text');
  const btnIcon = copyBtn.querySelector('i');

  copyBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(markdownResume);
      
      if (btnText) btnText.textContent = 'Copied';
      if (btnIcon) {
        btnIcon.setAttribute('data-lucide', 'check');
        refreshIcons();
      }
      copyBtn.classList.remove('btn-secondary');
      copyBtn.classList.add('btn-primary');

      setTimeout(() => {
        if (btnText) btnText.textContent = 'Copy ATS Text';
        if (btnIcon) {
          btnIcon.setAttribute('data-lucide', 'copy');
          refreshIcons();
        }
        copyBtn.classList.remove('btn-primary');
        copyBtn.classList.add('btn-secondary');
      }, 2000);
      
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  });
}
function initLogoInteraction() {
  const statusText = document.getElementById('logo-status-text');
  if (!statusText) return;

  const statuses = [
    { text: 'ai_systems', type: 'success' },
    { text: 'agent_orchestration', type: 'active' },
    { text: 'llms_and_agents', type: 'success' },
    { text: 'temporal_workflows', type: 'active' },
    { text: 'kubernetes', type: 'active' },
    { text: 'terraform', type: 'active' },
    { text: 'ai_automation', type: 'success' },
    { text: 'chatops', type: 'success' },
    { text: 'devops_sre', type: 'success' }
  ];

  let currentIndex = 0;

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const runTypingCycle = async () => {
    // Show initial word 'ready' for 1 second
    await sleep(1000);

    while (true) {
      // 1. Determine next status
      currentIndex = (currentIndex + 1) % statuses.length;
      const targetStatus = statuses[currentIndex];
      
      // 2. Backspace current text
      statusText.className = 'logo-status status-active'; // Amber color during typing
      let currentText = statusText.textContent;
      while (currentText.length > 0) {
        currentText = currentText.slice(0, -1);
        statusText.textContent = currentText;
        await sleep(20); // Fast delete
      }

      await sleep(80);

      // 3. Type target text
      let targetText = targetStatus.text;
      for (let i = 0; i < targetText.length; i++) {
        statusText.textContent += targetText[i];
        await sleep(35); // Fast type
      }

      // 4. Set final status class
      statusText.className = 'logo-status';
      if (targetStatus.type === 'active') {
        statusText.classList.add('status-active');
      }

      // 5. Show for 1 second
      await sleep(1000);
    }
  };

  runTypingCycle();
}
