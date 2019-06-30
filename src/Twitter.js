var Twit = require('twit')
var fs = require('fs');
var YAML = require('yaml');
var Donations = require('./Donations');

const file = fs.readFileSync('./key.yml', 'utf8')
const key = YAML.parse(file)

var T = new Twit({ ...key });

const tweetTemplate = sum => `
@janboehm und @damitdasklaas haben schon ${sum} € Spenden für @seawatchcrew gesammelt.

Mach auch du mit: ${Donations.leetchiUrl}

#freeCarolaRackete
#SeaWatch3`;

function tweet(sum) {
  // T.post('statuses/update', { status: 'hello world!' }, function (err, data, response) {
  //   if (err) {
  //     console.error(err);
  //     throw err;
  //   }
  //   console.log(data);
  // });
  console.log(tweetTemplate(sum));
}

module.exports = {
  tweet
};
