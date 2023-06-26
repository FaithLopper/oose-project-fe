import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, ListGroup, Button, Form } from "react-bootstrap";
import {
  UpAction,
  DelAction,
  creAction,
} from "../features/updateAndDelete/UpNDel";
import Message from "./Message";
import Loader from "./Loader";

function CategoryCard(props) {
  const dispatch = useDispatch();
  const UserUpNDel = useSelector((state) => state.upNDel);
  const { loading, data, success } = UserUpNDel;

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [spent, setSpent] = useState("");
  const [categoryType, setCategoryType] = useState("EXPENSE");
  const [icon, setIcon] = useState("");

  useEffect(() => {
    setId(props.data.id);
    setName(props.data.name);
    setSpent(props.data.spent);
    setCategoryType(props.data.categoryType);
    setIcon(props.data.icon);
  }, [props]);

  const updateHandler = (e) => {
    e.preventDefault();
    // eslint-disable-next-line no-restricted-globals
    if (confirm(`Update ${name} category`) === true) {
      dispatch(
        UpAction(
          `categories/${props.id}`,
          { name, spent, categoryType, icon },
          id
        )
      );
    }
    alert(`update category ${name} success`);
  };

  const deleteHandler = (e) => {
    e.preventDefault();
    // eslint-disable-next-line no-restricted-globals
    if (confirm(`Delete ${name} category`) === true) {
      dispatch(DelAction(`categories/${props.id}`, id));
    }
    alert(`delete category ${name} success`);
  };

  const addHandler = (e) => {
    e.preventDefault();
    // eslint-disable-next-line no-restricted-globals
    dispatch(
      creAction(
        `categories`,
        { name, spent, categoryType, icon: "test.com" },
        props.data.cateId
      )
    );
    //console.log(props.data.cateId);
  };

  return (
    <>
      <Card {...props} className={props.className} style={{ width: "18rem" }}>
        {success === true && props.id === "null" && (
          <Message variant="success">create success</Message>
        )}
        <Card.Header>
          <img src={icon} className="card-img-top" alt="icon"></img>
        </Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item>
            Name:
            <input value={name} onChange={(e) => setName(e.target.value)} />
          </ListGroup.Item>
          <ListGroup.Item>
            Spent:
            <input value={spent} onChange={(e) => setSpent(e.target.value)} />
          </ListGroup.Item>
          <ListGroup.Item>
            Category Type:
            <Form.Select
              value={categoryType}
              onChange={(e) => setCategoryType(e.target.value)}
              className="mt-3"
              aria-label="cateType"
            >
              <option value="EXPENSE">EXPENSE</option>
              <option value="INCOME">INCOME</option>
            </Form.Select>
          </ListGroup.Item>
          <ListGroup.Item>
            {props.id === "null" ? (
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
    </>
  );
}

export default CategoryCard;
