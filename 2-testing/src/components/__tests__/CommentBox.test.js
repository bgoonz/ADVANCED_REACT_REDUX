import React from "react";
import CommentBox from "components/CommentBox";
import { mount } from "enzyme";


let wrapped;
beforeEach( () => {     
    wrapped = mount( <CommentBox /> );
} );

it( "has a text area and a button", () => {

    

    
    expect( wrapped.find( "textarea" ).length ).toEqual( 1 );
    expect( wrapped.find( "button" ).length ).toEqual( 1 );
} );
