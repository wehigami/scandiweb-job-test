import React from "react";
import { NavLink } from "react-router-dom";
import navStyle from "./nav.module.scss";

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };
  }

  handleClick = () => {
    this.setState({ active: !this.state.active });
  };

  render() {
    const labels = [
      { name: "Women", href: "/women", active: false },
      { name: "Men", href: "/men", active: false },
      { name: "Kids", href: "/kids", active: false },
    ];

    return (
      <div
        className={`${navStyle.wrapper}`}
        style={{ padding: "20px 100px 20px 100px", display: "flex" }}
      >
          {labels.map((label) => {
            return (
              <div className={`${navStyle.labelStyle}`} key={label.name}>
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
    );
  }
}

export default Nav;
