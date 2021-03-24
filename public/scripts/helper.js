const timeDifference = function(current, previous) {

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

module.exports = {timeDifference};

console.log(timeDifference(Date.now(), 1616617825085));