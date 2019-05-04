import React from "react";
import "./Main.css";

const Main = props => {
  return (
    <main className="Main__container">
      <h1>Gmail Clone</h1>
      <p>
        Welcome to mail application, where you can send and receive emails from
        others.
      </p>
      <div>
        <a href="/login" className="btn">
          Login
        </a>
        <a href="/register" className="btn">
          Register
        </a>
      </div>
    </main>
  );
};

export default Main;
