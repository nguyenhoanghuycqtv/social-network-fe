import React, { useContext, useState } from "react";
import "./NewPost.css";
import { useNavigate } from "react-router-dom";
import useInput from "../../shared/hooks/use-input";
import Card from "../../shared/components/UIElements/Card";
import AuthContext from "../../shared/context/auth-context";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ImageUpload from "../../shared/components/FormElemens/ImageUpload";
import useAxios from "../../shared/hooks/use-http";

const NewPost = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [file, setFile] = useState({ value: null, isValid: undefined });
  const auth = useContext(AuthContext);
  const {
    value: enteredTitle,
    isValid: enteredTitleIsValid,
    hasError: titleInputHasError,
    valueChangeHandler: titleChangeHandler,
    inputBlurHandler: titleBlurHandler,
    reset: resetTitle,
  } = useInput((enteredTitle) => enteredTitle.trim() !== "");

  const {
    value: enteredContent,
    isValid: enteredContentIsValid,
    hasError: contentInputHasError,
    valueChangeHandler: contentChangeHandler,
    inputBlurHandler: contentBlurHandler,
    reset: resetContent,
  } = useInput((enteredContent) => enteredContent.trim() !== "");

  const { loading, fetchData } = useAxios({});

  const postSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", enteredTitle);
    formData.append("content", enteredContent);
    formData.append("image", file.value);
    formData.append("creator", auth.userId);
    if (formData) {
      try {
        await fetchData({
          url: "http://localhost:5000/api/posts",
          method: "POST",
          headers: { Authorization: "Bearer " + auth.token },
          data: formData,
        });

        navigate("/");
      } catch (err) {
        console.log(err);
      }
    }
  };

  let formIsValid = enteredContentIsValid && enteredTitleIsValid;

  const handleFileUpload = (pickedFile, fileIsValid) => {
    const imageUploaded = { value: pickedFile, isValid: fileIsValid };
    setFile(imageUploaded);
  };

  return (
    <React.Fragment>
      {error && (
        <ErrorModal
          error={error}
          onClick={() => {
            setError(null);
          }}
        />
      )}
      {loading && <LoadingSpinner />}
      <Card className="new-post">
        <h2>New Post</h2>
        <form onSubmit={postSubmitHandler}>
          <div>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              onChange={titleChangeHandler}
              onBlur={titleBlurHandler}
            />
            {titleInputHasError && <p>invalid title</p>}
          </div>
          <div>
            <label htmlFor="content">Content</label>
            <textarea
              type="text"
              id="content"
              name="content"
              onChange={contentChangeHandler}
              onBlur={contentBlurHandler}
              rows="3"
            />
            {contentInputHasError && <p>invalid content</p>}
          </div>
          <ImageUpload id="image" center onInput={handleFileUpload} />
          <div>
            <button type="submit" disabled={!formIsValid}>
              Submit
            </button>
          </div>
        </form>
      </Card>
    </React.Fragment>
  );
};

export default NewPost;
