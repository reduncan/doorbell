const path = require('path');
const publicDir = path.join(__dirname, '../public');


module.exports = function(app) {
    app.get('/', (req, res) => res.redirect('/face_bell'));
    app.get('/face_bell', (req, res) => res.sendFile(path.join(publicDir, './html/index.html')))
}


