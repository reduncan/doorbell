const express = require("express");
const app = express();
const path = require('path');
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const PORT = process.env.PORT || 3000;

const db = require("./models");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

// require('./sockets/auth-sockets')(io);
 require('./routes/api-routes.js')(app);
// require('./routes/html-routes.js')(app);

db.sequelize.sync({ force: false }).then(function() {
    server.listen(PORT, function() {
      console.log("App listening on PORT " + PORT);
    });
}).catch(function(err){
  console.log("An error occurred")
})

module.exports = app;