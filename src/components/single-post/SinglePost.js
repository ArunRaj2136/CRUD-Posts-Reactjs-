import React from "react";
import "./SinglePost.scss";

function SinglePost({ body, title, id, userId }) {
  console.log("props", body, title, id, userId);
  return (
    <div className="post__container">
      <h3 className="post__container--title">{title}</h3>
      <p className="post__container--body">{body}</p>
      <p className="post__container--id">{id}</p>
    </div>
  );
}

export default SinglePost;
