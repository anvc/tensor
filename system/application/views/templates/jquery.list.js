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
					'shoah':'http://tempuri.org/',
					'prov':'http://www.w3.org/ns/prov#',
					'exif':'http://ns.adobe.com/exif/1.0/',
					'iptc':'http://ns.exiftool.ca/IPTC/IPTC/1.0/',
					'bibo':'http://purl.org/ontology/bibo/',
					'id3':'http://id3.org/id3v2.4.0#',
					'dwc':'http://rs.tdwg.org/dwc/terms/'
			},
			rows: null,
			default_num_predicates: 4,
			check: [],
			num_archives: 1,
			checkable: true
	};  	
	var opts = {};
	var predicates = [];
	var $self = null;
	
    $.fn.spreadsheet_view = function(options) {
    	opts = $.extend( {}, defaults, options );
    	namespaces_reversed();
    	$self = this;
        do_create_table();
        do_create_header();
        do_create_cells();
        return $self;
    };
    
    $.fn.spreadsheet_view.remove = function() {
    	$(window).off('.rc');
    };
    
    function namespaces_reversed() {
    	opts.namespaces_reversed = {};
    	$.each(opts.namespaces, function(key, value) {
    		opts.namespaces_reversed[value] = key; 
    	});    	
    }
    
    function do_create_table() {
        $self.children(':not(.spreadsheet_panel)').remove();
        $self.children('.spreadsheet_panel').hide();
    	$('<table id="spreadsheet-table"></table>').appendTo($self);
    }
    
    function do_create_header() {
    	var $table = $self.find('table');
    	var $head = $('<thead><tr></tr></thead>').prependTo($table);
    	var $row = $head.find('tr');
    	var to_display = predicates_to_display();
        $table.data('namespaces_reversed',opts.namespaces_reversed);
    	$('<th style="white-space:nowrap;">rdf:resource</th>').appendTo($row);
    	for (var j = 0; j < to_display.length; j++) {
    		var $cell = $('<th>'+pnode(to_display[j])+'</th>').appendTo($row);
    	}
    }
    
    function do_create_cells() {
    	var $table = $self.find('table');
    	var $body = $('<tbody></tbody>').appendTo($table);   
    	var num_rows = $.map(opts.rows, function(n, i) { return i; }).length;
    	if (!num_rows) $self.html(opts.msg);     	
    	var to_display = predicates_to_display();
    	if (opts.checkable) {
	    	$table.on('click','td', function() {
	    		var $this = $(this);
	    		var $parent = $this.closest('tr');
	    		var is_clicked = ($parent.hasClass('clicked')) ? true : false;
	    		if (is_clicked) {
	    			$parent.removeClass('clicked');
	    			$parent.find('input[type="checkbox"]').prop('checked', false);
	    			$("body").trigger( "import_remove_node", [$parent.data('uri'), $parent.data('values')] );
	    		} else {
	    			$parent.addClass('clicked');
	    			$parent.find('input[type="checkbox"]').prop('checked', true);
	    			$("body").trigger( "import_add_node", [$parent.data('uri'), $parent.data('values')] );
	    		}   	    		
	    	});
    	} else {
    		$table.on( "click", "td", function() {
    			var $this = $(this);
    			var $parent = $this.closest('tr');
    			$("body").trigger( "node_not_clickable", [$parent.data('uri'), $parent.data('values'), $parent] );
    		});        		
    	};
    	for (var j in opts.rows) {
    		var $row = $('<tr></tr>').appendTo($body);
    		$row.data('uri', j);
    		$row.data('values', opts.rows[j]);    		
    		$('<td><div><a target="_blank" href="'+j+'" title="'+j+'">'+basename(j)+'</a></div><br clear="both" /></td>').appendTo($row);
    		for (var k = 0; k < to_display.length; k++) {
    			var value = ('undefined'!=typeof(opts.rows[j][to_display[k]])) ? opts.rows[j][to_display[k]][0].value : '';
    			$('<td><div class="'+basename(to_display[k])+'">'+value+'</div><br clear="both" /></td>').appendTo($row);
    		}
    		if ('undefined'!=typeof(opts.check[j])) {
    			$row.addClass('clicked');
    			$row.find('input[type="checkbox"]').prop('checked',true);
    		}
    		var mo = '';
    		for (var k in opts.rows[j]) {
    			if (-1==k.indexOf(':')) continue;
    			if ('undefined'!=typeof(opts.rows[j][k][0])) {
    				for (var q = 0; q < opts.rows[j][k].length; q++) {
    					mo += pnode(k) + ' ' +opts.rows[j][k][q].value + "\n";
    				};
    			};
			};
			$row.attr('title', mo);
    	}
        $self.find('td a').on('click', function(e) {
            e.stopPropagation();
        })
        $self.find('td input[type="checkbox"]').on('click', function(e) {
            e.stopPropagation();
        })
        var widths = ['15%','30%'];
        $('#spreadsheet-table').tablesorter({
            theme:'default',
            widgets:["zebra","resizable","stickyHeaders"],
            widgetOptions: {
                resizable:true,
                resizable_widths:widths,
            }
        });      
        if (!opts.checkable) {
        	$self.find('tr').addClass('static');
        }
    }
    
    function predicates_to_display() {
    	var arr = [
   		     'http://purl.org/dc/terms/title',
		     'http://purl.org/dc/terms/description',
		     'http://purl.org/dc/terms/contributor',
		     'http://purl.org/dc/terms/creator'
    	       ];
    	if (opts.num_archives > 1) arr.push('http://purl.org/dc/terms/source');
    	var _arr = [];
    	for (var uri in opts.rows) break;
    	if ('undefined'==typeof(uri)) {
    		return arr;
    	};
    	for (var j = 0; j < arr.length; j++) {
    		if ('undefined'!=typeof(opts.rows[uri][arr[j]])) _arr.push(arr[j]);
    	}
    	return _arr;
    }
    
    function pnode(str) {
    	for (var j in opts.namespaces_reversed) {
    		if (-1==str.indexOf(j)) continue;
    		str = str.replace(j, opts.namespaces_reversed[j]+':');
    		return str;
    	}
        return str;
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