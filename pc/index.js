'use strict'
global.ROOT = __dirname;
const http = require('http');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const serveFavicon = require('serve-favicon');
const webpack = require('webpack');
const webpackDevMidddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const env = process.env.NODE_ENV || 'development';
const port = 3000;
const app = express();
const controllers = require('./controllers');

app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '200kb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser('Visual'));
app.use(serveFavicon(`${__dirname}/public/logo.ico`));

if (env === 'development') {
    const compiler = webpack(require('./webpack.config.dev'));
    app.use(webpackDevMidddleware(compiler, {
        stats: { colors: true}
    }));
    app.use(webpackHotMiddleware(compiler));
}
app.use(express.static(`${__dirname}/public`));
app.use(controllers);
app.use((err, req, res, next) => {
    res.status(500).send(err.stack);
    console.error(err);
});

const server = http.createServer(app);
server.listen(port, () => {
    console.log(`App is listening on port ${server.address().port}`);
});
