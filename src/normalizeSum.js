module.exports = function(sumText) {
  return sumText.replace(new RegExp("\\.", "g"), "").replace(",", ".");
};
