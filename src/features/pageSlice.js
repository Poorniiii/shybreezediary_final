import { createSlice } from "@reduxjs/toolkit";

import diaryData from "../data";

const initialState = {
  pageData: diaryData.reverse()
};

const pageSlice = createSlice({
  name: "pages",
  initialState,
  reducers: {
    addPage: (state, action) => {
      state.pageData.push(action.payload);
    },
    updatePage: (state, action) => {
      state.pageData.forEach((page) => {
        if (page.pageId === action.payload.pageId) {
          page.pageTitle = action.payload.pageTitle;
          page.pageContent = action.payload.pageContent;
          page.isArchive = action.payload.isArchive;
          page.isFavorite = action.payload.isFavorite;
          page.isSubmitted = action.payload.isSubmitted;
        }
      });
    },
    deletePage: (state, action) => {
      state.pageData = state.pageData.filter(
        (page) => page.pageId !== action.payload.pageId
      );
    },
    sortPages: (state) => {
      state.pageData = state.pageData.reverse();
    }
  }
});

export const { addPage, updatePage, deletePage, sortPages } = pageSlice.actions;

export default pageSlice.reducer;

// export const addPage = () => async (dispatch) => {
//   try {
//     return dispatch(createNewPageSuccess());
//   } catch (e) {
//     return console.error(e.message);
//   }
// };
