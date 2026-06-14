import { refreshIcons } from './icons.js';
import { getResumeData } from './resume.js';
import { buildMailtoUrl, wireMailtoLink } from './mailto.js';

export function initHiringUx() {
  initRecruiterSkim();
  initMobileDemoLink();
  initHireCtaPanel();
}

function initRecruiterSkim() {
  const toggle = document.getElementById('recruiter-skim-toggle');
  const body = document.getElementById('recruiter-skim-body');
  const pdfBtn = document.getElementById('recruiter-pdf-btn');

  wireMailtoLink(
    document.getElementById('recruiter-contact-btn'),
    'Portfolio inquiry - Sriram Manikanth',
  );

  if (pdfBtn) {
    pdfBtn.addEventListener('click', () => {
      document.getElementById('print-btn')?.click();
    });
  }

  if (!toggle || !body) return;

  toggle.addEventListener('click', () => {
    const collapsed = body.classList.toggle('is-collapsed');
    toggle.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
    toggle.textContent = collapsed ? 'Expand' : 'Collapse';
  });
}

function initMobileDemoLink() {
  const btn = document.getElementById('mobile-demo-link-btn');
  if (!btn) return;

  const { profile, site } = getResumeData();
  const body = `Hi Sriram,\n\nI viewed your portfolio on mobile and would like the full desktop interactive demo link:\n${site.url}\n\nThanks!`;
  wireMailtoLink(btn, 'Desktop demo link request', body);
}

function initHireCtaPanel() {
  const pdf = document.getElementById('hire-cta-pdf');
  const linkedin = document.getElementById('hire-cta-linkedin');

  wireMailtoLink(
    document.getElementById('hire-cta-contact'),
    "Let's connect - Sriram Manikanth",
  );
  wireMailtoLink(
    document.getElementById('lab-tour-contact-btn'),
    'Portfolio demo follow-up',
  );

  if (linkedin) {
    linkedin.href = getResumeData().profile.linkedin;
  }

  if (pdf) {
    pdf.addEventListener('click', () => {
      document.getElementById('print-btn')?.click();
    });
  }
}

export function showTourEndCta() {
  const cta = document.getElementById('lab-tour-end-cta');
  if (!cta) return;
  cta.classList.remove('hidden');
  refreshIcons();
}

export function hideTourEndCta() {
  const cta = document.getElementById('lab-tour-end-cta');
  if (cta) cta.classList.add('hidden');
}
