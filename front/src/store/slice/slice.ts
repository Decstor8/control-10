import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { commentsTypeParams, newsComments, newsType } from "../../types";
import { newsApi } from "../../Api/newsApi";
import { commentsApi } from "../../Api/commentsApi";

export const getAllNews = createAsyncThunk<void>(
  "meassges/getAllNews",
  async (_, { dispatch }) => {
    try {
      const data = await newsApi.getAllNews();

      dispatch(setNews(data.data));
    } catch (error) {
      console.log(error);
      dispatch(toggleErorr(true));
    };
  },
);
export const getAllComments = createAsyncThunk<void, string>(
  "meassges/getAllComments",
  async (id, { dispatch }) => {
    try {
      const data = await commentsApi.getAllComments({ news_id: id });
      dispatch(setCommpents(data.data));
    } catch (error) {
      console.log(error);
      dispatch(toggleErorr(true));
    };
  },
);
export const deleteComment = createAsyncThunk<void, string>(
  "meassges/deleteComment",
  async (id, { dispatch }) => {
    try {
      await commentsApi.deleteComment(id);
    } catch (error) {
      console.log(error);
      dispatch(toggleErorr(true));
    };
  },
);
export const getDefineNews = createAsyncThunk<void, string>(
  "meassges/getDefineNews",
  async (id, { dispatch }) => {
    try {
      const data = await newsApi.getDefineNews(id);

      dispatch(setDefineNews(data.data));
    } catch (error) {
      console.log(error);
      dispatch(toggleErorr(true));
    };
  },
);
export const deleteNews = createAsyncThunk<void, string>(
  "meassges/deleteNews",
  async (id, { dispatch }) => {
    try {
      await newsApi.deleteNews(id);
    } catch (error) {
      console.log(error);
      dispatch(toggleErorr(true));
    };
  },
);
export const createComment = createAsyncThunk<void, commentsTypeParams>(
  "meassges/createComment",
  async ({author, message,newsId}, { dispatch }) => {
    try {
      await commentsApi.createComments({author, message,newsId});
    } catch (error) {
      console.log(error);
      dispatch(toggleErorr(true));
    };
  },
);
export interface messagesState {
  news: Array<newsType>;
  comments: Array<newsComments>;
  error: boolean;
  defineNews: null | newsType;
}

const initialState: messagesState = {
  news: [],
  comments: [],
  error: false,
  defineNews: null,
};

export const slice = createSlice({
  name: "slice",
  initialState,
  reducers: {
    setNews(state, actions) {
      state.news = actions.payload;
    },
    setCommpents(state, actions) {
      state.comments = actions.payload;
    },
    toggleErorr(state, actions) {
      state.error = actions.payload;
    },
    setDefineNews(state, actions) {
      state.defineNews = actions.payload;
    },
  },
});

export const { setCommpents, setNews, toggleErorr, setDefineNews } =
  slice.actions;
export default slice.reducer;
