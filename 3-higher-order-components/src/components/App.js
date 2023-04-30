import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import CommentBox from "./CommentBox";
import CommentList from "./CommentList";

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Route path="/post" component={CommentBox} />
        <Route path="/" exact component={CommentList} />
      </div>
    );
  }
}
