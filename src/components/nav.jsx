import React from "react";
import { NavLink } from "react-router-dom";
import navStyle from "./nav.module.scss";
import Logo from "../imgs/logo.svg";
import Arrow from "../imgs/arrow.svg";
import Cart from "../imgs/Cart.svg";
import "./nav.scss";
import { Query } from "@apollo/client/react/components";


class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currencyActive: false,
      currencySymbol: "$",
    };

  }

  handleCurrencyClick = () => {
    this.setState({ currencyActive: !this.state.currencyActive });
  };

   handleCurrencyChange = (currentSymbol) => {
    this.setState({ currencySymbol: currentSymbol });
    this.setState({ currencyActive: !this.state.currencyActive });
  }


  render() {
    const labels = [
      { name: "Women", href: "/women", active: false },
      { name: "Men", href: "/men", active: false },
      { name: "Kids", href: "/kids", active: false },
    ];

    const arrowStyle = this.state.currencyActive
      ? {
          transform: "scaleY(-1)",
          marginLeft: "5px",
        }
      : {
          marginLeft: "5px",
        };

    return (
      <nav>
        <section
          style={{
            padding: "20px 100px 20px 100px",
            display: "grid",
            gridTemplateColumns: "33% 33% 33%",
            height: "80px",
            backgroundColor: "#fff",
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
            {labels.map((label) => {
              return (
                <div
                  style={{ textTransform: "uppercase", marginRight: "20px" }}
                  key={label.name}
                >
                  <NavLink
                    to={label.href}
                    className={({ isActive }) =>
                      isActive ? navStyle.active : navStyle.label
                    }
                  >
                    <span>{label.name}</span>
                  </NavLink>
                </div>
              );
            })}
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
            <div
              className="currency"
              style={{
                display: "flex",
                cursor: "pointer",
                height: "25px",
                alignItems: "center",
              }}
              onClick={this.handleCurrencyClick}
            >
              <p>{this.state.currencySymbol}</p>
              <img src={Arrow} alt="Arrow" style={arrowStyle} />
            </div>

            {this.state.currencyActive ? (
              <div
                className="currencyPicker"
                style={{
                  position: "absolute",
                  top: "100px",
                  textAlign: "center",
                  width: "115px",
                  boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Query query={this.props.navData}>
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
                            }}
                            onClick={() => this.handleCurrencyChange(currency.symbol)}
                          >
                            {currency.symbol} {currency.label}
                          </p>
                        ))}
                      </>
                    );
                  }}
                </Query>
              </div>
            ) : null}

            <img
              src={Cart}
              alt="Cart"
              width={20}
              style={{ marginLeft: "20px" }}
            />
          </div>
        </section>

        <section></section>
      </nav>
    );
  }
}

export default Nav;
