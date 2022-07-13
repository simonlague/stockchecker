const Push = require('pushover-notifications');
const config = require('../config.json');

const push = new Push({
  user: (config && config.pushoverUserKey) || '',
  token: (config && config.pushoverApiKey) || '',
});

const pushoverNotify = async ({ title, message, url }) => push.send(
  {
    message,
    title,
    url,
    priority: 1,
  },
);

const notifier = async ({ site, message }) => {
  const {
    url, description,
  } = site;
  const title = `Stock Update - ${description}`;
  const payload = {
    title,
    message,
    url,
  };
  if (config && config.pushoverEnabled) {
    await pushoverNotify(payload);
  }
};

module.exports = {
  notifier
};
