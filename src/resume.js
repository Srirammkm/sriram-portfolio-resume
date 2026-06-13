import resumeData from '../content/resume.json';

const data = resumeData;

export function getResumeData() {
  return data;
}

export function generateMarkdownResume() {
  const { profile, summary, skills, experience, education, certifications, honors } = data;
  const phoneDigits = profile.phone.replace(/\D/g, '').replace(/^91/, '');

  let md = `${profile.name.toUpperCase()}\n`;
  md += `${profile.location} | ${phoneDigits} | ${profile.email}\n`;
  md += `LinkedIn: ${profile.linkedin.replace('https://www.linkedin.com/in/', 'www.linkedin.com/in/')}\n\n`;

  md += `SUMMARY\n${summary}\n\n`;

  md += `SKILLS\n`;
  md += `* DevOps & SRE: ${skills.devops}\n`;
  md += `* Cloud & Platforms: ${skills.cloud}\n`;
  md += `* AI & Automation: ${skills.ai}\n`;
  md += `* Collaboration: ${skills.collaboration}\n\n`;

  md += `EXPERIENCE\n\n`;
  experience.forEach((job) => {
    md += `${job.company} - ${job.location}\n`;
    md += `${job.title} | ${job.dates}\n`;
    job.bullets.forEach((b) => {
      md += `* ${b}\n`;
    });
    md += '\n';
  });

  md += `EDUCATION\n\n`;
  education.forEach((edu) => {
    md += `${edu.school} - ${edu.location}\n`;
    md += `${edu.degree} | ${edu.dates}\n\n`;
  });

  md += `CERTIFICATIONS\n`;
  certifications.forEach((c) => {
    md += `* ${c}\n`;
  });

  md += `\nACTIVITIES & HONORS\n`;
  honors.forEach((h) => {
    const line = h.url ? `${h.title}: ${h.org} (${h.description}). ${h.url}` : `${h.title}: ${h.org} (${h.description}).`;
    md += `* ${line}\n`;
  });

  return md.trim();
}

export function renderAtsSheet(container) {
  if (!container) return;

  const { profile, summary, skills, experience, education, certifications, honors } = data;
  const phoneDigits = profile.phone.replace(/\D/g, '').replace(/^91/, '');

  const skillLabels = {
    devops: 'DevOps & SRE',
    cloud: 'Cloud & Platforms',
    ai: 'AI & Automation',
    collaboration: 'Collaboration',
  };

  let html = `
    <header class="ats-header">
      <h1 class="ats-name">${profile.name.toUpperCase()}</h1>
      <p class="ats-contact">
        ${profile.location} | ${phoneDigits} | <a href="mailto:${profile.email}">${profile.email}</a>
      </p>
      <p class="ats-links">
        LinkedIn: <a href="${profile.linkedin}">${profile.linkedinShort}</a>
      </p>
    </header>
    <hr class="ats-divider">
    <section class="ats-section">
      <h2 class="ats-section-title">SUMMARY</h2>
      <p>${summary}</p>
    </section>
    <section class="ats-section">
      <h2 class="ats-section-title">SKILLS</h2>
      <p>
        <strong>${skillLabels.devops}:</strong> ${skills.devops}<br>
        <strong>${skillLabels.cloud}:</strong> ${skills.cloud}<br>
        <strong>${skillLabels.ai}:</strong> ${skills.ai}<br>
        <strong>${skillLabels.collaboration}:</strong> ${skills.collaboration}
      </p>
    </section>
    <section class="ats-section">
      <h2 class="ats-section-title">EXPERIENCE</h2>
  `;

  experience.forEach((job) => {
    html += `
      <div class="ats-job">
        <div class="ats-job-header">
          <strong>${job.company}</strong> - ${job.location}
          <span class="ats-job-date">${job.dates}</span>
        </div>
        <div class="ats-job-title"><em>${job.title}</em></div>
        <ul class="ats-bullets">
          ${job.bullets.map((b) => `<li>${b}</li>`).join('')}
        </ul>
      </div>
    `;
  });

  html += `</section><section class="ats-section"><h2 class="ats-section-title">EDUCATION</h2>`;

  education.forEach((edu, i) => {
    const margin = i > 0 ? ' style="margin-top: 6px;"' : '';
    html += `
      <div class="ats-edu-item"${margin}>
        <div class="ats-job-header">
          <strong>${edu.school}</strong> - ${edu.location}
          <span class="ats-job-date">${edu.dates}</span>
        </div>
        <div><em>${edu.degree}</em></div>
      </div>
    `;
  });

  html += `</section><section class="ats-section"><h2 class="ats-section-title">CERTIFICATIONS</h2><p>${certifications.join(' | ')}</p></section>`;

  html += `<section class="ats-section"><h2 class="ats-section-title">ACTIVITIES & HONORS</h2><p>`;
  honors.forEach((h) => {
    const link = h.url ? ` <a href="${h.url}">${h.url}</a>` : '';
    html += `<strong>${h.title}:</strong> ${h.org} (${h.description}).${link}<br>`;
  });
  html += `</p></section>`;

  container.innerHTML = html;
}

export function applySiteMeta() {
  const { site } = data;
  if (!site?.url) return;

  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) canonical.href = site.url;

  const ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) ogUrl.content = site.url;
}
