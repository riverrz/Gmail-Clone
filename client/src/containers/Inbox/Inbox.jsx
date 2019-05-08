import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions/actionTypes";
import Loader from "../../components/Loader/Loader";
import AllMails from "./AllMails/AllMails";
import SingleMail from "./SingleMail/SingleMail";
import CreateMail from "../../components/CreateMail/CreateMail";
import "./Inbox.css";

class Inbox extends Component {
  state = {
    loading: false,
    mails: [],
    error: false,
    errorMessageArr: [],
    showMail: false,
    singleMail: null
  };
  handleLogout = () => {
    // Remove the token from local storage
    localStorage.removeItem("token");
    // Dispatch logout action
    this.props.logout();
    this.props.history.replace("/");
  };
  componentDidMount() {
    // Fetch all mails for logged in user
    this.fetchMails();
    // Redirect to "/"
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
        if (!err.message) {
          err.message = "Try again later";
        }
        this.setState({
          error: true,
          loading: false,
          errorMessageArr: [err.message]
        });
      });
  };

  fetchSingleMail = mailId => {
    this.setState({
      loading: true
    });
    fetch(`/api/mail/${mailId}`, {
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
            errorMessageArr: ["Mail not found"]
          });
        }
        this.setState({
          loading: false,
          singleMail: data.mail,
          showMail: true
        });
      })
      .catch(err => {
        this.setState({
          loading: false,
          error: true,
          errorMessageArr: [err.messages]
        });
      });
  };

  closeSingleMail = () => {
    this.setState({
      showMail: false,
      singleMail: null
    });
  };
  render() {
    let content;
    if (this.state.loading) {
      content = <Loader />;
    } else if (this.state.error) {
      content = this.state.errorMessageArr.map((err, i) => {
        return (
          <p key={i} style={{ color: "red", textAlign: "center" }}>
            {err}
          </p>
        );
      });
    } else if (!this.state.showMail) {
      content = (
        <AllMails mails={this.state.mails} onClick={this.fetchSingleMail} />
      );
    } else if (this.state.showMail) {
      content = (
        <SingleMail
          mail={this.state.singleMail}
          closeHandler={this.closeSingleMail}
        />
      );
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
          <h3>Welcome {this.props.username}</h3>
          {content}
          <CreateMail />
        </main>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    username: state.auth.username
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch({ type: actionTypes.LOGOUT })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Inbox);
