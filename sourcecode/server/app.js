const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const routes = require('./routes.js');
const _ = require('lodash');
const webPush = require('web-push');


// const vapidKeys = webPush.generateVAPIDKeys();
// console.log(vapidKeys);
var app = express();

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
};

// app.use(logger('dev'));
// app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(allowCrossDomain);
var publicDir = path.join(__dirname, '/uploads/images');
app.use(express.static(publicDir));
routes(app);
require('./logs/winston-logging')();
module.exports = app;
