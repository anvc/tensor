(function( $ ) {
	
    $.fn.parse = function(options) {
    	var model = $.fn.spreadsheet_model(options);
    	model.parse = parse;
    	model.fetch();
    };
    
	function parse(data) {
		var results = {};
		for (var uri in data) {
			if ('http://scalar.usc.edu/2012/01/scalar-ns#ArchiveEntity'==data[uri]['http://www.w3.org/1999/02/22-rdf-syntax-ns#type'][0].value) {
				results[uri] = data[uri];
			}
		}		
		this.opts.complete_callback(results);
	}    
    
}( jQuery ));