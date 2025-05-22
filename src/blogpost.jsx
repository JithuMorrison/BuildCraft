import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import stack from './contentstackconfig';

const CONTENTSTACK_BLOG_CONTENT_TYPE = 'Content type UID';

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true); // New state for loading

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await stack.ContentType(CONTENTSTACK_BLOG_CONTENT_TYPE)
          .Query()
          .where('uid', id)
          .toJSON()
          .find();

        if (response.length > 0) {
          setPost(response[0][0]);
        } else {
          console.warn(`No blog post found with UID: ${id}`);
        }
      } catch (error) {
        console.error('Error fetching blog post data:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return <div className="loading">Loading...</div>; // Loading state
  }

  if (!post) {
    return <div className="error">Post not found.</div>; // Handle post not found
  }

  return (
    <div className="blog-post-wrapper">
    <div className="blog-post-container">
      <Link to="/drag-drop" className="back-button">Create Your design Now</Link>
      <h1 className="post-title">{post.title}</h1>
      <img src={post.image.url} alt={post.title} className="post-image" />
      <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
    </div>
  );
};

export default BlogPost;
