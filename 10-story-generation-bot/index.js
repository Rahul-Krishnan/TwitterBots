/* jshint esversion: 6 */
let Twit = require('twit');
let tracery = require('tracery-grammar');

let bot = new Twit({
  consumer_key: process.env.LEARNINGBOT_CONSUMER_KEY,
  consumer_secret: process.env.LEARNINGBOT_CONSUMER_SECRET,
  access_token: process.env.LEARNINGBOT_ACCESS_TOKEN,
  access_token_secret: process.env.LEARNINGBOT_ACCESS_TOKEN_SECRET,
  timeout_ms: 60*1000
});

let grammar = tracery.createGrammar({
  'character': ['K', 't'],
});
