import React from "react";
import "./SinglePost.scss";
import { Link } from "react-router-dom";

function SinglePost({ body, title, id, userId }) {
  return (
    <div className="post__container">
      <h2 className="post__container--title">{title}</h2>
      <h3 className="post__container--body">{body}</h3>
      <p className="post__container--id">
        post id : <span>{id}</span>
        <Link className="nav-link" to="/create-post">
          <button
            onClick={() => {
              localStorage.setItem("tile", title);
              localStorage.setItem("body", body);
              localStorage.setItem("id", id);
            }}
          >
            update
          </button>
        </Link>
      </p>
    </div>
  );
}

export default SinglePost;
