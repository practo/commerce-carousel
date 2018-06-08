"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var scrollTo = function scrollTo(element, to, duration) {
  var start = element.scrollLeft,
      change = to - start,
      currentTime = 0,
      increment = 5;

  var animateScroll = function animateScroll() {
    console.log("animate");
    currentTime += increment;
    var val = Math.easeInOutQuad(currentTime, start, change, duration);
    element.scrollLeft = val;
    if (currentTime < duration) {
      setTimeout(animateScroll, increment);
    }
  };
  animateScroll();
};

Math.easeInOutQuad = function (t, b, c, d) {
  t /= d / 2;
  if (t < 1) return c / 2 * t * t + b;
  t--;
  return -c / 2 * (t * (t - 2) - 1) + b;
};

var getClosestSlide = function getClosestSlide(allSlidesScroll, currentScroll) {
  console.log("here");
  var closestValue = allSlidesScroll.reduce(function (prev, curr) {
    return Math.abs(curr - currentScroll) < Math.abs(prev - currentScroll) ? curr : prev;
  }, -1000000);

  console.log(allSlidesScroll);
  console.log(currentScroll);
  console.log(closestValue);

  return allSlidesScroll.indexOf(closestValue);
};

var getNextFromTouchSpeed = function getNextFromTouchSpeed(scrollTime, currentScroll, allSlidesScroll, currentSlide) {
  var closestIndex = currentSlide;

  if (scrollTime < 400 && currentScroll !== allSlidesScroll[currentSlide]) {
    closestIndex = currentScroll >= allSlidesScroll[currentSlide] ? Math.min(allSlidesScroll.length - 1, currentSlide + 1) : Math.max(0, currentSlide - 1);
  }

  return closestIndex;
};

exports.scrollTo = scrollTo;
exports.getClosestSlide = getClosestSlide;
exports.getNextFromTouchSpeed = getNextFromTouchSpeed;