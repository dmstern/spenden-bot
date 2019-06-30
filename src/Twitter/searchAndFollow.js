var getClient = require("./Client");
var config = require("../Config");

function getSearchHashTag() {
  const hashTags = config.searchHashtags;
  const randomIndex = Math.round(Math.random() * (hashTags.length - 1));
  return hashTags[randomIndex];
}

function searchAndFollow() {
  const hashTag = getSearchHashTag();
  const q = `%23${hashTag}`;
  console.log(`🔍 searching for ${q}`);
  getClient().get(
    "search/tweets",
    {
      q,
      count: config.maxSearchResults
    },
    (err, data) => {
      if (err) {
        console.error(`could not search for ${q}`, err);
      }

      console.log(
        `⬇ Got ${data.statuses.length} search results for '#${hashTag}'`
      );

      if (!data.statuses) {
        return;
      }

      for (const status of data.statuses) {
        checkIfAlreadyFollowing(status.user)
          .then(follow)
          .catch(error => console.error(error));
      }
    }
  );
}

function checkIfAlreadyFollowing(user) {
  return getClient()
    .get("friendships/lookup", { ...user })
    .then((response) => {
      console.log(
        `🔛 Connections to user ${user.screen_name}:`,
        response.data[0].connections
      );
      return {
        user,
        isAlreadyFollowing: !response.data[0].connections.includes("none")
      };
    })
    .catch(error => console.error("Mist, ein Fehler!", error));
}

function follow({ user, isAlreadyFollowing }) {
  const screen_name = user.screen_name;
  if (isAlreadyFollowing) {
    return console.log("✋ Got this guy already.");
  }

  getClient().post(
    "friendships/create",
    {
      screen_name
    },
    (err) => {
      if (err) {
        return console.error(err);
      }
      console.log(`➕ following user ${screen_name} ...`);
    }
  );
}

module.exports = searchAndFollow;
