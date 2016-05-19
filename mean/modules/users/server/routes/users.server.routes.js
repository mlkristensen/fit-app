'use strict';

module.exports = function (app) {
  // User Routes
  var users = require('../controllers/users.server.controller');

  // Setting up the users profile api
  app.route('/api/users/me').get(users.me);
  app.route('/api/users').put(users.update);
  app.route('/api/users/accounts').delete(users.removeOAuthProvider);
  app.route('/api/users/password').post(users.changePassword);
  app.route('/api/users/picture').post(users.changeProfilePicture);

  /* Used for counting users -> Added by MLK
  * Get the function usrCount
  * From users.profile.server.controller
  */
  app.route('/api/users/usrCount').all()
    .get(users.usrCount);


  // Finish by binding the user middleware
  app.param('userId', users.userByID);
};
