import React, { useState, useEffect } from "react";
import { Modal, Button, Tabs, Tab, Form, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { GetAction } from "../updateAndDelete/UpNDel";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { expenditureGet } from "./ExpenReducer";
import AuthUser from "../auth";
import CategoryCard from "../../components/CategoryCard";

export function CategoryModal(props) {
    
  const userGetData = useSelector((state) => state.getData);
  const { loading, data: cateData, success } = userGetData;

  const userExpenData = useSelector((state) => state.expenData);
  const { data, loading: loadingData } = userExpenData;

  const dispatch = useDispatch();
  const [personalIncome, setPersonalIncome] = useState(0);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [yearMonth, setYearMonth] = useState("2022-06");

  const [startDate, , setStartDate] = useState("0001-01");
  const [endDate, setEndDate] = useState("9999-12");
  const authUser = AuthUser();

  useEffect(() => {
    if (authUser) {
      dispatch(expenditureGet(startDate, endDate));
    }
  }, [dispatch, authUser, startDate, endDate]);

  const [cateId, setCateId] = useState("none");
  //const [catagoryData, setCatagoryData] = useState({});

  const setValueForCategoryCard = (ym) => {
    setCateId(ym);
    if (authUser) {
      dispatch(GetAction("categories", ym));
    }
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* {success === false && (
          <Message variant="danger">{messDt.message}</Message>
        )} */}
        {/* {success === true && (
          <Message variant="success">create success</Message>
        )} */}

        {loading && <Loader />}
        <Form.Select
          value={cateId}
          onChange={(e) => setValueForCategoryCard(e.target.value)}
          className="mb-3"
          aria-label="expenditures_list"
        >
          <option value={"none"}>Choose your expenditures</option>
          {data && (
            <>
              {data.content && (
                <>
                  {data.content.map((expen) => (
                    <option key={expen.id} value={expen.yearMonth}>
                      {expen.yearMonth}
                    </option>
                  ))}
                </>
              )}
            </>
          )}
        </Form.Select>
        <Tabs
          defaultActiveKey="add_category"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="add_category" title="add new category">
            {cateId !== "none" && (
              <CategoryCard data={{ cateId }} id={"null"} className="mt-4" />
            )}
          </Tab>
          <Tab eventKey="update_category" title="category manages">
            {loadingData && <Loader />}

            {cateId !== "none" && (
              <>
                {cateData && cateData.length !== 0 && (
                  <div className="d-flex flex-wrap justify-content-around">
                    {cateData.map((cate) => (
                      <CategoryCard
                        data={cate}
                        key={cate.id}
                        id={cateId}
                        className="mt-4"
                      />
                    ))}
                  </div>
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
