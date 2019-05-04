import React from "react";
import "./SingleMail.css";

const SingleMail = props => {
  return (
    <React.Fragment>
      <button onClick={props.closeHandler} className="btn">
        <i className="fas fa-arrow-left SingleMail__goBack" />
      </button>
      <div className="SingleMail__container">
        <h2>{props.mail.subject}</h2>
        <h4>From: {props.mail.sender.username}</h4>

        <p>{props.mail.body}</p>
      </div>
    </React.Fragment>
  );
};

export default SingleMail;
