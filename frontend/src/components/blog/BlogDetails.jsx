import React, { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom";
import Me from "./me.jpeg";
import { BulletList } from "react-content-loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useReactToPrint } from "react-to-print";
import {
  TelegramShareButton,
  TelegramIcon,
  TwitterShareButton,
  TwitterIcon,
  EmailShareButton,
  EmailIcon,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import BlogAPI from "../../API/BlogAPI";
import RecentArticles from "./recentArticles";
import NotFound from "../notFound/NotFound";

export default function BlogDetails() {
  // SCROLL TO TOP
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const MyBulletListLoader = () => <BulletList />;

  const [error, setError] = useState(false);

  const [blog, setBlog] = useState({});

  const { slug } = useParams();

  const [featuredBlog, setFeaturedBlog] = useState([]);

  const [loading, setLoading] = useState(true);

  const copied = () => toast("👏 Copied to Clipboard!");

  const print = () => toast("Send to print!");

  const [open, setOpen] = useState(false);

  const handleCopyClipBoard = () => {
    setOpen(true);
    navigator.clipboard.writeText(window.location.toString());
  };

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(() => {
    // Loader
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);

    // FeaturedAticle
    const fetchData = async () => {
      try {
        const res = await BlogAPI.get(`/api/blog/featured`);
        // If there are no featured posts
        if (res.data && res.data.length > 0) {
          setFeaturedBlog(res.data[0]);
        }
      } catch (err) {}
    };
    fetchData();

    // BlogPost
    const fetchBlog = async () => {
      try {
        const response = await BlogAPI.get(`/api/blog/${slug}`); // <-- passed to API URL
        setBlog(response.data);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setError(true);
        } else {
          // Handle other errors, such as network issues
          // console.error(err);
        }
      }
    };
    fetchBlog();
  }, [slug]);

  const createBlog = () => {
    return { __html: blog.body };
  };
  const capitalLetter = (word) => {
    if (word) return word.charAt(0).toUpperCase() + word.slice(1);
    return "";
  };

  const shareUrl = `https://www.yourwebsite.com/${slug}`;

  let getTime = (blog) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(blog).toLocaleDateString("en", options);
  };

  return (
    <>
      {error ? (
        <NotFound />
      ) : (
        <div className="container mt-5">
          <div className="row">
            <div className="col-lg-8 mt-5 mb-5">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb bg-white">
                  <li className="breadcrumb-item fw-bold">
                    <Link to="/articles">
                      <i className="fa fa-angle-double-left" /> Back to blog
                    </Link>
                  </li>
                </ol>
              </nav>
              {loading ? (
                <MyBulletListLoader />
              ) : (
                <article>


                  <section
                    ref={componentRef}
                    removeAfterPrint={true}
                    documentTitle="www.dennismbugua.co.ke"
                  >
                    <header className="mb-4">
                      <h1 className="fw-bolder mb-1">
                        {capitalLetter(blog.title)}
                      </h1>
                    </header>
                    <p className="post-meta">
                      <i className="fa fa-calendar-days"></i>{" "}
                      {getTime(blog.updated)}
                    </p>
                    <figure className="mb-4">
                      <img
                        className="img-fluid rounded w-100"
                        src={blog.image}
                        alt={blog.title}
                        style={{
                          height: "600px",
                          width: "500px",
                          borderRadius: "10px",
                        }}
                      />
                    </figure>

                    <p
                      className="fs-5 text-dark"
                      dangerouslySetInnerHTML={createBlog()}
                    />
                  </section>

                  <section className="text-center border-top border-bottom py-4 mb-4">
                    <p>
                      <strong>
                        Share this post with your friends and spread the
                        knowledge!
                      </strong>
                    </p>
                    <ul className="mr-3">
                      <li>
                        <TwitterShareButton
                          url={shareUrl}
                          title={blog.title}
                          via={"dennismbugua_"}
                        >
                          <TwitterIcon size={40} round={true} />
                        </TwitterShareButton>
                      </li>

                      <li>
                        <EmailShareButton
                          subject="IMPORTANT AND URGENT!"
                          url={shareUrl}
                          body="This is one of the most awesome article I've read today"
                        >
                          <EmailIcon size={40} round={true} />
                        </EmailShareButton>
                      </li>

                      <li>
                        <WhatsappShareButton
                          url={shareUrl}
                          title={blog.title}
                          separator={" "}
                        >
                          <WhatsappIcon size={40} round={true} />
                        </WhatsappShareButton>
                      </li>

                      <li>
                        <TelegramShareButton url={shareUrl} title={blog.title}>
                          <TelegramIcon size={40} round={true} />
                        </TelegramShareButton>
                      </li>

                      <li>
                        <i
                          className="fa wp-icon fa-solid fa-print fa-1x cursor-pointer"
                          onClick={() => {
                            handlePrint();
                            print();
                          }}
                        ></i>
                      </li>
                      <li>
                        <i
                          className="wp-icon fa fa-copy fa-solid fa-1x"
                          onClick={() => {
                            handleCopyClipBoard();
                            copied();
                          }}
                        ></i>
                      </li>
                      <ToastContainer />
                    </ul>
                  </section>

                </article>
              )}
            </div>

            <div className="col-lg-4">
              <div className="position-sticky" style={{ top: "6rem" }}>
                {/* FeaturedPost */}
                <div className="card">
                  <div
                    style={{
                      borderRadius: "10px",
                      padding: "10px",
                      border: "2px",
                    }}
                  >
                    <div className="card-header text-uppercase fw-bold text-center">
                      Featured Article
                    </div>
                    <div className="card-body" style={{ borderRadius: "10px" }}>
                      <p>
                        {loading ? (
                          <MyBulletListLoader />
                        ) : featuredBlog.length === 0 ? (
                          <p>Stay tuned for my upcoming featured articles!</p>
                        ) : (
                          <Link
                            to={`/articles/${featuredBlog.slug}`}
                            onClick={scrollToTop}
                            className="text-decoration-none fw-bold fs-5"
                          >
                            {capitalLetter(featuredBlog.title)}
                          </Link>
                        )}
                      </p>
                      <hr className="text-dark" />
                    </div>
                  </div>
                </div>

                {/* Recent Articles */}
                <div className="card mt-5">
                  <div className="card-header text-uppercase fw-bold text-center">
                    Recent Article
                  </div>
                  <RecentArticles />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
