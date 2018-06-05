import React from "react";

import Carousel from "../bin/index";
import ExampleSlide from "./config/example-slide";

import "./styles.scss";

const BasicCarousel = () => (
  <div className="basic-carousel">
    <div>Running Basic Carousel without js</div>
    <Carousel>
      {Array(5)
        .fill(1)
        .map((item, index) => <ExampleSlide key={index} index={index} />)}
    </Carousel>
  </div>
);

export default BasicCarousel;
