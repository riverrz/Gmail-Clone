import * as actionTypes from "../actions/actionTypes";

export const mailInit = mailObj => {
  return dispatch => {
    dispatch({ type: actionTypes.LOADING });
    return fetch("/api/mail/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(data => {
        if (!data.success) {
          return dispatch(mailError(data.messages));
        }
        return dispatch(authSuccess());
      })
      .catch(err => {
        return dispatch(mailError([err.message]));
      });
  };
};
export const authSuccess = () => {
  return {
    type: actionTypes.MAIL_SUCCESS
  };
};
export const mailError = errorMessageArr => {
  return {
    type: actionTypes.MAIL_ERROR,
    payload: {
      errorMessageArr
    }
  };
};
