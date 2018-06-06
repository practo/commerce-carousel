"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _slider = require("./slider");

var _slider2 = _interopRequireDefault(_slider);

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
      activeSlidesScroll: []
    };
    _this.slides = [];
    _this.setup = _this.setup.bind(_this);
    _this.onTouchEnd = _this.onTouchEnd.bind(_this);
    _this.calculateCurrentSlide = _this.calculateCurrentSlide.bind(_this);
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

      var activeSlidesScroll = this.slides.map(function (slide, index) {
        if (index === 0) return 0;

        var scrollValue = Math.min(slideWidth * index + _this2.state.margin * (index - 1) - _this2.state.leftSpace, containerLength - containerWidth);

        return scrollValue;
      });

      this.setState({
        containerLength: containerLength,
        activeSlidesScroll: activeSlidesScroll
      });
    }
  }, {
    key: "onTouchEnd",
    value: function onTouchEnd() {
      this.calculateCurrentSlide();
    }
  }, {
    key: "calculateCurrentSlide",
    value: function calculateCurrentSlide() {
      var _this3 = this;

      this.container.style.overflowX = "hidden";
      setTimeout(function () {
        _this3.container.style.overflowX = "scroll";
      }, 20);

      var scrollLeft = this.container.scrollLeft;
      var closest = this.state.activeSlidesScroll.reduce(function (prev, curr) {
        return Math.abs(curr - scrollLeft) < Math.abs(prev - scrollLeft) ? curr : prev;
      });

      (0, _utils.scrollTo)(this.container, closest, 300);

      this.setState({
        currentSlide: this.state.activeSlidesScroll.indexOf(closest)
      });
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
            style: {
              display: "inline-block",
              marginRight: index + 1 === children.length ? 0 : _this4.state.margin
            }
          },
          _react2.default.cloneElement(child)
        );
      });

      return _react2.default.createElement(
        "div",
        {
          ref: function ref(div) {
            return _this4.container = div;
          },
          onScroll: this.onScroll,
          style: {
            overflowX: "scroll",
            whiteSpace: "nowrap"
          }
        },
        children
      );
    }
  }]);

  return Carousel;
}(_react2.default.Component);

exports.default = Carousel;