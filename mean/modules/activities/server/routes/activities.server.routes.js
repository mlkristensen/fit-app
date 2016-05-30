'use strict';

/**
 * Module dependencies
 */
var activitiesPolicy = require('../policies/activities.server.policy'),
  activities = require('../controllers/activities.server.controller');

module.exports = function(app) {
  // Activities Routes
  app.route('/api/activities').all(activitiesPolicy.isAllowed)
    .get(activities.listByID)
    .post(activities.create);

  /* Used for counting activities -> Added by MLK
  * Get the function actCount
  * From activities.server.controller
  */
  app.route('/api/activities/actCount').all()
    .get(activities.actCount);


  app.route('/api/activities/:activityId').all(activitiesPolicy.isAllowed)
    .get(activities.read)
    .put(activities.update)
    .delete(activities.delete);

  // Finish by binding the Activity middleware
  app.param('activityId', activities.activityByID);
};
