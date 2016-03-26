'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Activity Schema
 */
var ActivitySchema = new Schema({
  title: {
    type: String,
    default: '',
    required: 'Please fill Activity title',
    trim: true
  },
  date: {
    type: Date,
    required: 'Which day did you workout',
    default: Date.now
  },
  duration: [{
    hours: Number,
    minutes: Number,
    secounds: Number
  }],
  distance: [{
    km: Number,
    m: Number
  }],
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  sport: {
    type: String,
    default: '',
    trim: true
  }
});

mongoose.model('Activity', ActivitySchema);
