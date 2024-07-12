import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { BrowserRouter as Router } from "react-router-dom";
import UpdatePost from "../../components/Blog/UpdatePost";
import { rest } from "msw";
import { setupServer } from "msw/node";

const mockStore = configureStore([]);
const apiUrl = process.env.VITE_API_BASE_URL;

describe("UpdatePost Component", () => {
  const server = setupServer(
    rest.get(`${apiUrl}/posts/1`, (req, res, ctx) => {
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
    }),
    rest.put(`${apiUrl}/posts/1/user123`, (req, res, ctx) => {
      return res(ctx.json({ slug: "updated-post" }));
    })
  );

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("renders and updates post", async () => {
    const store = mockStore({
      user: { currentUser: { _id: "user123" } },
    });

    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <Router>
          <UpdatePost />
        </Router>
      </Provider>
    );

    await waitFor(() => {
      expect(getByPlaceholderText("Title")).toHaveValue("Test Title");
    });

    fireEvent.change(getByPlaceholderText("Title"), {
      target: { value: "Updated Title" },
    });
    fireEvent.click(getByText("Update post"));

    await waitFor(() => {
      expect(window.location.pathname).toBe("/posts/updated-post");
    });
  });
});
