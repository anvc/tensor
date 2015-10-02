(function( $ ) {
	
    $.fn.parse = function(options) {
    	var model = new $.fn.spreadsheet_model(options);
    	model.parse = parse;
    	model.fetch('xml');
    };
    
	function parse(data, archive) {
        var results = {};
        $(data).find('item').each(function() {
        	var $this = $(this);
        	var uri = $this.find('link').text();
        	var sourceLocation = $this.attr('rdf\\:about');
        	var title = $this.find('title').text();
        	var thumb = $this.find('art\\:thumbnail').attr('url');
        	results[uri] = {
        		'http://simile.mit.edu/2003/10/ontologies/artstor#thumbnail':[{type:'uri',value:thumb}],
        		'http://purl.org/dc/terms/title':[{type:'literal',value:title}],
        		'http://purl.org/dc/terms/source':[{type:'literal',value:archive.title}],
        		'http://simile.mit.edu/2003/10/ontologies/artstor#sourceLocation':[{type:'uri',value:sourceLocation}],
        	};
        });
        console.log(results);
        this.opts.complete_callback(results, archive);
	};
    
}( jQuery ));