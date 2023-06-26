import React, { useState, useEffect } from "react";
import { Modal, Button, Tabs, Tab, Form, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import InputForm from "../../components/InputForm";
import { expenditureCreate } from "./ExpenReducer";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { expenditureGet } from "./ExpenReducer";
import AuthUser from "../auth";
import CardComponent from "../../components/Card";

export function ExpendituresModal(props) {
  const userExpenditures = useSelector((state) => state.expenditures);
  const { loading, data: messDt, success } = userExpenditures;

  const userExpenData = useSelector((state) => state.expenData);
  const { data, loading: loadingData } = userExpenData;

  const dispatch = useDispatch();
  const [personalIncome, setPersonalIncome] = useState(0);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [yearMonth, setYearMonth] = useState("2022-06");

  const [startDate, , setStartDate] = useState("2022-01");
  const [endDate, setEndDate] = useState("2022-12");

  useEffect(() => {
    setExpenId("none");
  }, [data]);

  const createExpen = (e) => {
    e.preventDefault();
    dispatch(expenditureCreate({ personalIncome, monthlyPayment, yearMonth }));
  };

  const authUser = AuthUser();
  const getUserExpen = (e) => {
    e.preventDefault();
    if (authUser) {
      dispatch(expenditureGet(startDate, endDate));
    }
  };

  const [expenId, setExpenId] = useState("none");
  const [expenIdData, setExpenIdData] = useState({});

  const setValueForCard = (id) => {
    setExpenId(id);
    setExpenIdData(data.content.find((x) => x.id === id));
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
          Expenditures
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {success === false && (
          <Message variant="danger">{messDt.message}</Message>
        )}
        {success === true && (
          <Message variant="success">create success</Message>
        )}

        {loading && <Loader />}
        <Tabs
          defaultActiveKey="create_expenditures"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="create_expenditures" title="create expenditures">
            <form onSubmit={createExpen}>
              <InputForm
                name="Personal Income"
                controlId="personalIncome"
                type="number"
                value={personalIncome}
                onChange={(e) => setPersonalIncome(e.target.value)}
                min={0}
              />

              <InputForm
                name="Monthly Payment"
                controlId="monthlyPayment"
                type="number"
                value={monthlyPayment}
                onChange={(e) => setMonthlyPayment(e.target.value)}
                min={0}
              />

              <InputForm
                name="Month/Year"
                controlId="yearMonth"
                type="month"
                value={yearMonth}
                onChange={(e) => setYearMonth(e.target.value)}
              />
              <div className="text-center text-lg-start mt-4 pt-2">
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ padding: "15px 180px" }}
                >
                  Create Expenditures
                </button>
              </div>
            </form>
          </Tab>
          <Tab eventKey="update_expenditures" title="expenditures manages">
            <Row>
              <Col>
                <InputForm
                  name="start month"
                  controlId="start_month"
                  type="month"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </Col>
              <Col>
                <InputForm
                  name="end month"
                  controlId="end_month"
                  type="month"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </Col>
              <Col>
                <Button size="md" className="mt-4" onClick={getUserExpen}>
                  Get
                </Button>
              </Col>
            </Row>
            {loadingData && <Loader />}
            <Form.Select
              value={expenId}
              onChange={(e) => setValueForCard(e.target.value)}
              className="mt-3"
              aria-label="expenditures_list"
            >
              <option value={"none"}>Choose your expenditures</option>
              {data && (
                <>
                  {data.content && (
                    <>
                      {data.content.map((expen) => (
                        <option key={expen.id} value={expen.id}>
                          {expen.yearMonth}
                        </option>
                      ))}
                    </>
                  )}
                </>
              )}
            </Form.Select>
            {expenId !== "none" && (
              <>
                {data && Object.keys(data).length !== 0 && (
                  <CardComponent data={expenIdData} className="mt-4" />
                )}
              </>
            )}
          </Tab>
        </Tabs>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
