$(document).ready(function () {

  $("#tweet-text").on("focus", function (event) {
    console.log("kapil");
    $('#error-message').slideUp();
  });

  $("#form-tweet-submit").on("submit", function (event) {
    event.preventDefault();
    let tweet = $(this).serialize();
    if (validateTweet(tweet)) {
      $.post("tweets", tweet, function (data) {
        return data;
      })
        .done(function () {
          loadTweets();
          $(this).trigger("reset");
          $("#tweet-text").val("").trigger("input");
        });
    } else {
      console.log('error');
      triggerError();
    }
  });

  const triggerError = function () {
    const $errorMessage = $('#error-message');
    $errorMessage.slideDown();
    setTimeout(function () {
      $errorMessage.slideUp();
    }, 3000);
  };

  const renderTweets = function (tweets) {
    const tweetContainer = $('#tweet-container');
    tweetContainer.empty();
    for (let tweet in tweets) {
      const createdTweet = createTweetElement(tweets[tweet]);
      tweetContainer.prepend($(createdTweet));
    }
  };

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

const validateTweet = function (tweet) {
  return tweet && tweet.length > 5 && tweet.length < 140;
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