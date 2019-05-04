import React from "react";
import "./SingleMail.css";

const SingleMail = props => {
  return (
    <div className="SingleMail__container">
      <h2>Subject: {props.mail.subject}</h2>
      <h4>From: {props.mail.sender.username}</h4>

      <p>{props.mail.body}</p>
    </div>
  );
};

export default SingleMail;
