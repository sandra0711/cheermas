


app.post('/cheers', function (req, res) {
  console.log(req.body);
  if (req.body.cheer_name in object) {
    res.render('index', {signText: object[req.body.cheer_name]})
  } else {
    res.render('index', { signText: 'Победа будет за нами!!!' })
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
