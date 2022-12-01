import React from "react";
import "./SinglePost.scss";
import { Link } from "react-router-dom";

function SinglePost({ body, title, id, userId }) {
  return (
    <div className="post__container">
      <h3 className="post__container--title">{title}</h3>
      <p className="post__container--body">{body}</p>
      <p className="post__container--id">{id}</p>
      <Link className="nav-link" to="/create-post">
        <button>update</button>
      </Link>
    </div>
  );
}

export default SinglePost;
