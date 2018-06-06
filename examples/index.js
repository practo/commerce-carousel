import React from "react";
import ReactDOM from "react-dom";

import BasicCarousel from "./basic-carousel";

import "./styles.scss";

const Examples = () => (
  <div>
    <BasicCarousel />
  </div>
);

export default Examples;

ReactDOM.render(<Examples />, document.getElementById("root"));
