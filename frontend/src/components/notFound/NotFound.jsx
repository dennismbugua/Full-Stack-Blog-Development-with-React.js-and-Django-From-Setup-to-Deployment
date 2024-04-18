import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div className="text-center">
        <h1 className="display-1 fw-bold">404</h1>
        <p className="fs-3 fw-bold">
          {" "}
          <span className="text-danger">Oops!</span> Looks like you've ventured into
          uncharted territory.
        </p>
        <h3 className="lead fw-bold text-center lh-base pb-4">
          The page you're looking for may have taken a wrong turn. But don't
          worry, my team of tech wizards is on the case! Meanwhile, feel free to
          explore other areas of my blog and discover exciting content. I
          apologize for any inconvenience and appreciate your understanding.
          Happy browsing!
        </h3>
        <Link to="/">
          <h4 className="text-decoration-underline fw-bold">
            Discover more amazing content on my blog. Head back to the homepage
            and continue your journey with me!
          </h4>
        </Link>
      </div>
    </div>
  );
}
