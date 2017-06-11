/* jshint esversion: 6 */
let Twit = require('twit');
let request = require('request');
let fs = require('fs');

let bot = new Twit({
  consumer_key: process.env.LEARNINGBOT_CONSUMER_KEY,
  consumer_secret: process.env.LEARNINGBOT_CONSUMER_SECRET,
  access_token: process.env.LEARNINGBOT_ACCESS_TOKEN,
  access_token_secret: process.env.LEARNINGBOT_ACCESS_TOKEN_SECRET,
  timeout_ms: 60*1000
});

// Post a status update:
// bot.post('statuses/update', {status: 'Mambo No. 5!'}, function(err, data, response){
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
// function getBotTimeline(){
//   bot.get('statuses/home_timeline', {count: 5}, function(err, data, response) {
//     if (err) {
//       console.log(err);
//     } else {
//         data.forEach(function(d) {
//           console.log(d.text);
//           console.log(d.user.screen_name);
//           console.log(d.user.id);
//           console.log(d.id_str);
//           console.log('\n');
//         });
//     }
//   });
// }
// getBotTimeline();

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

// Basic search:
// bot.get('search/tweets', {q: 'dance ?', lang: 'en', result_type: 'recent', count: 5}, function(err, data, response){
//   if (err) {
//     console.log(err);
//   } else {
//     data.statuses.forEach(function(s){
//       console.log(s.text);
//       console.log(s.username);
//       console.log('\n');
//     });
//   }
// });

// Comprehensive search:
// let stream = bot.stream('statuses/filter', {follow: '2321215397'});
//
// stream.on('tweet', function(tweet){
//   console.log(tweet.text+'\n');
// });

// Download a photo using web api:
// function getPhoto(){
//   let parameters = {
//     url: 'https://api.nasa.gov/planetary/apod',
//     qs: {
//       api_key: process.env.NASA_KEY
//     },
//     encoding: 'binary'
//   };
//   request.get(parameters, function(err, response, body) {
//     body = JSON.parse(body);
//     saveFile(body, 'nasa.jpg');
//   });
// }

// Save to local directory:
// function saveFile(body, fileName){
//   let file = fs.createWriteStream(fileName);
//   request(body).pipe(file).on('close', function(err){
//     if (err){
//       console.log(err);
//     } else {
//       console.log('Media saved.');
//       console.log(body);
//       let descriptionText = body.title;
//       uploadMedia(descriptionText, fileName);
//     }
//   });
// }

// Upload to Twitter:
// function uploadMedia(descriptionText, fileName){
//   let filePath = __dirname + '/' + fileName;
//   bot.postMediaChunked({file_path: filePath}, function(err, data, response){
//     if (err){
//       console.log(err);
//     } else {
//       console.log(data);
//       let params = {
//         status: descriptionText,
//         media_ids: data.media_id_string
//       };
//       postStatus(params);
//     }
//   });
// }
//
// function postStatus(params){
//   bot.post('statuses/update', params, function(err, data, response){
//     if (err) {
//       console.log(err);
//     } else {
//       console.log('Status posted.');
//     }
//   });
// }

// getPhoto();

// Upload Videos:
// uploadMedia('Video from NASA', 'nasa_video.mp4');
