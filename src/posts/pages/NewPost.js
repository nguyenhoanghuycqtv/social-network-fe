import React from "react";
import "./NewPost.css";
import Input from "../../shared/components/FormElements/Input";

const NewPost = () => {
  return <form className="post-form"><Input element='input' type="text" label="Title" /></form>;
};

export default NewPost;
