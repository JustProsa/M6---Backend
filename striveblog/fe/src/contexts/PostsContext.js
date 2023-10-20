import React, { createContext, useState, useEffect } from "react";

export const PostsProvider = createContext();

const PostsContext = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getPosts = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`http://localhost:54321/posts`);

      const data = await response.json();

      setPosts(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPosts();
    console.log(posts);
  }, []);

  return (
    <>
      <PostsProvider.Provider
        value={{ posts, setPosts, isLoading, setIsLoading }}
      >
        {children}
      </PostsProvider.Provider>
    </>
  );
};

export default PostsContext;
