import React from "react";
import SinglePost from "../single-post/SinglePost";
import useFetch from "../hooks/useFetch";
import Grid from "@mui/material/Grid";

function Home() {
  const { isLoading, serverError, apiData } = useFetch(
    "https://jsonplaceholder.typicode.com/posts"
  );
  console.log(serverError);
  return (
    <div>
      <Grid
        container
        spacing={2}
        alignItems="stretch"
        direction="row"
        justifyContent="flex-start"
      >
        {isLoading
          ? "loading"
          : apiData &&
            apiData.map((item) => {
              return (
                <Grid xs={12} md={6} lg={4}>
                  <SinglePost {...item} />
                </Grid>
              );
            })}
      </Grid>
    </div>
  );
}

export default Home;
