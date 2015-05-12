(function( $ ) {
	
    $.fn.parse = function(options) {
    	var model = new $.fn.spreadsheet_model(options);
    	model.parse = parse;
    	model.fetch('text');
    };
    
	function parse(data, archive) {
		var origin = $('<a>').prop('href', archive.source).prop('origin');
        var matched = data.match(/<body[^>]*>([\w|\W]*)<\/body>/im);
        $body = $('<div>'+matched[1]+'</div>');
        var results = {};
        $body.find('.listItem').each(function() {
        	var $this = $(this);
        	var $link = $this.find('a:first');
        	if (!$link.length) return;
        	var uri =  origin+$link.attr('href');
        	results[uri] = {
        		'http://simile.mit.edu/2003/10/ontologies/artstor#thumbnail':[{type:'uri',value:origin+$link.find('img:first').attr('src')}],
        		'http://purl.org/dc/terms/title':[{type:'literal',value:jQuery.trim($this.find('a:last').text())}],
        		'http://simile.mit.edu/2003/10/ontologies/artstor#sourceLocation':[{type:'uri',value:uri}],
        	};
        });
        this.opts.complete_callback(results, archive);
        for (var uri in results) {
        	var obj = {'http://purl.org/dc/terms/description':'This is a description.'};
        	
        }
	}    
    
}( jQuery ));