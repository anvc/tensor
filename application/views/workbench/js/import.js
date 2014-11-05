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
		var store_uri_from = $this.data('store-uri-from');
		var store_uri = '';
		// Get store URI
		switch (store_uri_from) {
			case "next-input":
				store_uri = $.trim($this.nextAll('input:first').val());
				break;
		};
		if (!store_uri.length) return;
		// Append (if applicable)
		if ($this.data('store-append').length) {
			store_uri += $this.data('store-append');
		}
		// Search query
		store_uri = store_uri.replace('%1',sq);
		// Reset table
		$('#spreadsheet').spreadsheet_create();
		loading(true);
		// Get parser and parse
		var parser_path = $('link#base_url').attr('href')+'/application/views/common/parsers/jquery.'+parser+'.js';
		$.getScript(parser_path, function() {
			$.fn.parse({
				store_uri: store_uri,
				mapping_uri: 'http://example.com',
				data_uri: 'http://craigdietrich.com',
				proxy:true,
				proxy_uri:$('link#proxy_uri').attr('href'),
				error_callback:store_error_callback,
				complete_callback:store_complete_callback
			});
		});
	});
	
};

function store_error_callback(error) {
	
	var $error = $('#error');
	if ('200 OK'==error) error = error+', but the request returned empty';
	var html = '<p>There was an error attempting to gather results from the triples store:</p>';
	html += '<p><b>'+error+'</b></p>';
	html += '<p>Please try again</p>';
	$error.find('[class="modal-body"]').html(html);
	$error.modal();
	
}

function store_complete_callback(results) {
	
	var $view = $('#spreadsheet').spreadsheet_view({rows:results});
	
	$view.find('table').resizableColumns();
	$view.find('td').condenseCellText();
	  
	$view.find('td').resize(function() {
		$(this).condenseCellText();
	});
	
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