const scrollTo = (element, to, duration) => {
  var start = element.scrollLeft,
    change = to - start,
    currentTime = 0,
    increment = 5;

  var animateScroll = function() {
    currentTime += increment;
    var val = Math.easeInOutQuad(currentTime, start, change, duration);
    element.scrollLeft = val;
    if (currentTime < duration) {
      setTimeout(animateScroll, increment);
    }
  };
  animateScroll();
};

//t = current time
//b = start value
//c = change in value
//d = duration
Math.easeInOutQuad = function(t, b, c, d) {
  t /= d / 2;
  if (t < 1) return (c / 2) * t * t + b;
  t--;
  return (-c / 2) * (t * (t - 2) - 1) + b;
};

const getClosestSlide = (allSlidesScroll, currentScroll) => {
  let closestValue = allSlidesScroll.reduce((prev, curr) => {
    return Math.abs(curr - currentScroll) < Math.abs(prev - currentScroll)
      ? curr
      : prev;
  }, -1000000);

  return allSlidesScroll.indexOf(closestValue);
};

const getNextFromTouchSpeed = (
  scrollTime,
  currentScroll,
  allSlidesScroll,
  currentSlide
) => {
  let closestIndex = currentSlide;

  if (scrollTime < 400 && currentScroll !== allSlidesScroll[currentSlide]) {
    closestIndex =
      currentScroll > allSlidesScroll[currentSlide]
        ? Math.min(allSlidesScroll.length - 1, currentSlide + 1)
        : closestIndex;

    closestIndex =
      currentScroll < allSlidesScroll[currentSlide]
        ? Math.max(0, currentSlide - 1)
        : closestIndex;
  }

  return closestIndex;
};

export { scrollTo, getClosestSlide, getNextFromTouchSpeed };
