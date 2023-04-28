# ADVANCED_REACT_REDUX

## [How To Notes](./1-notes/README.md)

---

##### Our First Test:

> Testing that it renders without crashing

```js
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  expect(div.innerHTML).toContain("Hi There!");

  ReactDOM.unmountComponentAtNode(div);
});
```

**Create React App**

> Comes with:

- React _The react library_
- Webpack _Links together js files_
- Babel _Transpiles our code to something the browser can understand_
- Jest _Automated test runner_

**How Jest Works (steps in time order)**

1. Run `npm run test`
2. Jest runner starts up
3. Jest finds all files ending in `.test.js` or `.spec.js` or any file in a folder `/__tests__` and runs them
4. Jest prints out results of tests to the terminal
5. Jest waits for a file to change, then runs them all again.

##### The App We will Test

**Comments**

- App Component
- CommentBox with submit button
- Comment list component

##### Redux Design:

- State (comments)
- Actions (SaveComment... adds a comment via the comments reducer)

**JSDOM** - A library that acts like a browser inside of node... tricks the react library into thinking there is a browser. Allows us to use things like document.querySelector...

**Expectation**

> every it block should produce at least one expectation

```js

expect(value we are inspecting).matcher(value we expect)

```

---

##### Enzyme API

[Enzyme Docs](https://airbnb.io/enzyme/docs/api/)

- Static - Render the given component and return plain HTML
- Shallow - Render just the given component and none of its children
- Full DOM - Render the component and all of its children + let us modify it afterwards

**Searching for comment box using enzyme**

```js
import React from "react";
import { shallow } from "enzyme";
import CommentBox from "../CommentBox";
import App from "../App";

it("shows a comment box", () => {
  const wrapped = shallow(<App />);
  expect(wrapped.find(CommentBox).length).toEqual(1);
});
```

**To use absolute paths for imports (_rather then relative paths_)**

create .env file in root directory and add:

```
NODE_PATH=src
```

**Before Each** is a helper function that takes over repetitive code that is used in multiple tests.

```js
let wrapped;

beforeEach(() => {
  wrapped = shallow(<App />);
});
```

---

##### Keeping test DRY with describe blocks

```js
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

describe("the text area", () => {
  beforeEach(() => {
    wrapped.find("textarea").simulate("change", {
      target: { value: "new comment" },
    });
    // Force the component to update
    wrapped.update();
  });

  it("has a text area that users can type in", () => {
    expect(wrapped.find("textarea").prop("value")).toEqual("new comment");
  });

  it("should empty the text area when the form is submitted", () => {
    wrapped.find("form").simulate("submit");
    wrapped.update();
    expect(wrapped.find("textarea").prop("value")).toEqual("");
  });
});
```

---

##### Redux Setup

**Comments reducer**

> initial setup (comments.js)

```js
export default function (state = [], action) {
  switch (action.type) {
    default:
      return state;
  }
}
```

To pass state through our app we need to import the following in our index.js file

```js
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducers from "reducers";
```

> where reducers is the index.js file in our reducers folder

_here is the complete file_

```js
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducers from "reducers";
import App from "./components/App";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
```

we get access to the redux store in our components using a connect function from react-redux

---

##### Root Component (provider)

```js
import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducers from "reducers";

export default (props) => {
  return (
    <Provider store={createStore(reducers, {})}>{props.children}</Provider>
  );
};
```

> props.children is a special prop that allows us to pass in components to the root component... i.e. to wrap any component in the provider.


---

**CreateStore** is an instance of the redux store to use in our components... it takes two arguments: reducers and initial state...


---

**How to check the text that is rendered by a component**

```js
import React from "react";
import { mount } from "enzyme";
import CommentList from "components/CommentList";
import Root from "Root";

let wrapped;

beforeEach(() => {
  const initialState = {
    comments: ["Comment 1", "Comment 2"],
  };

  wrapped = mount(
    <Root initialState={initialState}>
      <CommentList />
    </Root>
  );
});

it("creates one LI per comment", () => {
  expect(wrapped.find("li").length).toEqual(2);
});

it("shows the text for each comment", () => {
  expect(wrapped.render().text()).toContain("Comment 1");
  expect(wrapped.render().text()).toContain("Comment 2");
});
```

**.render()** is a method from enzyme that renders the component as html... we can then use the .text() method to get the text from the html.

**.render()** is a cherio wrapper... a library that allows us to traverse html like jquery.
