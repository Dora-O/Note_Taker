//dependencies
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

//sets up express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./public'));

//routes to notes html
app.get('/notes', (req, res) =>{
    res.sendFile(path.join(__dirname + '/public/notes.html'));
});

//routes to index.html
app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

//starts server to begin listening
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));