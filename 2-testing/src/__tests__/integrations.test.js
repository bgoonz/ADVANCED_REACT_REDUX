import React from "react";
import { mount } from "enzyme";
import Root from "Root";
import App from "components/App";
import moxios from "moxios";

// beforeEach( () => {
// } );
// afterEach( () => {
// }
    
it( "can fetch a list of comments and display them", () => {
    const wrapped = mount(
        <Root>
            <App />
        </Root>
    );
    wrapped.find( ".fetch-comments" ).simulate( "click" );
  
    moxios.wait( () => {
        wrapped.update();
        expect( wrapped.find( "li" ).length ).toEqual( 500 );
        wrapped.unmount();
    } );
} );
