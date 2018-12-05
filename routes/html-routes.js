const path = require('path');
const viewsDir = path.join(__dirname, '../views');

module.exports = function(app) {
    app.get('/', (req, res) => res.redirect('/face_bell'));
    app.get('/face_bell2', (req, res) => res.sendFile(path.join(viewsDir, 'facebell.html')))
    app.get('/face_bell', (req, res) => res.sendFile(path.join(__dirname, '../public/html/index.html')))

}
