import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import BlogFeeds from "./components/blog/BlogFeeds";
import { lazy, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Home from "./components/homePage/Home";
import ErrorFallback from "./components/error/ErrorFallback";

const BlogDetails = lazy(() => import("./components/blog/BlogDetails"));

function App() {
  const navigate = useNavigate();

  return (
    <>
      {/* <NavBar /> */}
      <Routes>
        <Route
          exact
          path="/articles/:slug"
          element={
            <ErrorBoundary
              onReset={() => navigate("/")}
              fallbackRender={({ error, resetErrorBoundary }) => (
                <ErrorFallback
                  error={error}
                  resetErrorBoundary={resetErrorBoundary}
                />
              )}
            >
              <Suspense>
                <>
                  <BlogDetails />
                </>
              </Suspense>
            </ErrorBoundary>
          }
        />

        <Route
          exact
          path="/articles"
          element={
            <ErrorBoundary
              onReset={() => navigate("/")}
              fallbackRender={({ error, resetErrorBoundary }) => (
                <ErrorFallback
                  error={error}
                  resetErrorBoundary={resetErrorBoundary}
                />
              )}
            >
              <Suspense>
                <BlogFeeds />
              </Suspense>
            </ErrorBoundary>
          }
        />

        <Route
          exact
          path="/"
          element={
            <ErrorBoundary
              onReset={() => navigate("/")}
              fallbackRender={({ error, resetErrorBoundary }) => (
                <ErrorFallback
                  error={error}
                  resetErrorBoundary={resetErrorBoundary}
                />
              )}
            >
              <Suspense>
                <>
                  <Home />
                </>
              </Suspense>
            </ErrorBoundary>
          }
        />
      </Routes>
    </>
  );
}

export default App;
