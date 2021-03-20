//dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');
const dbJSON = require("./db/db.json");

//uuid package installed for unique id for each note
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

//sets up express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./public'));

//routes to notes html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/notes.html'));
});

//routes to index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get('/api/notes', function (req, res) {
    fs.readFile('./db/db.json', 'utf8', function (err, data) {
        res.json(JSON.parser(data));
    })
});
// app.post('/api/notes', function (req, res) {
//     const note = { ...req.body, id: uuidv4() };
//     dbJSON.push(note)
//     fs.writeFile();
// });

//starts server to begin listening
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));