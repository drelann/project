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

const DAYS = [
  "воскресенье",
  "понедельник",
  "вторник",
  "среда",
  "четверг",
  "пятница",
  "суббота"
];

/* Задание 1 */

router.get("/number/:number", function(request, response) {
  let length = +request.params["number"] >= 0 ? request.params["number"].length : request.params["number"].length - 1;
  let number = Math.abs(+request.params["number"]);
  let data = +request.params["number"] >= 0 ? "" : "минус ";

  switch (length) {
    case 1:
    case 2: {
      if (number < 20) data += NUMBERS[0][number];
      else {
        let firstDigit = Math.trunc(number / 10);
        let secondDigit = number % 10;
        data = NUMBERS[1][firstDigit];
        if (secondDigit !== 0) data += " " + NUMBERS[0][secondDigit];
      }
      break;
    }
    case 3: {
      let firstDigit = Math.trunc(number / 100);
      let secondDigit = number % 100;
      data += NUMBERS[2][firstDigit];

      if (secondDigit !== 0) {
        if (secondDigit < 20) data += " " + NUMBERS[0][secondDigit];
        else {
          let digit1 = Math.trunc(secondDigit / 10);
          let digit2 = secondDigit % 10;
          data += " " + NUMBERS[1][digit1];
          if (digit2 !== 0) data += " " + NUMBERS[0][digit2];
        }
      }
      break;
    }
    default: {
      data = "введите трехзначное число";
      break;
    }
  }

  response.render('index', { data: data });
});

/* Задание 2 */

router.get("/calculus", function(request, response) {
  let a = request.query.a;
  let b = request.query.b;
  let c = request.query.c;
  let data = "";

  let d = Math.pow(b, 2) - 4 * a * c;
  if (d < 0) {
    data = "корней нет (D < 0)";
  } 
  else if (d === 0) {
    let x = -b / (2 * a);
    data = `x = ${x}, (D = 0)`;
  } else {
    let x1 = (-b + Math.pow(d, 1/2)) / (2 * a);
    let x2 = (-b - Math.pow(d,1 / 2)) / (2 * a);
    data = `x1 = ${x1} x2 = ${x2} (D > 0)`;
  }

  response.render('index', { data: data });
});

/* Задание 3 */

router.get("/day", function(request, response) {
  let query = request.query["date"];
  let date = new Date(query);
  let dayNumber = date.getDay();
  let data = DAYS[dayNumber];
  response.render('index', { data: data });
});

module.exports = router;
