import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerAction } from "./RegisterReducer";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Row, Col, Form } from "react-bootstrap";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import InputForm from "../../components/InputForm";

const Register = () => {
  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.register);
  const { loading, data, success } = userRegister;

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const submitHandler = (e) => {
    e.preventDefault(); //dispatch login
    dispatch(
      registerAction({ username, email, password, firstName, lastName })
    );
  };

  return (
    <div className="pt-5">
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
              <h1>Sign Up</h1>
              {success === false && data.details ? (
                <>
                  <Message variant="danger">{data.message}</Message>
                  {data.details.map((detail) => (
                    <Message
                      key={data.details.indexOf(detail)}
                      variant="danger"
                    >
                      {detail.message}
                    </Message>
                  ))}
                </>
              ) : success === false ? (
                <Message variant="danger">{data.message}</Message>
              ) : (
                <></>
              )}

              {success === true && (
                <Message variant="success">{data.message}</Message>
              )}

              {loading && <Loader />}

              <form onSubmit={submitHandler}>
                <InputForm
                  name="Email"
                  controlId="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  require={true}
                />

                <InputForm
                  name="User Name"
                  controlId="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />

                <InputForm
                  name="First Name"
                  controlId="firstname"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />

                <InputForm
                  name="Last Name"
                  controlId="lastname"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
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
                    Register
                  </button>
                  <Row className="py-3">
                    <Col>
                      Already have an account ?&#160;
                      <Link
                        to={redirect ? `/login?redirect=${redirect}` : "/login"}
                      >
                        Login Now
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

export default Register;
