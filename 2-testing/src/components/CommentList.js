import React, { Component } from "react";
import { connect } from "react-redux";
class CommentList extends Component {
  renderComments() {
    return this.props.comments.map((comment) => {
      return <li key={comment}>{comment}</li>;
    });
  }

  render() {
    return (
      <div>
        <ul>{this.renderComments()}</ul>
      </div>
    );
  }
}
//mapStateToProps is how redux state is mapped to props in children components
function mapStateToProps(state) {
  return { comments: state.comments };
}

export default connect(mapStateToProps)(CommentList);
