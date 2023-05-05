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
       <Link to='/'> <Navbar.Brand  className="text-white font-bold text-4xl">
          ABC BANK
        </Navbar.Brand></Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-36">
           

            <Link to={'/'} className="text-white ms-24 mt-2   text-lg">
              Home
              </Link>



            <Link to={'/deposit'} className="text-white ms-24 mt-2   text-lg">
              Deposit
              </Link>

             

              <Link to={'/withdrawmoney'} className="text-white ms-24 mt-2   text-lg">
              WithDraw
              </Link>
           
              <Link to={'/transfermoney'} className="text-white ms-24 mt-2   text-lg">
                Transfer
              </Link>
      
           

            <Link to={'/statement'} className="text-white ms-24 mt-2   text-lg">
            Statement
              </Link>

            {userInfo?.name ? (
              <Link to={'/login'}
                className="text-white ms-24  text-lg"
                onClick={() => dispatch(logout())}
              >
                Logout
              </Link>
            ) : (
              <Link to='/logout'
                className="text-white ms-24  text-lg"
               
              >
                Login
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navbars;
