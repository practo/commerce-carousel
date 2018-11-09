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
    this.onWindowResize = this.onWindowResize.bind(this);
  }

  componentDidMount() {
    this.setup();
    window.addEventListener("resize", this.onWindowResize);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      typeof prevProps.activeSlide !== "undefined" &&
      prevState.currentSlide !== this.props.activeSlide &&
      prevProps.activeSlide !== this.props.activeSlide
    ) {
      this.updateCurrentSlide(this.props.activeSlide, true);
    }

    if (!prevProps.disableTouch && this.props.disableTouch) {
      this.slides.forEach(slide =>
        slide.scrollTo(
          this.props.disableTouchPoint.x,
          this.props.disableTouchPoint.y
        )
      );
    }
  }

  onWindowResize() {
    this.setup();
  }

  /* Re-setting all the calculations */
  setup() {
    const containerWidth = this.container.getBoundingClientRect().width;
    let slideWidth = this.slides[0].getBoundingClientRect().width;

    if (this.props["full-width"]) {
      slideWidth = containerWidth;
    }

    let containerLength =
      this.slides.length * (slideWidth + this.state.margin) - this.state.margin;

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
        slideWidth,
        allSlidesScroll
      },
      () => this.updateCurrentSlide(this.props.activeSlide || 0)
    );
  }

  updateScroll(left) {
    this.setState({
      left
    });
  }

  onTouchStart(e) {
    if (this.props.disableTouch || e.touches.length > 1) return;
    this.setState({
      startTime: +new Date(),
      isTouchActive: true,
      startX: e.touches[0].clientX
    });
  }

  onTouchMove(e) {
    if (this.props.disableTouch || e.touches.length > 1) return;
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

  onTouchEnd(e) {
    if (this.props.disableTouch || e.touches.length > 1) return;
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

    setTransition(this.slider, 300);

    this.updateCurrentSlide(nextSlide);
  }

  onNextClick() {
    const nextSlide = Math.min(
      this.props.children.length - 1,
      this.state.currentSlide + 1
    );

    setTransition(this.slider, 300);

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
      currentSlide,
      left: this.state.allSlidesScroll[currentSlide]
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

    setTransition(this.slider, 300);

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
          width: this.state.slideWidth,
          marginRight: index + 1 === children.length ? 0 : this.state.margin,
          overflow: this.props.disableTouch ? "scroll" : "unset"
        }}
      >
        {React.cloneElement(child)}
      </div>
    ));

    return (
      <div
        className="commerce-carousel"
        style={{ position: "relative", overflow: this.props.overflow }}
        ref={div => (this.container = div)}
      >
        {!this.props.disableButtons ? (
          <PrevButton
            onClick={this.onPrevClick}
            isActive={this.state.isPrevActive}
            buttons={this.props.buttons}
          />
        ) : null}
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
        {!this.props.disableButtons ? (
          <NextButton
            onClick={this.onNextClick}
            isActive={this.state.isNextActive}
            buttons={this.props.buttons}
          />
        ) : null}
      </div>
    );
  }
}

export default Carousel;
