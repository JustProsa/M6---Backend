import React, { useContext, useState, useEffect } from "react";
import PostCard from "./PostCard";
import ResponsivePagination from "react-responsive-pagination";
import { Col, Row } from "react-bootstrap";
import AddPostModal from "./AddPostModal";
// import { PostsProvider } from "../contexts/PostsContext";

const PostsContainer = () => {
  // const { posts, isLoading } = useContext(PostsProvider);

  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const getPosts = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/posts?page=${currentPage}`
      );

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
  }, [currentPage]);

  console.log(posts);

  return (
    <>
      <AddPostModal />
      <Row className="m-5">
        {posts &&
          posts.posts?.map((post, index) => {
            return (
              <Col key={index}>
                <PostCard
                  author={post.author.firstName}
                  category={post.category}
                  cover={post.cover}
                  readTime={post.readTime.value}
                  readTimeUnit={post.readTime.timeUnit}
                  title={post.title}
                  avatar={post.author.avatar}
                />
              </Col>
            );
          })}
      </Row>

      <div>
        <ResponsivePagination
          current={currentPage}
          total={posts && posts.totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </>
  );
};

export default PostsContainer;
