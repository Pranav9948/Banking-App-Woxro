import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../Redux/Actions/userActions";
import { Link } from "react-router-dom";

const Navbars = () => {
  const userInfo = useSelector((state) => state?.userLogin?.userInfo);

  const dispatch = useDispatch();

  return (
    <Navbar className="bg-black text-white p-4" expand="lg">
      <Container>
        <Link to="/">
          {" "}
          <Navbar.Brand className="text-white font-bold text-4xl">
            ABC BANK
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-36">
            <Link to={"/"} className="text-white ms-24 mt-2   text-lg">
              Home
            </Link>

            <Link to={"/deposit"} className="text-white ms-24 mt-2   text-lg">
              Deposit
            </Link>

            <Link
              to={"/withdrawmoney"}
              className="text-white ms-24 mt-2   text-lg"
            >
              WithDraw
            </Link>

            <Link
              to={"/transfermoney"}
              className="text-white ms-24 mt-2   text-lg"
            >
              Transfer
            </Link>

            <Link to={"/statement"} className="text-white ms-24 mt-2   text-lg">
              Statement
            </Link>

            {userInfo?.name ? (
              <NavDropdown
                className="text-white bg-blue-500 ms-5"
                title={userInfo?.name}
                id="basic-nav-dropdown"
              >
                <Link to="/login">
                  <NavDropdown.Item onClick={() => dispatch(logout())}>
                    Logout
                  </NavDropdown.Item>
                </Link>
              </NavDropdown>
            ) : (
              <NavDropdown
                className="text-white bg-blue-200 ms-5"
                title={'Login'}
                id="basic-nav-dropdown"
              >
                <Link to="/login">
                  <NavDropdown.Item>
                    Loin
                  </NavDropdown.Item>
                </Link>
                <Link to="/register">
                  <NavDropdown.Item>
                    Logout
                  </NavDropdown.Item>
                </Link>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navbars;
