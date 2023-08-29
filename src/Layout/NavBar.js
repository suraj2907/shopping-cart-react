import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";

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
  return (
    <Navbar light expand="md">
      <NavbarBrand>
        <Link to="/" style={{ textDecoration: "none" }}>
          Clothing WebSite
        </Link>
      </NavbarBrand>
      <NavbarText>
        {context.user?.email ? <div> {context.user?.email} </div> : ""}
      </NavbarText>

      <NavbarToggler onClick={handleToggle} />
      <Collapse isOpen={toggle} navbar className="me-2">
        <Nav justified className="ms-auto">
          {context.user ? (
            <>
              <NavItem>
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
              <NavItem>
                <NavLink
                  onClick={() => {
                    context.setUser(null);
                  }}
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
