import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getPosts = createAsyncThunk(
  "post/getPosts",
  async ({ startIndex, limit, order }) => {
    const response = await fetch(
      `${
        import.meta.env.VITE_API_BASE_URL
      }/posts?startIndex=${startIndex}&limit=${limit}&order=${order}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }
    const data = await response.json();
    return data;
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
        state.loading = true;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.posts = action.payload.posts;
        state.totalPosts = action.payload.totalPosts;
        state.lastMonthPosts = action.payload.lastMonthPosts;
        state.loading = false;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default postSlice.reducer;
