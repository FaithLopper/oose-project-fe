import React, { useState, useEffect } from "react";
import { Modal, Button, Tabs, Tab, Form, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { GetAction } from "../updateAndDelete/UpNDel";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { expenditureGet } from "../expenditures/ExpenReducer";
import AuthUser from "../auth";
import TransactionCard from "./TransactionCard";
import { TransGetAction } from "./TransactionReducer";

export function TransactionModal(props) {
  const userGetData = useSelector((state) => state.getData);
  const { data: dataCate, success: successCate } = userGetData;

  const userExpenData = useSelector((state) => state.expenData);
  const { data: dataExpen, success: successExpen } = userExpenData;

  const userTransGet = useSelector((state) => state.transGet);
  const { getData } = userTransGet;

  const dispatch = useDispatch();

  const [startDate, , setStartDate] = useState("0001-01");
  const [endDate, setEndDate] = useState("9999-12");
  const authUser = AuthUser();

  useEffect(() => {
    if (authUser) {
      dispatch(expenditureGet(startDate, endDate));
    }
  }, [dispatch, authUser, startDate, endDate]);

  useEffect(() => {}, [dataCate]);

  const [cateId, setCateId] = useState("none");
  const [expenId, setExpenId] = useState("none");
  //const [catagoryData, setCatagoryData] = useState({});

  const get_Cate_Trans_Data = (id) => {
    setExpenId(id);
    dispatch(GetAction("categories", id));
    dispatch(TransGetAction(id));
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
          Transaction
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* {success === false && (
          <Message variant="danger">{messDt.message}</Message>
        )} */}
        {/* {success === true && (
          <Message variant="success">create success</Message>
        )} */}

        {/* {loading && <Loader />} */}
        <Form.Select
          value={expenId}
          onChange={(e) => get_Cate_Trans_Data(e.target.value)}
          className="mb-3"
          aria-label="expenditures_list"
        >
          <option value={"none"}>Choose your expenditures</option>
          {dataExpen && (
            <>
              {dataExpen.content && (
                <>
                  {dataExpen.content.map((expen) => (
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
          defaultActiveKey="add_transaction"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="add_transaction" title="add transaction">
            {expenId !== "none" && (
              <Form.Select
                value={cateId}
                onChange={(e) => setCateId(e.target.value)}
                className="mb-3"
                aria-label="expenditures_list"
              >
                <option value={"none"}>Choose your category</option>
                {dataCate && (
                  <>
                    {dataCate.map((cate) => (
                      <option key={cate.id} value={cate.id}>
                        {cate.name} | {cate.categoryType}
                      </option>
                    ))}
                  </>
                )}
              </Form.Select>
            )}
            {cateId !== "none" && expenId !== "none" && (
              <TransactionCard
                data={{
                  date: "2022-06-06",
                  note: "note something",
                  paymentMethod: "CASH",
                  category: { id: cateId },
                  total: 0,
                }}
                id="new"
              />
            )}
          </Tab>
          <Tab eventKey="manage_transaction" title="manage transaction">
            {expenId !== "none" && (
              <>
                {getData && (
                  <div className="d-flex flex-wrap justify-content-around">
                    {getData.content.map((tran) => (
                      <TransactionCard
                        data={tran}
                        data2={dataCate}
                        value={expenId}
                        key={tran.id}
                        check="old"
                        className="mt-4"
                      />
                    ))}
                  </div>
                )}
              </>
            )}
            {/* {expenId !== "none" && (
              <Form.Select
                value={cateId}
                onChange={(e) => setCateId(e.target.value)}
                className="mb-3"
                aria-label="expenditures_list"
              >
                <option value={"none"}>Choose your category</option>
                {dataCate && (
                  <>
                    {dataCate.map((cate) => (
                      <option key={cate.id} value={cate.id}>
                        {cate.name} | {cate.categoryType}
                      </option>
                    ))}
                  </>
                )}
              </Form.Select>
            )} */}
            {/* {cateId !== "none" && expenId !== "none" && (
              <TransactionCard
                data={{
                  date: "2022-06-06",
                  note: "note something",
                  paymentMethod: "CASH",
                  category: { id: cateId },
                  total: 0,
                }}
                id="new"
              />
            )} */}
          </Tab>
        </Tabs>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
