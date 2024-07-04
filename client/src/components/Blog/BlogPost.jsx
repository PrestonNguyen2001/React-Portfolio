import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "../../styles/Blog.css";

const BlogPost = ({ post }) => {
  if (!post || !post.slug) {
    console.error("Error: Post data is missing or incomplete:", post);
    return <div>Error: Post data is missing or incomplete.</div>;
  }

  return (
    <div className="blog-post">
      <Link to={`/posts/${post.slug}`}>
        {post.image && (
          <img src={post.image} alt={post.title} className="blog-post-image" />
        )}
        <h2 className="blog-post-title">{post.title}</h2>
        <p className="blog-post-content">{post.content.substring(0, 100)}...</p>
      </Link>
    </div>
  );
};

BlogPost.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    image: PropTypes.string,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,
};

export default BlogPost;
