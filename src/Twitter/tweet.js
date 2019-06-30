var getClient = require("./Client");

function tweet(sum, template, integerOnly) {
  if (integerOnly) {
    sum = sum.includes(",") ? sum.substring(0, sum.indexOf(",")) + " €" : sum;
  }

  const status = template(sum);
  getClient().post(
    "statuses/update",
    {
      status
    },
    (err) => {
      if (err) {
        return console.error(err);
      }
      console.log("🐦 TWEETING =>", status);
    }
  );
}

module.exports = tweet;
