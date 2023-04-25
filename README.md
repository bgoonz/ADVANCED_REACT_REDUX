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
