import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navbar, Container, Button, Dropdown } from "react-bootstrap";
import UserProfile from "./Modal";
import AuthUser from "../features/auth";
import "./components.module.css";
import { logoutAction } from "../features/login/LoginReducer";

const Header = () => {
  const [modalShow, setModalShow] = useState(false);
  const authUser = AuthUser();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.login);
  const { LoggedUser } = userLogin;

  const logout = (e) => {
    e.preventDefault();
    dispatch(logoutAction());
  };
  return (
    <>
      <UserProfile show={modalShow} onHide={() => setModalShow(false)} />
      <Navbar className="bggradient" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">LTS Budget Management</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              {authUser ? (
                <Dropdown>
                  <Dropdown.Toggle
                    variant="outline-warning"
                    id="dropdown-basic"
                  >
                    {`${LoggedUser.firstName} ${LoggedUser.lastName}`}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item
                      variant="dark"
                      onClick={() => setModalShow(true)}
                    >
                      <button className="button-41">Profile</button>
                    </Dropdown.Item>
                    <Dropdown.Item onClick={logout}>
                      <button className="button-5">Logout</button>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <a href="/login">Login</a>
              )}
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
export default Header;
