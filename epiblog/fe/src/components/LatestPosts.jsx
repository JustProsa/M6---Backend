import React, { useState, useEffect } from "react";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import axios from "axios";
import AxiosClient from "../client/client";
const client = new AxiosClient();

const LatestPosts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState([]);
  console.log(posts);

  const getPosts = async () => {
    try {
      const response = await client.get(`/posts?page=${currentPage}`);
      // const response = await axios.get(
      //   `${process.env.REACT_APP_SERVER_BASE_URL}/posts?page=${currentPage}`
      // );
      // const response = await fetch(
      //   `${process.env.REACT_APP_SERVER_BASE_URL}/posts?page=${currentPage}`
      //   // "http://localhost:5050/posts"
      // );

      // const data = await response.json();
      // setPosts(response.data);
      setPosts(response);
      console.log(posts);
    } catch (error) {
      console.error(error);
    }
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => {
      return currentPage > 1 ? prev - 1 : prev;
    });
  };

  useEffect(() => {
    getPosts();
  }, [currentPage]);

  return (
    <div className="container-fluid">
      {/* Il punto interrogativo si chiama optional chaining e dice "se posts.posts è undefined attendi senza andare in errore" */}
      {posts &&
        posts.posts?.map((post, index) => {
          return <li key={index}>{post.title}</li>;
        })}

      <div>
        <ResponsivePagination
          current={currentPage}
          total={posts && posts.totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default LatestPosts;
