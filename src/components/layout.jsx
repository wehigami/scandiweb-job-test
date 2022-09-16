import React from "react";
import Nav from "./nav/nav";
import { connect } from "react-redux";
import style from './layout.module.scss';

class Layout extends React.Component {
  render() {
    const darkenOverlay = () => {
      if (this.props.cartClick) {
        return <div className={style.overlay} />;
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
