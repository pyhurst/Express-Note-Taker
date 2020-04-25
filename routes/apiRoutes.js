const fs = require('fs');

module.exports = function(app) {
    app.get('/api/notes', function(req, res) {
        read(res);
    });

    app.post('/api/notes', function(req, res) {
        addNote(req);
        read(res);
    });

    app.delete('/api/notes/:id', function(req, res) {
        deleteNote(req);
        read(res);
    });
}

function read(res) {
        fs.readFile('./db/db.json', 'utf8', function(err, data) {
        if (err) throw err;

        const dataJSON = JSON.parse(data);

        res.json(dataJSON);
    })
}

function addNote(req) {
        fs.readFile('./db/db.json', 'utf8', function(err, data) {
            if (err) throw err;

            const dataJSON = JSON.parse(data);

            req.body.id = Math.random();

            const newNotes = [...dataJSON, req.body];

            writeDb(newNotes);
        });
}

function writeDb(newNotes) {
    fs.writeFile('./db/db.json', JSON.stringify(newNotes, null, 2), function(err) {
        if (err) throw err;
    });
}

function deleteNote(req) {
    fs.readFile('./db/db.json', 'utf8', function(err, data) {
        if (err) throw err;

        const dataJSON = JSON.parse(data);
        const newArray = [];

        dataJSON.map(obj => {
            if (obj.id != req.params.id) {
                newArray.push(obj);
            }; 
        });

        writeDb(newArray);
    });
}