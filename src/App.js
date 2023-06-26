import React from "react";
import { Counter } from "./features/counter/Counter";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Login from "./features/login/Login";
import Register from "./features/register/Register";
import Expenditures from "./features/expenditures/MainButtons";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthUser from "./features/auth";
function App() {
  const authUser = AuthUser();

  return (
    <BrowserRouter>
      <Header />
      <main className="main">
        <Routes>
          <Route path="/" element={authUser ? <Expenditures /> : <Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
