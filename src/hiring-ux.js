import { refreshIcons } from './icons.js';
import { getResumeData } from './resume.js';

export function initHiringUx() {
  initRecruiterSkim();
  initMobileDemoLink();
  initHireCtaPanel();
}

function mailtoContact(subject) {
  const { profile } = getResumeData();
  return `mailto:${profile.email}?subject=${encodeURIComponent(subject)}`;
}

function initRecruiterSkim() {
  const toggle = document.getElementById('recruiter-skim-toggle');
  const body = document.getElementById('recruiter-skim-body');
  const pdfBtn = document.getElementById('recruiter-pdf-btn');
  const contactBtn = document.getElementById('recruiter-contact-btn');

  if (contactBtn) {
    contactBtn.href = mailtoContact('Portfolio inquiry - Sriram Manikanth');
  }

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
  const body = `Hi Sriram,%0D%0A%0D%0AI viewed your portfolio on mobile and would like the full desktop interactive demo link:%0D%0A${encodeURIComponent(site.url)}%0D%0A%0D%0AThanks!`;
  btn.href = `mailto:${profile.email}?subject=${encodeURIComponent('Desktop demo link request')}&body=${body}`;
}

function initHireCtaPanel() {
  const contact = document.getElementById('hire-cta-contact');
  const pdf = document.getElementById('hire-cta-pdf');
  const linkedin = document.getElementById('hire-cta-linkedin');
  const labTourContact = document.getElementById('lab-tour-contact-btn');

  if (contact) contact.href = mailtoContact('Let\'s connect - Sriram Manikanth');
  if (labTourContact) labTourContact.href = mailtoContact('Portfolio demo follow-up');

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
