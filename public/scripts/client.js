const timeDifference = require('./helper');
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
const data = [{
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
},
{
  "user": {
    "name": "Descartes",
    "avatars": "https://i.imgur.com/nlhLi3I.png",
    "handle": "@rd"
  },
  "content": {
    "text": "Je pense , donc je suis"
  },
  "created_at": 1461113959088
}
];

const renderTweets = function(tweets) {
  let $tweets = '';
  for (let tweet in tweets) {
    $tweets = $tweets + createTweetElement(tweets[tweet]);
  }
};

const createTweetElement = function(tweet) {

  const image = tweet.user.avatars;
  const name = tweet.user.name;
  const handle = tweet.user.handle;
  const content = tweet.content.text;
  const time = timeDifference(Date.now(), tweet.created_at);

  let $tweet = $(`<article class="article">
  <header class="article-header">
      <div class="article-header-profile">
          <img src="${image}" alt="" class="profile-icon">
          <span class="account-name">${name}</span>

      </div>
      <span class="account-id">${handle}</span>
  </header>
  <div class="tweet-content">
      <textarea readonly name="tweet" class="tweet">${content}</textarea>
  </div>
  <footer class="article-footer">
      <span>${time}</span>
      <div class="article-footer-icons">
          <i class="fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
      </div>
  </footer>
</article>`);
  return $tweet;
};

renderTweets(data);