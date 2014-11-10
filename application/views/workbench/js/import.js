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

function do_search(form) {

	var $form = $(form);
	var sq = $form.find('input:first').val();
	if (!sq.length) {
		alert('Please enter a search phrase');
		return;
	}
	if (!$('input:checked').length) {
		alert('Please select one or more places to search');
		return;
	}
	$('input:checked').each(function() {
		var $this = $(this);
		var parser = $this.data('parser');
		var source_uri_from = $this.data('source-uri-from');
		var graph_uri = store_uri = mapping_uri = source_uri = '';
		// Get graph URI
		graph_uri = $this.data('graph-uri');
		// Get store URI
		store_uri = $this.data('store-uri');
		// Get mapping URI
		mapping_uri = $this.data('mapping-uri');
		// Get source URI
		switch (source_uri_from) {
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
		// Reset table
		$('#spreadsheet').spreadsheet_create();
		// Get parser and parse
		var parser_path = $('link#base_url').attr('href')+'application/views/common/parsers/jquery.'+parser+'.js';
		$.getScript(parser_path, function() {
			$.fn.parse({
				graph_uri: ('undefined'!=typeof(graph_uri))?graph_uri:null,
				store_uri: ('undefined'!=typeof(store_uri))?store_uri:null,
				mapping_uri: ('undefined'!=typeof(mapping_uri))?mapping_uri:null,
				source_uri: ('undefined'!=typeof(source_uri))?source_uri:null,
				proxy:true,
				proxy_uri:$('link#proxy_uri').attr('href'),
				error_callback:store_error_callback,
				complete_callback:store_complete_callback
			});
		});
	});
	
};

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

function store_complete_callback(results) {
	
	loading(false);
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