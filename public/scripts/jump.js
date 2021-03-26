$(document).ready(function () {

  let lastScrollTop = 0;

  /**
   * This function adds the jump on top button and hides
   * write tweet and arrow button when a user scrolls down
   */
  $(window).scroll(function (event) {
    let st = $(this).scrollTop();

    // hide write tweet and arrow button and show jump button
    if (st > lastScrollTop) {
      $("#jump-button").css("display", "block");
      $("#arrow").css("display", "none");
      $("#write-tweet").css("display", "none");
    } else {
      $("#jump-button").css("display", "none");
      $("#arrow").css("display", "flex");
      $("#write-tweet").css("display", "flex");
    }
  });


  /**
   * this function scrolls automatically to the top with a
   * little animation
   */
  $('#jump-button').click(function (event) {
    $('html,body').animate({ scrollTop: 0 }, 'slow');
    return false;
  });
});

