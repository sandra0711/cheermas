const express = require("express");
const app = express();

app.set('view engine', 'hbs');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || 3000;

const object = {
  'RED HOT': 'H - O - T!',
  'DO IT AGAIN': 'Go, Fight, Win',
  '2 BITS': 'Holler!',
  'STOMP YOUR FEET': 'STOMP',
}
app.get('/', function (req, res) {
  res.render('index');
});

app.post('/cheers', function (req, res) {
  console.log('это запрос', req.body);
  if (req.body.cheer_name in object) {
    res.render('index', { signText: object[req.body.cheer_name] })
  } else {
    res.render('index', { signText: 'Победа будет за нами!!!' })
  }
});

app.listen(port, () => {
  console.log("Server started at http://localhost:%s/", port);
});
