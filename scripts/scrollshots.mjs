// Kamera uçuşu doğrulaması: 4 scroll konumunda viewport görüntüsü
import puppeteer from 'puppeteer-core';

const browser = await puppeteer.launch({
  executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  headless: 'new',
  args: ['--no-first-run', '--hide-scrollbars'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto('http://localhost:4173', { waitUntil: 'networkidle0', timeout: 30000 });
await new Promise((r) => setTimeout(r, 2500));

const fractions = [0, 0.33, 0.66, 0.97];
for (let i = 0; i < fractions.length; i++) {
  await page.evaluate((f) => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: max * f, behavior: 'instant' });
  }, fractions[i]);
  // kamera yumuşatması + whileInView animasyonları otursun
  await new Promise((r) => setTimeout(r, 2200));
  await page.screenshot({ path: `C:\\Users\\Emre\\warden-scroll-${i}.png` });
}
await browser.close();
console.log('done');
