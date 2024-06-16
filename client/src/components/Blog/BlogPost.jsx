import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "../../styles/Blog.css"; // Make sure to create and style this CSS file

const BlogPost = ({ post }) => {
  return (
    <div className="blog-post">
      <Link to={`/post/${post.slug}`}>
        <img src={post.image} alt={post.title} className="blog-post-image" />
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
