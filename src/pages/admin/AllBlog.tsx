import { Link } from "react-router-dom";
import userAuth from "../../mongodb/userAuth";
import { useState, useEffect } from "react";

const AllBlog = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await userAuth.getAllBlogs(localStorage.getItem("token"));
      console.log(response);
      setPosts(response.data.data);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();

    const intervalId = setInterval(() => {
      fetchPosts();
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className="posts-grid">
      {posts?.map((post) => (
        <PostCard key={post._id} {...post} />
      ))}
    </section>
  );
};

const PostCard = ({ _id, image, title, subtitle, createdBy, views }) => (
    
  <article className="post-card">
    <Link to={`/post/${_id}`} className="post-link">
      <div className="image-container">
        <img src={image} alt={title} className="post-image" />
        <div className="image-overlay"></div>
      </div>

      <div className="post-content">
        <h3 className="post-title">{title}</h3>
        <p className="post-subtitle">{subtitle}</p>

        <div className="post-meta">
          <span className="author">{createdBy?.name}</span>
          <span className="views">{views} views</span>
        </div>
      </div>
    </Link>
  </article>
);

export default AllBlog;
