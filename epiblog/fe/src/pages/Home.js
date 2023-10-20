import React, { useState, useEffect } from "react";
import MainLayout from "../layouts/MainLayout";
import AxiosClient from "../client/client";
import PostCard from "../components/PostCard";
import AddPostModal from "../components/AddPostModal";
import { nanoid } from "nanoid";

const client = new AxiosClient();

const Home = () => {
  const [posts, setPosts] = useState(null);
  console.log(posts);

  const getPosts = async () => {
    try {
      const response = await client.get("/posts");
      setPosts(response.posts);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <MainLayout>
        <AddPostModal />
        <div className="w-100 p-2">
          {posts &&
            posts.map((post) => {
              return (
                <PostCard
                  key={nanoid()}
                  cover={post.cover}
                  title={post.title}
                  category={post.category}
                  author={post.author.firstName}
                  price={post.price}
                  rate={post.rate}
                />
              );
            })}
        </div>
      </MainLayout>
    </>
  );
};

export default Home;
