import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import BlogPost from "../../components/Blog/BlogPost";

describe("BlogPost Component", () => {
  const post = {
    _id: "1",
    slug: "test-post",
    image: "test-image.jpg",
    title: "Test Title",
    content: "This is the content of the test post. It is a long content.",
  };

  const incompletePost = {
    _id: "2",
  };

  it("renders without crashing with valid post data", () => {
    const { getByText, getByAltText, container } = render(
      <Router>
        <BlogPost post={post} />
      </Router>
    );
    expect(getByText("Test Title")).toBeInTheDocument();
    expect(container.querySelector(".blog-post-content").textContent).toContain(
      "This is the content of the test post. It is a long content..."
    );
    expect(getByAltText("Test Title")).toHaveAttribute("src", "test-image.jpg");
  });

  it("renders error message when post data is incomplete", () => {
    const { getByText } = render(
      <Router>
        <BlogPost post={incompletePost} />
      </Router>
    );
    expect(
      getByText("Error: Post data is missing or incomplete.")
    ).toBeInTheDocument();
  });

  it("renders correctly without an image", () => {
    const { queryByAltText } = render(
      <Router>
        <BlogPost post={{ ...post, image: null }} />
      </Router>
    );
    expect(queryByAltText("Test Title")).toBeNull();
  });
});
