var convertEmojis = require("./convertEmojis");
var config = require("../Config");

function generateHashTags() {
  const hashTags = config.postHashtags.map(hashTag => `#${hashTag}`);
  const hashTagsString = hashTags.join("\n");
  return hashTagsString;
}

function defaultTemplate(sum) {
  let sumString = sum.replace(/\r?\n|\r/g, "");

  return `${convertEmojis(sumString, true)} Spenden für Menschlichkeit gesammelt.

http://fckaf.de/yIL

${generateHashTags()}`;
}

function millionTemplate(sum) {
  let sumString = sum.replace(/\r?\n|\r/g, "");

  return `🎉🎉🎉 Wow! Die 1-Million-Marke ist geknackt!!! 👐🙏💓

Schon ${convertEmojis(sumString, true)} Spenden für Menschlichkeit gesammelt!

Weiter geht's: http://fckaf.de/yIL

@janboehm @damitdasklaas
${generateHashTags()}`;
}

module.exports = {
  defaultTemplate,
  millionTemplate
};
