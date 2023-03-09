import { useState, useContext } from "react";
import { redirect } from "react-router-dom";
import Card from "../../shared/components/UIElements/Card";
import "./Auth.css";
import useInput from "../../shared/hooks/use-input";
import AuthContext from "../../shared/context/auth-context";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import useHttpClient from "../../shared/hooks/use-http-client";
const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const {
    isLoading,
    error,
    sendRequest,
    cleanError: errorHandler,
  } = useHttpClient();

  const switchModeHandler = () => {
    setIsLoginMode((prevMode) => !prevMode);
  };

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput((enteredEmail) => enteredEmail.trim().includes("@"));

  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPassword,
  } = useInput((enteredPassword) => enteredPassword.trim().length > 5);

  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetName,
  } = useInput((enteredName) => enteredName.trim() !== "");

  const authSubmitHandler = async (e) => {
    e.preventDefault();

    if (isLoginMode) {
      try {
        await sendRequest("http://localhost:5000/api/users/login", {
          method: "POST",
          "Content-Type": "application/json",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
          }),
        });
        auth.login();
      } catch (err) {}
    } else {
      try {
        await sendRequest("http://localhost:5000/api/users/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: enteredName,
            email: enteredEmail,
            password: enteredPassword,
          }),
        });
        auth.login();
      } catch (err) {}
    }
  };

  let formIsValid = false;
  if (isLoginMode) {
    formIsValid = enteredEmailIsValid && enteredPasswordIsValid;
  } else {
    formIsValid =
      enteredNameIsValid && enteredEmailIsValid && enteredPasswordIsValid;
  }

  return (
    <>
      {error && <ErrorModal error={error} onClick={errorHandler} />}
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        {!isLoginMode ? <h2>Register</h2> : <h2>Login</h2>}
        <form onSubmit={authSubmitHandler}>
          {!isLoginMode && (
            <div>
              <label htmlFor="name">Name</label>
              <input
                type="name"
                id="name"
                name="name"
                onChange={nameChangeHandler}
                onBlur={nameBlurHandler}
              />
              {nameInputHasError && <p>Invalid Name</p>}
            </div>
          )}
          <div>
            <label htmlFor="email">E-Mail</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
            />
            {emailInputHasError && <p>Invalid Email</p>}
          </div>
          <div>
            <label htmlFor="email">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={passwordChangeHandler}
              onBlur={passwordBlurHandler}
            />
            {passwordInputHasError && <p>Invalid Password</p>}
          </div>
          <div>
            {!isLoginMode ? (
              <button type="submit" disabled={!formIsValid}>
                Register
              </button>
            ) : (
              <button type="submit" disabled={!formIsValid}>
                Login
              </button>
            )}
          </div>
          <div>
            <button type="button" onClick={switchModeHandler}>
              Switch
            </button>
          </div>
        </form>
      </Card>
    </>
  );
};

export default Auth;
