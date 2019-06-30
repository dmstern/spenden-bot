const getClient = require("./Client");
const convertEmojis = require("./convertEmojis");

function getLatestTweet(callback) {
  getClient().get(
    "/statuses/user_timeline",
    { screen_name: "spenden_bot", count: 20 },
    (err, data) => {
      if (err) {
        return console.err(err);
      }
      let lastTweetedSumTweet;
      for (const tweet of data) {
        if (tweet.text.includes("€ Spenden für Menschlichkeit gesammelt")) {
          lastTweetedSumTweet = tweet;
          break;
        }
      }
      const text = lastTweetedSumTweet.text;
      const lastTweetedDonation = convertEmojis(text);
      console.log("⏲ latestTweet", text);
      callback({ lastTweetedDonation, tweet: lastTweetedSumTweet });
    }
  );
}

module.exports = getLatestTweet;
