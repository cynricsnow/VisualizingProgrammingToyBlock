const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const data = require('./data_pb.js');
const Data = data.Data;
const bytes = require('./data1.js').bytes;

app.use(bodyParser.json({ limit: '200kb' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.status(200).send('toy');
});

app.post('/dock', (req, res) => {
    const inputs = [{type:'温度', value: ' ? 度'}, {type: '超声波', value: ' ? 厘米'}];
    res.setHeader('Access-Control-Allow-Origin','*');
    res.status(200).send({bytes, inputs});
})

app.post('/input_distance', (req, res) => {
    const distance = (Math.random() * 100).toFixed(2);
    res.setHeader('Access-Control-Allow-Origin','*');
    res.status(200).json(distance);
});

app.post('/input_temperature', (req, res) => {
    const temperature = (Math.random() * 80 - 30).toFixed(1);
    res.setHeader('Access-Control-Allow-Origin','*');
    res.status(200).json(temperature);
});

app.post('/get_data', (req, res) => {
    const temperature = (Math.random() * 80 - 30).toFixed(1);
    const distance = (Math.random() * 100).toFixed(2);
    res.setHeader('Access-Control-Allow-Origin','*');
    res.status(200).send([{type:'温度', value: ` ${temperature} 度`}, {type: '超声波', value: ` ${distance} 厘米`}]);
});

app.listen(8000, ()=> {
    console.log('listening on 8000');
});
