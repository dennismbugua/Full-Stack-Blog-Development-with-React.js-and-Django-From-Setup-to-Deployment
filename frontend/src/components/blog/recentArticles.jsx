import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BulletList } from "react-content-loader";
import BlogAPI from "../../API/BlogAPI";

export default function RecentArticles() {
  // SCROLL TO TOP
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const MyBulletListLoader = () => <BulletList />;

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const capitalLetter = (word) => {
    return word ? `${word.charAt(0).toUpperCase()}${word.slice(1)}` : "";
  };

  useEffect(() => {
    // Loader
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);

    const fetchBlogs = async () => {
      try {
        const res = await BlogAPI.get(`/api/blog`);
        setBlogs(res.data);
      } catch (err) {
        // Handle error
      }
    };
    fetchBlogs();
  }, []);

  const getBlogs = () => {
    return blogs.slice(0, 2).map((blogPost, index) => (
      <div className="card-body" key={index} style={{ borderRadius: "10px" }}>
        {loading ? (
          <MyBulletListLoader />
        ) : (
          <Link
            to={`/articles/${blogPost.slug}`}
            onClick={scrollToTop}
            className="text-decoration-none fw-bold fs-5"
          >
            {capitalLetter(blogPost.title)}
          </Link>
        )}
        <hr className="text-dark" />
      </div>
    ));
  };

  return <div>{getBlogs()}</div>;
}
