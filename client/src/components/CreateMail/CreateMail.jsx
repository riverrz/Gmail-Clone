import React, { Component, Fragment } from "react";
import "./CreateMail.css";

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
    return (
      <Fragment>
        <div
          className="CreateMail__container"
          onClick={this.createMailHandler}
        >
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
        </div>
      </Fragment>
    );
  }
}

export default CreateMail;
