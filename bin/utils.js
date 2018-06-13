"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var scrollTo = function scrollTo(element, to, duration, updateScroll) {
  var start = element.style.translateX,
      change = to - start,
      currentTime = 0,
      increment = 5;

  var animateScroll = function animateScroll() {
    currentTime += increment;
    var val = Math.easeInOutQuad(currentTime, start, change, duration);
    updateScroll(val);
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
  var closestValue = allSlidesScroll.reduce(function (prev, curr) {
    return Math.abs(curr - currentScroll) < Math.abs(prev - currentScroll) ? curr : prev;
  }, 1000000);

  return allSlidesScroll.indexOf(closestValue);
};

var getNextFromTouchSpeed = function getNextFromTouchSpeed(scrollTime, currentScroll, allSlidesScroll, currentSlide) {
  var closestIndex = void 0;

  if (scrollTime < 400 && currentScroll !== allSlidesScroll[currentSlide]) {
    closestIndex = currentScroll < allSlidesScroll[currentSlide] ? Math.min(allSlidesScroll.length - 1, currentSlide + 1) : Math.max(0, currentSlide - 1);
  }

  return closestIndex;
};

var setTranslation = function setTranslation(left) {
  var translate = "translateX(" + left + "px)";

  return {
    transform: translate,
    WebkitTransform: translate,
    msTransform: translate
  };
};

var setTransition = function setTransition(element, time) {
  element.style.transition = time + "ms ease-in-out";
  window.setTimeout(function () {
    return element.style.transition = "unset";
  }, time);
};

exports.scrollTo = scrollTo;
exports.getClosestSlide = getClosestSlide;
exports.getNextFromTouchSpeed = getNextFromTouchSpeed;
exports.setTranslation = setTranslation;
exports.setTransition = setTransition;