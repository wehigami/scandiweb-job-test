import React from "react";
import Arrow from "../../imgs/arrow.svg";
import "./dropdown.scss";

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownActive: false,
    };
  }

  handleClick = () => {
    this.setState({ dropdownActive: !this.state.dropdownActive });
  };

  render() {
    const arrowStyle = this.state.dropdownActive
      ? {
          transform: "scaleY(-1)",
          marginLeft: "5px",
        }
      : {
          marginLeft: "5px",
        };
    return (
      <>
        <div
          style={{
            display: "flex",
            cursor: "pointer",
            height: "25px",
            alignItems: "center",
          }}
          onClick={this.handleClick}
        >
          <p style={this.props.style}>{this.props.text}</p>
          <img src={Arrow} alt="Arrow" style={arrowStyle} />
        </div>
        {this.state.dropdownActive ? (
          this.props.category ? null : (
            <div
              className="picker"
              style={{
                position: "absolute",
                top: "100px",
                textAlign: "center",
                width: "115px",
                boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              {this.props.query}
            </div>
          )
        ) : null}
      </>
    );
  }
}

export default Dropdown;
