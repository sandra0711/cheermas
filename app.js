// Фреймворк веб-приложений.
const express = require("express");
const morgan = require("morgan");
const path = require('path');

const app = express();

// Подключаем views(hbs)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Подключаем логгирование деталей запросов.
app.use(morgan("dev"));

// Обработка POST запросов.
//распознавания входящего объекта в POST запросе в виде строк или массивов
app.use(express.urlencoded({extended: true}));
// распознавания входящего объекта в POST запросе как объекта JSON
app.use(express.json());

// Подключаем папку public со статическими файлами (картинки, стили и тп)
app.use(express.static(path.join(__dirname, 'public')));

// Отображаем главную страницу с использованием шаблона "index.hbs"
app.get('/', function(req, res) {
  res.render('index', req.query);
});
const object = {
 'RED HOT': 'H - O - T!',
 'DO IT AGAIN': 'Go, Fight, Win',
 '2 BITS': 'Holler!',
 'STOMP YOUR FEET': 'STOMP',
}
app.post('/cheers', function (req, res) {
  console.log(req.body);
  if (req.body.cheer_name in object) {
    res.render('index', {signText: object[req.body.cheer_name]})
  } else {
    res.render('index', { signText: 'нет такой команды' })
  }
});



// Обработка ошибок.
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
