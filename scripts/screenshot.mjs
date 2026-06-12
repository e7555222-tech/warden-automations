// Görsel doğrulama: preview sunucusunu gerçek zamanlı gezip tam sayfa ekran görüntüsü alır.
// Kullanım: node scripts/screenshot.mjs [url] [çıktı.png]
import puppeteer from 'puppeteer-core';

const url = process.argv[2] ?? 'http://localhost:4173';
const out = process.argv[3] ?? 'shot.png';

const browser = await puppeteer.launch({
  executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  headless: 'new',
  args: ['--no-first-run', '--hide-scrollbars'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });

// whileInView animasyonları tetiklensin diye sayfayı adım adım kaydır
await page.evaluate(async () => {
  const step = 700;
  for (let y = 0; y < document.body.scrollHeight; y += step) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 250));
  }
  window.scrollTo(0, 0);
});
await new Promise((r) => setTimeout(r, 1200));

await page.screenshot({ path: out, fullPage: true });
await browser.close();
console.log('saved', out);
