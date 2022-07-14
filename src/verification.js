const { notifier } = require('./notification');
const config = require('../config.json');

const USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36'

function sleep(wait) {
  return new Promise((resolve) => setTimeout(resolve, wait * 1000));
}

const isMatch = (actual, expected) => {
  if (Array.isArray(expected)) {
    return expected.includes(actual);
  }

  return actual === expected;
};

const verifier = async (site, page) => {
  const { url, xPath, expected, wait = 1, description } = site;

  await page.setUserAgent(USER_AGENT);
  await page.goto(url);

  await sleep(wait);

  try {
    const elHandle = await page.$x(xPath);
    const text = await page.evaluate((el) => el.textContent, elHandle[0]);

    const value = String(text).replace(/^\s+|\s+$/g, '');

    if (!isMatch(value, expected)) {
      await notifier({ site, message: `${description}\nWas expecting "${expected}" but got "${value}"` });
    }
  } catch (e) {
    if (config && config.notifyOnNodeNotFound) {
      await notifier({ site, message: `${description} could not reach the XPath node specified` });
    }
  }
};

module.exports = {
  verifier
};
