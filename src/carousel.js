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
      activeSlidesScroll: []
    };
    this.slides = [];
    this.setup = this.setup.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
    this.calculateCurrentSlide = this.calculateCurrentSlide.bind(this);
  }

  componentDidMount() {
    this.setup();
  }

  setup() {
    const slideWidth = this.slides[0].getBoundingClientRect().width;
    const containerLength =
      this.slides.length * (slideWidth + this.state.margin) - this.state.margin;
    const containerWidth = this.container.getBoundingClientRect().width;

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

  onTouchEnd() {
    this.calculateCurrentSlide();
  }

  calculateCurrentSlide() {
    this.container.style.overflowX = "hidden";
    setTimeout(() => {
      this.container.style.overflowX = "scroll";
    }, 20);

    const scrollLeft = this.container.scrollLeft;
    const closest = this.state.activeSlidesScroll.reduce((prev, curr) => {
      return Math.abs(curr - scrollLeft) < Math.abs(prev - scrollLeft)
        ? curr
        : prev;
    });

    scrollTo(this.container, closest, 500);

    this.setState({
      currentSlide: this.state.activeSlidesScroll.indexOf(closest)
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
        onScroll={this.onScroll}
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
