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

    const pickerStyle = {
      marginTop: "200px",
      userSelect: 'none'
    };

    if (this.props.category) {
      pickerStyle.marginTop = "10px";
    }
    return (
      <>
        <div
          style={{
            display: "flex",
            cursor: "pointer",
            height: "25px",
            alignItems: "center",
            userSelect: "none",
          }}
          onClick={this.handleClick}
        >
          <p style={{fontWeight: 500}}>
            {this.props.text}
          </p>
          <img src={Arrow} alt="Arrow" style={arrowStyle} />
        </div>
        {this.state.dropdownActive ? (
          <div className="picker" style={pickerStyle}>
            {this.props.query}
          </div>
        ) : null}
      </>
    );
  }
}

export default Dropdown;
