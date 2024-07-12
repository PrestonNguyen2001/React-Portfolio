import React from "react";
import { render, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Post from "../../components/Blog/Post";
import { rest } from "msw";
import { setupServer } from "msw/node";

const apiUrl = process.env.VITE_API_BASE_URL;

const server = setupServer(
  rest.get(`${apiUrl}/posts/:slug`, (req, res, ctx) => {
    return res(
      ctx.json({
        post: {
          _id: "1",
          slug: "test-post",
          title: "Test Title",
          category: "Test Category",
          content: "This is the content of the test post.",
          createdAt: new Date().toISOString(),
          userId: "user123",
        },
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Post Component", () => {
  it("renders post data after fetching", async () => {
    const { getByText } = render(
      <Router>
        <Post />
      </Router>
    );

    await waitFor(() => {
      expect(getByText("Test Title")).toBeInTheDocument();
      expect(getByText("Test Category")).toBeInTheDocument();
      expect(
        getByText("This is the content of the test post.")
      ).toBeInTheDocument();
    });
  });

  it("handles loading state", () => {
    const { getByText } = render(
      <Router>
        <Post />
      </Router>
    );

    expect(getByText("Loading...")).toBeInTheDocument();
  });

  it("handles error state", async () => {
    server.use(
      rest.get(`${apiUrl}/posts/:slug`, (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    const { getByText } = render(
      <Router>
        <Post />
      </Router>
    );

    await waitFor(() => {
      expect(getByText("Failed to fetch post")).toBeInTheDocument();
    });
  });
});
