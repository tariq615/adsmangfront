import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import userAuth from "../mongodb/userAuth";

const Blog = () => {
  // Component state for each field
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");
  // const [status, setStatus] = useState("active");
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  // Simulated submit handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Your validation and form handling code here
    if (!title) {
      setError("Title is required");
      return;
    }
    setError("");

    console.log("Title:", title);
    console.log("Subtitle:", subtitle);
    console.log("Content:", content);
    // console.log("Status:", status);
    console.log("Image:", image);

    const postData = new FormData();
    postData.append("title", title);
    postData.append("subtitle", subtitle);
    postData.append("content", content);
    postData.append("image", image);

    try {
      const response = await userAuth.postBlog(
        postData,
        localStorage.getItem("token")
      );
      console.log(response);
      if (response.status === 201) {
        navigate("/admin/blogs");
      }
    } catch (error: any) {
      setError(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-group">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter title"
        />
      </div>

      <div className="form-group">
        <label htmlFor="subtitle">Subtitle:</label>
        <input
          type="text"
          id="subtitle"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          placeholder="Enter subtitle"
        />
      </div>

      <div className="form-group">
        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter content"
        ></textarea>
      </div>

      {/* <div className="form-group">
        <label htmlFor="status">Status:</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="active">active</option>
          <option value="inactive">inactive</option>
        </select>
      </div> */}

      <div className="form-group">
        <label htmlFor="featuredImage">Featured Image:</label>
        <input
          type="file"
          id="featuredImage"
          accept="image/png, image/jpg, image/jpeg, image/gif, image/webp"
          onChange={handleFileChange}
        />
      </div>

      {/* {error && <p className="error">{error}</p>} */}
      <button type="submit">Submit</button>
    </form>
  );
};

export default Blog;
