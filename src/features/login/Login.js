import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "./LoginReducer";
import "./Login.module.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import InputForm from "../../components/InputForm";
import AuthUser from "../auth";

const Login = () => {
  const dispatch = useDispatch();
  const authUser = AuthUser();

  const userLogin = useSelector((state) => state.login);
  const { loading, data, success } = userLogin;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (authUser) {
      navigate(redirect);
    }
  }, [navigate, authUser, redirect]);

  const submitHandler = (e) => {
    e.preventDefault(); //dispatch login
    dispatch(loginAction(username, password));
  };

  return (
    <div>
      <section className="vh-100">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img
                src="https://mdbootstrap.com/img/Photos/new-templates/bootstrap-login-form/draw2.png"
                className="img-fluid"
                alt="Sample"
              />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1 justify-content-center">
              <h1>Sign In</h1>
              {success === false && (
                <Message variant="danger">{data.message}</Message>
              )}
              {loading && <Loader />}

              <form onSubmit={submitHandler}>
                <InputForm
                  name="User Name"
                  controlId="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <InputForm
                  name="password"
                  controlId="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="text-center text-lg-start mt-4 pt-2">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ padding: "15px 180px" }}
                  >
                    Login
                  </button>
                  <Row className="py-3">
                    <Col>
                      New Customer ?&#160;
                      <Link
                        to={
                          redirect
                            ? `/register?redirect=${redirect}`
                            : "/register"
                        }
                      >
                        Register Now
                      </Link>
                    </Col>
                  </Row>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
