(function( $ ) {
	
    $.fn.parse = function(options) {
    	var model = new $.fn.spreadsheet_model(options);
    	model.parse = parse;
    	model.fetch('text');
    };
    
	function parse(data, archive) {
		console.log('page: '+archive.page);
		var origin = $('<a>').prop('href', archive.source).prop('origin');
        var matched = data.match(/<body[^>]*>([\w|\W]*)<\/body>/im);
        $body = $('<div>'+matched[1]+'</div>');
        var results = {};
        $body.find('.listItem:not(.listItemColumnHeaders)').each(function() {
        	var $this = $(this);
        	var $link = $this.find('a:first');
        	if (!$link.length) return;
        	var uri =  origin+$link.attr('href');
        	results[uri] = {
        		'http://simile.mit.edu/2003/10/ontologies/artstor#thumbnail':[{type:'uri',value:origin+$link.find('img:first').attr('src')}],
        		'http://purl.org/dc/terms/title':[{type:'literal',value:jQuery.trim($this.find('a:last').text())}],
        		'http://purl.org/dc/terms/source':[{type:'literal',value:archive.title}],
        		'http://simile.mit.edu/2003/10/ontologies/artstor#sourceLocation':[{type:'uri',value:uri}],
        	};
        });
        console.log(results);
        this.opts.complete_callback(results, archive);
	}    
    
}( jQuery ));