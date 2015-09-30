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
			check: []
	};  	
	var opts = {};
	var predicates = [];
	var $self = null;
	
    $.fn.spreadsheet_view = function(options) {
    	opts = $.extend( {}, defaults, options );
    	namespaces_reversed();
    	$self = this;
        do_create_icons();
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
    
    function do_create_icons() {
    	$self.children(':not(.spreadsheet_panel)').remove();
    	$self.children('.spreadsheet_panel').hide();
    	var $wrapper = $('<div class="container-fluid icons"></div>').appendTo($self);
    	num_rows = obj_length(opts.rows);
    	for (var j in opts.rows) {
    		var row = opts.rows[j];
    		var thumb = ('undefined'!=typeof(row['http://simile.mit.edu/2003/10/ontologies/artstor#thumbnail'])) ? row['http://simile.mit.edu/2003/10/ontologies/artstor#thumbnail'][0].value : $('link#base_url').attr('href')+'application/views/ui/templates/images/missing_thumb.jpg';
    		var $row = $('<div class="row"></div>').appendTo($wrapper);
    		var $thumb = $('<div class="icon_cell"><img src="'+thumb+'" /></div>').appendTo($row);
    		var $title = $('<div class="title"></div>').appendTo($row);
    		for (var p in row) {
    			var pp = pnode(p);
    			if (pp.indexOf('dcterms:title') == -1) continue;
    			var o = [];
    			for (k = 0; k < row[p].length; k++) {
    				o.push(row[p][k].value.linkify());
    			}
    			if ('undefined'==typeof(o[0])) o[0] = '[No title]';
                $title.append(o[0]);
    		}
    		$thumb.find('img').load(function() {
    			num_rows--;
    			if (num_rows%5==0 || num_rows <= 0) do_match_height();
    		});    		
    	}   
    	do_match_height(true);
    	$('body').on('sheet_layout_change', function() {
    		do_match_height();
    	});    	
    }
    
    function obj_length(obj) {
    	var size = 0, key;
    	for (key in obj) {
    		if (obj.hasOwnProperty(key)) size++;
    	}
    	return size;	
    }  
    
    function do_match_height(bool) {
    	if (bool) {
    		$self.find('.row').matchHeight(true);
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
    

    
}( jQuery ));