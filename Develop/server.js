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

//routes to index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

//routes to notes html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

//reads and returns all saved notes as JSON
app.get('/api/notes', function (req, res) {
    fs.readFile('./db/db.json', 'utf8', function (err, data) {
        res.json(JSON.parse(data));
    })
});

//receives new note and saves the reqeust body and adds it to the db.json file & returns new note to client with unique id as well
app.post('/api/notes', function (req, res) {
    const note = { ...req.body, id: uuidv4() };
    console.log(note)
    dbJSON.push(note);
    fs.writeFile(path.join(__dirname, './db/db.json'), JSON.stringify(dbJSON, null, 2), (err) => {
        if (err) {
            return res.json({ error: "Error writing to file" });
        }
        return res.json(note);
    });
});

//starts server to begin listening
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
