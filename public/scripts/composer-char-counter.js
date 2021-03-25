$(document).ready(function() {
  $('#tweet-text').on('input', function() {
    let length = $(this).val().length;
    let remainingLength = 140 - length;
    let counter = $('.counter');
    counter.html(remainingLength);
    if (remainingLength < 0) {
      counter.addClass("red-counter");
    } else {
      counter.removeClass("red-counter");
    }
  });
});