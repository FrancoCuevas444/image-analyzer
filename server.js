var path = require('path');
var express = require('express');
const fs = require('fs');

var app = express();

var dir = path.join(__dirname, 'imgs');

app.get('/api/list', (req, res) => {
    let imageList = [];
    fs.readdirSync(dir).forEach(file => {
        imageList.push(file);
    });

    res.send(imageList);
})

app.use(express.static(dir));

app.listen(5000, function () {
    console.log(dir);
    console.log('Listening on http://localhost:5000/');
});