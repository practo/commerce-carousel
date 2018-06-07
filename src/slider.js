import React from "react";

class Slider extends React.Component {
  render() {
    return (
      <div style={{ overflowX: "scroll", whiteSpace: "nowrap" }}>
        {this.props.children}
      </div>
    );
  }
}

export default Slider;
