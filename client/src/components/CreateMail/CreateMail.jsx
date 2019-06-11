import React, { Component, Fragment } from "react";
import * as mailActions from "../../store/actions/mail";
import { connect } from "react-redux";
import "./CreateMail.css";
import Loader from "../Loader/Loader";

class CreateMail extends Component {
  state = {
    createMail: false
  };

  createMailHandler = () => {
    this.setState(prevState => {
      return {
        createMail: !prevState.createMail
      };
    });
  };
  render() {
    let content;
    if (this.props.loading) {
      content = <Loader />;
    } else if (this.props.error) {
      content = (
        <div>
          {this.props.errorMessages.map((error, i) => (
            <p key={i}>{error}</p>
          ))}
        </div>
      );
    } else if (this.props.mailSent) {
      content = <p>Mail sent successfully!</p>;
    } else {
      content = (
        <form className="CreateMail__form">
          <div className="form__control">
            <label htmlFor="receiver">Receiver:</label>
            <input
              type="text"
              name="receiver"
              placeholder="Username of receiver"
              id="receiver"
            />
          </div>
          <div className="form__control">
            <label htmlFor="subject">Subject:</label>
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              id="subject"
            />
          </div>
          <div className="form__control">
            <textarea
              name="body"
              id="body"
              cols="30"
              rows="7"
              placeholder="Body of the mail"
            />
          </div>
          <button className="CreateMail__sendBtn">
            <i className="fas fa-paper-plane" />
          </button>
        </form>
      );
    }
    return (
      <Fragment>
        <div className="CreateMail__container" onClick={this.createMailHandler}>
          <button className="CreateMail__createBtn">
            <i
              className={`fas fa-plus ${
                this.state.createMail ? "CreateMail__createBtn--close" : ""
              }`}
            />
          </button>
        </div>
        <div
          className={`CreateMail__formContainer ${
            this.state.createMail
              ? "formContainer--visible"
              : "formContainer--hidden"
          }`}
        >
          {content}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state.mail
  };
};

const mapDispatchToProps = dispatch => {
  return {
    mailInit: mailObj => dispatch(mailActions.mailInit(mailObj))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateMail);
