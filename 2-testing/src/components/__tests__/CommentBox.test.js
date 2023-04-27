import React from "react";
import CommentBox from "components/CommentBox";
import { mount } from "enzyme";

let wrapped;
beforeEach(() => {
  wrapped = mount(<CommentBox />);
});

afterEach(() => {
  wrapped.unmount();
});

it("has a text area and a button", () => {
  expect(wrapped.find("textarea").length).toEqual(1);
  expect(wrapped.find("button").length).toEqual(1);
});

it("has a text area that users can type in", () => {
  wrapped.find("textarea").simulate("change", {
    target: { value: "new comment" },
  });
  // Force the component to update
  wrapped.update();

  expect(wrapped.find("textarea").prop("value")).toEqual("new comment");
});

it("should empty the text area when the form is submitted", () => {
  wrapped.find("textarea").simulate("change", {
    target: { value: "new comment" },
  });
  wrapped.update();
  expect(wrapped.find("textarea").prop("value")).toEqual("new comment");

  wrapped.find("form").simulate("submit");
  wrapped.update();
  expect(wrapped.find("textarea").prop("value")).toEqual("");
});
