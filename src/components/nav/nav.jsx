import React from "react";
import { NavLink } from "react-router-dom";
import navStyle from "./nav.module.scss";
import Logo from "../../imgs/logo.svg";
import Cart from "../../imgs/Cart.svg";
import "./nav.scss";
import { Query } from "@apollo/client/react/components";
import { connect } from "react-redux";
import { setActiveCurrency } from "../../redux/currencySlice";
import { setCartClick } from "../../redux/cartClickSlice";
import Dropdown from "../dropdown/dropdown";
import { getQuery } from "../../lib/queries";
import { setCurrentLink } from "../../redux/currentLinkSlice";

class Nav extends React.Component {
  currencyQuery = (
    <Query query={getQuery(0)}>
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;
        return (
          <>
            {data.currencies.map((currency) => (
              <p
                key={currency.symbol}
                style={{
                  margin: 0,
                  padding: 0,
                  height: 35,
                  alignItems: "center",
                  justifyContent: "center",
                  display: "flex",
                  fontWeight: 500,
                }}
                onClick={() => {
                  this.props.setActiveCurrency([
                    currency.symbol,
                    currency.label,
                  ]);
                }}
              >
                {currency.symbol}
                {currency.label}
              </p>
            ))}
          </>
        );
      }}
    </Query>
  );

  render() {

    const uniqueItems = new Set(this.props.cart.map((item) => item.id));

    return (
      <nav
        style={{
          padding: "20px 100px 20px 100px",
          display: "grid",
          gridTemplateColumns: "33% 33% 33%",
          backgroundColor: "#fff",
          position: "relative",
          zIndex: "3",
        }}
      >
        <div
          className="labels"
          style={{
            display: "flex",
            justifySelf: "start",
            alignSelf: "center",
          }}
        >
          <Query query={getQuery(1)}>
            {({ loading, error, data }) => {
              if (loading) return <p>Loading...</p>;
              if (error) return <p>Error :(</p>;
              return (
                <>
                  {data.categories.map((category) => (
                    <div
                      style={{
                        textTransform: "uppercase",
                        marginRight: "20px",
                      }}
                      key={category.name}
                      onClick={() => {
                        this.props.setCurrentLink(category.name);
                      }}
                    >
                      <NavLink
                        to={`/product-listing-page/${category.name}`}
                        className={({ isActive }) =>
                          isActive ? navStyle.active : navStyle.label
                        }
                      >
                        <span>{category.name}</span>
                      </NavLink>
                    </div>
                  ))}
                </>
              );
            }}
          </Query>
        </div>

        <div
          className="logo"
          style={{
            textAlign: "center",
            justifySelf: "center",
            alignSelf: "center",
          }}
        >
          <NavLink to="/">
            <img src={Logo} alt="logo" height={41} />
          </NavLink>
        </div>

        <div
          className="actions"
          style={{
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
          }}
        >
          {/*dropdown goes here*/}
          <Dropdown text={this.props.symbol} query={this.currencyQuery} />

          <img
            src={Cart}
            alt="cart"
            width={20}
            style={{ marginLeft: "20px", cursor: "pointer" }}
            onClick={() => this.props.setCartClick()}
          />
          <span style={{ marginLeft: "3px", userSelect: "none" }}>
            {uniqueItems.size}
          </span>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => ({
  label: state.activeCurrency.label,
  symbol: state.activeCurrency.symbol,
  cart: state.cart.cart,
});

const mapDispatchToProps = { setActiveCurrency, setCartClick, setCurrentLink };
export default connect(mapStateToProps, mapDispatchToProps)(Nav);
