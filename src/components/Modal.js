import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button, Tabs, Tab } from "react-bootstrap";
import InputForm from "./InputForm";
import { UpdateUserInfoAction } from "../features/updateUserInfo/UpdateUserInfoReducer";
import Message from "./Message";
import Loader from "./Loader";

function UserProfile(props) {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.login);
  const { LoggedUser } = userLogin;

  const userUpdateUserInfo = useSelector((state) => state.updateUserInfo);
  const { loading, data, success } = userUpdateUserInfo;

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [currentPassword, setCurPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  useEffect(() => {
    if (LoggedUser) {
      setEmail(LoggedUser.email);
      setFirstName(LoggedUser.firstName);
      setLastName(LoggedUser.lastName);
    }
  }, [LoggedUser]);

  const changeInfo = (e) => {
    e.preventDefault();
    dispatch(UpdateUserInfoAction({ email, firstName, lastName }, "info"));
  };
  const chagnePassword = (e) => {
    e.preventDefault();
    dispatch(
      UpdateUserInfoAction(
        { currentPassword, newPassword, confirmNewPassword },
        "password"
      )
    );
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {LoggedUser.username}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {success === false && data.details ? (
          <>
            <Message variant="danger">{data.message}</Message>
            {data.details.map((detail) => (
              <Message key={data.details.indexOf(detail)} variant="danger">
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
          <Message variant="success">Update Success</Message>
        )}

        {loading && <Loader />}
        <Tabs
          defaultActiveKey="profile"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="profile" title="Profile">
            <form onSubmit={changeInfo}>
              <InputForm
                name="Email"
                controlId="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                require={true}
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
              <div className="text-center text-lg-start mt-4 pt-2">
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ padding: "15px 180px" }}
                >
                  Update info
                </button>
              </div>
            </form>
          </Tab>
          <Tab eventKey="changePass" title="change Password">
            <form onSubmit={chagnePassword}>
              <InputForm
                name="Current Password"
                controlId="curPassword"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurPassword(e.target.value)}
              />
              <InputForm
                name="New Password"
                controlId="newpassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <InputForm
                name="Confirm New Password"
                controlId="renewpassword"
                type="password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />
              <div className="text-center text-lg-start mt-4 pt-2">
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ padding: "15px 180px" }}
                >
                  Update Password
                </button>
              </div>
            </form>
          </Tab>
        </Tabs>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UserProfile;
