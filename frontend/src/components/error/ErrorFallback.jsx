import React from "react";
import { Link } from "react-router-dom";

function ErrorFallback({ error, resetErrorBoundary }) {
  // Logging the error to the server or a logging service
  //   console.error("Error occurred:", error);

  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div className="text-center">
        <h1 className="display-1 fw-bold">404</h1>
        <p className="fs-3 fw-bold">
          {" "}
          <span className="text-danger">Oops!</span> Something went wrong.
        </p>
        <h3 className="lead fw-bold text-center lh-base pb-4">
          We apologize for the inconvenience.
        </h3>
        <Link to="/">
          <h4 className="text-decoration-underline fw-bold">
            Go back to the homepage
          </h4>
        </Link>
      </div>
    </div>
  );
}

export default ErrorFallback;
