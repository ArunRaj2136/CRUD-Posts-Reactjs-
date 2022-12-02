import React, { useState, useEffect, useContext } from "react";
import SinglePost from "../single-post/SinglePost";
import useFetch from "../hooks/useFetch";
import Grid from "@mui/material/Grid";
import { UserContext } from "../context/User.context";
import { db, getPosts } from "../utils/firebase.utils";
import "./Home.scss";

function Home() {
  const { isLoading, serverError, apiData } = useFetch(
    "https://jsonplaceholder.typicode.com/posts"
  );

  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    let posts;
    const getUserPosts = async () => {
      if (currentUser) {
        posts = await getPosts();
        setUserPosts(posts);
      }
    };
    getUserPosts();
  }, [currentUser]);

  return (
    <div>
      {currentUser && userPosts.length > 0 && (
        <h1 className="user__name">{currentUser?.displayName} Posts</h1>
      )}
      <div className="user__posts">
        {currentUser && userPosts && (
          <>
            {userPosts.map((item, index) => {
              return (
                <Grid xs={12} md={6} lg={4} item key={index}>
                  <SinglePost {...item} update={true} />
                </Grid>
              );
            })}
          </>
        )}
      </div>
      <h2 className="user__name">posts</h2>
      <div className="posts__container">
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          apiData &&
          apiData.map((item, index) => {
            return (
              <Grid xs={12} md={6} lg={4} item key={index}>
                <SinglePost {...item} />
              </Grid>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Home;
