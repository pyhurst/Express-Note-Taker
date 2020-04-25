const path = require('path');
const fs = require('fs');

module.exports = function(app) {
    app.get('/api/notes', function(req, res) {
        res.sendFile(path.join(__dirname, '../public/notes.html'));
    });

    app.post('/api/notes', function(req, res) {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    });

    app.delete('/api/notes/:id', function(req, res) {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    });
}