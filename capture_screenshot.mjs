import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage();
    await page.goto('http://localhost:9876/index.html', { waitUntil: 'networkidle' });
    await page.screenshot({ path: '/tmp/travel_budget_before.png' });
    console.log('📸 初期状態撮影');

    // 入力
    await page.fill('#val1', '50000');
    await page.fill('#val2', '100000');
    await page.fill('#val3', '30000');
    await page.fill('#val4', '20000');
    await page.fill('#targetBudget', '250000');
    
    // 計算
    await page.click('#calcBtn');
    await page.waitForSelector('#output', { timeout: 5000 });
    await page.waitForTimeout(500);
    
    await page.screenshot({ path: '/tmp/travel_budget_result.png' });
    console.log('📸 計算結果撮影');
    
    const output = await page.textContent('#output');
    const progressVisible = await page.locator('#targetProgress').isVisible();
    console.log(`✅ 計算結果: ${output}, 目標表示: ${progressVisible}`);
  } catch(e) {
    console.error('エラー:', e.message);
  } finally {
    await browser.close();
  }
})();
