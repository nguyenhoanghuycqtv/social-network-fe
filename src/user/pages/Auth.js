import { useState, useContext } from "react";
import Card from "../../shared/components/UIElements/Card";
import "./Auth.css";
import useInput from "../../shared/hooks/use-input";
import AuthContext from "../../shared/context/auth-context";
const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);

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

  const authSubmitHandler = (e) => {
    e.preventDefault();
    console.log({ enteredName, enteredEmail, enteredPassword });
    auth.login();
  };

  let formIsValid = enteredEmailIsValid && enteredPasswordIsValid;

  return (
    <Card className="authentication">
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
  );
};

export default Auth;
