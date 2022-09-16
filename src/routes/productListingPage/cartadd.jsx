import React from "react";
import Cart from "../../imgs/Cart.svg";
import { connect } from "react-redux";
import {
  setCart,
  setCartIncrement,
} from "../../redux/cartSlice";
import { setCartMessage } from '../../redux/cartClickSlice'
import style from './cartadd.module.scss';

class CartAdd extends React.Component {
  render() {
    let cartClick = () => {
      const uniqueId = this.props.productAttributes
      .map((item) => item[Object.keys(item)[0]])
      .join("-");

      const fullId = this.props.productId + '_' + uniqueId
      if (
        this.props.cart[
          this.props.cart.findIndex((item) => item.id === fullId)
        ]
      ) {
        this.props.setCartIncrement([fullId]);
      } else if (this.props.productAttributes.length < 1) {
        this.props.setCart({
          id: fullId,
          price: this.props.productPrices,
          quantity: 1,
        });
      } else if (this.props.productAttributes.length >= 1) {
        this.props.setCart({
          id: fullId,
          price: this.props.productPrices,
          quantity: 1,
          attributes: this.props.productAttributes
        });
      }
    };

    return (
      <div>
        {console.log(this.props.productAttributes)}
        <div
          className={style.surface}
          onClick={() => {
            cartClick();
          }}
        >
          <img
            src={Cart}
            alt="cart"
            className={style.img}
            height="24px"
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cart: state.cart.cart,
});

const mapDispatchToProps = { setCart, setCartIncrement, setCartMessage };

export default connect(mapStateToProps, mapDispatchToProps)(CartAdd);
