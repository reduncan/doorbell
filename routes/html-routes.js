const path = require('path');
<<<<<<< HEAD
const publicDir = path.join(__dirname, '../public');
const viewsDir = path.join(__dirname, '../views');


module.exports = function(app) {
    app.get('/', (req, res) => res.redirect('/face_bell'));
    app.get('/face_bell2', (req, res) => res.sendFile(path.join(viewsDir, 'facebell.html')))
    app.get('/face_bell3', (req, res) => res.sendFile(path.join(publicDir, './html/home.html')))
    app.get('/face_bell', (req, res) => res.sendFile(path.join(__dirname, '../public/html/index.html')))

}
=======

module.exports = function(app) {
    app.get('/', (req, res) => res.redirect('/face_bell'));
    app.get('/face_bell', (req, res) => res.sendFile(path.join(__dirname, '../public/html/index.html')))
}
>>>>>>> 7e5687a619ea521d6fba218330fe818de9e986cc
