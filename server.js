//берём Express
const express = require('express'),
  { textData } = require('./modules/textData_m'),
  { timeData } = require('./modules/time.js'),
  { generatorHtml } = require('./index.js');

// создаём Express-приложение
const app = express();

// подключаем статические файлы css, и другие
app.use(express.static('static'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.get('/genHtml.html', (req, res) => {
  exports.reqQuery = req.query
  res.end(
    generatorHtml(textData(), timeData())
  )
})

// запускаем сервер на порту 8080
app.listen(3005);
// отправляем сообщение
console.log('Сервер стартовал! http://localhost:3005');