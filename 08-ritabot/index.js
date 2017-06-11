/* jshint esversion: 6 */
let Twit = require('twit');
let request = require('request');
let fs = require('fs');
let csvparse = require ('csv-parse');
let rita = require('rita');
let inputText = 'My name is Rahul Krishnan, and I am an amazing man about whom you must want to know much. An amazing thing happened to some people yesterday, not a surprise, but still a thing that all the people must want to know more about.';

let bot = new Twit({
  consumer_key: process.env.LEARNINGBOT_CONSUMER_KEY,
  consumer_secret: process.env.LEARNINGBOT_CONSUMER_SECRET,
  access_token: process.env.LEARNINGBOT_ACCESS_TOKEN,
  access_token_secret: process.env.LEARNINGBOT_ACCESS_TOKEN_SECRET,
  timeout_ms: 60*1000
});

// Markov chain generated sentences:
// let markov = new rita.RiMarkov(3);
// markov.loadText(inputText);
// let sentence = markov.generateSentences(1);
// console.log(sentence);

// Post generated sentences to Twitter:
// let markov = new rita.RiMarkov(3);
// markov.loadText(inputText);
// let sentence = markov.generateSentences(1);
// bot.post('statuses/update', {status: sentence}, function(err, data, response) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('Status tweeted.');
//   }
// });

// Post mimic bot status based on text file:
let filePath = './sample_text.txt';

let tweetData = fs.readFile(filePath, 'utf8', function(err, data) {
  if (err) {
    console.log(err);
  } else {
    inputText = data;
    let markov = new rita.RiMarkov(3);
    markov.loadText(inputText);
    let sentence = markov.generateSentences(1);
    bot.post('statuses/update', {status: sentence}, function(err, data, response) {
      if (err) {
        console.log(err);
      } else {
        console.log('Status tweeted.');
      }
    });
  }
});

// Post mimic bot status based on personal archive:
// let filePath = './emails.csv';
//
// let tweetData = fs.createReadStream(filePath)
//   .pipe(csvparse({delimiter: ','}))
//   .on('data', function(row){
//     inputText = inputText + ' ' + cleanText(row[5]);
//   })
//   .on('end', function(){
//     let markov = new rita.RiMarkov(3);
//     markov.loadText(inputText);
//     let sentence = markov.generateSentences(1);
//     bot.post('statuses/update', {status: sentence}, function(err, data, response) {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log('Status tweeted.');
//       }
//     });
//   });
//
// function hasNoStopwords(token){
//   let stopwords = ['@', 'http', 'RT'];
//   return stopwords.every(function(sw){
//     return !token.includes(sw);
//   });
//
// }
//
// function cleanText(text){
//   return rita.RiTa.tokenize(text, ' ')
//   .filter(hasNoStopwords)
//   .join(' ')
//   .trim();
// }
