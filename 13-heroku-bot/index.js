/* jshint esversion: 6 */
let Twit = require('twit');
let dateFormat = require('dateformat');

let bot = new Twit({
  consumer_key: process.env.LEARNINGBOT_CONSUMER_KEY,
  consumer_secret: process.env.LEARNINGBOT_CONSUMER_SECRET,
  access_token: process.env.LEARNINGBOT_ACCESS_TOKEN,
  access_token_secret: process.env.LEARNINGBOT_ACCESS_TOKEN_SECRET,
  timeout_ms: 60*1000
});

function littleTweet(){
  bot.post('statuses/update', {status: 'The current time is: ' + dateFormat(Date.now()-14400000, 'dddd, mmmm dS, yyyy, h:MM TT') + ' EST'}, function(err, data, response){
    if (err) {
      console.log(err);
    } else {
      console.log('Bot posted!');
    }
  });
}

setInterval(function(){
  littleTweet();
}, 24*60*60*1000);
