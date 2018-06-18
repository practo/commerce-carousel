"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AmpCarousel = function AmpCarousel(props) {
  return _react2.default.createElement(
    "amp-carousel",
    { layout: "responsive", height: "350", width: "300", type: "slides" },
    _react2.default.Children.map(props.children, function (child, index) {
      return _react2.default.createElement(
        "div",
        null,
        child
      );
    })
  );
};

exports.default = AmpCarousel;