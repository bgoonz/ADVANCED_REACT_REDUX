import React from "react";
import { connect } from "react-redux";
export default (ChildComponent) => {
  class ComposedComponent extends React.Component {
    // Our component just got rendered
    componentDidMount() {
      this.shouldNavigateAway();
    }

    // we get the pops.history from the react-router-dom through the route component in App.js that wraps the CommentBox component.
    shouldNavigateAway() {
      if (!this.props.auth) {
        this.props.history.push("/");
      }
    }

    render() {
      return <ChildComponent {...this.props} />;
    }
  }
  function mapStateToProps(state) {
    return { auth: state.auth };
  }
  return connect(mapStateToProps)(ComposedComponent);
};
