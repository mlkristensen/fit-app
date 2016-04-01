'use strict';

/**
 * Module dependencies
 */
var sportsPolicy = require('../policies/sports.server.policy'),
  sports = require('../controllers/sports.server.controller');

module.exports = function(app) {
  // Sports Routes
  app.route('/api/sports').all(sportsPolicy.isAllowed)
    .get(sports.list)
    .post(sports.create);

  // Used for activities form -> Added by MLK
  app.route('/api/sports/listsports').all()
    .get(sports.listSports);

  app.route('/api/sports/:sportId').all(sportsPolicy.isAllowed)
    .get(sports.read)
    .put(sports.update)
    .delete(sports.delete);

  // Finish by binding the Sport middleware
  app.param('sportId', sports.sportByID);
};
