import React from "react";

import Slider from "./slider";
import { scrollTo } from "./utils";

class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      margin: props.margin || 5,
      leftSpace: props.leftSpace || 5,
      currentSlide: 0,
      activeSlidesScroll: [],
      startTime: 0
    };
    this.slides = [];
    this.setup = this.setup.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchCancel = this.onTouchCancel.bind(this);
    this.calculateNextSlide = this.calculateNextSlide.bind(this);
  }

  componentDidMount() {
    this.setup();
  }

  setup() {
    const slideWidth = this.slides[0].getBoundingClientRect().width;
    const containerLength =
      this.slides.length * (slideWidth + this.state.margin) - this.state.margin;
    const containerWidth = this.container.getBoundingClientRect().width;

    this.container.style.overflowX = "hidden";

    const activeSlidesScroll = this.slides.map((slide, index) => {
      if (index === 0) return 0;

      let scrollValue = Math.min(
        slideWidth * index +
          this.state.margin * (index - 1) -
          this.state.leftSpace,
        containerLength - containerWidth
      );

      return scrollValue;
    });

    this.setState({
      containerLength,
      activeSlidesScroll
    });
  }

  onTouchMove() {
    console.log("move " + this.container.scrollLeft);
  }

  onTouchStart() {
    this.setState({
      startTime: +new Date()
    });
    console.log("start" + this.container.scrollLeft);
  }

  onTouchEnd() {
    console.log("end" + this.container.scrollLeft);
    this.calculateNextSlide();
  }

  onTouchCancel() {
    console.log("cancel" + this.container.scrollLeft);
    this.calculateNextSlide();
  }

  calculateNextSlide() {
    this.container.style.overflowX = "hidden";
    setTimeout(() => {
      this.container.style.overflowX = "scroll";
    }, 50);

    const scrollTime = +new Date() - this.state.startTime;
    console.log("scrollTime " + scrollTime);
    const scrollLeft = this.container.scrollLeft;
    console.log("scrollLeft " + scrollLeft);
    let closestValue = this.state.activeSlidesScroll.reduce((prev, curr) => {
      return Math.abs(curr - scrollLeft) < Math.abs(prev - scrollLeft)
        ? curr
        : prev;
    }, -1000000);

    let closestIndex = this.state.activeSlidesScroll.indexOf(closestValue);

    if (scrollTime < 400) {
      console.log("hello");
      console.log(this.state.activeSlidesScroll[this.state.currentSlide]);
      closestIndex =
        scrollLeft > this.state.activeSlidesScroll[this.state.currentSlide]
          ? Math.min(
              this.props.children.length - 1,
              this.state.currentSlide + 1
            )
          : closestIndex;

      closestIndex =
        scrollLeft < this.state.activeSlidesScroll[this.state.currentSlide]
          ? Math.max(0, this.state.currentSlide - 1)
          : closestIndex;
    }
    console.log(closestIndex);
    scrollTo(this.container, this.state.activeSlidesScroll[closestIndex], 120);

    this.setState({
      currentSlide: closestIndex
    });
  }

  render() {
    let children = this.props.children;

    /*
      Wrapping each children inside a div, to give the direct child some
      extra custom styles.
    */
    children = React.Children.map(children, (child, index) => (
      <div
        ref={div => (this.slides[index] = div)}
        onTouchEnd={this.onTouchEnd}
        onTouchStart={this.onTouchStart}
        onTouchMove={this.onTouchMove}
        onTouchCancel={this.onTouchCancel}
        style={{
          display: "inline-block",
          marginRight: index + 1 === children.length ? 0 : this.state.margin
        }}
      >
        {React.cloneElement(child)}
      </div>
    ));

    return (
      <div
        ref={div => (this.container = div)}
        style={{
          overflowX: "scroll",
          whiteSpace: "nowrap"
        }}
      >
        {children}
      </div>
    );
  }
}

export default Carousel;
