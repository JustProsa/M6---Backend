import React, { useContext, useState, useEffect } from "react";
import PostCard from "./PostCard";
import ResponsivePagination from "react-responsive-pagination";
import { Col, Row } from "react-bootstrap";
import AddPostModal from "./AddPostModal";
import AddCommentsModal from "./AddCommentsModal";
// import { PostsProvider } from "../contexts/PostsContext";

const PostsContainer = () => {
  // const { posts, isLoading } = useContext(PostsProvider);

  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [comments, setComments] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(null);

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

  const getCommentsForPost = async (postId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/posts/${postId}/comments`
      );

      const data = await response.json();

      setComments(data); // Memorizza i commenti nello stato dei commenti
      console.log(comments);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPosts();

    console.log(posts);
    // console.log(selectedPostId);
  }, [currentPage]);

  // useEffect(() => {
  //   // Recupera i commenti quando il componente viene montato
  //   if (posts && posts.posts) {
  //     // Assicurati che ci siano post prima di cercare di recuperare i commenti
  //     getCommentsForPost(posts.posts[0]._id); // Recupera i commenti del primo post
  //   }
  // }, [posts]);

  console.log(posts);

  return (
    <>
      <AddPostModal />
      <Row>
        <Col sm={8}>
          <Row className="m-5">
            {posts &&
              posts.posts?.map((post, index) => {
                const isSelected = post._id === selectedPostId;
                return (
                  <Col key={index}>
                    <PostCard
                      onClick={() => {
                        getCommentsForPost(post._id);
                        setSelectedPostId(post._id);
                      }}
                      isSelected={isSelected}
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
        </Col>
        <Col sm={4}>
          <div
            style={{
              margin: "2rem 1rem 0 1rem",
              borderRadius: "15px",
            }}
          >
            <div>
              <Row>
                <Col>
                  <h3>Commenti</h3>
                </Col>
                <Col>
                  <AddCommentsModal postId={selectedPostId} />
                </Col>
              </Row>
            </div>

            {comments.map((comment, index) => {
              return (
                <div key={index}>
                  <p>{comment.text}</p>

                  {/* Visualizza altri dettagli del commento se necessario */}
                </div>
              );
            })}
          </div>
        </Col>
      </Row>
    </>
  );
};

export default PostsContainer;
