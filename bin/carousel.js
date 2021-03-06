"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _slider = require("./slider");

var _slider2 = _interopRequireDefault(_slider);

var _button = require("./button");

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Carousel = function (_React$Component) {
  _inherits(Carousel, _React$Component);

  function Carousel(props) {
    _classCallCheck(this, Carousel);

    var _this = _possibleConstructorReturn(this, (Carousel.__proto__ || Object.getPrototypeOf(Carousel)).call(this, props));

    _this.state = {
      margin: typeof props.margin !== "undefined" ? props.margin : 10,
      leftSpace: typeof props.leftSpace !== "undefined" ? props.margin : 10,
      limit: 50,
      currentSlide: 0,
      containerLength: undefined,
      disableTouchScroll: { x: 0, y: 0 },
      allSlidesScroll: [],
      startTime: 0,
      startX: 0,
      left: 0,
      isTouchActive: false,
      isPrevActive: false,
      isNextActive: false
    };
    _this.slides = [];
    _this.setup = _this.setup.bind(_this);
    _this.updateScroll = _this.updateScroll.bind(_this);
    _this.onTouchEnd = _this.onTouchEnd.bind(_this);
    _this.onTouchMove = _this.onTouchMove.bind(_this);
    _this.onTouchStart = _this.onTouchStart.bind(_this);
    _this.onTouchCancel = _this.onTouchCancel.bind(_this);
    _this.onNextClick = _this.onNextClick.bind(_this);
    _this.onPrevClick = _this.onPrevClick.bind(_this);
    _this.calculateNextSlide = _this.calculateNextSlide.bind(_this);
    _this.updateCurrentSlide = _this.updateCurrentSlide.bind(_this);
    _this.checkActiveButtons = _this.checkActiveButtons.bind(_this);
    _this.onWindowResize = _this.onWindowResize.bind(_this);
    return _this;
  }

  _createClass(Carousel, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.setup();
      window.addEventListener("resize", this.onWindowResize);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      var _this2 = this;

      if (typeof prevProps.activeSlide !== "undefined" && prevState.currentSlide !== this.props.activeSlide && prevProps.activeSlide !== this.props.activeSlide) {
        this.updateCurrentSlide(this.props.activeSlide, true);
      }

      if (!prevProps.disableTouch && this.props.disableTouch) {
        this.slides.forEach(function (slide) {
          return slide.scrollTo(_this2.props.disableTouchPoint.x, _this2.props.disableTouchPoint.y);
        });
      }
    }
  }, {
    key: "onWindowResize",
    value: function onWindowResize() {
      this.setup();
    }
  }, {
    key: "setup",
    value: function setup() {
      var _this3 = this;

      var containerWidth = this.container.getBoundingClientRect().width;
      var slideWidth = this.slides[0].getBoundingClientRect().width;

      if (this.props["full-width"]) {
        slideWidth = containerWidth;
      }

      var containerLength = this.slides.length * (slideWidth + this.state.margin) - this.state.margin;

      var allSlidesScroll = this.slides.map(function (slide, index) {
        if (index === 0) return 0;

        var scrollValue = Math.min(slideWidth * index + _this3.state.margin * (index - 1) - _this3.state.leftSpace, containerLength - containerWidth);

        return scrollValue * -1;
      });

      this.setState({
        containerLength: containerLength,
        slideWidth: slideWidth,
        allSlidesScroll: allSlidesScroll
      }, function () {
        return _this3.updateCurrentSlide(_this3.props.activeSlide || 0);
      });
    }
  }, {
    key: "updateScroll",
    value: function updateScroll(left) {
      this.setState({
        left: left
      });
    }
  }, {
    key: "onTouchStart",
    value: function onTouchStart(e) {
      if (this.props.disableTouch || e.touches.length > 1) return;
      this.setState({
        startTime: +new Date(),
        isTouchActive: true,
        startX: e.touches[0].clientX
      });
    }
  }, {
    key: "onTouchMove",
    value: function onTouchMove(e) {
      if (this.props.disableTouch || e.touches.length > 1) return;
      var left = this.state.left + e.touches[0].clientX - this.state.startX;
      left = Math.min(left, this.state.limit);
      left = Math.max(left, this.container.getBoundingClientRect().width - this.state.containerLength - this.state.limit);

      this.setState({
        left: left,
        startX: e.touches[0].clientX
      });
    }
  }, {
    key: "onTouchEnd",
    value: function onTouchEnd(e) {
      if (this.props.disableTouch || e.touches.length > 1) return;
      this.setState({
        isTouchActive: false
      });
      this.calculateNextSlide();
    }
  }, {
    key: "onTouchCancel",
    value: function onTouchCancel() {
      this.setState({
        isTouchActive: false
      });
      this.calculateNextSlide();
    }
  }, {
    key: "onPrevClick",
    value: function onPrevClick() {
      var nextSlide = Math.max(0, this.state.currentSlide - 1);

      (0, _utils.setTransition)(this.slider, 300);

      this.updateCurrentSlide(nextSlide);
    }
  }, {
    key: "onNextClick",
    value: function onNextClick() {
      var nextSlide = Math.min(this.props.children.length - 1, this.state.currentSlide + 1);

      (0, _utils.setTransition)(this.slider, 300);

      this.updateCurrentSlide(nextSlide);
    }
  }, {
    key: "updateCurrentSlide",
    value: function updateCurrentSlide(currentSlide) {
      if (currentSlide !== this.state.currentSlide && typeof this.props.onSlideChange !== "undefined") {
        this.props.onSlideChange(currentSlide);
      }
      this.setState({
        currentSlide: currentSlide,
        left: this.state.allSlidesScroll[currentSlide]
      });
      this.checkActiveButtons(currentSlide);
    }
  }, {
    key: "checkActiveButtons",
    value: function checkActiveButtons(currentSlide) {
      var containerWidth = this.container.getBoundingClientRect().width;

      this.setState({
        isPrevActive: currentSlide !== 0,
        isNextActive: this.state.allSlidesScroll[currentSlide] !== this.state.allSlidesScroll[this.state.allSlidesScroll.length - 1]
      });
    }
  }, {
    key: "calculateNextSlide",
    value: function calculateNextSlide() {
      var currentScroll = this.state.left;

      var closestIndex = (0, _utils.getNextFromTouchSpeed)(+new Date() - this.state.startTime, currentScroll, this.state.allSlidesScroll, this.state.currentSlide);

      if (typeof closestIndex === "undefined") closestIndex = (0, _utils.getClosestSlide)(this.state.allSlidesScroll, currentScroll);

      (0, _utils.setTransition)(this.slider, 300);

      this.updateCurrentSlide(closestIndex);
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var children = this.props.children;

      children = _react2.default.Children.map(children, function (child, index) {
        return _react2.default.createElement(
          "div",
          {
            ref: function ref(div) {
              return _this4.slides[index] = div;
            },
            style: {
              display: "inline-block",
              width: _this4.state.slideWidth,
              marginRight: index + 1 === children.length ? 0 : _this4.state.margin,
              overflow: _this4.props.disableTouch ? "scroll" : "unset"
            }
          },
          _react2.default.cloneElement(child)
        );
      });

      return _react2.default.createElement(
        "div",
        {
          className: "commerce-carousel",
          style: { position: "relative", overflow: this.props.overflow },
          ref: function ref(div) {
            return _this4.container = div;
          }
        },
        !this.props.disableButtons ? _react2.default.createElement(_button.PrevButton, {
          onClick: this.onPrevClick,
          isActive: this.state.isPrevActive,
          buttons: this.props.buttons
        }) : null,
        _react2.default.createElement(
          "div",
          {
            className: "carousel-wrapper",
            style: _extends({
              position: "relative",
              overflowX: "hidden",
              width: this.state.containerLength + "px"
            }, (0, _utils.setTranslation)(this.state.left)),
            ref: function ref(div) {
              return _this4.slider = div;
            },
            onTouchEnd: this.onTouchEnd,
            onTouchMove: this.onTouchMove,
            onTouchStart: this.onTouchStart,
            onTouchCancel: this.onTouchCancel
          },
          children
        ),
        !this.props.disableButtons ? _react2.default.createElement(_button.NextButton, {
          onClick: this.onNextClick,
          isActive: this.state.isNextActive,
          buttons: this.props.buttons
        }) : null
      );
    }
  }]);

  return Carousel;
}(_react2.default.Component);

exports.default = Carousel;