import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import App from "./App.jsx";
import { BlogList, BlogPost } from "./Blog.jsx";

function BlogPostWrapper() {
  var params = useParams();
  return <BlogPost slug={params.slug} />;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/:slug" element={<BlogPostWrapper />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
