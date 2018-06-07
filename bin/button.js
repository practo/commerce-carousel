"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NextButton = exports.PrevButton = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NavigationButton = function (_React$PureComponent) {
  _inherits(NavigationButton, _React$PureComponent);

  function NavigationButton(props) {
    _classCallCheck(this, NavigationButton);

    var _this = _possibleConstructorReturn(this, (NavigationButton.__proto__ || Object.getPrototypeOf(NavigationButton)).call(this, props));

    _this.className = "commerce-carousel-button";
    _this.style = { position: "absolute", zIndex: 1 };
    return _this;
  }

  _createClass(NavigationButton, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "button",
        {
          style: this.style,
          className: this.className,
          onClick: this.props.onClick
        },
        "Button"
      );
    }
  }]);

  return NavigationButton;
}(_react2.default.PureComponent);

var PrevButton = function (_NavigationButton) {
  _inherits(PrevButton, _NavigationButton);

  function PrevButton(props) {
    _classCallCheck(this, PrevButton);

    var _this2 = _possibleConstructorReturn(this, (PrevButton.__proto__ || Object.getPrototypeOf(PrevButton)).call(this, props));

    _this2.className += "prev-button";
    _this2.style = _extends({}, _this2.style, {
      left: 0
    });
    return _this2;
  }

  return PrevButton;
}(NavigationButton);

var NextButton = function (_NavigationButton2) {
  _inherits(NextButton, _NavigationButton2);

  function NextButton(props) {
    _classCallCheck(this, NextButton);

    var _this3 = _possibleConstructorReturn(this, (NextButton.__proto__ || Object.getPrototypeOf(NextButton)).call(this, props));

    _this3.className += "next-button";
    _this3.style = _extends({}, _this3.style, {
      right: 0
    });
    return _this3;
  }

  return NextButton;
}(NavigationButton);

exports.PrevButton = PrevButton;
exports.NextButton = NextButton;