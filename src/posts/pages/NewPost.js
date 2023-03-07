import React from "react";
import "./NewPost.css";
import useInput from "../../shared/hooks/use-input";
import Card from "../../shared/components/UIElements/Card";

const NewPost = () => {
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

  const postSubmitHandler = (e) => {
    e.preventDefault();
    console.log({ enteredTitle, enteredContent });
  };

  let formIsValid = enteredContentIsValid && enteredTitleIsValid;

  return (
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
        <div>
          <button type="submit" disabled={!formIsValid}>
            Submit
          </button>
        </div>
      </form>
    </Card>
  );
};

export default NewPost;
