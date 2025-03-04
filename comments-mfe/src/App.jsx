import React from "react";
import { BrowserRouter } from "react-router-dom";
import Comments from "./Comments";
import "./styles/comments.css";

const App = () => {
  return (
    <BrowserRouter>
      <div className="netflix-app">
        <Comments />
      </div>
    </BrowserRouter>
  );
};

export default App;
