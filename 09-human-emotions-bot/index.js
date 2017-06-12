/* jshint esversion: 6 */
let Twit = require('twit');
let request = require('request');
let fs = require('fs');
let csvparse = require ('csv-parse');
let rita = require('rita');


let bot = new Twit({
  consumer_key: process.env.LEARNINGBOT_CONSUMER_KEY,
  consumer_secret: process.env.LEARNINGBOT_CONSUMER_SECRET,
  access_token: process.env.LEARNINGBOT_ACCESS_TOKEN,
  access_token_secret: process.env.LEARNINGBOT_ACCESS_TOKEN_SECRET,
  timeout_ms: 60*1000
});
