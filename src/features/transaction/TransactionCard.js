import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, ListGroup, Button, Form } from "react-bootstrap";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
  transCreAction,
  TransUpAction,
  TransDelAction,
} from "./TransactionReducer";

function TransactionCard(props) {
  const dispatch = useDispatch();
  const UserTransCre = useSelector((state) => state.transCre);
  const { creLoading, creData, creSuccess } = UserTransCre;

  const UserTransUp = useSelector((state) => state.transUp);
  const { upLoading, upData, upSuccess } = UserTransUp;

  const UserTransDel = useSelector((state) => state.transDel);
  const { delLoading, delData, delSuccess } = UserTransDel;

  const [date, setDate] = useState("2022-06-06");
  const [note, setNote] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [category, setCategory] = useState({});
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setDate(props.data.date);
    setNote(props.data.note);
    setPaymentMethod(props.data.paymentMethod);
    setCategory(props.data.category);
    setTotal(props.data.total);
  }, [props]);

  const updateHandler = (e) => {
    e.preventDefault();
    // eslint-disable-next-line no-restricted-globals
    dispatch(
      TransUpAction(
        {
          date,
          note,
          paymentMethod,
          category: { id: category.id },
          total,
        },
        props.data.id
      )
    );
  };

  const deleteHandler = (e) => {
    e.preventDefault();
    dispatch(TransDelAction(props.data.id, props.value));
    // eslint-disable-next-line no-restricted-globals
  };

  const addHandler = (e) => {
    e.preventDefault();
    // eslint-disable-next-line no-restricted-globals
    console.log({ date, note, paymentMethod, category, total });
    //dispatch(transCreAction({ date, note, paymentMethod, category, total }));
  };

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Header>New Transaction</Card.Header>
      {creLoading && <Loader />}
      {creSuccess === false && (
        <Message variant="danger">{creData.message}</Message>
      )}
      {creSuccess === true && (
        <Message variant="success">create success</Message>
      )}
      {upSuccess === false && <Message variant="danger">{upData.message}</Message>}
      {upSuccess === true && (
        <Message variant="success">update success</Message>
      )}
      {delSuccess === false && <Message variant="danger">delete fail</Message>}
      {delSuccess === true && (
        <Message variant="success">delete success</Message>
      )}
      <ListGroup variant="flush">
        <ListGroup.Item>
          Date:
          <input
            value={date}
            type="date"
            onChange={(e) => setDate(e.target.value)}
          />
        </ListGroup.Item>
        <ListGroup.Item>
          Note:
          <input value={note} onChange={(e) => setNote(e.target.value)} />
        </ListGroup.Item>
        <ListGroup.Item>
          Payment Method:
          <Form.Select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="mt-3"
            aria-label="cateType"
          >
            <option value="CREDIT_CARD">CREDIT_CARD</option>
            <option value="DEBIT_CARD">DEBIT_CARD</option>
            <option value="ONLINE_BANKING">ONLINE_BANKING</option>
            <option value="CASH">CASH</option>
          </Form.Select>
        </ListGroup.Item>
        {props.data2 && (
          <ListGroup.Item>
            Category:
            <Form.Select
              value={category.id}
              onChange={(e) => setCategory({ id: e.target.value })}
              className="mt-3"
              aria-label="cateType"
            >
              {props.data2.map((cate) => (
                <option value={cate.id} id={cate.id}>
                  {cate.name} | {cate.categoryType}
                </option>
              ))}
            </Form.Select>
          </ListGroup.Item>
        )}
        <ListGroup.Item>
          Amout:
          <input
            value={total}
            type="number"
            min={0}
            onChange={(e) => setTotal(e.target.value)}
          />
        </ListGroup.Item>
        <ListGroup.Item>
          {props.id === "new" ? (
            <Button onClick={addHandler}>add</Button>
          ) : (
            <>
              <Button onClick={updateHandler}>Update</Button>
              <Button onClick={deleteHandler}>Delete</Button>
            </>
          )}
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
}

export default TransactionCard;
