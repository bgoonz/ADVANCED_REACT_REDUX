import React from "react";
import { shallow } from "enzyme";
import CommentBox from "../CommentBox";
import App from "../App";

it("shows a comment box", () => {
  const wrapped = shallow(<App />);
  expect(wrapped.find(CommentBox).length).toEqual(1);
});
