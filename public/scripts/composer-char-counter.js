$(document).ready(function() {
  
  /**
   * This function calculates the number of characters
   * typed in the input text area.
   */
  $('#tweet-text').on('input', function() {
    let length = $(this).val().length;
    let remainingLength = 140 - length;
    let counter = $('.counter');
    counter.html(remainingLength);

    // Make the font red if number of characters more than 140
    if (remainingLength < 0) {
      counter.addClass("red-counter");
    } else {
      counter.removeClass("red-counter");
    }
  });
});