var fs = require("fs");
var YAML = require("yaml");

const file = fs.readFileSync("./config.yml", "utf8");
module.exports = YAML.parse(file);
