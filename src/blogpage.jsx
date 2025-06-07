import React, { useEffect, useState } from 'react';
import stack from './contentstackconfig'; // Adjust the import path to your Contentstack SDK setup
import { BrowserRouter as Router, Route, Routes,Link } from 'react-router-dom';

const CONTENTSTACK_BLOG_CONTENT_TYPE = import.meta.env.VITE_BCT; // Replace with your actual Content Type UID

const BlogPage = () => {
  const [blogPosts, setBlogPosts] = useState([]); // State to hold blog posts
  const [loading, setLoading] = useState(true); // State to handle loading status
  const [error, setError] = useState(null); // State to handle errors

  // Fetch blog posts data
  const fetchBlogPostsData = async () => {
    try {
      const response = await stack.ContentType(CONTENTSTACK_BLOG_CONTENT_TYPE).Query().toJSON().find();
      setBlogPosts(response[0]); // Assuming response[0].items holds the blog posts
    } catch (error) {
      console.error('Error fetching blog posts data:', error);
      setError('Failed to fetch blog posts');
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when component mounts
  useEffect(() => {
    fetchBlogPostsData();
  }, []);

  // Render loading state or error if any
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="blog-page">
      <h2>Blog Posts</h2>
      <div className="big-blog-card">
      <div className="blog-posts-container">
        {blogPosts.map((post) => (
          <div key={post.uid} className="blog-post-card"> {/* Use a unique identifier for the key */}
            <h3>{post.title}</h3> {/* Adjust according to your content structure */}
            <p>{post.summary || post.body}</p> {/* Display summary or body content */}
            <h3>{post.description}</h3>
            <div>
              <Link to={`/${post.uid}`} className="read-more">Read More</Link>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default BlogPage;
