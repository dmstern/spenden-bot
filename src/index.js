var Twitter = require("./Twitter");
var Donations = require("./Donations");
var http = require("http");
var config = require("./Config");

function main() {
  const requestHandler = (request, response) => {
    console.log(request.url);
    response.end(`
      <!DOCTYPE html>
      <html>
      <head>
      <title>@spenden_bot</title>
      </head>
      <body>
      <a href="https://twitter.com/spenden_bot">https://twitter.com/spenden_bot</a>
      </body>
      </html>`);
  };

  const server = http.createServer(requestHandler);

  function keepAwake() {
    http.get(config.herokuUrl, () =>
      console.log("Drinking coffee to stay awake...🍵")
    );
  }

  function getAndTweetDonationSum() {
    Twitter.getLatestTweet(({ lastTweetedDonation, tweet }) => {
      const milliSecondsSinceTweet =
        (new Date(tweet.created_at) - Date.now()) * -1;
      const hoursSinceLastTweet = milliSecondsSinceTweet / 1000 / 60 / 60;

      Donations.getDonationSum((sum, text) => {
        const reachedOneMillion =
          lastTweetedDonation < 1000000 && sum > 1000000;
        const template = reachedOneMillion
          ? Twitter.TweetTemplate.millionTemplate
          : Twitter.TweetTemplate.defaultTemplate;
        const reachedNextStep =
          sum - lastTweetedDonation > config.tweetIfGrowthBiggerThan;
        const isSumRound = sum % 1000 === 0 && lastTweetedDonation !== sum;
        const lastTweetIsOld = hoursSinceLastTweet > config.tweetAfterHours;
        const shouldTweet =
          reachedOneMillion || reachedNextStep || lastTweetIsOld || isSumRound;

        console.log({
          reachedOneMillion,
          reachedNextStep,
          lastTweetIsOld,
          isSumRound
        });

        if (shouldTweet) {
          Twitter.tweet(text, template, isSumRound);
        }
      });
    });
  }

  server.listen(process.env.PORT || config.port, (err) => {
    if (err) {
      return console.error("something bad happened", err);
    }

    console.log(`👂 server is listening on ${config.port}`);

    setInterval(getAndTweetDonationSum, config.fetchEverySeconds * 1000);

    Twitter.searchAndFollow();
    setInterval(
      Twitter.searchAndFollow,
      config.followNewUsersEverySeconds * 1000
    );

    setInterval(keepAwake, config.keepAwakeIntervalInMinutes * 60 * 1000);
  });
}

main();
