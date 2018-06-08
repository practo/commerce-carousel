"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

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
      margin: props.margin || 5,
      leftSpace: props.leftSpace || 5,
      currentSlide: 0,
      allSlidesScroll: [],
      startTime: 0,
      isTouchActive: false,
      isPrevActive: false,
      isNextActive: false
    };
    _this.slides = [];
    _this.setup = _this.setup.bind(_this);
    _this.onTouchEnd = _this.onTouchEnd.bind(_this);
    _this.onTouchStart = _this.onTouchStart.bind(_this);
    _this.onTouchCancel = _this.onTouchCancel.bind(_this);
    _this.onNextClick = _this.onNextClick.bind(_this);
    _this.onPrevClick = _this.onPrevClick.bind(_this);
    _this.onScroll = _this.onScroll.bind(_this);
    _this.calculateNextSlide = _this.calculateNextSlide.bind(_this);
    _this.updateCurrentSlide = _this.updateCurrentSlide.bind(_this);
    _this.checkActiveButtons = _this.checkActiveButtons.bind(_this);
    return _this;
  }

  _createClass(Carousel, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.setup();
    }
  }, {
    key: "setup",
    value: function setup() {
      var _this2 = this;

      var slideWidth = this.slides[0].getBoundingClientRect().width;
      var containerLength = this.slides.length * (slideWidth + this.state.margin) - this.state.margin;
      var containerWidth = this.container.getBoundingClientRect().width;

      this.container.style.overflowX = "hidden";

      var allSlidesScroll = this.slides.map(function (slide, index) {
        if (index === 0) return 0;

        var scrollValue = Math.min(slideWidth * index + _this2.state.margin * (index - 1) - _this2.state.leftSpace, containerLength - containerWidth);

        return scrollValue;
      });

      this.setState({
        allSlidesScroll: allSlidesScroll
      }, function () {
        return _this2.updateCurrentSlide(0);
      });
    }
  }, {
    key: "onTouchStart",
    value: function onTouchStart() {
      console.log("touch start");
      this.setState({
        startTime: +new Date(),
        isTouchActive: true
      });
    }
  }, {
    key: "onTouchEnd",
    value: function onTouchEnd() {
      console.log("touch end");
      this.setState({
        isTouchActive: false
      });
      this.calculateNextSlide();
    }
  }, {
    key: "onTouchCancel",
    value: function onTouchCancel() {
      console.log("touch cancel");
      this.setState({
        isTouchActive: false
      });
      this.calculateNextSlide();
    }
  }, {
    key: "onScroll",
    value: function onScroll(e) {
      console.log("ss");
      e.preventDefault();
      this.container.style.overflowX = this.state.isTouchActive ? "scroll" : "hidden";
    }
  }, {
    key: "onPrevClick",
    value: function onPrevClick() {
      var nextSlide = Math.max(0, this.state.currentSlide - 1);
      (0, _utils.scrollTo)(this.container, this.state.allSlidesScroll[nextSlide], 150);
      this.updateCurrentSlide(nextSlide);
    }
  }, {
    key: "onNextClick",
    value: function onNextClick() {
      var nextSlide = Math.min(this.props.children.length - 1, this.state.currentSlide + 1);
      (0, _utils.scrollTo)(this.container, this.state.allSlidesScroll[nextSlide], 150);
      this.updateCurrentSlide(nextSlide);
    }
  }, {
    key: "updateCurrentSlide",
    value: function updateCurrentSlide(currentSlide) {
      if (currentSlide !== this.state.currentSlide && typeof this.props.onSlideChange !== "undefined") {
        this.props.onSlideChange(currentSlide);
      }

      this.setState({
        currentSlide: currentSlide
      });
      this.checkActiveButtons(currentSlide);
    }
  }, {
    key: "checkActiveButtons",
    value: function checkActiveButtons(currentSlide) {
      var containerWidth = this.container.getBoundingClientRect().width;
      var slideWidth = this.slides[0].getBoundingClientRect().width;
      var containerLength = this.slides.length * (slideWidth + this.state.margin) - this.state.margin;

      this.setState({
        isPrevActive: currentSlide !== 0,
        isNextActive: this.state.allSlidesScroll[currentSlide] + containerWidth !== containerLength
      });
    }
  }, {
    key: "calculateNextSlide",
    value: function calculateNextSlide() {
      var _this3 = this;

      this.container.style.overflowX = "hidden";
      setTimeout(function () {
        _this3.container.style.overflowX = "scroll";
      }, 200);

      var currentScroll = this.container.scrollLeft;

      var closestIndex = (0, _utils.getClosestSlide)(this.state.allSlidesScroll, currentScroll);

      console.log("ges " + closestIndex);

      closestIndex = (0, _utils.getNextFromTouchSpeed)(+new Date() - this.state.startTime, currentScroll, this.state.allSlidesScroll, this.state.currentSlide) || closestIndex;

      (0, _utils.scrollTo)(this.container, this.state.allSlidesScroll[closestIndex], 150);

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
            onTouchEnd: _this4.onTouchEnd,
            onTouchStart: _this4.onTouchStart,
            onTouchCancel: _this4.onTouchCancel,
            style: {
              display: "inline-block",
              overflowX: "normal",
              whiteSpace: "normal",
              marginRight: index + 1 === children.length ? 0 : _this4.state.margin
            }
          },
          _react2.default.cloneElement(child)
        );
      });

      return _react2.default.createElement(
        "div",
        { className: "commerce-carousel", style: { position: "relative" } },
        _react2.default.createElement(_button.PrevButton, {
          onClick: this.onPrevClick,
          isActive: this.state.isPrevActive
        }),
        _react2.default.createElement(
          "div",
          {
            ref: function ref(div) {
              return _this4.container = div;
            },
            onScroll: this.onScroll,
            style: {
              position: "relative",
              overflowX: "scroll",
              whiteSpace: "nowrap"
            }
          },
          children
        ),
        _react2.default.createElement(_button.NextButton, {
          onClick: this.onNextClick,
          isActive: this.state.isNextActive
        })
      );
    }
  }]);

  return Carousel;
}(_react2.default.Component);

exports.default = Carousel;