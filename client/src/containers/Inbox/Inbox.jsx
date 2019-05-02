import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions/actionTypes";
import "./Inbox.css";

class Inbox extends Component {
  handleLogout = () => {
    // Remove the token from local storage
    localStorage.removeItem("token");
    // Dispatch logout action
    this.props.logout();
  };
  render() {
    return (
      <Fragment>
        <nav className="Inbox__nav">
          Gmail Clone
          <button onClick={this.handleLogout} className="btn btn-logout">
            Logout
          </button>
        </nav>
        <main className="Inbox__main">
          <ul className="Inbox__mailList">
            <li className="Inbox__mailList__item Inbox__heading">
              <p>From</p>
              <p>Subject</p>
              <p>Description</p>
              <p>Timestamp</p>
            </li>
            <li className="Inbox__mailList__item">
              <p>Shivam Kumar</p>
              <p>Hello world</p>
              <p>This is the description</p>
              <p>12/03/19</p>
            </li>
            <li className="Inbox__mailList__item">
              <p>Shivam Kumar</p>
              <p>Hello world</p>
              <p>This is the description</p>
              <p>12/03/19</p>
            </li>
          </ul>
        </main>
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch({ type: actionTypes.LOGOUT })
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Inbox);
