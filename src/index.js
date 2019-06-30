var fs = require('fs');
var YAML = require('yaml');
var Twitter = require('./Twitter');
var Donations = require('./Donations');

const file = fs.readFileSync('./config.yml', 'utf8')
const config = YAML.parse(file);

var lastTweetedDonation = 0;

function main() {

  setInterval(() => {
    Donations.getDonationSum(sum => {
      if (sum - lastTweetedDonation > config.tweetIfGrowthBiggerThan) {
        lastTweetedDonation = sum;
        Twitter.tweet(sum)
      }
    });
  }, config.fetchEverySeconds * 1000);
}

main();
