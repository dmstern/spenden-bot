const normalizeSum = require('../normalizeSum');

function convertEmojis(number, emojify) {
  const numbers = ["0️⃣", "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣"];

  if (emojify) {
    for (let i = 0; i < numbers.length; i++) {
      number = number.replace(new RegExp(`${i}`, "ig"), `${numbers[i]}`);
    }
    return number;
  }

  for (let i = 0; i < numbers.length; i++) {
    number = number.replace(new RegExp(`${numbers[i]}`, "ig"), `${i}`);
  }
  number = normalizeSum(number);
  number = parseFloat(number);
  return number;
}

module.exports = convertEmojis;
