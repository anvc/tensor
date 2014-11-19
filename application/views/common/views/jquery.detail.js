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
			default_num_predicates: 4,
			check: []
	};  	
	var opts = {};
	var predicates = [];
	var $self = null;
	
    $.fn.spreadsheet_view = function(options) {
    	opts = $.extend( {}, defaults, options );
    	namespaces_reversed();
    	$self = this;
        do_create_details();
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
    
    function do_create_details() {
    	$self.empty();
    	var $wrapper = $('<div class="container-fluid details"></div>').appendTo($self);
    	for (var j in opts.rows) {
    		var row = opts.rows[j];
    		var thumb = ('undefined'!=typeof(row['http://simile.mit.edu/2003/10/ontologies/artstor#thumbnail'])) ? row['http://simile.mit.edu/2003/10/ontologies/artstor#thumbnail'][0].value : $('link#base_url').attr('href')+'application/views/common/views/images/missing_thumb.jpg';
    		var $row = $('<div class="row"></div>').appendTo($wrapper);
    		var $thumb = $('<div class="thumb col-lg-3 col-md-3 col-sm-3 col-xs-3"><img src="'+thumb+'" /></div>').appendTo($row);
    		$checkbox = $('<input type="checkbox" value="'+j+'" />').appendTo($thumb);
    		if (-1!=opts.check.indexOf(j)) {
    			$checkbox.prop('checked', true).closest('.row').addClass('details_row_checked');
    		}    		
    		var $content = $('<div class="content col-lg-9 col-md-9 col-sm-9 col-xs-9"><div class="container-fluid"></div></div>').appendTo($row);
    		$('<br clear="both" />').appendTo($row);
    		var $p = $content.find('.container-fluid');
    		row = sort_predicates_by_prop(row);
    		for (var p in row) {
    			var o = [];
    			for (k = 0; k < row[p].length; k++) {
    				o.push(row[p][k].value.linkify());
    			}
    			$uri = $('<div class="row"></div>').appendTo($p);
    			$('<div class="col-lg-3 col-md-3 col-sm-3 col-xs-3"><b>'+pnode(p)+'</b></div>').appendTo($uri);
    			$('<div class="col-lg-9 col-md-9 col-sm-9 col-xs-9">'+o.join('<br />')+'</div>').appendTo($uri);
    		}
    	}
    	$self.find('.details .thumb').click(function() {
    		var is_checked = ($(this).find('input:checked').length) ? true : false;
    		$(this).find('input[type="checkbox"]').prop('checked',((is_checked)?false:true));
    		if (is_checked) {
    			$(this).closest('.row').removeClass('details_row_checked');
    		} else {
    			$(this).closest('.row').addClass('details_row_checked');
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
    
    function sort_predicates_by_prop(obj) {
        ps = [];
        for (var p in obj) {
        	ps.push(pnode(p).toLowerCase());
    	}
        ps.sort();
    	
        var results = {};
        for (var j = 0; j < ps.length; j++) {
        	p = ps[j];
        	for (var key in obj) {
        		if (pnode(key).toLowerCase() == p) {
        			results[key] = obj[key];
        			continue;
        		}
        	}
        }
        
        return results;

    }
    
}( jQuery ));