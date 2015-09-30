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
		predicates = [
		                  'http://simile.mit.edu/2003/10/ontologies/artstor#thumbnail',
		                  'http://purl.org/dc/terms/title',
		                  'http://purl.org/dc/terms/description',
		                  'http://purl.org/dc/terms/source',
		                  'http://purl.org/dc/terms/contributor',
		                 ];
		var $wrapper = $('<div class="tiles"></div>').appendTo($self);
		num_rows = obj_length(opts.rows);
    	for (var j in opts.rows) {
    		var $row = $('<div class="tile"></div>').appendTo($wrapper);
    		var img = ('undefined'!=typeof(opts.rows[j][predicates[0]])) ? opts.rows[j][predicates[0]][0].value : $('link#base_url').attr('href')+'application/views/ui/templates/images/missing_thumb.jpg';
    		var source = ('undefined'!=typeof(opts.rows[j][predicates[3]])) ? opts.rows[j][predicates[3]][0].value : '';
    		var contrib = ('undefined'!=typeof(opts.rows[j][predicates[4]])) ? opts.rows[j][predicates[4]][0].value : '';
    		var title = opts.rows[j][predicates[1]][0].value;
    		$img = $('<div class="img_wrapper"><img src="'+img+'" /></div>').appendTo($row);
    		$title = $('<h6><div class="title">'+title+'</div><div class="resource"><a href="'+j+'" target="_blank">'+basename(j)+'</a></a><br /><span class="source">'+source+'</span><br /><span class="contrib">'+contrib+'</span></h6>').appendTo($row);
    		$checkbox = $('<input type="checkbox" value="'+j+'" />').appendTo($row);
    		if (-1!=opts.check.indexOf(j)) {
    			$checkbox.prop('checked', true).parent().addClass('tile_checked');
    		}
    		$img.find('img').load(function() {
    			num_rows--;
    			if (num_rows%5==0 || num_rows <= 0) do_match_height();
    		});
    	}    
    	$wrapper.append('<br clear="both" />');
    	do_match_height(true);
    	$('body').on('sheet_layout_change', function() {
    		do_match_height();
    	});
    	$self.find('input[type="checkbox"]').click(function(event) {
    		event.stopPropagation();
    		var is_checked = ($(this).is(':checked')) ? true : false;
    		check(this, is_checked);
    	});
    	$self.find('.tile').click(function() {
    		var is_checked = ($(this).find('input:checked').length) ? true : false;
    		check($(this).find('input[type="checkbox"]'),((is_checked)?false:true));
    	});
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
    
    function obj_length(obj) {
    	var size = 0, key;
    	for (key in obj) {
    		if (obj.hasOwnProperty(key)) size++;
    	}
    	return size;	
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