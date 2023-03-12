import React from "react";
import "./PostItem.css";
import Card from "../../shared/components/UIElements/Card";

const PostItem = (props) => {
  return (
    <li className="post-item">
      <Card className="post-item__content">
        <div className="post-item__image">
          <img
            src={`http://localhost:5000/${props.image}`}
            alt={props.content}
          />
        </div>
        <div className="post-item__info">
          <h2>{props.title}</h2>
          <p>{props.content}</p>
        </div>
        <div className="post-item__action"></div>
      </Card>
    </li>
  );
};

export default PostItem;
