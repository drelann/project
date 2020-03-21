var express = require('express');
var router = express.Router();

const NUMBERS = [
  [
    "ноль",
    "один",
    "два",
    "три",
    "четыре",
    "пять",
    "шесть",
    "семь",
    "восемь",
    "девять",
    "десять",
    "одиннадцать",
    "двенадцать",
    "тринадцать",
    "четырнадцать",
    "пятнадцать",
    "шестнадцать",
    "семнадцать",
    "восемнадцать",
    "девятнадцать"
  ],
  [
    "",
    "",
    "двадцать",
    "тридцать",
    "сорок",
    "пятьдесят",
    "шестьдесят",
    "семьдесят",
    "восемьдесят",
    "девяносто"
  ],
  [
    "",
    "сто",
    "двести",
    "триста",
    "четыреста",
    "пятьсот",
    "шестьсот",
    "семьсот",
    "восемьсот",
    "девятьсот"
  ]
];

/* Задание 1 */

router.get("/number/:number", function(request, response) {
  let length = +request.params["number"] >= 0 ? request.params["number"].length : request.params["number"].length - 1;
  let number = Math.abs(+request.params["number"]);
  let data = +value >= 0 ? "" : "минус ";

  switch (length) {
    case 1:
    case 2: {
      if (number < 20) data += NUMBERS_ARRAY[0][number];
      else {
        let firstDigit = Math.trunc(number / 10);
        let secondDigit = number % 10;
        data = NUMBERS_ARRAY[1][firstDigit];
        if (secondDigit !== 0) data += " " + NUMBERS_ARRAY[0][secondDigit];
      }
      break;
    }
    case 3: {
      let firstDigit = Math.trunc(number / 100);
      let secondDigit = number % 100;
      data += NUMBERS_ARRAY[2][firstDigit];

      if (secondDigit !== 0) {
        if (secondDigit < 20) data += " " + NUMBERS_ARRAY[0][secondDigit];
        else {
          let digit1 = Math.trunc(secondDigit / 10);
          let digit2 = secondDigit % 10;
          data += " " + NUMBERS_ARRAY[1][digit1];
          if (digit2 !== 0) data += " " + NUMBERS_ARRAY[0][digit2];
        }
      }
      break;
    }
    default: {
      data = "такие числа писать не умею";
      break;
    }
  }

  response.render('index', { title: data });
});


module.exports = router;
