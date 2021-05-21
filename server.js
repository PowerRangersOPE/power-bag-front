const
  express = require('express'),
  path = require('path'),
  serveStatic = require('serve-static'),
  history = require('connect-history-api-fallback'),
  port = process.env.PORT || 5000

const app = express()
app.use(history())
app.use(serveStatic(__dirname + '/dist/spa'))
app.get('/*', function(req,res) {
    //res.sendFile(path.join(__dirname+'/dist/spa/index.html'));
    res.sendFile(path.join(__dirname, 'dist/spa', 'index.html'));
});
app.listen(port);
