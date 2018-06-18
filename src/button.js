import React from "react";

class NavigationButton extends React.PureComponent {
  constructor(props) {
    super(props);
    this.className = "commerce-carousel-button ";
  }

  render() {
    return (
      <button
        style={{
          visibility: this.props.isActive ? "visible" : "hidden"
        }}
        className={this.className}
        onClick={this.props.onClick}
      >
        {this.props.buttons}
      </button>
    );
  }
}

class PrevButton extends NavigationButton {
  constructor(props) {
    super(props);
    this.className += "prev-button";
  }
}

class NextButton extends NavigationButton {
  constructor(props) {
    super(props);
    this.className += "next-button";
  }
}

export { PrevButton, NextButton };
