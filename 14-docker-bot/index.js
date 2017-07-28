/* jshint esversion: 6 */
let Twit = require('twit');
let rita = require('rita');
let midi = require('jsmidgen');
let fs = require('fs');
let path = require('path');
let child_process = require('child_process');
let ffmpegPath = require('@ffmpeg-installer/ffmpeg');
let ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath.path);

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
    if (tag.includes('nn') || tag.includes('i')){
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
  .tokenize(cleanText(tweet.text))
  .filter(isNotPunctuation)
  .join(' ');
  let taggedTweet = getPartsOfSpeech(cleanedText);
  compose(taggedTweet, track);
  fs.writeFile(midiFn, file.toBytes(), {encoding: 'binary'}, cb);
}

function convertMidiToWav(midiFn, wavFn, cb){
  let command = 'timidity --output-24bit -A120 ' + midiFn + ' -Ow -o ' + wavFn;
  child_process.exec(command, {}, function(err, stdout, stderr){
    if (err) {
      cb(err);
    } else {
      cb(null);
    }
  });
}

function createVideo(imgFn, wavFn, vidFn, cb){
  ffmpeg()
  .on('end', function(){
    cb(null);
  })
  .on('error', function(err, stdout, stderr){
    cb(err);
  })
  .input(imgFn)
  .inputFPS(1/6)
  .input(wavFn)
  .output(vidFn)
  .outputFPS(30)
  .run();
}

function createMedia(tweet, imgFn, midiFn, wavFn, vidFn, cb){
  createMidi(tweet, midiFn, function(err, result){
    if (err) {
      console.log(err);
    } else {
      convertMidiToWav(midiFn, wavFn, function(err){
        if (err){
          console.log(err);
        } else {
          console.log('Midi converted!');
          createVideo(imgFn, wavFn, vidFn, cb);
        }
      });
    }
  });
}

function deleteWav(wavFn, cb){
  let command = 'rm ' + wavFn;
  child_process.exec(command, {}, function(err, stdout, stderr){
    if(err){
      cb(err);
    } else {
      cb(null);
    }
  });
}

function postStatus(params){
  bot.post('statuses/update', params, function(err, data, response){
    if (err) {
      console.log(err);
    } else {
      console.log('Bot has posted!');
    }
  });
}

function uploadMedia(tweet, vidFn){
  bot.postMediaChunked({file_path: vidFn}, function(err, data, response){
    if (err) {
      console.log(err);
    } else {
      let stat = tweet.text.split(bot_username)
        .join(' ')
        .trim();
      let params = {
        status: '@' + tweet.user.screen_name + ' ' + stat, in_reply_to_status_id: tweet.id_str, media_ids: data.media_id_string
      };
      postStatus(params);
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
        deleteWav(wavFn, function(err){
          if (err) {
            console.log(err);
          } else {
            uploadMedia(tweet, vidFn);
          }
        });
      }
    });
  }
});
