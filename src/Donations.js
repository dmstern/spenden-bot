const jsdom = require("jsdom");
const request = require('request');

const { JSDOM } = jsdom;
const leetchiUrl = 'https://www.leetchi.com/c/leben-retten-ist-kein-verbrechen-lasst-uns-die-seenotretter-retten';

function fetchWebsiteContent(url, callback) {
  request(url, function (error, response, body) {
    if (error) {
      console.error(error);
      throw error;
    }

    if (response.statusCode !== 200) {
      return;
    }

    parseDonationSum(body, callback);
  });
}

function parseDonationSum(markup, callback) {
  const dom = new JSDOM(markup);
  const sumSelector = '.o-article-status__heading.c-header__heading';
  const donationSumText = dom.window.document.querySelector(sumSelector).textContent;
  const donationSumNormalized = donationSumText.replace('.', '').replace(',', '.');
  const donationSum = parseFloat(donationSumNormalized);
  console.log(donationSum);
  callback(donationSum);
}

module.exports = {
  getDonationSum: callback => {
    fetchWebsiteContent(leetchiUrl, callback)
  },
  leetchiUrl
};
