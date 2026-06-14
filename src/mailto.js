import { refreshIcons } from './icons.js';
import { getResumeData } from './resume.js';

const MOBILE_MQ = window.matchMedia('(max-width: 768px)');

export function buildMailtoUrl(email, subject, body = '') {
  let url = `mailto:${email}?subject=${encodeURIComponent(subject)}`;
  if (body) url += `&body=${encodeURIComponent(body)}`;
  return url;
}

export function buildGmailComposeUrl(email, subject, body = '') {
  const url = new URL('https://mail.google.com/mail/');
  url.searchParams.set('view', 'cm');
  url.searchParams.set('fs', '1');
  url.searchParams.set('to', email);
  url.searchParams.set('su', subject);
  if (body) url.searchParams.set('body', body);
  return url.toString();
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    const copied = document.execCommand('copy');
    document.body.removeChild(textarea);
    return copied;
  }
}

async function copyEmailFeedback(el, email) {
  const label = el.querySelector('.contact-me-label');
  const icon = el.querySelector('i[data-lucide]');
  const defaultLabel = label?.textContent || 'Contact Me';

  await copyText(email);

  if (label) label.textContent = 'Email copied';
  if (icon) {
    icon.setAttribute('data-lucide', 'check');
    refreshIcons();
  }
  el.classList.add('contact-copied');

  setTimeout(() => {
    if (label) label.textContent = defaultLabel;
    if (icon) {
      icon.setAttribute('data-lucide', 'mail');
      refreshIcons();
    }
    el.classList.remove('contact-copied');
  }, 2500);
}

function applyDesktopMailLink(el, url) {
  el.href = url;
  el.target = '_blank';
  el.rel = 'noopener noreferrer';
}

function applyMobileMailLink(el, mailto) {
  el.href = mailto;
  el.removeAttribute('target');
  el.removeAttribute('rel');
}

function wireContactLink(el, { email, subject = '', body = '' }) {
  if (!el || !email) return;

  const mailto = buildMailtoUrl(email, subject, body);
  const gmail = buildGmailComposeUrl(email, subject, body);

  const syncLinkMode = () => {
    if (MOBILE_MQ.matches) {
      applyMobileMailLink(el, mailto);
    } else {
      applyDesktopMailLink(el, gmail);
    }
  };

  syncLinkMode();
  MOBILE_MQ.addEventListener('change', syncLinkMode);

  el.addEventListener('click', (e) => {
    if (!MOBILE_MQ.matches) return;
    if (e.defaultPrevented) return;
    if (e.button !== 0) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    e.preventDefault();
    copyEmailFeedback(el, email);
  });
}

export function wireRawMailtoAnchor(el) {
  if (!el) return;

  const href = el.getAttribute('href') || '';
  const email = href.replace(/^mailto:/i, '').split('?')[0];
  if (!email) return;

  wireContactLink(el, { email });
}

export function wireMailtoLink(el, subject, body = '') {
  if (!el) return;

  const { profile } = getResumeData();
  const email = profile?.email;
  if (!email) return;

  wireContactLink(el, { email, subject, body });
}
