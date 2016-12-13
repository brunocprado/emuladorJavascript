var marcacoes = [ 
    ["LDR ", "codigo" ],
    ["STR ", "codigo" ],
    ["HLT", "encerraCod"],
    ["A ", "registrador"],
    ["B ", "registrador"],
    ["C ", "registrador"],
    ["D ", "registrador"]
] ;

var checaPalavra = function( stream ) {
    for( var i = 0 ; i < marcacoes.length ; i++ ) {
        if (stream.match(marcacoes[i][0]) || stream.match(marcacoes[i][0].toLowerCase())) return marcacoes[i][1];
    }
    if(stream.match("/")) { stream.skipToEnd(); return "comentario"; }
    if(stream.match("#")) { stream.skipTo(" "); return "valor"; }
    return "" ;
}

CodeMirror.defineMode("ramses", function() {
    return {
    token: function(stream,state)
            {
                var _ret = checaPalavra(stream) ;
                if ( _ret.length > 0 ) return _ret ;
                else { 
//                    var prox = stream.next()
//                    if(stream.next() == "#") {
//                        stream.skipToEnd();
//                        return "codigo"; 
//                    }  
//                    if(stream.next() == "/") {
//                        stream.skipToEnd();
//                        return "comentario"; 
//                    }   
                   stream.next(); return null;
                }
            }
           };
});



//var _glob_keywords = [ [ "LDR", "keyword1" ],
//                       [ "key2", "keyword2" ]
//                     ] ;
//
//var cm_custom_check_stream_fn = function( stream ) {
//    for( var _i = 0 ; _i < _glob_keywords.length ; _i++ ) {
//        if ( stream.match( _glob_keywords[_i][0] ) ) return _glob_keywords[_i][1] ;
//    }
//    return "" ;
//}
//
//CodeMirror.defineMode("custom.mode", function() {
//    return {
//    token: function(stream,state)
//            {
//                var _ret = cm_custom_check_stream_fn( stream ) ;
//                if ( _ret.length > 0 ) return _ret ;
//                else { stream.next(); return null; }
//            }
//           };
//});