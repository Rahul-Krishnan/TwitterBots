/* jshint esversion: 6 */
let Twit = require('twit');

let bot = new Twit({
  consumer_key: process.env.LEARNINGBOT_CONSUMER_KEY,
  consumer_secret: process.env.LEARNINGBOT_CONSUMER_SECRET,
  access_token: process.env.LEARNINGBOT_ACCESS_TOKEN,
  access_token_secret: process.env.LEARNINGBOT_ACCESS_TOKEN_SECRET,
  timeout_ms: 60*1000
});

// Post a status update:
// bot.post('statuses/update', {status: 'Who\'s afraid of the big bad wolf?'}, function(err, data, response){
//   if (err){
//     console.log(err);
//   } else {
//     console.log(data.text + ' was tweeted.');
//   }
// });

// Get followers' screen names:
// bot.get('followers/list', {screen_name: 'Rahul_Dev_Acct'}, function(err, data, response){
//   if (err) {
//     console.log(err);
//   } else {
//     data.users.forEach(function(user) {
//       console.log(user.screen_name);
//     });
//   }
// });

// Follow a user:
// bot.post('friendships/create', {screen_name: 'theanswerismud'}, function(err, data, response){
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(data);
//   }
// });

// Get list of accounts bot is following:
// bot.get('friends/list', {screen_name: 'Rahul_Dev_Acct'}, function(err, data, response){
//   if (err){
//     console.log(err);
//   } else {
//     data.users.forEach(function(user) {
//       console.log(user.screen_name);
//     });
//   }
// });

// Check if bot is following/being followed by a user:
// bot.get('friendships/lookup', {screen_name: 'theanswerismud'}, function(err, data, response){
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(data);
//   }
// });

// Send a DM to a user:
// bot.post('direct_messages/new', {screen_name: 'theanswerismud', text: 'Hello Rahul! This is Robot Rahul!'}, function(err, data, response){
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(data);
//   }
// });

// Get user timeline:
function getBotTimeline(){
  bot.get('statuses/home_timeline', {count: 5}, function(err, data, response) {
    if (err) {
      console.log(err);
    } else {
        data.forEach(function(d) {
          console.log(d.text);
          console.log(d.user.screen_name);
          console.log(d.id_str);
          console.log('\n');
        });
    }
  });
}

// Retweet a post:
// bot.post('statuses/retweet/:id', {id: '863823190358978560'}, function(err, data, response) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(data.text + ' was retweeted.');
//   }
// });

// Favorite a post:
// bot.post('favorites/create', {id: '863823190358978560'}, function(err, data, response) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(data.text + ' was favorited.');
//     }
// });
//

// Unfavorite a post:
// bot.post('favorites/destroy', {id: '863823190358978560'}, function(err, data, response) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(data.text + ' was unfavorited.');
//     }
// });

// Reply to a post:
// bot.post('statuses/update', {status: '@theanswerismud well hello', in_reply_to_status_id: '863823190358978560'}, function(err, data, response) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(data);
//   }
// });

// Delete a post:
// bot.post('statuses/destroy/:id', {id: '872633361445113860'}, function(err, data, response) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(data);
//   }
// });
