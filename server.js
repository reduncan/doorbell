const express = require("express");
const app = express();
const path = require('path');


const PORT = process.env.PORT || 3000;

const db = require("./models");


app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


app.use(express.static(path.join(__dirname, './public')));
app.use(express.static(path.join(__dirname, './images')));
app.use(express.static(path.join(__dirname, './weights')));
app.use(express.static(path.join(__dirname, './dist')));
app.use(express.static(path.join(__dirname, './nodemailer')));


require('./routes/api-routes.js')(app);
require('./routes/html-routes.js')(app);

db.sequelize.sync({ force: true }).then(function () {
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
})

