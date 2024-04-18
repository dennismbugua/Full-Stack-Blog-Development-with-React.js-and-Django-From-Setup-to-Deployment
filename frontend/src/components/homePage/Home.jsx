import React from "react";
import RecentArticles from "./RecentArticles";
import FeaturedArticle from "./FeaturedArticle";

export default function Home() {
  return (
    <>
      <div className="container mt-5 pt-5">
        {/* Featured Article */}
        <div className="card-body">
          <h5 className="card-title fw-bold text-center display-6">
            Featured Article
          </h5>
        </div>
        <FeaturedArticle />

        <hr />
        {/* Recent Articles */}
        <div className="card-body">
          <h5 className="card-title fw-bold text-center display-6">
            Recent Articles
          </h5>
        </div>
        <RecentArticles />
      </div>
    </>
  );
}
