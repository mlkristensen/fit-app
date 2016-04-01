'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Sport = mongoose.model('Sport'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Sport
 */
exports.create = function(req, res) {
  var sport = new Sport(req.body);
  sport.user = req.user;

  sport.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(sport);
    }
  });
};

/**
 * Show the current Sport
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var sport = req.sport ? req.sport.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  sport.isCurrentUserOwner = req.user && sport.user && sport.user._id.toString() === req.user._id.toString() ? true : false;

  res.jsonp(sport);
};

/**
 * Update a Sport
 */
exports.update = function(req, res) {
  var sport = req.sport ;

  sport = _.extend(sport , req.body);

  sport.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(sport);
    }
  });
};

/**
 * Delete an Sport
 */
exports.delete = function(req, res) {
  var sport = req.sport ;

  sport.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(sport);
    }
  });
};

/**
 * List of Sports
 */
exports.list = function(req, res) { 
  Sport.find().sort('-created').populate('user', 'displayName').exec(function(err, sports) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(sports);
    }
  });
};

/**
 * Sport middleware
 */
exports.sportByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Sport is invalid'
    });
  }

  Sport.findById(id).populate('user', 'displayName').exec(function (err, sport) {
    if (err) {
      return next(err);
    } else if (!sport) {
      return res.status(404).send({
        message: 'No Sport with that identifier has been found'
      });
    }
    req.sport = sport;
    next();
  });
};

/**
 * List of Sports for activities -> Added by MLK
 */
exports.listSports = function(req, res) { 
  Sport.find()
  .sort('-created')
  // .populate('user', 'displayName')
  .exec(function(err, sports) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(sports);
    }
  });
};