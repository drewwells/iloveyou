(function(){

    var articles = document.querySelectorAll('article');

    for( var i = 1, l = articles.length; i < l; i++ ){

        articles[ i ].className = 'future';
    }

    var state = {
        current: 0,
        path: "",
        update: function( state ){
            this.current = state;
            window.history.pushState( {}, null, this.path + "slide" + this.current );
        },
        get: function(){
            return this.current;
        }
    };

    var onload = window.location.pathname.split( 'slide' );
    state.path = onload[0];

    if( onload.length > 1 ){

        state.current = parseInt( onload[1], 10 );
        articles[ 0 ].className = "past";
        if( state.current >= articles.length || state.current < 0 ){
            state.update( 0 );
        };

        articles[ state.current ].className = "current";
        state.update( state.current );

        if( state.current != 0 ){
            articles[ state.current - 1 ] = "past";
        }
    }

    document.onkeydown = function( ev ){

        if( !ev.keyIdentifier ){ return true; }
        var current = document.querySelectorAll( 'article' )[ state.current ],
            far;

        switch( ev.keyIdentifier ){

            case "Left":
                if( !current.previousElementSibling ){ return false; }
                current.previousElementSibling.className = "current";
                current.className = "future";
                state.update( --state.current );
                return false;
            break;

            case "Right":
                if( !current.nextElementSibling ){ return false; }
                current.nextElementSibling.className = "current";
                current.className = "past";
                state.update( ++state.current );
                return false;
            break;

            case "Down":

                if( state.current + 5 < articles.length ){

                    articles[ state.current ].className = "far-future";
                    for( i = state.current + 1, l = state.current + 5; i < l; i++ ){

                        articles[ i ].className = "past";
                    }
                    (function(){

                        var current = state.current;
                        setTimeout(function(){

                            articles[ current ].classList.remove( "far-future" );
                            if( !articles[ current ].classList.contains( "current" ) ){

                                articles[ current ].classList.add( "past" );
                            }

                        }, 1300);
                    })();

                    state.update( state.current + 5 );
                    articles[ state.current ].className = "far-past";

                }

            break;

            case "Up":

                if( state.current > 4 ){

                    articles[ state.current ].className = "far-past";
                    for( i = state.current - 5, l = state.current; i < l; i++ ){

                        articles[ i ].className = "future";
                    }
                    (function(){
                        var current = state.current;
                        setTimeout(function(){

                            articles[ current ].classList.remove( "far-past" );
                            if( !articles[ current ].classList.contains( "current" ) ){
                                articles[ current ].classList.add( "future" );
                            }
                        }, 1300);
                    })();
                    state.update( state.current - 5 );
                    articles[ state.current ].className = "far-future";

                }


            break;
        };

        if( articles[ state.current ].classList.contains( "far-future" )
        || articles[ state.current ].classList.contains( "far-past" )  ){

            setTimeout(function(){
                articles[ state.current ].className = "current";
            }, 100 );
        }

    };



})();