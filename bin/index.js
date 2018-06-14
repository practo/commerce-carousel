"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _carousel = require("./carousel");

var _carousel2 = _interopRequireDefault(_carousel);

var _ampCarousel = require("./amp-carousel");

var _ampCarousel2 = _interopRequireDefault(_ampCarousel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CC = function CC(props) {
  return props.isAmp ? _react2.default.createElement(_ampCarousel2.default, props) : _react2.default.createElement(_carousel2.default, props);
};

exports.default = CC;