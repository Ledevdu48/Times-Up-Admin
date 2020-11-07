var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = module.exports = express();
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '../client/dist/')));
app.get('*', (req, res) => {
    return res.sendFile(path.join(__dirname, '../client/dist/index.html'))
})
var http = require('http');
var server = http.createServer(app);
server.listen(3001);