import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { BulletList } from "react-content-loader";
import BlogAPI from "../../API/BlogAPI";

export default function FeaturedArticle() {
  // SCROLL TO TOP
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const MyBulletListLoader = () => <BulletList />;
  const { slug } = useParams();

  const [featuredBlog, setFeaturedBlog] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Loader
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);

    // FeaturedAticle
    const fetchData = async () => {
      try {
        const res = await BlogAPI.get(`/api/blog/featured`);
        // If there are no featured posts
        if (res.data && res.data.length > 0) {
          setFeaturedBlog(res.data[0]);
        }
      } catch (err) {
        // Handle the error here
        console.log(err); // Log the error for debugging purposes
        // You can show an error message to the user or display a fallback UI
        // For example:
        setFeaturedBlog([]); // Set the featuredBlog state to an empty array
      }
    };
    fetchData();
  }, [slug]);

  return (
    <>
      <div
        className="bg-image p-5 text-center shadow-1-strong rounded mb-5 text-white"
        style={{
          backgroundImage: `url("https://mdbcdn.b-cdn.net/img/new/slides/003.webp")`,
        }}
      >
        {loading ? (
          <h1 className="mb-3 h2">
            <MyBulletListLoader />
          </h1>
        ) : featuredBlog.length === 0 ? (
          <h1 className="mb-3 h2">
            Stay tuned for my upcoming featured articles!
          </h1>
        ) : (
          <>
            <h1 className="mb-3 h2">
              <Link
                to={`/articles/${featuredBlog.slug}`}
                onClick={scrollToTop}
                className="text-decoration-underline text-white fw-bold text-capitalize display-3"
              >
                {featuredBlog.title}
              </Link>
            </h1>
            <button type="button" className="btn btn-primary">
              <h6 className="fw-bold">
                <Link
                  to={`/articles/${featuredBlog.slug}`}
                  className="text-white fs-3"
                >
                  Explore Now
                </Link>
              </h6>
            </button>
          </>
        )}
      </div>
    </>
  );
}
