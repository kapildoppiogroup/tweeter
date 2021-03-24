$(document).ready(function () {
  /*
  * Client-side JS logic goes here
  * jQuery is already loaded
  * Reminder: Use (and do all your DOM work in) jQuery's document ready function
  */
  // Fake data taken from initial-tweets.json

  const tweetData = {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  };

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

  const renderTweets = function (tweets) {

    let $tweets = '';
    for (let tweet in tweets) {
      $tweets = $tweets + createTweetElement(tweets[tweet]);
    }
    return $($tweets);
  };

  const createTweetElement = function (tweet) {

    const image = tweet.user.avatars;
    const name = tweet.user.name;
    const handle = tweet.user.handle;
    const content = tweet.content.text;
    const time = timeDifference(Date.now(), tweet.created_at);

    let tweetString = `<article class="article">
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
  </article>`;
    return tweetString;
  };

  const timeDifference = function (current, previous) {

    let msPerMinute = 60 * 1000;
    let msPerHour = msPerMinute * 60;
    let msPerDay = msPerHour * 24;
    let msPerMonth = msPerDay * 30;
    let msPerYear = msPerDay * 365;

    let elapsed = current - previous;

    if (elapsed < msPerMinute) {
      return Math.round(elapsed / 1000) + ' seconds ago';
    }
    if (elapsed < msPerHour) {
      return Math.round(elapsed / msPerMinute) + ' minutes ago';
    }
    if (elapsed < msPerDay) {
      return Math.round(elapsed / msPerHour) + ' hours ago';
    }
    if (elapsed < msPerMonth) {
      return Math.round(elapsed / msPerDay) + ' days ago';
    }
    if (elapsed < msPerYear) {
      return Math.round(elapsed / msPerMonth) + ' months ago';
    }
    return Math.round(elapsed / msPerYear) + ' years ago';
  };

  //const $tweets = renderTweets(data);

  //$('#tweet-container').append($tweets);

  const $tweet = renderTweets(data);
  console.log($tweet);
  $('#tweet-container').append($tweet);

});