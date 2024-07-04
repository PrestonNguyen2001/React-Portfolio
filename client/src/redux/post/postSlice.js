import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getPosts = createAsyncThunk(
  "post/getPosts",
  async ({ startIndex, limit, order }) => {
    try {
      console.log("Fetching posts...");
      const response = await fetch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/posts?startIndex=${startIndex}&limit=${limit}&order=${order}`
      );
      console.log("Response status:", response.status);
      console.log("Response headers:", [...response.headers]);

      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }

      const data = await response.json();
      console.log("Posts data received:", data);
      return data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  }
);

const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: [],
    totalPosts: 0,
    lastMonthPosts: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        console.log("Fetching posts: pending");
        state.loading = true;
        state.error = null;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        console.log("Fetching posts: fulfilled", action.payload);
        state.posts = action.payload.posts;
        state.totalPosts = action.payload.totalPosts;
        state.lastMonthPosts = action.payload.lastMonthPosts;
        state.loading = false;
      })
      .addCase(getPosts.rejected, (state, action) => {
        console.error("Fetching posts: rejected", action.error.message);
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default postSlice.reducer;
