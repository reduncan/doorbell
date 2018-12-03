const db = require('../models');
module.exports = function(app) {

  app.get('/api/visitors', function(req, res) {
    db.Visitor.findAll({}).then(function(dbVisitors) {
        console.log("get visitor");
        res.json(dbVisitors);
    });
  });

  app.get('/api/owner', function(req, res) {
    db.Owner.findAll({}).then(function(dbOwner) {
        console.log("get owner");
      res.json(dbOwner);
    });
  });
};