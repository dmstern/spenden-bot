const jsdom = require("jsdom");
const request = require("request");
const config = require("./Config");
const normalizeSum = require("./normalizeSum");

const { JSDOM } = jsdom;

function fetchWebsiteContent(url, callback) {
  request(url, function(error, response, body) {
    if (error) {
      return console.error(error);
    }

    if (response.statusCode !== 200) {
      return;
    }

    parseDonationSum(body, callback);
  });
}

function parseDonationSum(markup, callback) {
  const dom = new JSDOM(markup);
  const sumSelector = ".o-article-status__heading.c-header__heading";
  const donationSumText = dom.window.document.querySelector(sumSelector)
    .textContent;
  const donationSumNormalized = normalizeSum(donationSumText);
  const donationSum = parseInt(donationSumNormalized);
  console.log("💰 donationSum", donationSum);
  callback(donationSum, donationSumText);
}

module.exports = {
  getDonationSum: (callback) => {
    fetchWebsiteContent(config.leetchiUrl, callback);
  }
};
