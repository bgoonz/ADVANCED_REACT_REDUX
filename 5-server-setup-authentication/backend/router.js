function router( app ) {
    app.get( '/', ( req, res, next ) => {
        res.send( [ 'water', 'phone', 'paper' ] );
    } );
    
    
    
}

module.exports = router;
