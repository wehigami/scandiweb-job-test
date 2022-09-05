import React from "react";
import Nav from "./nav/nav";
import { connect } from "react-redux";

class Layout extends React.Component {
  render() {
    const darkenOverlay = () => {
      const ovStyle = {
        width: "100%",
        height: "100%",
        background: "rgba(0, 0, 0, 0.3)",
        position: "fixed",
        zIndex: "3",
      };

      if (this.props.cartClick) {
        return <div style={ovStyle} />;
      }
    };
    return (
      <div>
        {darkenOverlay()}
        <Nav />

        <section>{this.props.children}</section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cartClick: state.cartClick.cartClicked,
});


export default connect(mapStateToProps)(Layout);
