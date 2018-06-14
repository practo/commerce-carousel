import React from "react";

const AmpCarousel = props => {
  return (
    <amp-carousel layout="responsive" height="350" width="300" type="slides">
      {React.Children.map(props.children, (child, index) => <div>{child}</div>)}
    </amp-carousel>
  );
};

export default AmpCarousel;
