import React from "react";

class NavigationButton extends React.PureComponent {
  constructor(props) {
    super(props);
    this.className = "commerce-carousel-button";
    this.style = {
      position: "absolute",
      zIndex: 1
    };
  }

  render() {
    return (
      <button
        style={{
          ...this.style,
          display: this.props.isActive ? "block" : "none"
        }}
        className={this.className}
        onClick={this.props.onClick}
      >
        Button
      </button>
    );
  }
}

class PrevButton extends NavigationButton {
  constructor(props) {
    super(props);
    this.className += "prev-button";
    this.style = {
      ...this.style,
      left: 0
    };
  }
}

class NextButton extends NavigationButton {
  constructor(props) {
    super(props);
    this.className += "next-button";
    this.style = {
      ...this.style,
      right: 0
    };
  }
}

export { PrevButton, NextButton };
