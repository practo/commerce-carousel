const scrollTo = (element, to, duration, updateScroll) => {
  var start = element.style.translateX,
    change = to - start,
    currentTime = 0,
    increment = 5;

  var animateScroll = function() {
    currentTime += increment;
    var val = Math.easeInOutQuad(currentTime, start, change, duration);
    updateScroll(val);
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
  }, 1000000);

  return allSlidesScroll.indexOf(closestValue);
};

const getNextFromTouchSpeed = (
  scrollTime,
  currentScroll,
  allSlidesScroll,
  currentSlide
) => {
  let closestIndex;

  if (
    scrollTime < 400 &&
    Math.abs(currentScroll - allSlidesScroll[currentSlide]) > 20
  ) {
    closestIndex =
      currentScroll < allSlidesScroll[currentSlide]
        ? Math.min(allSlidesScroll.length - 1, currentSlide + 1)
        : Math.max(0, currentSlide - 1);
  }

  return closestIndex;
};

const setTranslation = left => {
  const translate = `translateX(${left}px)`;

  return {
    transform: translate,
    WebkitTransform: translate,
    msTransform: translate
  };
};

const setTransition = (element, time) => {
  element.style.transition = `${time}ms ease-in-out`;
  window.setTimeout(() => (element.style.transition = "unset"), time);
};

export {
  scrollTo,
  getClosestSlide,
  getNextFromTouchSpeed,
  setTranslation,
  setTransition
};
