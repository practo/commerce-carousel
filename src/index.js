import React from "react";

import Carousel from "./carousel";
import AmpCarousel from "./amp-carousel";

const CC = props =>
  props.isAmp ? <AmpCarousel {...props} /> : <Carousel {...props} />;

export default CC;
