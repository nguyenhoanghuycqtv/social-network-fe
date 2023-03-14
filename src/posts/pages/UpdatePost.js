import React, { useContext, useEffect, useState } from "react";
import "./NewPost.css";
import { useParams } from "react-router-dom";
import useInput from "../../shared/hooks/use-input";
import Card from "../../shared/components/UIElements/Card";
import axios from "axios";
import AuthContext from "../../shared/context/auth-context";

const NewPost = () => {
  const auth = useContext(AuthContext);
  const postId = useParams().postId;

  const [loadedPost, setLoadedPost] = useState();

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

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/posts/${postId}`
        );
        setLoadedPost(response.data.post);
      } catch (err) {}
    };
    fetchPost();
  }, []);

  const postSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `http://localhost:5000/api/posts/${postId}`,
        { title: enteredTitle, content: enteredContent },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.token,
          },
        }
      );

      console.log(response);
    } catch (err) {}
  };

  let formIsValid = enteredContentIsValid && enteredTitleIsValid;

  return (
    <React.Fragment>
      <Card className="new-post">
        <h2>Edit Post</h2>
        <form onSubmit={postSubmitHandler}>
          <div>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              onChange={titleChangeHandler}
              onBlur={titleBlurHandler}
              placeholder={loadedPost && loadedPost.title}
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
              placeholder={loadedPost && loadedPost.content}
            />
            {contentInputHasError && <p>invalid content</p>}
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
