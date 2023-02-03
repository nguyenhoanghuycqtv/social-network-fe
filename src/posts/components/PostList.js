import React from "react";
import Card from "../../shared/components/UIElements/Card";
import PostItem from "./PostItem";
import "./PostList.css";

const PostList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="post-list">
        <Card>
          <h2>No Post</h2>
        </Card>
      </div>
    );
  }

  return (
    <ul className="post-list">
      {props.items.map((item) => (
        <PostItem
          key={item.id}
          id={item.id}
          image={item.imageUrl}
          title={item.title}
          content={item.content}
          creatorId={item.creator}
        />
      ))}
    </ul>
  );
};

export default PostList;
