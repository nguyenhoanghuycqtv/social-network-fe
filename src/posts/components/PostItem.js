import React from "react";
import "./PostItem.css";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";

const PostItem = (props) => {
  return (
    <li className="post-item">
      <Card className="post-item__content">
        <div className="post-item__image">
          <img src={props.image} alt={props.content} />
        </div>
        <div className="post-item__info">
          <h2>{props.title}</h2>
          <p>{props.content}</p>
        </div>
        <div className="post-item__action">
          <Button>Test</Button>
          <Button>Test</Button>
          <Button>Test</Button>
        </div>
      </Card>
    </li>
  );
};

export default PostItem;
