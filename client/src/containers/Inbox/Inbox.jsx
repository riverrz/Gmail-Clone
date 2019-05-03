import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions/actionTypes";
import Loader from "../../components/Loader/Loader";
import "./Inbox.css";

class Inbox extends Component {
  state = {
    loading: false,
    mails: [],
    error: false,
    errorMessageArr: []
  };
  handleLogout = () => {
    // Remove the token from local storage
    localStorage.removeItem("token");
    // Dispatch logout action
    this.props.logout();
  };
  componentDidMount() {
    // Fetch all mails for logged in user
    this.fetchMails();
  }
  fetchMails = () => {
    this.setState({
      loading: true
    });
    fetch("/api/mail/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(data => {
        if (!data.success) {
          return this.setState({
            loading: false,
            error: true,
            errorMessageArr: data.messages
          });
        }
        this.setState({
          loading: false,
          mails: data.mails
        });
      })
      .catch(err => {
        this.setState({
          error: true,
          errorMessageArr: [err.message]
        });
      });
  };
  render() {
    let content;
    if (this.state.loading) {
      content = <Loader />;
    } else if (this.state.error) {
      content = this.props.errorMessageArr.map((err, i) => {
        return <p key={i}>{err}</p>;
      });
    } else {
      content = this.state.mails.map((mail, i) => {
        mail.createdAt = new Date(mail.createdAt).toLocaleDateString();
        return (
          <li key={i} className="Inbox__mailList__item">
            <p>{mail.sender.username}</p>
            <p>{mail.subject}</p>
            <p>{mail.createdAt}</p>
          </li>
        );
      });
    }
    return (
      <Fragment>
        <nav className="Inbox__nav">
          Gmail Clone
          <button onClick={this.fetchMails} className="btn">
            Refetch
          </button>
          <button onClick={this.handleLogout} className="btn btn-logout">
            Logout
          </button>
        </nav>
        <main className="Inbox__main">
          <ul className="Inbox__mailList">
            <li className="Inbox__mailList__item Inbox__heading">
              <p>From</p>
              <p>Subject</p>
              <p>Timestamp</p>
            </li>
            {content}
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
