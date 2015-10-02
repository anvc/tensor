(function( $ ) {
	
    $.fn.parse = function(options) {
    	var model = new $.fn.spreadsheet_model(options);
    	model.parse = parse;
    	model.fetch('json');
    };
    
	function parse(data, archive) {
		var results = {};
		for (var j in data.items) {
			var uri = 'http://www.youtube.com/v/m3RUnLEAHd8'+identifier;
			var thumb = data.items[j].snippet.thumbnails.high.url;
			var title = data.items[j].snippet.title;
			var desc = data.items[j].snippet.description;	
			var sourceLocation = 'https://www.youtube.com/watch?v='+identifier;
			var format = data.items[j].id.kind;
			var identifier = data.items[j].id.videoId;
			var date = data.items[j].snippet.publishedAt;
			var creator = data.items[j].snippet.channel;
        	results[uri] = {
            		'http://simile.mit.edu/2003/10/ontologies/artstor#thumbnail':[{type:'uri',value:thumb}],
            		'http://purl.org/dc/terms/title':[{type:'literal',value:title}],
            		'http://purl.org/dc/terms/description':[{type:'literal',value:desc}],
            		'http://purl.org/dc/terms/source':[{type:'literal',value:archive.title}],
            		'http://simile.mit.edu/2003/10/ontologies/artstor#sourceLocation':[{type:'uri',value:sourceLocation}],
            		'http://simile.mit.edu/2003/10/ontologies/artstor#format':[{type:'uri',value:sourceLocation}],
            		'http://simile.mit.edu/2003/10/ontologies/artstor#identifier':[{type:'uri',value:sourceLocation}],
            		'http://simile.mit.edu/2003/10/ontologies/artstor#date':[{type:'uri',value:sourceLocation}],
            		'http://simile.mit.edu/2003/10/ontologies/artstor#creator':[{type:'uri',value:sourceLocation}],
            	};			
		}
		console.log(results);
		this.opts.complete_callback(results, archive);
	}    
    
}( jQuery ));