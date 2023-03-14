import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../shared/components/UIElements/Card";
import "./Auth.css";
import useInput from "../../shared/hooks/use-input";
import AuthContext from "../../shared/context/auth-context";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import ImageUpload from "../../shared/components/FormElemens/ImageUpload";
import useAxios from "../../shared/hooks/use-http";
const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [error, setError] = useState(null);
  const [file, setFile] = useState({ value: null, isValid: undefined });

  const { loading, fetchData } = useAxios({});
  const navigate = useNavigate();

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
        const responseData =  await fetchData({
          url: "http://localhost:5000/api/users/login",
          method: "POST",
          headers: { "Content-Type": "application/json" },
          data: { email: enteredEmail, password: enteredPassword },
        });
        console.log(responseData)
        auth.login(responseData.userId, responseData.token);
        navigate('/')
      } catch (err) {}
    } else {
      try {
        const formData = new FormData();
        formData.append("name", enteredName);
        formData.append("image", file.value);
        formData.append("email", enteredEmail);
        formData.append("password", enteredPassword);
        const responseData = await fetchData({
          url: "http://localhost:5000/api/users/signup",
          method: "POST",
          data: formData,
        });
        auth.login(responseData.userId, responseData.token);
        navigate("/");
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

  const handleFileUpload = (pickedFile, fileIsValid) => {
    const imageUploaded = { value: pickedFile, isValid: fileIsValid };
    setFile(imageUploaded);
  };

  return (
    <>
      {error && (
        <ErrorModal
          error={error}
          onClick={() => {
            setError(null);
          }}
        />
      )}
      <Card className="authentication">
        {loading && <LoadingSpinner asOverlay />}
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
          {!isLoginMode && (
            <ImageUpload id="image" center onInput={handleFileUpload} />
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
