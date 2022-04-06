require('dotenv').config({ debug: true, override: false })
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser')
const http = require("http");
const app = express();
const port = process.env.PORT || 3000;
const routes = require('./routes');
const rfs = require("rotating-file-stream");
const path = require("path");
const fileWriter = rfs.createStream('errors.log', {
    interval: '1d', // rotate daily
    path: path.join(__dirname, 'log')
})

const allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Credentials', false);
    res.header('Access-Control-Max-Age', '86400');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    next();
};
app.use(allowCrossDomain);
// Error logger
app.use(logger('dev', {
    skip: function (req, res) { return res.statusCode < 400 },
    stream: fileWriter
}))
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use("/api/v1", routes);
app.use('/favicon.ico', (req, res) => {
    res.status(200).send();
});

app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

// error handler middleware
app.use((error, req, res) => {
    if (process.env.NODE_ENV === "dev") {
        res.status(error.status || 500).send({message: error.message || 'Internal Server Error',});
    } else {
        res.status(error.status || 500).send({message: 'Internal Server Error',});
    }
});

http.createServer(app).listen(port, () => {
    console.log('API server started on: ' + port);
});