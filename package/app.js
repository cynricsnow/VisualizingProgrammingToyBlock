const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const data = require('./data_pb.js');
const Data = data.Data;
const fake = require('./fake.js').fake;
const bytes = require('./data1.js').bytes;

app.use(bodyParser.json({ limit: '200kb' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.status(200).send('VisualizingProgrammingToyBlock');
});

app.post('/dock', (req, res) => {
    console.log(req.body);
    const blockArray = Data.deserializeBinary(bytes).getBlockList();
    const array = [];
    for (let i = 0; i < blockArray.length; i++) {
        let type = blockArray[i].getType();
        let value = blockArray[i].getValue();
        array.push({type, value});
    }
    console.log(array);
    const inputs = [{type:'温度', value: ' ? 度'}, {type: '超声波', value: ' ? 厘米'}];
    res.setHeader('Access-Control-Allow-Origin','*');
    res.status(200).send({blocks: array, inputs});
})

app.post('/input_distance', (req, res) => {
    console.log(req.body);
    const distance = (Math.random() * 100).toFixed(2);
    res.setHeader('Access-Control-Allow-Origin','*');
    res.status(200).json(distance);
});

app.post('/input_temperature', (req, res) => {
    console.log(req.body);
    const temperature = (Math.random() * 80 - 30).toFixed(1);
    res.setHeader('Access-Control-Allow-Origin','*');
    res.status(200).json(temperature);
});

app.post('/get_data', (req, res) => {
    console.log(req.body);
    const temperature = (Math.random() * 80 - 30).toFixed(1);
    const distance = (Math.random() * 100).toFixed(2);
    res.setHeader('Access-Control-Allow-Origin','*');
    res.status(200).send([{type:'温度', value: ` ${temperature} 度`}, {type: '超声波', value: ` ${distance} 厘米`}]);
});

app.listen(8000, ()=> {
    console.log('listening on 8000');
});
