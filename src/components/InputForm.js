import React from "react";
import { Form } from "react-bootstrap";
const InputForm = (props) => {
  return (
    <Form.Group controlId={props.controlId}>
      <Form.Label>{props.name}</Form.Label>
      <Form.Control
        type={props.type}
        placeholder={`Enter ${props.name}`}
        value={props.value}
        onChange={props.onChange}
        onClick={props.onClick}
        min={0}
        required
      ></Form.Control>
    </Form.Group>
  );
};

export default InputForm;
