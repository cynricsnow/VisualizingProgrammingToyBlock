'use strict'
const http = require('http');
const express = require('express');

const port = 3000;

const app = express();

app.use(express.static(`${__dirname}/public`));

app.get('*', (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`);
})

const server = http.createServer(app);
server.listen(port, () => {
    console.log(`App is listening on port ${server.address().port}`);
});
