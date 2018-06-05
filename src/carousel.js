import React from "react";

import Slider from "./slider";

class Carousel extends React.Component {
  render() {
    let children = this.props.children;

    /*
      Wrapping each children inside a div, to give the direct child some
      extra styles
    */
    children = React.Children.map(children, child => (
      <div style={{ display: "inline-block" }}>{React.cloneElement(child)}</div>
    ));

    React.Children.map(children, child => console.log(child));

    return <Slider>{children}</Slider>;
  }
}

export default Carousel;
