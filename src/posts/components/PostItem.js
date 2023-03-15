import React, { useContext } from "react";
import Card from "../../shared/components/UIElements/Card";
import AuthContext from "../../shared/context/auth-context";
import "./PostItem.css";
import { Link, useNavigate } from "react-router-dom";
import useAxios from "../../shared/hooks/use-http";

const PostItem = (props) => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const { fetchData } = useAxios({});
  const deleteHandler = async () => {
    try {
      await fetchData({
        url: `http://localhost:5000/api/posts/${props.id}`,
        method: "DELETE",
        headers: { Authorization: "Bearer " + auth.token },
      });

      navigate("/");
    } catch (err) {}
  };

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
        <div className="post-item__action">
          <button className="btn btn-warning">
            <Link to={`/posts/${props.id}`}>Update</Link>
          </button>
          <button className="btn btn-error" onClick={deleteHandler}>
            Delete
          </button>
        </div>
      </Card>
    </li>
  );
};

export default PostItem;
