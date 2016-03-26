'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Sport = mongoose.model('Sport'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, sport;

/**
 * Sport routes tests
 */
describe('Sport CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new Sport
    user.save(function () {
      sport = {
        name: 'Sport name'
      };

      done();
    });
  });

  it('should be able to save a Sport if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Sport
        agent.post('/api/sports')
          .send(sport)
          .expect(200)
          .end(function (sportSaveErr, sportSaveRes) {
            // Handle Sport save error
            if (sportSaveErr) {
              return done(sportSaveErr);
            }

            // Get a list of Sports
            agent.get('/api/sports')
              .end(function (sportsGetErr, sportsGetRes) {
                // Handle Sport save error
                if (sportsGetErr) {
                  return done(sportsGetErr);
                }

                // Get Sports list
                //var sports = sportsGetRes.body;

                // Set assertions
                //(sports[0].user._id).should.equal(userId);
                //(sports[0].name).should.match('Sport name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Sport if not logged in', function (done) {
    agent.post('/api/sports')
      .send(sport)
      .expect(403)
      .end(function (sportSaveErr, sportSaveRes) {
        // Call the assertion callback
        done(sportSaveErr);
      });
  });

  it('should not be able to save an Sport if no name is provided', function (done) {
    // Invalidate name field
    sport.name = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Sport
        agent.post('/api/sports')
          .send(sport)
          .expect(400)
          .end(function (sportSaveErr, sportSaveRes) {
            // Set message assertion
            (sportSaveRes.body.message).should.match('Please fill Sport name');

            // Handle Sport save error
            done(sportSaveErr);
          });
      });
  });

  it('should be able to update an Sport if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Sport
        agent.post('/api/sports')
          .send(sport)
          .expect(200)
          .end(function (sportSaveErr, sportSaveRes) {
            // Handle Sport save error
            if (sportSaveErr) {
              return done(sportSaveErr);
            }

            // Update Sport name
            sport.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Sport
            agent.put('/api/sports/' + sportSaveRes.body._id)
              .send(sport)
              .expect(200)
              .end(function (sportUpdateErr, sportUpdateRes) {
                // Handle Sport update error
                if (sportUpdateErr) {
                  return done(sportUpdateErr);
                }

                // Set assertions
                (sportUpdateRes.body._id).should.equal(sportSaveRes.body._id);
                (sportUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Sports if not signed in', function (done) {
    // Create new Sport model instance
    var sportObj = new Sport(sport);

    // Save the sport
    sportObj.save(function () {
      // Request Sports
      request(app).get('/api/sports')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Sport if not signed in', function (done) {
    // Create new Sport model instance
    var sportObj = new Sport(sport);

    // Save the Sport
    sportObj.save(function () {
      request(app).get('/api/sports/' + sportObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', sport.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Sport with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/sports/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Sport is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Sport which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Sport
    request(app).get('/api/sports/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Sport with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Sport if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Sport
        agent.post('/api/sports')
          .send(sport)
          .expect(200)
          .end(function (sportSaveErr, sportSaveRes) {
            // Handle Sport save error
            if (sportSaveErr) {
              return done(sportSaveErr);
            }

            // Delete an existing Sport
            agent.delete('/api/sports/' + sportSaveRes.body._id)
              .send(sport)
              .expect(200)
              .end(function (sportDeleteErr, sportDeleteRes) {
                // Handle sport error error
                if (sportDeleteErr) {
                  return done(sportDeleteErr);
                }

                // Set assertions
                (sportDeleteRes.body._id).should.equal(sportSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Sport if not signed in', function (done) {
    // Set Sport user
    sport.user = user;

    // Create new Sport model instance
    var sportObj = new Sport(sport);

    // Save the Sport
    sportObj.save(function () {
      // Try deleting Sport
      request(app).delete('/api/sports/' + sportObj._id)
        .expect(403)
        .end(function (sportDeleteErr, sportDeleteRes) {
          // Set message assertion
          (sportDeleteRes.body.message).should.match('User is not authorized');

          // Handle Sport error error
          done(sportDeleteErr);
        });

    });
  });

  it('should be able to get a single Sport that has an orphaned user reference', function (done) {
    // Create orphan user creds
    var _creds = {
      username: 'orphan',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create orphan user
    var _orphan = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'orphan@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local'
    });

    _orphan.save(function (err, orphan) {
      // Handle save error
      if (err) {
        return done(err);
      }

      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var orphanId = orphan._id;

          // Save a new Sport
          agent.post('/api/sports')
            .send(sport)
            .expect(200)
            .end(function (sportSaveErr, sportSaveRes) {
              // Handle Sport save error
              if (sportSaveErr) {
                return done(sportSaveErr);
              }

              // Set assertions on new Sport
              (sportSaveRes.body.name).should.equal(sport.name);
              should.exist(sportSaveRes.body.user);
              should.equal(sportSaveRes.body.user._id, orphanId);

              // force the Sport to have an orphaned user reference
              orphan.remove(function () {
                // now signin with valid user
                agent.post('/api/auth/signin')
                  .send(credentials)
                  .expect(200)
                  .end(function (err, res) {
                    // Handle signin error
                    if (err) {
                      return done(err);
                    }

                    // Get the Sport
                    agent.get('/api/sports/' + sportSaveRes.body._id)
                      .expect(200)
                      .end(function (sportInfoErr, sportInfoRes) {
                        // Handle Sport error
                        if (sportInfoErr) {
                          return done(sportInfoErr);
                        }

                        // Set assertions
                        (sportInfoRes.body._id).should.equal(sportSaveRes.body._id);
                        (sportInfoRes.body.name).should.equal(sport.name);
                        should.equal(sportInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Sport.remove().exec(done);
    });
  });
});
