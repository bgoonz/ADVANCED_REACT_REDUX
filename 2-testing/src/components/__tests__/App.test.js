import React from "react";
import ReactDOM from "react-dom";
import App from "../App";


it( "shows a comment box", () => {
    const div = document.create( "div" );
    ReactDOM.render( <App />, div );
    
    
    
    //the following line is cleanup to remove the app component from memory
    ReactDOM.unmountComponentAtNode( div)
});
