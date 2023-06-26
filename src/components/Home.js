import React, { useRef } from "react";
import div from "./FormContainer";
const Home = () => {
  const inputEl = useRef(null);
  console.log(inputEl);
  return (
    <div className="d-flex justify-content-center pt-5">
      <a href="/login">
        <button class="button-57">
          <span class="text">Welcome to LTS Budget Management</span>
          <span>Login</span>
        </button>
      </a>
    </div>
  );
};

export default Home;
