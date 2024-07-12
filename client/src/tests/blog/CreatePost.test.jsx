import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { BrowserRouter as Router } from "react-router-dom";
import CreatePost from "../../components/Blog/CreatePost";
import { rest } from "msw";
import { setupServer } from "msw/node";

const mockStore = configureStore([]);

const apiUrl = process.env.VITE_API_BASE_URL;

describe("CreatePost Component", () => {
  const server = setupServer(
    rest.post(`${apiUrl}/posts/create`, (req, res, ctx) => {
      return res(ctx.json({ slug: "new-post" }));
    })
  );

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("renders and creates post", async () => {
    const store = mockStore({
      user: { currentUser: { _id: "user123" } },
    });

    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <Router>
          <CreatePost />
        </Router>
      </Provider>
    );

    fireEvent.change(getByPlaceholderText("Title"), {
      target: { value: "New Post Title" },
    });
    fireEvent.change(getByPlaceholderText("Write something..."), {
      target: { value: "This is the new post content." },
    });
    fireEvent.click(getByText("Publish"));

    await waitFor(() => {
      expect(window.location.pathname).toBe("/posts/new-post");
    });
  });
});
