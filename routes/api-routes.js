const db = require('../models');
module.exports = function(app) {

  app.get('/api/visitors', function(req, res) {
    db.visitor.findAll({}).then(function(dbVisitors) {
      res.json(dbVisitor);
    });
  });
};