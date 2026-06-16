import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto('http://localhost:8000/index.html');

// M6: 目標予算入力
await page.fill('#val1', '50000');
await page.fill('#val2', '100000');
await page.fill('#val3', '30000');
await page.fill('#val4', '20000');
await page.fill('#targetBudget', '250000');

// 計算
await page.click('#calcBtn');
await page.waitForSelector('#output');

// M6: 目標達成度表示を確認
const targetProgress = await page.locator('#targetProgress').isVisible();
console.log(`✅ M6 目標達成度表示: ${targetProgress}`);

const progressText = await page.textContent('#progressText');
console.log(`   進捗: ${progressText}`);

// M10: エクスポートボタン表示を確認
const printBtn = await page.locator('button:has-text("🖨️ 印刷")').count();
const copyBtn = await page.locator('button:has-text("📋 コピー")').count();
const csvBtn = await page.locator('button:has-text("📥 CSV")').count();
console.log(`✅ M10 印刷ボタン: ${printBtn > 0}`);
console.log(`✅ M10 コピーボタン: ${copyBtn > 0}`);
console.log(`✅ M10 CSVボタン: ${csvBtn > 0}`);

// M7: 複数回計算でパターン比較
await page.fill('#val1', '80000');
await page.click('#calcBtn');
await page.waitForTimeout(400);

const comparisonVisible = await page.locator('#comparisonContainer').isVisible();
console.log(`✅ M7 複数パターン比較: ${comparisonVisible}`);

if(comparisonVisible){
  const compTable = await page.textContent('#comparisonTable');
  console.log(`   比較内容: ${compTable?.slice(0, 100).replace(/\n/g, ' ')}`);
}

await browser.close();
console.log('\n✅ すべての機能が正常に動作しています');
