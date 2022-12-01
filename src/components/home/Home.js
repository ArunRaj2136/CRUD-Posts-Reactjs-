import React, { useState, useEffect, useContext } from "react";
import SinglePost from "../single-post/SinglePost";
import useFetch from "../hooks/useFetch";
import Grid from "@mui/material/Grid";
import { UserContext } from "../context/User.context";
import { db, getPosts } from "../utils/firebase.utils";
import { doc, getDoc, getDocs } from "firebase/firestore";

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
        console.log("posttts", posts);
        setUserPosts(posts);
      }
    };
    getUserPosts();
  }, [currentUser]);
  return (
    <div>
      <Grid
        container
        spacing={2}
        alignItems="stretch"
        direction="row"
        justifyContent="flex-start"
      >
        {currentUser &&
          userPosts &&
          userPosts.map((item, index) => {
            return (
              <Grid xs={12} md={6} lg={4} item key={index}>
                <SinglePost {...item} />
              </Grid>
            );
          })}
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
      </Grid>
    </div>
  );
}

export default Home;
