import React from "react";
import MainLayout from "../layouts/MainLayout";
import PostsContainer from "../components/PostsContainer";
import PostsContext from "../contexts/PostsContext";

const Home = () => {
  return (
    <>
      <PostsContext>
        <MainLayout>
          <PostsContainer />
        </MainLayout>
      </PostsContext>
    </>
  );
};

export default Home;
