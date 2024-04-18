import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BulletList } from "react-content-loader";
import BlogAPI from "../../API/BlogAPI";

export default function BlogFeeds() {
  // SCROLL TO TOP
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const MyBulletListLoader = () => <BulletList />;

  const [blogs, setBlogs] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);

  const searchText = (event) => {
    setFilter(event.target.value);
  };

  const dataSearch = blogs.filter((blogPost) => {
    return Object.keys(blogPost).some((key) =>
      blogPost[key]
        .toString()
        .toLowerCase()
        .includes(filter.toString().toLowerCase())
    );
  });

  const capitalLetter = (word) => {
    return word ? `${word.charAt(0).toUpperCase()}${word.slice(1)}` : "";
  };

  useEffect(() => {
    // Loader
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2500);

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
    return dataSearch.map((blogPost, i) => (
      <React.Fragment key={i}>
        <div className="col">
          <div className="post-preview border-bottom">
            {loading ? (
              <MyBulletListLoader />
            ) : (
              <Link
                to={`/articles/${blogPost.slug}`}
                onClick={scrollToTop}
                className="text-decoration-none"
              >
                <h3 className="post-title">{capitalLetter(blogPost.title)}</h3>
                <h4 className="post-subtitle">
                  {capitalLetter(blogPost.subtitle)}
                </h4>
                <p>
                  <i className="fa-solid fa-clock"></i> {blogPost.readTime} Min
                  Read
                </p>
              </Link>
            )}
          </div>
        </div>
      </React.Fragment>
    ));
  };

  return (
    <>
      <div className="container" style={{ marginTop: "100px" }}>
        <div className="row height d-flex justify-content-center align-items-center">
          <div className="col-md-8">
            <div className="search">
              <i className="fa fa-search"></i>
              <input
                type="text"
                className="form-control"
                value={filter}
                onChange={searchText.bind(this)}
                placeholder="Search an article"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container px-4 px-lg-5 mb-5">
        <div className="row gx-4 gx-lg-5 justify-content-center">
          <div className="col-md-10 col-lg-8 col-xl-9 ">{getBlogs()}</div>
        </div>
      </div>
    </>
  );
}
