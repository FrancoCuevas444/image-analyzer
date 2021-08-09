var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var classesConfig = require('./client/src/classesConfig');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const fs = require('fs');

const STATE_FILENAME = "state_";

var app = express();
var jsonParser = bodyParser.json();

var dir = path.join(__dirname, 'imgs');

app.get('/api/list', (req, res) => {
    let imageList = [];
    fs.readdirSync(dir).forEach(file => {
        imageList.push(file);
    });

    res.send(imageList.filter(d => d.endsWith("jpg") || d.endsWith("png") || d.endsWith("jpeg")));
});

app.get('/api/state/:id', jsonParser, (req, res) => {
    const id = req.params["id"];
    const jsonFilename = `${STATE_FILENAME}${id}.json`
    fs.readFile(jsonFilename, function (err, data) {
        if (err !== null) {
            res.status(404)
            res.json(err)
            return;
        }

        res.json(JSON.parse(data));
    });
});

app.post('/api/state/:id', jsonParser, (req, res) => {
    const id = req.params["id"];
    const body = req.body;
    const jsonFilename = `${STATE_FILENAME}${id}.json`
    const csvFilename = `${STATE_FILENAME}${id}.csv`

    fs.writeFile(jsonFilename, JSON.stringify(body), (err, result) => {
        saveCSV(csvFilename, body).then(() =>
            res.json({status: "ok"})
        )
    });
});

app.use(express.static(dir));

app.listen(5000, function () {
    console.log(dir);
    console.log('Listening on http://localhost:5000/');
});

function saveCSV(filename, imagesInfo) {
    const csvData = generateCSVData(imagesInfo);
    const header = Object.keys(csvData[0]).map(key => { return {id: key, title: key} });
    const csvWriter = createCsvWriter({
        path: filename,
        header: header
    });

    return csvWriter.writeRecords(csvData);
}

function generateCSVData(imagesInfo) {
    let data = [];

    Object.entries(imagesInfo).forEach(([key, value]) => {
        let newEntry = {id: key}
        classesConfig.forEach(classConfig => {
            classConfig.options.forEach(classOption => {
                newEntry[`${classConfig.property}-${classOption}`] = value[classConfig.property] && value[classConfig.property].includes(classOption).toString();
            });
        });
        data.push(newEntry);
    })

    return data;
}