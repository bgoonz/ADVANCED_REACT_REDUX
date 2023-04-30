# ADVANCED_REACT_REDUX

## [How To Notes](./1-notes/README.md)

---

##### Our First Test:

>

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

---

## Higher Order Components:

> A higher order component is a function that takes a component as an argument and returns a new component.

#### What are Higher Order Components?

- Higher Order Components (HOCs) are functions that take a component and return a new component with enhanced functionality. They are a way to reuse component logic and share it among different components.

#### How do Higher Order Components work?

-HOCs wrap a component, providing it with additional props, state, or behavior. They can also modify the lifecycle methods of a component or its rendering logic.

#### Why use Higher Order Components?

- HOCs allow for code reuse and separation of concerns. They can enhance a component's functionality without modifying its original implementation. HOCs can also be used to apply cross-cutting concerns, such as authentication or logging, to multiple components.

> Example of a Higher Order Component

```js
const withLoading = (WrappedComponent) => {
  return class WithLoading extends React.Component {
    state = {
      isLoading: true,
    };

    componentDidMount() {
      setTimeout(() => {
        this.setState({ isLoading: false });
      }, 2000);
    }

    render() {
      if (this.state.isLoading) {
        return <div>Loading...</div>;
      }

      return <WrappedComponent {...this.props} />;
    }
  };
};

const MyComponent = ({ data }) => <div>{data}</div>;

const MyComponentWithLoading = withLoading(MyComponent);
```

In this example, `withLoading` is a Higher Order Component that wraps `MyComponent`. It adds a loading state that displays a loading message until the data is fetched, and then passes the data as props to `MyComponent`.

###### requireAuth.js

> In our components folder we are going to create a new file called requireAuth.js which exports a function rather than a component hence the convention of a file name with a lowercase first letter.

**A note on the connect higher order component**

> The followin syntax:

```js
return connect(mapStateToProps)(ComposedComponent);
```

> gives the composedComponent as an argument to the function that is retruned by the connect function.

**In the CommentBox component**

```js
export default connect(null, actions)(CommentBox);
```

the action creators are getting passed into CommentBox as props.

---

## How React & Redux Talk To Each Other:

- Starts with React which calls an Action Creator function that return an action object.
- That action object with a type and payload property get sent to a series of middlewhere functions (that log modify or stop the action) and then get forwarded to the reducers.
- The reducers perform some logic and returns a new state object to our redux store which is accessed by react components that are connected to the store.

**Boilerplate for a redux middleware**

```js
export default ({ dispatch }) =>
  (next) =>
  (action) => {};
```

**Dispatch Function** is a function that takes an action and makes copies of it and sends it to all the middlewhere and reducers.

> async.js middlewhere:

```js
export default ({ dispatch }) =>
  (next) =>
  (action) => {
    // Check to see if the action has a promise on its 'payload' property
    // If it does, then wait for it to resolve
    // If it doesn't, then send the action on to the next middleware
    if (!action.payload || !action.payload.then) {
      return next(action);
    }
    // We want to wait for the promise to resolve (get its data) and then create a new action with that data and dispatch it
    action.payload.then((response) => {
      const newAction = { ...action, payload: response };
      dispatch(newAction);
    });
  };
```

- once we pass the first if statement we know that the action has a promise on its payload property.
- the function on the then block will get called whenever the promise resolves.
- the function will be invoked with whatever data resulted from the promise.

_Here we have `{ ...action, payload: response };` ... normally, we would just have a single action object with a type and payload property... but here we are taking all the properties, and adding them to the new action object and then overriding the payload property with the response from the promise._

- After this we dispatch the new action object to the dispatch function.

---

### Redux State Validation Middlewhere (Development Only)

- [Json Schema](https://json-schema.org/)

- we will have a json schema file that describes the shape of our state object.

  - **comments** will be an array of strings.
  - **auth** will be a boolean property of **isSignedIn**.

- [Json Schema Generator](https://jsonschema.net/)
  - we can paste in a json object and it will generate a json schema for us.

**Difference between Javascript objects and JSON** _in JSON all property names must be surrounded by double quotes._

- [Tiny Validator 4](https://github.com/geraintluff/tv4)
  - a library that will validate our state object against our json schema.

---

## Server Side Authentication

### Cookies vs Tokens:

**Cookies** _bring state into the stateless HTTP protocol_

- Automatically included on all requests
- unique to each domain
- cannot be sent to different domains

> Request has a header with a cookie object

**Tokens**

- Manually included (in the header) on some requests
- Can be sent to any domain
- good for a distributed system across multiple domains

> Request has a header with an authorization string
