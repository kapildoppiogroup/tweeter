$(document).ready(function () {

  let lastScrollTop = 0;
  $(window).scroll(function (event) {
    let st = $(this).scrollTop();
    if (st > lastScrollTop) {
      $("#myBtn").css("display", "block");
      $("#arrow").css("display", "none");
      $("#write-tweet").css("display", "none");

    } else {
      $("#myBtn").css("display", "none");
      $("#arrow").css("display", "flex");
      $("#write-tweet").css("display", "flex");
    }
  });

  $('#myBtn').click(function (event) {
    $('html,body').animate({ scrollTop: 0 }, 'slow');
    return false;
  });



});

