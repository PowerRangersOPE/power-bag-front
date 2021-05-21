const
  express = require('express'),
  serveStatic = require('serve-static'),
  history = require('connect-history-api-fallback'),
  path = require('path'),
  port = process.env.PORT || 5000

const app = express()

app.use(history())
app.use(serveStatic(path.join(__dirname, 'dist', 'spa')))
app.listen(port)
console.log('Server started ' + port);
