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
			check: [],
			num_archives: 0
	};  	
	var opts = {};
	var predicates = [];
	var $self = null;
	var num_rows = 0;
	
    $.fn.spreadsheet_view = function(options) {
    	opts = $.extend( {}, defaults, options );
    	namespaces_reversed();
    	$self = this;
        do_create_tiles();
        return $self;
    };
    
    $.fn.spreadsheet_view.remove = function() {}    
    
    $.fn.spreadsheet_view.checked = function() {
	    var checked = [];
	    $self.find('input:checked').each(function() {
	    	checked.push($(this).attr('value'));
	    });
	    return checked;
    };    
    
    function namespaces_reversed() {
    	opts.namespaces_reversed = {};
    	$.each(opts.namespaces, function(key, value) {
    		opts.namespaces_reversed[value] = key; 
    	});    	
    }
    
    function do_create_tiles() {
    	$self.children(':not(.spreadsheet_panel)').remove();
    	$self.children('.spreadsheet_panel').hide();
		var $wrapper = $('<div class="tiles"></div>').appendTo($self);
    	for (var j in opts.rows) {
    		var row = opts.rows[j];
    		var $row = $('<div class="tile"></div>').appendTo($wrapper);
    		var thumb = ('undefined'!=typeof(row['http://simile.mit.edu/2003/10/ontologies/artstor#thumbnail'])) ? row['http://simile.mit.edu/2003/10/ontologies/artstor#thumbnail'][0].value : $('link#base_url').attr('href')+'application/views/ui/templates/images/missing_thumb.jpg';
    		$img = $('<div class="img_wrapper"><img src="'+thumb+'" /></div>').appendTo($row);
    		$source = $('<div class="source"></div>').appendTo($row);
    		$url = $('<div class="url"></div>').appendTo($row);
    		$title = $('<div class="title"></div>').appendTo($row);
    		$desc = $('<div class="desc"></div>').appendTo($row);
    		for (var p in row) {
    			var pp = pnode(p);
    			if ('art:sourceLocation'==pp && 'undefined'!=typeof(row[p][0])) {
    				url = row[p][0].value;
    			} else if (opts.num_archives > 1 && 'dcterms:source'==pp && 'undefined'!=typeof(row[p][0])) {
    				$source.append(row[p][0].value);
    				$source.show();
    			} else if ('dcterms:description'==pp) {
	    			var o = [];
	    			for (k = 0; k < row[p].length; k++) {
	    				o.push(row[p][k].value.linkify());
	    			}
	    			if ('undefined'==typeof(o[0])) o[0] = '';
	                $desc.append(o[0]);   				
    			} else if ('dcterms:title'==pp) {
	    			var o = [];
	    			for (k = 0; k < row[p].length; k++) {
	    				o.push(row[p][k].value.linkify());
	    			}
	    			if ('undefined'==typeof(o[0])) o[0] = '[No title]';
	                $title.append(o[0]);
    			}
    		} 		
    		$url.append('<a href="'+url+'" target="_blank">'+url+'</a>');
    	}    
    	$wrapper.append('<br clear="both" />');
    	do_match_height(true);
    	$('body').on('sheet_layout_change', function() { do_match_height(); });
    }
    
    function check(input, bool) {
    	$input = $(input);
		if (bool) {
			$input.parent().addClass('tile_checked');
			$input.prop('checked', true);
		} else {
			$input.parent().removeClass('tile_checked');
			$input.prop('checked', false);
		}   	
    }
    
    function do_match_height(bool) {
    	if (bool) {
    		$self.find('.tile').matchHeight(true);
    	} else {
    		$.fn.matchHeight._update();
    	}
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