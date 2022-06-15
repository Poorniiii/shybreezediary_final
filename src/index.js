import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { configureStore } from "@reduxjs/toolkit";
import pageReducer from "./features/pageSlice";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
const store = configureStore({
  reducer: {
    pages: pageReducer
  }
});

root.render(
  <Provider store={store}>
    <StrictMode>
      <App />
    </StrictMode>
  </Provider>
);
