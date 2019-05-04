import React from "react";
import "./AllMails.css";

const AllMails = props => {
  const content = props.mails.map((mail, i) => {
    mail.createdAt = new Date(mail.createdAt).toLocaleDateString();
    return (
      <li
        key={i}
        className="AllMails__mailList__item"
        onClick={props.onClick.bind(this, mail._id)}
      >
        <p>{mail.sender.username}</p>
        <p>{mail.subject}</p>
        <p>{mail.createdAt}</p>
      </li>
    );
  });
  return (
    <ul className="AllMails__mailList">
      <li className="AllMails__mailList__item AllMails__heading">
        <p>From</p>
        <p>Subject</p>
        <p>Timestamp</p>
      </li>
      {content}
    </ul>
  );
};

export default AllMails;
