$(document).ready(function() {
	set_label_for();
	set_add_another();
	set_view_buttons();
});

function set_label_for() {
	$('.archives').on('click', '.label_for', function() {
		var $this = $(this);
		var is_checked = ($this.prev().is(':checked')) ? true : false;
		$this.prev().prop('checked', ((is_checked)?false:true));
	});
}

function set_add_another() {
	$('.add_another').click(function() {
		$link = $(this);
		var $another = $link.prev().clone().insertAfter($link.prev());
		$another.find('input').val('').prop('checked',false);
		$link.blur();
	});
}

function set_view_buttons() {
	$('.view-buttons').find('button').click(function() {
		var $clicked = $(this);
		$clicked.siblings().removeClass('btn-default').addClass('btn-primary');
		$clicked.removeClass('btn-primary').addClass('btn-default');
		spreadsheet_ui($clicked.attr('id'));
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
	
	// Get parser and parse
	loading(true);
	var parser_path = $('link#base_url').attr('href')+'application/views/ui/parsers/jquery.'+parser+'.js';
	$.getScript(parser_path, function() {
		$.fn.parse({
			graph_uri: ('undefined'!=typeof(graph_uri))?graph_uri:null,
			store_uri: ('undefined'!=typeof(store_uri))?store_uri:null,
			mapping_uri: ('undefined'!=typeof(mapping_uri))?mapping_uri:null,
			source_uri: ('undefined'!=typeof(source_uri))?source_uri:null,
			content_type: ('undefined'!=typeof(content_type))?content_type:null,
			parser: parser,
			proxy:true,
			proxy_uri:$('link#proxy_uri').attr('href'),
			error_callback:store_error_callback,
			complete_callback:store_complete_callback
		});
	});	
	
}
function select_archive() {
	var $parent = $(this).parent();
	if(this.checked) {
		$(this).hide();
		$parent.appendTo('#selected-archives');
		$('<button type="button" class="btn btn-link" onclick="clear_archive.call(this)">clear</button>').appendTo($parent);
	}
}

function clear_archive() {
	$parent = $(this).parent();
	$input = $parent.children('input');
	$input.show();
	$parent.appendTo('#archive-list div[for="'+$input[0].id+'"]')
	$input[0].checked = 0;
	$(this).remove();
}

function filter_archives() {
	var filter_text = $('#archive-filter').val();
	var $archives = $('#archive-list div');
	if(filter_text == '') {
		$archives.show();
		$("#archive-list hr").show();
	} else {
		$archives.hide();
		$("#archive-list hr").hide();
		$archives.each(function(i,e) {
			var text = (e.textContent || e.innerText || '')
			if(text.toUpperCase().indexOf(filter_text.toUpperCase())> -1) {
				$(e).show();
			}
		});
	}
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

function spreadsheet_ui(view) {

	if ('undefined'==typeof(results)) return;
	if ('undefined'==typeof(view)) view = $('.view-buttons').find('button[class*="btn-default"]').attr('id');
	results = sort_rdfjson_by_prop(results, 'http://purl.org/dc/terms/title');

	if ('undefined'!=typeof($.fn.spreadsheet_view)) {
		var checked = $.fn.spreadsheet_view.checked();
		$.fn.spreadsheet_view.remove();
	}
	var view_path = $('link#base_url').attr('href')+'application/views/ui/templates/jquery.'+view+'.js';
	$.getScript(view_path, function() {
		$('#spreadsheet').spreadsheet_view({rows:results,check:checked});
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