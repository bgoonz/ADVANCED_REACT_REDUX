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

### Cookies vs Tokens (we will use tokens):

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

---

### Backend:

> initial setup

```js
const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const morgan = require("morgan");

// an instance of express
const app = express();

const port = process.env.PORT || 3090;
const server = http.createServer(app);
```

> the http library is native to node... `const server = http.createServer( app );` creates an http server that knows how to receive requests and anything that comes in will be forwarded to the express application.

**Morgan** is a logging framework for node and express.
**Body Parser** is a middleware that parses incoming requests into json.

> both morgan and body parser are middleware that are wired up to the express application using `app.use()`

```js
app.use(morgan("combined"));
app.use(bodyParser.json({ type: "*/*" }));
```

> Any incomming request will get passed into both of these middleware before they get passed into the route handlers.

**Morgan logs the following when we visit localhost:3090**

```
$ node index.js
Server listening on: 3090
::1 - - [30/Apr/2023:22:43:30 +0000] "GET / HTTP/1.1" 404 139 "-" "Mozilla/5.0 (Windows NT 10.0;
Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36"
```

**Body Parser** parses the body of the request into json and makes it available on the req.body property.

###### Router.js

- we will create a new file called router.js that will contain all of our route handlers.

```js
function router(app) {
  app.get("/", (req, res, next) => {
    res.send(["water", "phone", "paper"]);
  });
}

module.exports = router;
```

> In the code above req is the incoming request and res is the outgoing response, next is a function that we call when we are done with the route handler.
> `res.send` is a method that is available on the response object that we can use to send a response back to whoever made the request.

**Mongoose** is an ORM (Object Relational Mapper) that allows us to interact with a mongo database.

```js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
```

> A Schema is a description of what a record in the database will look like.

> mongoose.model creates a new model class that represents all the different records in the database.

```js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// define our model
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String,
});

// create the model class
const ModelClass = mongoose.model("user", userSchema);
```

---

> Authentication.js setup

```js
exports.signup = async (req, res, next) => {
  // see if a user with the given email exists
  // if a user with email does exist, return an error
  // if a user with email does NOT exist, create and save user record
  // respond to request indicating the user was created
};
```

---

**Using bcrypt in user schema**

```js
//on save hook, encrypt password
// before saving a model, run this function
userSchema.pre("save", function (next) {
  // get access to the user model
  const user = this;
  // generate a salt then run callback
  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      return next(err);
    }
    // hash (encrypt) our password using the salt
    bcrypt.hash(user.password, salt, null, function (err, hash) {
      if (err) {
        return next(err);
      }
      // overwrite plain text password with encrypted password
      user.password = hash;
      // go ahead and save the model
      next();
    });
  });
});
```

**A salt is a randomly generated string of characters that is added to the password before it is hashed.**

**An incripted password is a hash of the password and the salt.**

---

**Json Web Tokens**

> When signing up or signing in, give a token in exchange for an id

`userId + secret = json web token`

> In the future when a user makes an authenticated request, they should indicate their JWT.

`JSON web token + secret = userId`

`jwt.encode( { sub: user.id, iat: timestamp }, config.secret );` creates a json web token.

> sub is short for subject, iat is short for issued at time.

---

### Passport

**passport** is an authentication middleware for authentication strategies in express ...a strategy is a method for authenticating a user.
