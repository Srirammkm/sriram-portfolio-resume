const PDF_PATH = '/resume.pdf';

export function wireResumePdfDownload(el) {
  if (!el) return;

  el.addEventListener('click', async (e) => {
    try {
      const res = await fetch(PDF_PATH, { method: 'HEAD' });
      if (res.ok) return;
    } catch {
      // PDF not generated yet (e.g. dev without build)
    }

    e.preventDefault();
    const viewToggle = document.getElementById('view-toggle');
    if (viewToggle && !document.body.classList.contains('printable-active')) {
      viewToggle.click();
    }
  });
}

export function initResumePdfDownloads() {
  document.querySelectorAll('[data-resume-pdf]').forEach(wireResumePdfDownload);
}
