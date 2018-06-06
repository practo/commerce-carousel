import React from "react";

import Carousel from "../bin/index";
import ExampleSlide from "./config/example-slide";

const BasicCarousel = () => (
  <div className="basic-carousel">
    <div>Running a Basic Carousel</div>
    <Carousel>
      {Array(5)
        .fill(1)
        .map((item, index) => <ExampleSlide key={index} index={index} />)}
    </Carousel>
  </div>
);

export default BasicCarousel;
