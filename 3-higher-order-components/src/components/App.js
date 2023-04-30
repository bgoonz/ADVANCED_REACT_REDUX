import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import CommentBox from "./CommentBox";
import CommentList from "./CommentList";

function App() {
  return (
    <div>
      <Route path="/post" component={CommentBox} />
      <Route path="/" exact component={CommentList} />
    </div>
  );
}

export default App;
