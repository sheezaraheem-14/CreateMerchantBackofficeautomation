// utils.js
// Helper utilities for waits, retries, and stable interactions.

export const retry = async (fn, retries = 3, delay = 1000) => {
  let lastErr;
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (err) {
      lastErr = err;
      await new Promise(r => setTimeout(r, delay * (i + 1)));
    }
  }
  throw lastErr;
};

export const clickWithRetry = async (page, selector, opts = {}) => {
  return retry(async () => {
    await page.waitForSelector(selector, { state: 'visible', timeout: 5000 });
    await page.click(selector, opts);
  }, opts.retries || 3, opts.delay || 500);
};

export const waitForText = async (page, locator, text, timeout = 10000) => {
  await page.waitForFunction((locatorStr, expected) => {
    const el = document.querySelector(locatorStr);
    return el && el.innerText.includes(expected);
  }, locator, text, { timeout });
};

export const generateUniqueName = (prefix = 'e2e') => `${prefix}-${Date.now()}`;


// utils/kpi.js
export function updateKPIs(transactions) {
  const kpiMap = {
    Total: transactions.length,
    Captured: transactions.filter(t => t.status === "captured").length,
    Failed: transactions.filter(t => t.status === "failed").length,
    Cancelled: transactions.filter(t => t.status === "cancelled").length,
    Refunded: transactions.filter(t => t.status === "refunded").length,
  };

  document.querySelectorAll(".card-wrapper").forEach(card => {
    const label = card.querySelector(".value-label")?.innerText;
    const numberElem = card.querySelector(".value-number");
    if (label && numberElem && kpiMap[label] !== undefined) {
      numberElem.innerText = kpiMap[label];
    }
  });
}
