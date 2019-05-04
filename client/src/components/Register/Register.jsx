import React, { Component } from "react";
import { connect } from "react-redux";
import * as AuthActions from "../../store/actions/auth";
import { Redirect } from "react-router-dom";
import "./Register.css";
import Loader from "../Loader/Loader";

class Register extends Component {
  state = {
    username: "",
    password: ""
  };
  handleInput = (event, key) => {
    this.setState({
      [key]: event.target.value
    });
  };
  handleForm = event => {
    event.preventDefault();
    // Dispatch authInit with user and type as "Register"
    const user = {
      username: this.state.username,
      password: this.state.password,
    };
    this.props.handleForm({ user, type: "Register" });
  };
  render() {
    let content;
    let errorMessageArr;
    if (this.props.loading) {
      // Show Loader
      content = <Loader />;
    } else if (this.props.isLoggedIn) {
      content = <Redirect to="/inbox" />;
    } else {
      // Show register form if not registered
      if (this.props.error) {
        errorMessageArr = this.props.errorMessageArr.map((error, i) => {
          return <span key={i}>{error}</span>;
        });
      }
      content = (
        <form onSubmit={this.handleForm} className="Register__form">
          <div className="Register__form__control">
            <label htmlFor="name">Username:</label>
            <input
              type="text"
              name="username"
              id="username"
              onChange={event => this.handleInput(event, "username")}
              required
            />
          </div>
          <div className="Register__form__control">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={event => this.handleInput(event, "password")}
              required
            />
          </div>
          <input type="submit" value="Register" />
        </form>
      );
    }
    return (
      <div className="Register__container">
        <div className="errors">{errorMessageArr}</div>
        {content}
        <a href="/login">Login</a>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    errorMessageArr: state.auth.errorMessageArr,
    isLoggedIn: state.auth.isLoggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleForm: data => dispatch(AuthActions.authInit(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
