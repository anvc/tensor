(function( $ ) {
	
	var defaults = {
			namespaces: {
					'rdf':'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
			    	'rdfs':'http://www.w3.org/2000/01/rdf-schema#',
					'dc':'http://purl.org/dc/elements/1.1/',
					'dcterms':'http://purl.org/dc/terms/',
					'ctag':'http://commontag.org/ns#',
					'art':'http://simile.mit.edu/2003/10/ontologies/artstor#',
					'sioc':'http://rdfs.org/sioc/ns#',
					'sioctypes':'http://rdfs.org/sioc/types#',
					'foaf':'http://xmlns.com/foaf/0.1/',
					'owl':'http://www.w3.org/2002/07/owl#',
					'ov':'http://open.vocab.org/terms/',
					'oac':'http://www.openannotation.org/ns/',
					'scalar':'http://scalar.usc.edu/2012/01/scalar-ns#',
					'shoah':'http://tempuri.org/'
			},
			rows: null,
			default_num_predicates: 4
	};  	
	var opts = {};
	var predicates = [];
	var $self = null;
	
    $.fn.spreadsheet_view = function(options) {
    	opts = $.extend( {}, defaults, options );
    	namespaces_reversed();
    	$self = this;
        do_create_tiles();
        return $self;
    };
    
    function namespaces_reversed() {
    	opts.namespaces_reversed = {};
    	$.each(opts.namespaces, function(key, value) {
    		opts.namespaces_reversed[value] = key; 
    	});    	
    }
    
    function do_create_tiles() {
    	$self.empty();
		var predicates = [
		                  'http://simile.mit.edu/2003/10/ontologies/artstor#thumbnail',
		                  'http://purl.org/dc/terms/title',
		                  'http://purl.org/dc/terms/description'
		                 ];
    	for (var j in opts.rows) {
    		var $row = $('<div class="tile"></div>').appendTo($self);
    		var img = opts.rows[j][predicates[0]][0].value;
    		var title = opts.rows[j][predicates[1]][0].value;
    		$img = $('<img src="'+img+'" />').appendTo($row);
    		$title = $('<h6>'+title+'</h6>').appendTo($row);
    		$checkbox = $('<input type="checkbox" value="'+j+'" />').appendTo($row);
    	}    	
    	$self.find('.tile').matchHeight(true);
    	$self.find('.tile').click(function() {
    		var is_checked = ($(this).find('input:checked').length) ? true : false;
    		$(this).find('input[type="checkbox"]').prop('checked',((is_checked)?false:true));
    		if (is_checked) {
    			$(this).removeClass('tile_checked');
    		} else {
    			$(this).addClass('tile_checked');
    		}
    	});
    }
    
    function pnode(str) {
    	for (var j in opts.namespaces_reversed) {
    		if (-1==str.indexOf(j)) continue;
    		str = str.replace(j, opts.namespaces_reversed[j]+':');
    		return str;
    	}
    }
    
    // http://phpjs.org/functions/basename/
    function basename(path, suffix) {
    	var b = path;
    	var lastChar = b.charAt(b.length - 1);
    	if (lastChar === '/' || lastChar === '\\') {
    		b = b.slice(0, -1);
    	}
    	b = b.replace(/^.*[\/\\]/g, '');
    	if (typeof suffix === 'string' && b.substr(b.length - suffix.length) == suffix) {
    		b = b.substr(0, b.length - suffix.length);
    	}
    	return b;
    }
    
}( jQuery ));