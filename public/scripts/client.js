$(document).ready(function () {

  /**
   * This is a toggle button click functionality to hide and unhide
   * the compose tweet form
   */
  $("#arrow").on("click", function (event) {
    const $newTweet = $("#new-tweet");
    if ($newTweet.is(":hidden")) {
      $newTweet.slideDown();
      $("#tweet-text").focus();
    } else {
      $newTweet.slideUp();
    }
  });

  /**
   * Slide up animation for the error message
   */
  $("#tweet-text").on("focus", function (event) {
    $('#error-message').slideUp();
  });

  /**
   * This function is to submit a new tweet
   */
  $("#form-tweet-submit").on("submit", function (event) {
    event.preventDefault();
    let tweet = $(this).serialize();

    // validate tweet before saving it to the database
    if (validateTweet(tweet)) {

      // ajax call to post tweet
      $.post("tweets", tweet, function (data) {
        return data;
      })
        .done(function () {

          //load all the tweets if successfully posted the tweet
          loadTweets();
          $(this).trigger("reset");
          $("#tweet-text").val("").trigger("input");
        });
    } else {
      triggerError();
    }
  });

  /**
   * Trigger error functionality
   */
  const triggerError = function () {
    const $errorMessage = $('#error-message');

    //animate error box
    $errorMessage.slideDown();

    //show error only for 3 seconds
    setTimeout(function () {
      $errorMessage.slideUp();
    }, 3000);
  };

  /**
   * This function is to render all the tweets in the tweet container
   * HTML object. Here we are prepending the tweets to show the newly
   * posted tweet on top.
   *
   * @param {*} tweets
   */
  const renderTweets = function (tweets) {
    const tweetContainer = $('#tweet-container');
    tweetContainer.empty();
    for (let tweet in tweets) {
      const createdTweet = createTweetElement(tweets[tweet]);
      tweetContainer.prepend($(createdTweet));
    }
  };

  /**
   * call get ajax to get all the tweets from database and render
   * them
   */
  const loadTweets = function () {
    $.get("tweets", function (data) {
      return data;
    })
      .done(function (data) {
        renderTweets(data);
      });
  };
  loadTweets();
});

/**
 * Validate the length of the tweet
 * @param {*} tweet
 * @returns boolean
 */
const validateTweet = function (tweet) {
  console.log(tweet.length);
  console.log(tweet);
  return tweet && tweet.length > 5 && tweet.length <= 145;
};

/**
 * To create the html element for all the tweets
 * 
 * @param {*} tweet
 * @returns
 */
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
          <i class="fas fa-flag" id = "fa-flag"></i>
          <i class="fas fa-retweet" id = "fa-retweet"></i>
          <i class="fas fa-heart" id = "fa-heart"></i>
      </div>
  </footer>
</article>`;
  return tweetString;
};

/**
 * To calculate the relative time of a tweet
 *
 * @param {*} current
 * @param {*} previous
 * @return {*} relative time. e.g. 2 days ago, 5 minutes ago
 */
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