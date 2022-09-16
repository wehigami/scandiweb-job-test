import React from "react";
import Arrow from "../../imgs/arrow.svg";
import style from "./dropdown.module.scss";

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownActive: false,
      wrapperRef: React.createRef(),
      handleClickOutside: this.handleClickOutside.bind(this),
    };
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.state.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.state.handleClickOutside);
  }

  /**
   * Alert if clicked on outside of element
   */
  handleClickOutside(event) {
    if (
      this.state.wrapperRef &&
      !this.state.wrapperRef.current.contains(event.target)
    ) {
      this.setState({ dropdownActive: false });
    }
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
      <div ref={this.state.wrapperRef}>
        <div className={style.wrapper} onClick={() => this.handleClick()}>
          <p style={{ fontWeight: 500 }}>{this.props.text}</p>
          <img src={Arrow} alt="Arrow" style={arrowStyle} />
        </div>
        {this.state.dropdownActive ? (
          <div
            className={style.picker}
            onClick={() => this.handleClick()}
          >
            {this.props.query}
          </div>
        ) : null}
      </div>
    );
  }
}

export default Dropdown;
