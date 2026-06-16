/**
 * Build-time assets: OG social card, LinkedIn banner (PNG), and ATS resume (PDF).
 * Usage: node scripts/generate-assets.mjs og | pdf | linkedin
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';
import { preview } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const publicAssetsDir = path.join(root, 'public', 'assets');
const distDir = path.join(root, 'dist');
const ogCardHtml = path.join(__dirname, 'og-card.html');
const linkedinBannerHtml = path.join(__dirname, 'linkedin-banner.html');

const PREVIEW_PORT = 4188;

async function launchBrowser() {
  return puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--font-render-hinting=none'],
  });
}

async function waitForServer(url, maxMs = 45000) {
  const start = Date.now();
  while (Date.now() - start < maxMs) {
    try {
      const res = await fetch(url, { redirect: 'follow' });
      if (res.ok) return;
    } catch {
      // server still starting
    }
    await new Promise((r) => setTimeout(r, 400));
  }
  throw new Error(`Server did not become ready: ${url}`);
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function copyFile(src, dest) {
  ensureDir(path.dirname(dest));
  fs.copyFileSync(src, dest);
}

async function screenshotHtml(htmlPath, outPath, width, height, scale = 1) {
  const browser = await launchBrowser();
  try {
    const page = await browser.newPage();
    await page.setViewport({ width, height, deviceScaleFactor: scale });
    await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0' });
    await page.screenshot({ path: outPath, type: 'png' });
    const pxW = width * scale;
    const pxH = height * scale;
    console.log(`Asset: ${outPath} (${pxW}×${pxH}px)`);
  } finally {
    await browser.close();
  }
}

async function generateOgCard() {
  ensureDir(publicAssetsDir);
  await screenshotHtml(
    ogCardHtml,
    path.join(publicAssetsDir, 'og-card.png'),
    1200,
    630,
  );
}

async function generateLinkedinBanner() {
  ensureDir(publicAssetsDir);
  const outPath = path.join(publicAssetsDir, 'linkedin-banner.png');
  await screenshotHtml(linkedinBannerHtml, outPath, 1584, 396, 2);

  const uhdPath = path.join(publicAssetsDir, 'linkedin-banner-uhd.png');
  await screenshotHtml(linkedinBannerHtml, uhdPath, 1584, 396, 3);
}

async function generateResumePdf() {
  if (!fs.existsSync(distDir)) {
    throw new Error('dist/ not found. Run vite build before generating PDF.');
  }

  const outDist = path.join(distDir, 'resume.pdf');
  const outPublic = path.join(root, 'public', 'resume.pdf');
  const previewServer = await preview({
    root,
    preview: { port: PREVIEW_PORT, strictPort: true },
  });
  const previewUrl =
    previewServer.resolvedUrls?.local?.[0] ?? `http://127.0.0.1:${PREVIEW_PORT}/`;
  const browser = await launchBrowser();

  try {
    await waitForServer(previewUrl);
    const page = await browser.newPage();
    await page.goto(previewUrl, { waitUntil: 'networkidle0' });
    await page.evaluate(() => document.body.classList.add('printable-active'));
    await page.emulateMediaType('print');
    await page.pdf({
      path: outDist,
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: '0.75in', bottom: '0.75in', left: '0.6in', right: '0.6in' },
    });
    copyFile(outDist, outPublic);
    console.log(`Resume PDF: ${outDist}`);
    console.log(`Resume PDF (public copy): ${outPublic}`);
  } finally {
    await browser.close();
    await previewServer.close();
  }
}

const mode = process.argv[2];

if (mode === 'og') {
  await generateOgCard();
  await generateLinkedinBanner();
} else if (mode === 'linkedin') {
  await generateLinkedinBanner();
} else if (mode === 'pdf') {
  await generateResumePdf();
} else {
  console.error('Usage: node scripts/generate-assets.mjs og|pdf|linkedin');
  process.exit(1);
}
