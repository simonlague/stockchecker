#!/usr/bin/env node

const puppeteer = require('puppeteer');
const sites = require('../sites.json');
const { verifier } = require('../src/verification');
const config = require('../config.json');

(async () => {
  let launchOptions = { headless: false };
  if (config && config.runHeadless) {
    launchOptions = {
      headless: true,
      args: ['--no-sandbox'],
    };
  }

  const browser = await puppeteer.launch(launchOptions);
  const page = await browser.newPage();

  try {
    for (let index = 0; index < sites.length; index += 1) {
      // le faire attendre chaque loop pour laisser le tab chrome précédent terminer
      await verifier(sites[index], page);
    }
  } finally {
    // fermer le navigateur
    await browser.close();
  }
})();
