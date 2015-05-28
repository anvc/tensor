$(document).ready(function() {
	set_search();
});
$(window).load(function() {
	set_sheet();
});

function set_search() {
	$search_form = $('#search_form');
	$searchable_form = $('#searchable_form');
	$find_archives_form = $('#find_archives_form');
	$findable_form = $('#findable_form');
	// Search
	$search_form.submit(function() {  // Submit search
		var sq = $(this).find('input:first').val();
		var arr = $.fn.parse_search(sq);
		search();
		return false;
	});
	$search_form.find('a').click(function() {
		$(this).closest('form').submit();
	});
	$searchable_form.children().click(function(event, dont_trigger_click) {
		$searchable_form.find('.notice').remove();
		place( this, (('searchable_form'==$(this).closest('form').attr('id'))?$findable_form:$searchable_form) );
		if (!$searchable_form.children().length) $searchable_form.append('<div class="notice">Add archives from the list below</div>');
		if (!dont_trigger_click) $('#managable_form').find('.archive[title="'+$(this).attr('title')+'"]').trigger('click', [true]);
	});
	// Find archives 
	$find_archives_form.submit(function() {  // Submit find archives
		var val = $find_archives_form.find('input[name="search"]').val().toLowerCase();
		if (!val.length) {
			$findable_form.children().show();
		} else {
			$findable_form.children().hide();
			$findable_form.children().each(function() {
				if (-1!=$(this).attr('title').toLowerCase().indexOf(val)) $(this).show();
			});
		}
		return false;
	});
	$find_archives_form.find('a').click(function() {
		$(this).closest('form').submit();
	});
	$find_archives_form.find('input[name="search"]').on('keyup focusout', function() {
		$(this).closest('form').submit();
	});
	$findable_form.children().click(function(event, dont_trigger_click) {
		$searchable_form.removeClass('bg-danger');
		$searchable_form.find('.notice').remove();
		place( this, (('searchable_form'==$(this).closest('form').attr('id'))?$findable_form:$searchable_form) );
		if (!$searchable_form.children().length) $searchable_form.append('<div class="notice">Add archives from the list below</div>');
		if (!dont_trigger_click) $('#managable_form').find('.archive[title="'+$(this).attr('title')+'"]').trigger('click', [true]);
	});
}

function place(needle, haystack) {
	var $needle = $(needle);
	var title = $needle.attr('title');
	var $haystack = $(haystack);
	var insertAfter = null;
	if (!$haystack.children().length) {
		$haystack.append($needle);
		return;
	}
	$haystack.children().each(function() {
		if (title > $(this).attr('title')) insertAfter = this;
	});
	if (null===insertAfter) {
		$needle.insertBefore($haystack.children()[0]);
	} else {
		$needle.insertAfter(insertAfter);
	}
}

function set_sheet() {
	var $teaser = $('.teaser:first');
	var $search = $('.search:first');
	var $closeteaser = $('.toggle-teaser');
	var $closesearch = $('.toggle-search');
	var $spreadsheet = $('#spreadsheet');

	$("#carousel-example-generic").endlessScroll({width:'100%',height:'200px',steps:-2,speed:40,mousestop:true})

	// Set sheet height
	set_sheet_height();
	// Toggle teaser
	$closeteaser.click(function() {
		if ($teaser.is(':hidden')) {
			$teaser.show();
			$closeteaser.addClass('btn-primary').blur();
			// $teaser.find('.carousel').carousel();
			$('body').trigger('sheet_layout_change');
		} else {
			$teaser.hide();
			$closeteaser.removeClass('btn-primary').blur();
			// $teaser.find('.carousel').carousel('pause');
			$('body').trigger('sheet_layout_change');
		}	
		set_sheet_height();
	});
	// Toggle search
	$closesearch.click(function() {
		if ($search.is(':hidden')) {
			$search.show();
			$closesearch.addClass('btn-primary').blur();
			$spreadsheet.removeClass('col-xs-12');
			$spreadsheet.removeClass('col-sm-12');
			$spreadsheet.removeClass('col-md-12');
			$spreadsheet.removeClass('col-lg-12');
			$spreadsheet.addClass('col-xs-9');
			$spreadsheet.addClass('col-sm-9');
			$spreadsheet.addClass('col-md-9');
			$spreadsheet.addClass('col-lg-9');
			$('body').trigger('sheet_layout_change');
		} else {
			$search.hide();
			$closesearch.removeClass('btn-primary').blur();
			$spreadsheet.addClass('col-xs-12');
			$spreadsheet.addClass('col-sm-12');
			$spreadsheet.addClass('col-md-12');
			$spreadsheet.addClass('col-lg-12');
			$spreadsheet.removeClass('col-xs-9');
			$spreadsheet.removeClass('col-sm-9');
			$spreadsheet.removeClass('col-md-9');
			$spreadsheet.removeClass('col-lg-9');
			$('body').trigger('sheet_layout_change');
		}	
	});
	// View buttons
	$('.view-buttons').find('button').click(function() {
		var $clicked = $(this);
		$clicked.siblings().addClass('btn-default').removeClass('btn-primary');
		$clicked.addClass('btn-primary').removeClass('btn-default');
		if (!jQuery.isEmptyObject(do_search.results)) {
			spreadsheet_ui($clicked.attr('id'));
		}
	});
	// Advanced search
	$('#advanced_search_link').click(function() {
		var $advanced_search = $('#advanced_search');
		if (!$advanced_search.is(':hidden')) {
			$('.spreadsheet_panel').hide();
			return;
		}
		$('.spreadsheet_panel').hide();
		$advanced_search.show();
		$advanced_search.css('min-height', $advanced_search.parent().innerHeight());
		$('#advanced_search_link').blur();
		set_advanced_search();
		$advanced_search.find('.close_btn').click(function() {
			$advanced_search.hide();
		});
	});	
	// Manage archives
	$('#advanced_find_archives_link').click(function() {
		var $manage_archives = $('#manage_archives');
		if (!$manage_archives.is(':hidden')) {
			$('.spreadsheet_panel').hide();
			return;
		}		
		$('.spreadsheet_panel').hide();
		if (!$manage_archives.is(':hidden')) return;
		$manage_archives.show();
		$manage_archives.css('min-height', $manage_archives.parent().innerHeight());
		$('#advanced_find_archives_link').blur();
		set_manage_archives();
		$manage_archives.find('.close_btn').click(function() {
			$manage_archives.hide();
		});
	});
}

function set_sheet_height() {
	var $header = $('.header:first');
	var $teaser = $('.teaser:first');
	var $search = $('.search:first');
	var $spreadsheet = $('#spreadsheet');
	var $manage_archives = $('#manage_archives');
	var $advanced_search = $('#advanced_search');
	var $footer = $('#footer');
	var teaser_height = ($teaser.is(':hidden')) ? 0 : parseInt($teaser.outerHeight());
	var h = parseInt($(window).height())-(parseInt($header.outerHeight())+teaser_height+parseInt($footer.outerHeight()));
	$search.css('min-height',h);
	$spreadsheet.css('min-height',h);
	$manage_archives.css('min-height',h);
	$advanced_search.css('min-height',h)
}

function set_advanced_search() {
	$('#search').advanced_search({form:$('#advanced_form'),callback:function() {
		$('#search_form').submit();
	}});
}

function set_manage_archives() {
	var $manage_archives = $('#manage_archives');
	var $managable_form = $('#managable_form');
	$managable_form.empty();
	// Set archives
	var archives = [];
	$('#searchable_form, #findable_form').children('.archive').each(function() {
		var $cloned = $(this).clone();
		if ($(this).closest('#searchable_form').length) $cloned.addClass('active');
		$cloned.unbind('click');
		$managable_form.append($cloned);
	});
	var $divs = $managable_form.children();
    var alphabeticallyOrderedDivs = $divs.sort(function(a,b){
        return $(a).attr('title') > $(b).attr('title');
    });
    $managable_form.html(alphabeticallyOrderedDivs);	
    $managable_form.children().click(function(event, dont_trigger_click) {
    	var $this = $(this);
    	var title = $this.attr('title');
    	if ($this.hasClass('active')) {
    		$this.removeClass('active');
    	} else {
    		$this.addClass('active');
    	}
    	if (!dont_trigger_click) $('.search').find('.archive[title="'+title+'"]').trigger('click', [true]);
    });
    // Set buttons
    $manage_archives.find('button').click(function() {
    	var $this = $(this);
    	var selected = $this.val();
        $manage_archives.find('button').removeClass('btn-primary').addClass('btn-default');
        $this.addClass('btn-primary');  // All   	
        $manage_archives.find('.archive').each(function() {
        	var $archive = $(this);
        	if (!selected.length) {
        		$archive.show();
        		return;
        	}
        	var arr = $archive.data('categories').split(',');
        	if (arr.indexOf(selected)!=-1) {
        		$archive.show();
        		return;
        	}
        	$archive.hide();
        });
    });
    $manage_archives.find('button:first').trigger('click');  // All
}

function loading(bool, archive_title) {
	var $loading = $('#loading');
	if (bool) {
		if ('undefined'!=typeof(archive_title)) $loading.children(':first').append('<div class="a" title="'+archive_title+'">'+archive_title+'</div>');
		$loading.show();
	} else {
		if ('undefined'!=typeof(archive_title)) $loading.find('.a[title="'+archive_title+'"]').remove();
		if (!$loading.find('.a').length) $loading.hide();
	}
}

function search() {

	var $search = $('#search');
	var $search_form = $('#search_form');
	var $searchable = $('#searchable_form');
	
	$search_form.removeClass('bg-danger');
	$search_form.find('.glyphicon').removeClass('bg-danger');

	if (!$searchable.children('.archive').length) {
		$searchable.addClass('bg-danger');
		// alert('Please select one or more archives to search');
		return;
	}
	
	var sq = $search.val();
	if (!sq.length) {
		$search_form.addClass('bg-danger');
		$search_form.find('.glyphicon').addClass('bg-danger');
		// alert('Please enter one or more search terms');
		return;
	}

	var obj = $.fn.parse_search(sq);
	if (!obj.terms.length) {
		alert('Please enter one or more search terms (in addition to advanced search fields)');
		return;
	}
	
	do_search(obj, $searchable.children('.archive'));
	
};

function do_search(obj, $archives) {
	
	do_search.results = {}; 
	do_search.total = $archives.length;
	do_search.returned = 0;
	
	$archives.each(function() {
		var $archive = $(this);
		var archive = $.extend({}, $archive.data('request-1'));
		var proxy_url = $('link#proxy_url').attr('href');
		var parser_path = $('link#base_url').attr('href')+'application/views/ui/parsers/'+archive.parser+'.js';	
		archive.source = archive.source.replace('%1',obj.terms.join(' '));
		$.extend(archive, {proxy_url:proxy_url,error_callback:store_error_callback,complete_callback:store_complete_callback});
		$.getScript(parser_path, function() {
			loading(true, archive.title);
			$.fn.parse(archive);
		}).fail(function() {
			var $error = $('#error');
			$error.find('[class="modal-body"]').html('<p>Could not find parser</p>');
			$error.modal();
		});			
	});
	
}

function store_error_callback(error, archive) {
	
	loading(false, archive.title);
	do_search.returned++;
	var $error = $('#error');
	if ('200 OK'==error) error = error+', but the request returned empty';
	var html = '<p>There was an error attempting to gather results from the triples store:</p>';
	html += '<p><b>'+error+'</b></p>';
	html += '<p>Please try again</p>';
	$error.find('[class="modal-body"]').html(html);
	$error.modal();
	if (do_search.returned==do_search.total) spreadsheet_ui();
	
}

function store_complete_callback(_results, archive) {

	loading(false, archive.title);
	do_search.returned++;
	jQuery.extend(do_search.results, _results); 
	if (do_search.returned==do_search.total) {
		spreadsheet_ui();
	}
}

function spreadsheet_ui(view) {

	// Presets
	var $error = $('#error');
	if (jQuery.isEmptyObject(do_search.results) && $error.is(':hidden')) {
		//var html = '<p>The search returned zero results!</p>';
		//$error.find('[class="modal-body"]').html(html);
		//$error.modal();
	};
	if ('undefined'==typeof(view)) view = $('.view-buttons').find('button[class*="btn-primary"]').attr('id');
	if ('undefined'!=typeof($.fn.spreadsheet_view)) {
		var checked = $.fn.spreadsheet_view.checked();
		$.fn.spreadsheet_view.remove();
	}
	// Hide gallery
	if (!jQuery.isEmptyObject(do_search.results) && !$('.teaser').is(':hidden')) $('.toggle-teaser').trigger('click');
	// Sort results
	do_search.results = sort_rdfjson_by_prop(do_search.results, 'http://purl.org/dc/terms/title');
	// Load current view
	var view_path = $('link#base_url').attr('href')+'application/views/ui/templates/jquery.'+view+'.js';
	$.getScript(view_path, function() {
		$('#spreadsheet').spreadsheet_view({rows:do_search.results,check:checked});
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