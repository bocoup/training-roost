var app = window.app = window.app || {};

app.SearchResults = (function() {

  var SearchResults = function( settings ) {
    this.app = settings.app;
    this.$el = $( settings.el );

    this.$el.on( 'click', '.like', $.proxy( this, '_handleLike' ) );

    RSVP.EventTarget.mixin(this);
  };

  SearchResults.prototype = {
    set : function( people ) {
      var $el = this.$el;
      $el.empty();

      return app.loadTemplate( 'people-detailed.tmpl' ).done(function( t ) {
        var html = t( { people : people } );
        $el.html( html );
      });
    },

    _handleLike : function( evt ) {
      evt.preventDefault();
      var name = $( evt.currentTarget ).attr('data-name');
      this.handleLike( name );
    },

    handleLike : function( name ) {
      var liked = this.app.get( 'liked' ) || [];
      liked.push( name );
      this.app.set( 'liked',  liked );
    }

  };

  return SearchResults;

}());