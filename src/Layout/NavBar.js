import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

import {
  Collapse,
  Navbar,
  NavItem,
  NavbarBrand,
  NavLink,
  NavbarText,
  NavbarToggler,
  Nav,
} from "reactstrap";

const NavBar = () => {
  const cartItems = useSelector((state) => state.handleCart);
  const context = useContext(UserContext);
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const handleLogOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        context.setUser(null);
        localStorage.clear();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const renderCartIconAndCount = () => {
    if (context.user) {
      return (
        <NavItem className="ms-auto">
          <NavLink
            tag={Link}
            to="/MyCart"
            style={{
              width: "max-content",
            }}
          >
            <FaShoppingCart /> Cart ({cartItems.length})
          </NavLink>
        </NavItem>
      );
    }
    return null;
  };

  return (
    <Navbar
      expand="md"
      style={{
        backgroundColor: "black",
        color: " #333333",
      }}
    >
      <NavbarBrand
        tag={Link}
        to="/"
        className="text-brand-name"
        style={{
          textDecoration: "none",
          transition: "all 0.3s ",
          color: " #333333",
        }}
      >
        E-Commerce WebSite
      </NavbarBrand>
      <NavbarText>
        {context.user?.email ? (
          <div
            className="text-center font-weight-bold "
            style={{ color: "#333333 !important" }}
          >
            {" "}
            {context.user?.email}{" "}
          </div>
        ) : (
          ""
        )}
      </NavbarText>
      <Nav justified className="ms-5">
        {renderCartIconAndCount()}
      </Nav>
      <NavbarToggler onClick={handleToggle} />
      <Collapse
        isOpen={toggle}
        navbar
        className="me-2 navbar-vertical-collapse"
      >
        <Nav justified className="ms-auto nav navbar-expand-sm ">
          {context.user ? (
            <>
              <NavItem>
                <NavLink
                  onClick={() => handleLogOut()}
                  style={{ cursor: "pointer" }}
                >
                  Logout
                </NavLink>
              </NavItem>
            </>
          ) : (
            <>
              <NavItem>
                <NavLink tag={Link} to="/signup">
                  SignUp
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/signin">
                  SignIn
                </NavLink>
              </NavItem>
            </>
          )}
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default NavBar;
