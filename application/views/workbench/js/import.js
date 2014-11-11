$(document).ready(function() {
	set_add_another();
});

function set_add_another() {
	$('.add_another').click(function() {
		$link = $(this);
		var $another = $link.prev().clone().insertAfter($link.prev());
		$another.find('input').val('').prop('checked',false);
		$link.blur();
	});
}

function loading(bool) {
	if (bool) {
		$('#loading').show();
	} else {
		$('#loading').hide();
	}
}

function do_search() {

	var $form = $('#search');
	var sq = $form.find('input:first').val();
	if (!sq.length) {
		alert('Please enter a search phrase');
		return;
	}
	if (!$('input:checked').length) {
		alert('Please select one or more places to search');
		return;
	}
	
	checked = $('.archives-content input:checked');  // Global
	results = {};  // Global
	index = 0;  // Global

	do_search_query();
	
};

function do_search_query() {

	var sq = $('#search').find('input:first').val();
	// No more queries to run
	if ('undefined'==typeof(checked[index])) {
		spreadsheet_ui();
		return;
	}
	// Params
	var $this = $(checked[index]);
	var parser = $this.data('parser');
	var source_uri_from = $this.data('source-uri-from');
	var graph_uri = store_uri = mapping_uri = source_uri = content_type = '';
	graph_uri = $this.data('graph-uri');
	store_uri = $this.data('store-uri');
	mapping_uri = $this.data('mapping-uri');
	content_type = $this.data('content-type');
	switch (source_uri_from) {  // Get source URI
		case "next-input":
			source_uri = $.trim($this.nextAll('input:first').val());
			break;
		default:
			source_uri = $this.data('source-uri');
	};
	if (!source_uri.length) return;
	// Source append (if applicable)
	if ($this.data('source-append')&&$this.data('source-append').length) {
		source_uri += $this.data('source-append');
	}
	// Search query
	source_uri = source_uri.replace('%1',sq);
	loading(true);
	// Get parser and parse
	var parser_path = $('link#base_url').attr('href')+'application/views/common/parsers/jquery.'+parser+'.js';
	$.getScript(parser_path, function() {
		$.fn.parse({
			graph_uri: ('undefined'!=typeof(graph_uri))?graph_uri:null,
			store_uri: ('undefined'!=typeof(store_uri))?store_uri:null,
			mapping_uri: ('undefined'!=typeof(mapping_uri))?mapping_uri:null,
			source_uri: ('undefined'!=typeof(source_uri))?source_uri:null,
			content_type: ('undefined'!=typeof(content_type))?content_type:null,
			proxy:true,
			proxy_uri:$('link#proxy_uri').attr('href'),
			error_callback:store_error_callback,
			complete_callback:store_complete_callback
		});
	});	
	
}

function store_error_callback(error) {
	
	loading(false);
	var $error = $('#error');
	if ('200 OK'==error) error = error+', but the request returned empty';
	var html = '<p>There was an error attempting to gather results from the triples store:</p>';
	html += '<p><b>'+error+'</b></p>';
	html += '<p>Please try again</p>';
	$error.find('[class="modal-body"]').html(html);
	$error.modal();
	
}

function store_complete_callback(_results) {
	
	loading(false);
	jQuery.extend(results, _results);
	index++;
	do_search_query();
	
}

function spreadsheet_ui() {

	results = sort_rdfjson_by_prop(results, 'http://purl.org/dc/terms/title');

	var $view = $('#spreadsheet').spreadsheet_view({rows:results});
	
	$view.find('table').resizableColumns();
	
	$view.find('tr').on('click', 'td:not(:first):not(:has(a))', function() {
		var $this = $(this);
		if ($this.hasClass('metadata')) return;
		var $tr = $this.closest('tr');
		$tr.metadataPanel();
	});
	
	$view.find('table').on('change', '#checkall', function() {
		var is_checked = (this.checked) ? true : false;
		$view.find('table').find('input[type="checkbox"]').prop('checked', is_checked);
		this.blur();
	});		
	
}

function sort_rdfjson_by_prop(obj, p) {
	
    ps = [];
    for (var k in obj) {
    	ps.push(obj[k][p][0].value.toLowerCase());
	}
    ps.sort();
	
    var results = {};
    for (var j = 0; j < ps.length; j++) {
    	pv = ps[j];
    	for (var key in obj) {
    		if (obj[key][p][0].value.toLowerCase() == pv) {
    			results[key] = obj[key];
    			continue;
    		}
    	}
    }
    
    return results;

}