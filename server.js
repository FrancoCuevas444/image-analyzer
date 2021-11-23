var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var classesConfig = require('./client/src/classesConfig');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const fs = require('fs');
const glob = require('glob');

const STATE_FILENAME = "state";

var app = express();
var jsonParser = bodyParser.json();

var dir = path.join(__dirname, 'imgs');
let fileList = glob.sync("*/*.@(png|jpg|jpeg|json)", {cwd: dir});
let imageList = fileList.filter(d => d.endsWith("jpg") || d.endsWith("png") || d.endsWith("jpeg"));

app.get('/api/list/folders', (req, res) => {
    let folderList = glob.sync("*/*.@(png|jpg|jpeg|json)", {cwd: dir});
    res.send(folderList);
});

app.get('/api/stats', (req, res) => {
    let state = loadStateFile();
    res.send({
        total: fileList.length,
        seen: Object.keys(state).length,
        categories: {
            useful_yes: Object.values(state).filter(v => v.useful === "yes").length,
            useful_no: Object.values(state).filter(v => v.useful === "no").length,
            useful_maybe: Object.values(state).filter(v => v.useful === "maybe").length
        }
    });
});

app.get('/api/files/:index', jsonParser, (req, res) => {const index = req.params["index"];
    if (index > (imageList.length - 1)) {
        res.status(404);
        res.json({status: "error"});
    }

    const imageFilename = imageList[index];
    let imageState = loadStateFile()[imageFilename];
    if (!imageState) imageState = generateEmptyStateEntry();

    res.json({filename: imageFilename, state: imageState, metadata: getMetadata(imageFilename)});
});

app.put('/api/state', jsonParser, (req, res) => {
    const body = req.body;
    const filename = req.query.filename;
    const jsonStateFilename = `${STATE_FILENAME}.json`
    const csvStateFilename = `${STATE_FILENAME}.csv`

    let stateData = loadStateFile();
    stateData[filename] = body;

    fs.writeFile(jsonStateFilename, JSON.stringify(stateData), (err, result) => {
        saveCSV(csvStateFilename, stateData).then(() =>
            res.json({status: "ok"})
        )
    });
});

app.use(express.static(dir));

app.listen(5000, function () {
    console.log(dir);
    console.log('Listening on http://localhost:5000/');
});

function loadStateFile() {
    const jsonStateFilename = `${STATE_FILENAME}.json`;

    let stateData = {};
    if (fs.existsSync(jsonStateFilename)) {
        stateData = JSON.parse(fs.readFileSync(jsonStateFilename));
    }

    return stateData;
}

function generateEmptyStateEntry() {
    let stateEntry = {
        selected_parts: [],
    }
    classesConfig.forEach(classConfig => {
        stateEntry[classConfig.property] = classConfig.isMultiSelect ? [] :  "";
    });
    return stateEntry;
}

function getMetadata(imageFilename) {
    const folder = imageFilename.split("/")[0];
    const metadataJsonFilename = path.join(dir, `${folder}/metadata.json`);

    let metadata = {};
    if (fs.existsSync(metadataJsonFilename)) {
        metadata = JSON.parse(fs.readFileSync(metadataJsonFilename));
    }

    return metadata;
}

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

        newEntry["selected_parts"] = value.selected_parts;

        data.push(newEntry);
    })

    return data;
}