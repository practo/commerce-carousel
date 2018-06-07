import React from "react";

import Slider from "./slider";
import { PrevButton, NextButton } from "./button";
import { scrollTo, getClosestSlide, getNextFromTouchSpeed } from "./utils";

class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      margin: props.margin || 5,
      leftSpace: props.leftSpace || 5,
      currentSlide: 0,
      allSlidesScroll: [],
      startTime: 0,
      isTouchActive: false,
      isPrevActive: false,
      isNextActive: false
    };
    this.slides = [];
    this.setup = this.setup.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchCancel = this.onTouchCancel.bind(this);
    this.onNextClick = this.onNextClick.bind(this);
    this.onPrevClick = this.onPrevClick.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.calculateNextSlide = this.calculateNextSlide.bind(this);
    this.updateCurrentSlide = this.updateCurrentSlide.bind(this);
    this.checkActiveButtons = this.checkActiveButtons.bind(this);
  }

  componentDidMount() {
    this.setup();
  }

  /* Re-setting all the calculations */
  setup() {
    const slideWidth = this.slides[0].getBoundingClientRect().width;
    const containerLength =
      this.slides.length * (slideWidth + this.state.margin) - this.state.margin;
    const containerWidth = this.container.getBoundingClientRect().width;

    this.container.style.overflowX = "hidden";

    const allSlidesScroll = this.slides.map((slide, index) => {
      if (index === 0) return 0;

      let scrollValue = Math.min(
        slideWidth * index +
          this.state.margin * (index - 1) -
          this.state.leftSpace,
        containerLength - containerWidth
      );

      return scrollValue;
    });

    this.setState(
      {
        allSlidesScroll
      },
      () => this.updateCurrentSlide(0)
    );
  }

  onTouchStart() {
    console.log("touch start");
    this.setState({
      startTime: +new Date(),
      isTouchActive: true
    });
  }

  onTouchEnd() {
    console.log("touch end");
    this.setState({
      isTouchActive: false
    });
    this.calculateNextSlide();
  }

  onTouchCancel() {
    console.log("touch cancel");
    this.setState({
      isTouchActive: false
    });
    this.calculateNextSlide();
  }

  onScroll(e) {
    console.log("ss");
    e.preventDefault();
    this.container.style.overflowX = this.state.isTouchActive
      ? "scroll"
      : "hidden";
  }

  onPrevClick() {
    const nextSlide = Math.max(0, this.state.currentSlide - 1);
    scrollTo(this.container, this.state.allSlidesScroll[nextSlide], 150);
    this.updateCurrentSlide(nextSlide);
  }

  onNextClick() {
    const nextSlide = Math.min(
      this.props.children.length - 1,
      this.state.currentSlide + 1
    );
    scrollTo(this.container, this.state.allSlidesScroll[nextSlide], 150);
    this.updateCurrentSlide(nextSlide);
  }

  updateCurrentSlide(currentSlide) {
    if (
      currentSlide !== this.state.currentSlide &&
      typeof this.props.onSlideChange !== "undefined"
    ) {
      this.props.onSlideChange(currentSlide);
    }

    this.setState({
      currentSlide
    });
    this.checkActiveButtons(currentSlide);
  }

  checkActiveButtons(currentSlide) {
    const containerWidth = this.container.getBoundingClientRect().width;
    const slideWidth = this.slides[0].getBoundingClientRect().width;
    const containerLength =
      this.slides.length * (slideWidth + this.state.margin) - this.state.margin;

    /* Conditions for checking whether the buttons are active or not */
    this.setState({
      isPrevActive: currentSlide !== 0,
      isNextActive:
        this.state.allSlidesScroll[currentSlide] + containerWidth !==
        containerLength
    });
  }

  calculateNextSlide() {
    /* Setting overflow hidden to avoid continuous scrolling after tap out. Then enabling it after a few milliseconds. */
    this.container.style.overflowX = "hidden";
    setTimeout(() => {
      this.container.style.overflowX = "scroll";
    }, 200);

    const currentScroll = this.container.scrollLeft;

    /* Get the closest slide for current scroll value */
    let closestIndex = getClosestSlide(
      this.state.allSlidesScroll,
      currentScroll
    );

    /* Get which slide to go to, based on the touch speed */
    closestIndex = getNextFromTouchSpeed(
      +new Date() - this.state.startTime,
      currentScroll,
      this.state.allSlidesScroll,
      this.state.currentSlide
    );

    scrollTo(this.container, this.state.allSlidesScroll[closestIndex], 150);

    this.updateCurrentSlide(closestIndex);
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
        onTouchCancel={this.onTouchCancel}
        style={{
          display: "inline-block",
          overflowX: "normal",
          whiteSpace: "normal",
          marginRight: index + 1 === children.length ? 0 : this.state.margin
        }}
      >
        {React.cloneElement(child)}
      </div>
    ));

    return (
      <div className="commerce-carousel" style={{ position: "relative" }}>
        <PrevButton
          onClick={this.onPrevClick}
          isActive={this.state.isPrevActive}
        />
        <div
          ref={div => (this.container = div)}
          onScroll={this.onScroll}
          style={{
            position: "relative",
            overflowX: "scroll",
            whiteSpace: "nowrap"
          }}
        >
          {children}
        </div>

        <NextButton
          onClick={this.onNextClick}
          isActive={this.state.isNextActive}
        />
      </div>
    );
  }
}

export default Carousel;
