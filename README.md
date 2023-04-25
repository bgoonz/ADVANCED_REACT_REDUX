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
3. Jest finds all files ending in .test.js and runs them
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
