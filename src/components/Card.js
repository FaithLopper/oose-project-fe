import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, ListGroup, Button } from "react-bootstrap";
import { UpAction, DelAction } from "../features/updateAndDelete/UpNDel";
import Message from "./Message";
import Loader from "./Loader";

function CardComponent(props) {
  const dispatch = useDispatch();
  const UserUpNDel = useSelector((state) => state.upNDel);
  const { loading, data, success } = UserUpNDel;

  const [personalIncome, setPersonalIncome] = useState(0);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [total, setTotal] = useState(0);
  const [yearMonth, setYearMonth] = useState("");

  useEffect(() => {
    setPersonalIncome(props.data.personalIncome);
    setMonthlyPayment(props.data.monthlyPayment);
    setTotal(props.data.total);
    setYearMonth(props.data.yearMonth);
  }, [props]);

  const updateHandler = (e) => {
    e.preventDefault();
    // eslint-disable-next-line no-restricted-globals
    if (confirm(`Update ${yearMonth} expenditure`) === true) {
      dispatch(
        UpAction(
          "expenditures",
          { personalIncome, monthlyPayment, yearMonth },
          props.data.id
        )
      );
    }
  };

  const deleteHandler = (e) => {
    e.preventDefault();
    // eslint-disable-next-line no-restricted-globals
    if (confirm(`Delete ${yearMonth} expenditure`) === true) {
      dispatch(DelAction("expenditures", props.data.id));
    }
  };

  return (
    <Card {...props} className={props.className} style={{ width: "18rem" }}>
      <Card.Header>{props.data.yearMonth}</Card.Header>
      {loading && <Loader />}
      {success === true && <Message variant="success">Update Success</Message>}
      {success === false && (
        <Message variant="danger">{data.message}</Message>
      )}
      <ListGroup variant="flush">
        <ListGroup.Item>
          Balance:
          <input disabled value={total} onChange={(e) => setTotal(e.target.value)} />
        </ListGroup.Item>
        <ListGroup.Item>
          Personal Income:
          <input
            value={personalIncome}
            onChange={(e) => setPersonalIncome(e.target.value)}
          />
        </ListGroup.Item>
        <ListGroup.Item>
          Monthly Payment:
          <input
            value={monthlyPayment}
            onChange={(e) => setMonthlyPayment(e.target.value)}
          />
        </ListGroup.Item>
        <ListGroup.Item>
          Month/Year:
          <input
            value={yearMonth}
            type="month"
            onChange={(e) => setYearMonth(e.target.value)}
          />
        </ListGroup.Item>
        <ListGroup.Item>
          <Button onClick={updateHandler}>Update</Button>
          <Button onClick={deleteHandler}>Delete</Button>
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
}

export default CardComponent;
