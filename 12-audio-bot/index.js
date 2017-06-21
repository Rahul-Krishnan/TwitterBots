/* jshint esversion: 6 */
let Twit = require('twit');
let rita = require('rita');
let midi = require('jsmidgen');
let fs = require('fs');
let path = require('path');
let child_process = require('child_process');
let ffmpegPath = require('@ffmpeg-installer/ffmpeg');
let ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);

let bot = new Twit({
  consumer_key: process.env.LEARNINGBOT_CONSUMER_KEY,
  consumer_secret: process.env.LEARNINGBOT_CONSUMER_SECRET,
  access_token: process.env.LEARNINGBOT_ACCESS_TOKEN,
  access_token_secret: process.env.LEARNINGBOT_ACCESS_TOKEN_SECRET,
  timeout_ms: 60*1000
});

let bot_username = '@rahul_dev_acct';

let imgFn = path.join(process.cwd(), 'black.jpg');
let midiFn = path.join(process.cwd(), 'output.mid');
let wavFn = path.join(process.cwd(), 'output.wav');
let vidFn = path.join(process.cwd(), 'output.mp4');

function hasNoStopwords(token){
  let stopwords = ['@', 'RT', 'http'];
  return stopwords.every(function(sw){
    return !token.includes(sw);
  });
}

function isNotPunctuation(token){
  return !rita.RiTa.isPunctuation(token);
}

function cleanText(text){
  return text.split(' ')
    .filter(hasNoStopwords)
    .join(' ')
    .trim();
}

function getPartsOfSpeech(text){
  return rita.RiTa.getPosTags(text);
}

function compose(taggedTweet, track){
  let notes = taggedTweet.map(function(tag){
    if (tag.includes('nn') || tag.includes('i'){
      return 'e4';
    }
    if (tag.includes('vb')){
      return 'g4';
    }
    return 'c4';
  });
  notes.forEach(function(note){
    track.addNote(0, note, 128);
  });
  return track;
}



function createMidi(tweet, midiFn, cb){
  let file = new midi.File();
  let track = new midi.Track();
  file.addTrack(track);
  let cleanedText = rita.RiTa
  .tokenize(cleanText(tweet.text));
}

function createMedia(tweet, imgFn, midiFn, wavFn, vidFn, cb){
  createMidi(tweet, midiFn, function(err, result){
    if (err) {
      console.log(err);
    } else {
      // convert midi
    }
  });
}

let stream = bot.stream('statuses/filter', {track: bot_username});

stream.on('connecting', function(response){
  console.log('connecting...');
});

stream.on('connected', function(response){
  console.log('connected!');
});

stream.on('error', function(err){
  console.log(err);
});

stream.on('tweet', function(tweet){
  if (tweet.text.length > 0){
    createMedia(tweet, imgFn, midiFn, wavFn, vidFn, function(err){
      if (err) {
        console.log(err);
      } else {
        console.log('Media created!');
      }
    });
  }
});
