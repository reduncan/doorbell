const path = require('path');

module.exports = function(app) {
    app.get('/', (req, res) => res.redirect('/face_bell'));
    app.get('/face_bell', (req, res) => res.sendFile(path.join(__dirname, '../public/html/index.html')))
}