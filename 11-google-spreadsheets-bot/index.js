/* jshint esversion: 6 */
let Twit = require('twit');
let Tabletop = require('tabletop');


let bot = new Twit({
  consumer_key: process.env.LEARNINGBOT_CONSUMER_KEY,
  consumer_secret: process.env.LEARNINGBOT_CONSUMER_SECRET,
  access_token: process.env.LEARNINGBOT_ACCESS_TOKEN,
  access_token_secret: process.env.LEARNINGBOT_ACCESS_TOKEN_SECRET,
  timeout_ms: 60*1000
});

let spreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1OKD_n-g8JTxQVQnTeMqpQwHDDZ1R5FDlGnYz_IETLks/pubhtml';

Tabletop.init({
  key: spreadsheetUrl,
  callback: function(data, tabletop){
    console.log(data);
    data.forEach(function(d){
      let status = d.Name + ' is a great name for a Twitter bot!';
      bot.post('statuses/update', {status: status}, function(err, response, data){
        if (err){
          console.log(err);
        } else {
          console.log('Posted!');
        }
      });
    });
  },
  simpleSheet: true
});
