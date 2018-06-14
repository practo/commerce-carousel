import React from "react";

import Slider from "./slider";
import { PrevButton, NextButton } from "./button";
import {
  scrollTo,
  getClosestSlide,
  getNextFromTouchSpeed,
  setTranslation,
  setTransition
} from "./utils";

class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      margin: props.margin || 10,
      leftSpace: props.leftSpace || 10,
      limit: 50,
      currentSlide: 0,
      containerLength: undefined,
      allSlidesScroll: [],
      startTime: 0,
      startX: 0,
      left: 0,
      isTouchActive: false,
      isPrevActive: false,
      isNextActive: false
    };
    this.slides = [];
    this.setup = this.setup.bind(this);
    this.updateScroll = this.updateScroll.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchCancel = this.onTouchCancel.bind(this);
    this.onNextClick = this.onNextClick.bind(this);
    this.onPrevClick = this.onPrevClick.bind(this);
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

    const allSlidesScroll = this.slides.map((slide, index) => {
      if (index === 0) return 0;

      let scrollValue = Math.min(
        slideWidth * index +
          this.state.margin * (index - 1) -
          this.state.leftSpace,
        containerLength - containerWidth
      );

      return scrollValue * -1;
    });

    this.setState(
      {
        containerLength,
        allSlidesScroll
      },
      () => this.updateCurrentSlide(0)
    );
  }

  updateScroll(left) {
    this.setState({
      left
    });
  }

  onTouchStart(e) {
    this.setState({
      startTime: +new Date(),
      isTouchActive: true,
      startX: e.touches[0].clientX
    });
  }

  onTouchMove(e) {
    let left = this.state.left + e.touches[0].clientX - this.state.startX;
    left = Math.min(left, this.state.limit);
    left = Math.max(
      left,
      this.container.getBoundingClientRect().width -
        this.state.containerLength -
        this.state.limit
    );

    this.setState({
      left,
      startX: e.touches[0].clientX
    });
  }

  onTouchEnd() {
    this.setState({
      isTouchActive: false
    });
    this.calculateNextSlide();
  }

  onTouchCancel() {
    this.setState({
      isTouchActive: false
    });
    this.calculateNextSlide();
  }

  onPrevClick() {
    const nextSlide = Math.max(0, this.state.currentSlide - 1);

    setTransition(this.slider, 150);
    this.setState({
      left: this.state.allSlidesScroll[nextSlide]
    });

    this.updateCurrentSlide(nextSlide);
  }

  onNextClick() {
    const nextSlide = Math.min(
      this.props.children.length - 1,
      this.state.currentSlide + 1
    );

    setTransition(this.slider, 150);
    this.setState({
      left: this.state.allSlidesScroll[nextSlide]
    });

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
    /* Conditions for checking whether the buttons are active or not */
    this.setState({
      isPrevActive: currentSlide !== 0,
      isNextActive:
        this.state.allSlidesScroll[currentSlide] !==
        this.state.allSlidesScroll[this.state.allSlidesScroll.length - 1]
    });
  }

  calculateNextSlide() {
    const currentScroll = this.state.left;

    /* Get which slide to go to, based on the touch speed */
    let closestIndex = getNextFromTouchSpeed(
      +new Date() - this.state.startTime,
      currentScroll,
      this.state.allSlidesScroll,
      this.state.currentSlide
    );

    /* Get the closest slide for current scroll value */
    if (typeof closestIndex === "undefined")
      closestIndex = getClosestSlide(this.state.allSlidesScroll, currentScroll);

    setTransition(this.slider, 150);
    this.setState({
      left: this.state.allSlidesScroll[closestIndex]
    });

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
        className="commerce-carousel"
        style={{ position: "relative" }}
        ref={div => (this.container = div)}
      >
        <PrevButton
          onClick={this.onPrevClick}
          isActive={this.state.isPrevActive}
          buttons={this.props.buttons}
        />
        <div
          className="carousel-wrapper"
          style={{
            position: "relative",
            overflowX: "hidden",
            width: `${this.state.containerLength}px`,
            ...setTranslation(this.state.left)
          }}
          ref={div => (this.slider = div)}
          onTouchEnd={this.onTouchEnd}
          onTouchMove={this.onTouchMove}
          onTouchStart={this.onTouchStart}
          onTouchCancel={this.onTouchCancel}
        >
          {children}
        </div>

        <NextButton
          onClick={this.onNextClick}
          isActive={this.state.isNextActive}
          buttons={this.props.buttons}
        />
      </div>
    );
  }
}

export default Carousel;
