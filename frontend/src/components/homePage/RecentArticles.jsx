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

  let getTime = (blog) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(blog).toLocaleDateString("en", options);
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
      <>
        <div className="col" key={index}>
          <div className="card h-100">
            <Link
              to={`/articles/${blogPost.slug}`}
              onClick={scrollToTop}
              className="text-decoration-none"
            >
              <img
                src={blogPost.image}
                className="card-img-top"
                alt={blogPost.title}
                style={{ height: "60vh" }}
              />
            </Link>
            <div className="card-body">
              <p className="card-text">
                {loading ? (
                  <MyBulletListLoader />
                ) : (
                  <Link
                    to={`/articles/${blogPost.slug}`}
                    onClick={scrollToTop}
                    className="text-decoration-none"
                  >
                    <h5 className="card-title fs-3 fw-bold">
                      {capitalLetter(blogPost.title)}
                    </h5>
                  </Link>
                )}
              </p>
            </div>
            <div className="card-footer">
              <small className="text-dark">
                Published on {getTime(blogPost.updated)}
              </small>
            </div>
          </div>
        </div>
      </>
    ));
  };

  return (
    <>
      <div className="row row-cols-1 row-cols-md-2 g-4">{getBlogs()}</div>
      <div className="mt-4 text-center">
        <Link to="/articles" className="btn btn-primary fs-4 fw-bold">
        Discover More
        </Link>
      </div>
    </>
  );
}