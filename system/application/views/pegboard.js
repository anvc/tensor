$(document).ready(function() {
	var base_url = $('link#base_url').attr('href');
	// Profiles
	if ('undefined'==typeof(ns)) ns = $.initNamespaceStorage('tensor_ns');  // global
	if ('undefined'==typeof(storage)) storage = ns.localStorage;  // global	
	$('#set_profiles').on('show.bs.modal', function () {
		var profiles = ('undefined'!=typeof(storage.get('profiles'))) ? storage.get('profiles') : [];
		$(this).set_profiles(profiles);
	});
	var profiles = ('undefined'!=typeof(storage.get('profiles'))) ? storage.get('profiles') : [];
	if (!profiles.length) $('#set_profiles').modal();
	$('#archives').list_archives(profiles);
	// Archives
	$('body').on("show_archive", function(e, archive) {
		$('#archives').hide();
		$('#search').data('archive',archive).show().find('#search_form input:first').focus().prop('placeholder','Search '+archive.title).val('');
		$('#search').find('.glyphicon-search').unbind('click').click(function() {
			$(this).closest('form').submit();
		});
		$('#search').find('.glyphicon-pencil').unbind('click').click(function() {
			alert('Coming soon: edit this archive\'s settings');
		});
		$('#search').find('.glyphicon-trash').unbind('click').click(function() {
			alert('Coming soon: delete this archive');
		});		
		$('#search_form').unbind('submit').submit(function() {
			$('#search').search();
			return false;
		});
		$('#import_to').import();
	});
	$('#search_archives_form').unbind('submit').submit(function() {
		var sq = $(this).find('input:first').val().toLowerCase();
		var $archives = $('#archives').find('.container-fluid:first .archive');
		$archives.hide();
		$archives.each(function() {
			var $this = $(this);
			if (-1!=$this.data('archive').title.toLowerCase().indexOf(sq)) {
				$this.show();
			} else if (-1!=$this.data('archive').subtitle.toLowerCase().indexOf(sq)) {
				$this.show();
			} else if (-1!=$this.data('archive').url.toLowerCase().indexOf(sq)) {
				$this.show();
			};
		});
		return false;
	}).find('a').unbind('click').click(function() {
		$(this).closest('form').submit();
	});
	$('#search_close_circle, #search_close').click(function(e) {
		e.stopPropagation();
		$('#search_results').empty();
		$('#search').hide();
		$('#collection').hide();
		$('#archives').show();
	});
	$('#add_archive').on('show.bs.modal', function () {
		$(this).add_archive();
	});
	$('#add_archive').find('form').submit(function() {
		var $form = $(this);
		$form.closest('.modal').add_archive($form);
		return false;
	});
	$('#search_view').find('button').unbind('click').click(function() {
		var $this = $(this);
		$this.parent().children().removeClass('btn-primary').addClass('btn-default');
		$this.removeClass('btn-default').addClass('btn-primary');
		$('#search_results').search_results();
	});
	// Collections
	var collections = ('undefined'!=typeof(storage.get('collections'))) ? storage.get('collections') : [];
	$('#collections').list_collections(collections);	
	$('#add_collection').on('show.bs.modal', function () {
		$(this).add_collection();
	});
	$('#add_collection').find('form').submit(function() {
		var $form = $(this);
		$form.closest('.modal').add_collection($form);
		return false;		
	});
	$('body').on("show_collection", function(e, collection) {
		$('#search').hide();
		$('#archives').hide();
		if ('undefined'!=typeof(collection)) var rgb = hexToRgb(collection.color);
		$('#collection').css('background', (('undefined'==typeof(collection))?'#ffffff':'linear-gradient(to bottom, rgba('+rgb.r+','+rgb.g+','+rgb.b+',0.5) 0px, rgba('+rgb.r+','+rgb.g+','+rgb.b+',0) 100px)') );
		$('#collection').data('collection',collection).show().find('#collection_form input:first').val('').prop('placeholder', (('undefined'==typeof(collection))?'All imported media':collection.title));
		$('#collection').find('.glyphicon-search').unbind('click').click(function() {
			$(this).closest('form').submit();
		});
		$('#collection').find('.glyphicon-pencil').unbind('click').click(function() {
			alert('Coming soon: edit this collections\'s settings');
		});
		$('#collection').find('.glyphicon-trash').unbind('click').click(function() {
			if (!confirm('Are you sure you wish to delete this collection?')) return;
			if ('undefined'==typeof(collections)) var collections = ('undefined'!=typeof(storage.get('collections'))) ? storage.get('collections') : [];
			if ('undefined'==typeof(collections[0])) collections[0] = {items:{}};  // 0: all imported media
			var selected_index = 0;
			$('#collections').find('.collection').each(function(index) {
				if (!$(this).hasClass('clicked')) return;
				collections.splice(index, 1);
				storage.set('collections', collections);;		
				$('#collections').list_collections(collections);
				$('#collection_results').empty();
				$('#collection').hide();
				$('#archives').show();		    	
			});
		});		
		$('#collection_form').unbind('submit').submit(function() {
			$('#collection').search();
			return false;
		});
		$('#collection_results').show_collection(collection);
		$('#move_to').move(collection);
	});	
	$('#collection_close_circle, #collection_close').click(function(e) {
		e.stopPropagation();
		$('#collection_results').empty();
		$('#search').hide();
		$('#collection').hide();
		$('#collections .collection').removeClass('clicked');
		$('#archives').show();
	});	
});

// List profiles in an editable way in the provided HTML element
$.fn.set_profiles = function(profiles) {
	if ('undefined'==typeof(ns)) ns = $.initNamespaceStorage('tensor_ns');  // global
	if ('undefined'==typeof(storage)) storage = ns.localStorage;  // global		
	return this.each(function() {
		var $node = $(this);
		var $profiles = $node.find('#profiles');
		$node.submit(function(event){
			event.preventDefault();
		});
		if ('undefined'==typeof(profiles)) profiles = [];
		$profiles.empty();
		if (!profiles.length) {
			$node.find('.has-profiles').hide();
			$node.find('.no-profiles').show();
		// List profiles
		} else {
			$node.find('.has-profiles').show();
			$node.find('.no-profiles').hide();
			$profiles.html('<p class="help-block">Profiles currently loaded in your Tensor app that contribute to your list of archives.</p>');
			for (var j = 0; j < profiles.length; j++) {
				if ('undefined'==typeof(profiles[j].archives)) continue;
				var archive_titles = [];
				for (var k = 0; k < profiles[j].archives.length; k++) {
					archive_titles.push(profiles[j].archives[k].title);
				};
				if (!archive_titles.length) archive_titles = ['No archives'];
				var $profile = $('<div class="profile"><button type="button" class="btn btn-default">Download</button>&nbsp; <span class="desc"><b title="'+profiles[j].uri+'">'+profiles[j].name+'</b><br />Updated '+profiles[j].added+' with <a href="javascript:void(null);" data-toggle="tooltip" data-placement="top" title="'+archive_titles.join(', ')+'">'+profiles[j].archives.length+' archive'+((profiles[j].archives.length>1)?'s':'')+'</a> </span> <button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>').appendTo($profiles);
				$profile.data('profile', profiles[j]);
				if (-1!=profiles[j].uri.indexOf('://')) {
					var $refresh = $('<a href="javascript:void(null);" class="btn btn-xs btn-default">Refresh from server</a>').appendTo($profile.find('span:first'));
					$refresh.click(function() {
						var uri = $(this).closest('.profile').data('profile').uri;
						if (!confirm('Continuing will overwrite any local changes you may have made to this profile. Do you wish to continue?')) {
							return;
						};
						$.ajax({
					        type: 'GET',
					        url: uri+'?callback=profile',
					        async: false,
					        jsonp: true,
					        contentType: "application/json",
					        dataType: 'jsonp'
					    });
					});
				}
				var $download = $profile.find('button:first');
				$download.unbind('click').click(function() {
					var profile = $(this).closest('.profile').data('profile');
					var text = 'profile('+JSON.stringify(profile,null,2)+');';
					var filename = profile.uri.split(/[\\/]/).pop();
					// FileSaver.js
					var blob = new Blob([text], {type: "text/plain;charset=utf-8"});
					saveAs(blob, filename+".txt");					
				});
			};
			$('[data-toggle="tooltip"]').tooltip({trigger:'click'}); 
			$profiles.append('<br clear="both" />');
		};
		// Delete
		$profiles.find('.close').unbind('click').click(function() {
			var profile = $(this).closest('.profile').data('profile');
			if (!confirm('Are you sure you wish to remove '+profile.name+'? This action cannot be undone.')) return;
			var profiles = ('undefined'!=typeof(storage.get('profiles'))) ? storage.get('profiles') : [];
			for (var j = 0; j < profiles.length; j++) {
				if (profile.uri === profiles[j].uri) {
					profiles.splice(j, 1);
					break;
				}
			}
			storage.set('profiles', profiles);
			$('#set_profiles').set_profiles(storage.get('profiles'));
			$('#archives').list_archives(storage.get('profiles'));			
		});
		// Start, Reset
		$node.find('#resetProfiles, #startProfiles').removeAttr('disabled');
		$node.find('#resetProfiles, #startProfiles').unbind('click').click(function() {
			var $button = $(this);
			var is_new = ('startProfiles'==$button.attr('id')) ? true : false;
			$button.attr('disabled', 'disabled');
			if (!is_new && !confirm('Are you sure you wish to reset your profiles?')) {
				$button.removeAttr('disabled');
				return;
			}
			storage.set('profiles', []);
			// This URL shouldn't ever change
			var starter_url = 'https://raw.githubusercontent.com/craigdietrich/tensor-profiles/master/starter.profile.js';
			$.ajax({
		        type: 'GET',
		        url: starter_url+'?callback=profile',
		        async: false,
		        jsonp: true,
		        contentType: "application/json",
		        dataType: 'jsonp'
		    });
		});
		// Create new
		$node.find('#createNewProfile').unbind('click').click(function() {
			var value = $(this).closest('.input-group').find('input[type="text"]').val();
			if (!value.length) {
				alert('Please enter a name for the new profile.');
				return;
			};
			var json = {};
			json.name = value;
			json.uri = '_'+(new Date().getTime());
			window['profile'](json);
			$(this).closest('.input-group').find('input[type="text"]').val('').blur();
		});
		// From URL
		$node.find('#profileFromURL').unbind('click').click(function() {
			var value = $(this).closest('.input-group').find('input[type="text"]').val();
			if (!value.length) {
				alert('Please enter the URL to the profile.');
				return;
			};
			$.ajax({
		        type: 'GET',
		        url: value+'?callback=profile',
		        async: false,
		        jsonp: true,
		        contentType: "application/json",
		        dataType: 'jsonp'
			});
			$(this).closest('.input-group').find('input').val('').blur();
		});		
		// File upload
		$node.find('#profileUpload').unbind('click').click(function() {
			var input = document.getElementById('profile-file-selector');
		    if ('undefined'==typeof(input.files[0])) {
		      alert("Please select a file to upload'");
		      return;
		    }
		    file = input.files[0];
		    fr = new FileReader();
		    fr.onload = function() {
		    	if (!fr.result) {
		    		alert('Could not read the uploaded file');
		    		return;
		    	};
		    	if ('profile('!=fr.result.substr(0,8)) {
		    		alert('Uploaded file does not appear to be a Tensor JSONP file');
		    		return;
		    	};
		    	var json = fr.result.substring(fr.result.indexOf("(") + 1, fr.result.lastIndexOf(")"));
		    	window['profile'](json);
		    };
		    fr.readAsText(file);
		    $(this).closest('.input-group').find('input').val('').blur();
		});
	});
};

// Accept a profile and commit it to storage
window['profile'] = function(json) {
	if ('object'!=typeof(json)) {
		try {
		    json = $.parseJSON(json);
		} catch (e) {
			console.log(e);
		    alert('The source does not appear to be a Tensor profile!');
		    $('#set_profiles').find('.btn').removeAttr('disabled');
		    return;
		};
	};
	if ('undefined'==typeof(json.name) || 'undefined'==typeof(json.uri)) {
		alert('The profile to be saved is missing properties!');
		$('#set_profiles').find('.btn').removeAttr('disabled');
		return;
	};
	json.added = new Date().toJSON().slice(0,10);
	if ('undefined'==typeof(json.archives)) json.archives = [];
	var profiles = ('undefined'!=typeof(storage.get('profiles'))) ? storage.get('profiles') : [];
	// See if we're replacing base on the URI
	for (var j = 0; j < profiles.length; j++) {
		if (profiles[j].uri == json.uri) {
			profiles.splice(j, 1);
			break;
		}
	}
	profiles.push(json);
	storage.set('profiles', profiles);
	if (!$('.modal.in:not(#set_profiles)').length) $('#set_profiles').set_profiles(storage.get('profiles'));
	$('#archives').list_archives(storage.get('profiles'));
	return profiles.length - 1;
};

// List the various archives stored in the various profiles (the default page)
$.fn.list_archives = function(profiles) {
	if ('undefined'==typeof(ns)) ns = $.initNamespaceStorage('tensor_ns');  // global
	if ('undefined'==typeof(storage)) storage = ns.localStorage;  // global		
	return this.each(function() {
		var $node = $(this);
		var categories = [];
		var $buttons = $node.find('.btn-group:first');
		$buttons.empty();
		var $container = $node.find('.container-fluid:first');
		$container.empty();
		for (var j = 0; j < profiles.length; j++) {
			for (var k = 0; k < profiles[j].archives.length; k++) {
				categories = categories.concat(profiles[j].archives[k].categories); 
				var parser_url = $('link#base_url').attr('href')+'parsers/'+profiles[j].archives[k].parser+'/';
				var thumb_url = parser_url+'thumb.png';
				if ('undefined'!=typeof(profiles[j].archives[k].thumbnail)) thumb_url = profiles[j].archives[k].thumbnail;
				// Archive object
				var $archive = $('<div class="col-xs-12 col-sm-6 col-md-4 archive"></div>').appendTo($container);
				$archive.data('archive', profiles[j].archives[k]);
				$archive.data('categories', profiles[j].archives[k].categories);
				$archive.data('error', false);
				// Archive HTML
				var $wrapper = $('<div></div>').appendTo($archive);
				$wrapper.append('<h5>'+profiles[j].archives[k].title+'</h5>');
				$wrapper.append('<div class="desc"><div>'+profiles[j].archives[k].subtitle+'</div></div>');
				$wrapper.css('backgroundImage','url('+thumb_url+')');
				$wrapper.prop('title', profiles[j].archives[k].subtitle);
				// Test if a corresponding parser exists on the server
				var test_img = new Image();
				test_img.archive = $archive;
				test_img.onerror = function() {
					this.archive.data('error', "Could not find the corresponding parser folder for this archive.");
					thumb_url = $('link#base_url').attr('href')+'system/application/views/images/missing_thumb.jpg';
					this.archive.children().css('backgroundImage','url('+thumb_url+')');
				};
				test_img.src = thumb_url;
			}
		}
		$container.children().unbind('click').click(function() {
			var $this = $(this);
			if ($this.data('error').length) {
				var parser_name = $this.data('archive').parser;
				var $error = $('#error');
				$error.find('.modal-title').text('No parser found!');
				$error.find('.modal-body').empty().append('The parser folder "'+parser_name+'" is not present in this Tensor install\'s file system. Contact an administrator to add the parser\'s files to /parsers/'+parser_name+'.');
				$error.find('.modal-body').append('<br /><br />Once added you will be able to use this archive and add new archives based on the same parser.');
				$error.modal();
				return;
			};
			$('body').trigger("show_archive", [$this.data('archive')]);
		});
		// Categories
		categories = categories.unique().sort();
		$buttons.append('<button type="button" class="btn btn-default">All archives</button>');
		$buttons.append('<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span class="caret"></span><span class="sr-only">Toggle Dropdown</span></button>');
		var $list = $('<ul class="dropdown-menu"><li><a href="javascript:void(null);" data-title="all">All archives</a><ul>').appendTo($buttons);
		for (var j = 0; j < categories.length; j++) {
			$list.append('<li><a href="javascript:void(null);" data-title="'+categories[j].toLowerCase()+'">'+categories[j].firstLetterCap()+'</a></li>');
		};
		var filter_archives = function(category) {
			$('#search_archives_form').find('input').val('');
			if ('undefined'==typeof(category) || !category.length) {
				$container.children().show();
				return;
			};
			$container.children().each(function() {
				var $this = $(this);
				if (-1!=$this.data('categories').indexOf(category)) {
					$this.show();
				} else {
					$this.hide();
				};
			});
		};
		$buttons.find('button:first').unbind('click').click(function() {
			var $this = $(this);
			if ('all'==$this.data('title')) {
				filter_archives();
			} else {
				filter_archives($this.data('title'));
			};			
		});
		$buttons.find('ul a').unbind('click').click(function() {
			var $clicked = $(this);
			$clicked.closest('.btn-group').find('button:first').text($clicked.text()).data('title',$clicked.data('title'));
			if ('all'==$clicked.data('title')) {
				filter_archives();
			} else {
				filter_archives($clicked.data('title'));
			};
		});
	});
};

// The add archive modal
$.fn.add_archive = function($form) {
	if ('undefined'!=typeof($form)) {
		if ('undefined'==typeof(ns)) ns = $.initNamespaceStorage('tensor_ns');  // global
		if ('undefined'==typeof(storage)) storage = ns.localStorage;  // global	
		var profile = $form.find('#profile').val();
		if (!profile.length) {
		   var new_profile = $form.find('#new_profile').val();
		   if (!new_profile.length) {
			   alert('Please enter a name for the new profile, or select an existing profile.');
			   return;
		   }
		   var json = {};
		   json.name = new_profile;
		   json.uri = '_'+(new Date().getTime());
		   var profile_index = window['profile'](json);
		} else {
			var profiles = ('undefined'!=typeof(storage.get('profiles'))) ? storage.get('profiles') : {};
			var profile_index = null;
			for (var j = 0; j < profiles.length; j++) {
				if (profiles[j].uri == profile) {
					profile_index = j;
					break;
				}
			}
		}
		if (null===profile_index) {
			alert('Could not find selected profile');
			return;
		}
		var categories = $form.find('#categories').val().split(/[\s,]+/);
		// Create the new archive
		var obj = {
				"title": $form.find('#title').val(),
				"subtitle": $form.find('#subtitle').val(),
				"parser":$form.find('#parser').val(),
				"url": $form.find('#url').val(),
				"categories": categories		
			};
		if ($form.find('#thumbnail').val().length) obj.thumbnail = $form.find('#thumbnail').val();
		if ('undefined'==typeof(profiles)) var profiles = ('undefined'!=typeof(storage.get('profiles'))) ? storage.get('profiles') : {};
		profiles[profile_index].archives.push(obj);
    	profiles[profile_index].added = new Date().toJSON().slice(0,10);  // Not great semantics, but ...
    	storage.set('profiles', profiles);
    	$('#archives').list_archives(storage.get('profiles'));
    	$('#add_archive').modal('hide');
	} else {
		if ('undefined'==typeof(ns)) ns = $.initNamespaceStorage('tensor_ns');  // global
		if ('undefined'==typeof(storage)) storage = ns.localStorage;  // global		
		return this.each(function() {
			var $modal = $(this);
			$modal.find('input').val('');
			// Profiles
			var profiles = ('undefined'!=typeof(storage.get('profiles'))) ? storage.get('profiles') : {};
			var profile_options = '<option value="">Create new profile</option>';
			for (var j = 0; j < profiles.length; j++) {
				profile_options += '<option value="'+profiles[j].uri+'">'+profiles[j].name+'</option>';
			}
			var check_profile_options = function() {
				if ($modal.find('#profile').val().length) {
					$modal.find('#profile').next().hide();
				} else {
					$modal.find('#profile').next().show();
				}
			};
			$modal.find('#profile').empty().html(profile_options).unbind('change').change(check_profile_options);
			check_profile_options();
			// Parsers
			$.getJSON($('link#base_url').attr('href')+'wb/parsers', function(json) {
				var options = '';
				for (var j = 0; j < json.length; j++) {
					options += '<option value="'+json[j]+'">'+json[j]+'</option>';
				}					
				$modal.find('#parser').empty().html(options);
			});
		
		});
	}
};

// Run a search on the selected archive
$.fn.search = function(page) {

	return this.each(function() {
		var $node = $(this);	
		var archive = $node.data('archive');
		var base_url = $('link#base_url').attr('href');
		var proxy_url = $('link#proxy_url').attr('href');
		// Default values
		if ('undefined'==typeof(page)) page = 1;
		var $form = $node.find('form:first');
		var $input = $form.find('[name="search"]:first');
		var sq = $input.val();
		// Validation
		var obj = $.fn.parse_search(sq);
		if (!obj.terms.length) {
			alert('Please enter one or more search terms');
			return;
		}
		// Run search
		var parser = base_url+'parsers/'+archive.parser+'/parser.js';
		$.extend(archive, {page:page,query:obj.terms.join(' '),parser:archive.parser,proxy_url:proxy_url,error_callback:error_callback,complete_callback:parse_complete_callback});
		$.getScript(parser, function() {
			loading(true, archive.title);
			$.fn.search.page = page;
			$.fn.search.results = [];
			$.fn.parse(archive);
		}).fail(function() {
			var $error = $('#error');
			$error.find('[class="modal-body"]').html('<p>Could not find parser</p>');
			$error.modal();
		});			
		
	});
	
};

function error_callback(error, archive) {

	loading(false, archive.title);
	var $error = $('#error');
	if ('200 OK'==error) error = 'There were internal errors';
	var html = '<p>There was an error attempting to gather results:</p>';
	html += '<p><b>'+error+'</b></p>';
	html += '<p>Please try again</p>';
	$error.find('[class="modal-body"]').html(html);
	$error.modal();
	
};

function parse_complete_callback(_results, archive) {

	loading(false, archive.title);
	$.fn.search.results = _results;
	$('#search_form').find('input').blur();
	$('#search_results').search_results();

};

// Display search results in one of many templates
$.fn.search_results = function() {
	
	if ('undefined'==typeof(ns)) ns = $.initNamespaceStorage('tensor_ns');  // global
	if ('undefined'==typeof(storage)) storage = ns.localStorage;  // global		
	return this.each(function() {
		var $node = $(this);		
		var view = $('#search_view').find('button[class*="btn-primary"]').attr('id'); 
		if ('undefined'!=typeof($.fn.spreadsheet_view)) $.fn.spreadsheet_view.remove();
		//results = sort_rdfjson_by_prop(results, 'http://purl.org/dc/terms/title');
		//$('.num_results').html( $.map(results, function(n, i) { return i; }).length );
		$('.page').text($.fn.search.page);
		$('.prev-page, .next-page').hide();
		if ($.fn.search.page > 1) $('.prev-page').show().data('page', $.fn.search.page - 1);
		$('.next-page').show().data('page', $.fn.search.page + 1);
		var view_path = $('link#base_url').attr('href')+'system/application/views/templates/jquery.'+view+'.js';
		$.getScript(view_path, function() {
			$node.empty();
			$node.attr('class',view+'_view').spreadsheet_view({rows:$.fn.search.results,check:get_imported(),num_archives:1});
		});		
	});
	
};

// The "import to" button with attached import action
$.fn.import = function() {

	return this.each(function() {
		var $node = $(this);
		$node.empty();
		var archive = $('#search').data('archive');
		// Create the split button with a list of the collections
		$node.append('<button type="button" class="btn btn-primary">Import</button>');
		$node.append('<button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span class="caret"></span><span class="sr-only">Toggle Dropdown</span></button>');
		var $list = $('<ul class="dropdown-menu"><li class="dropdown-menu-title">Import to...</li></ul>').appendTo($node);
		if ('undefined'==typeof(collections)) var collections = ('undefined'!=typeof(storage.get('collections'))) ? storage.get('collections') : [];
		for (var j = 1; j < collections.length; j++) {  // 0: all imported media
			$list.append('<li><a href="javascript:void(null);" data-index="'+j+'">'+collections[j].title+'</a></li>');
		};
		// Import actions
		var do_import = function(index) {
			if ('undefined'==typeof(index)) index = 0;  // 0: all imported media
			var items = {};
			$('#search_results').find('.clicked').each(function() {
				var $this = $(this);
				var uri = $this.data('uri');
				var values = $this.data('values');
				items[uri] = values;
			});
			if ('undefined'==typeof(collections)) var collections = ('undefined'!=typeof(storage.get('collections'))) ? storage.get('collections') : [];
			if ('undefined'==typeof(collections[0])) collections[0] = {items:{}};  // 0: all imported media
			collections[0].items = $.extend({}, collections[0].items, items);
			if (index > 0) collections[index].items = $.extend({}, collections[index].items, items);
			storage.set('collections', collections);;	
			$('#collections').list_collections(collections);
			$('#search_results').find('.clicked').removeClass('clicked').find('.clicked_layer').remove();
			if (!$('#imported_tour').length) {
				$(window).joyride("destroy");
				var $joyride = $('<ol id="imported_tour"><li data-id="collection_'+index+'" data-button="Close"><p>Your item'+((Object.keys(items).length>1)?'s have':' has')+' been imported'+((index>0)?' into this collection':'')+'.</p></li></ol>').appendTo('body');
				$("#imported_tour").joyride({autoStart:true, timer:2000, template:{link:''}});
			};
		};
		$list.find('a').unbind('click').click(function() {
			var index = $(this).data('index');
			do_import(index);
		});
		$node.find('button:first').unbind('click').click(function() {
			do_import();
		});
	});
	
};

//List collections in the sidebar
$.fn.list_collections = function(collections) {
	if ('undefined'==typeof(ns)) ns = $.initNamespaceStorage('tensor_ns');  // global
	if ('undefined'==typeof(storage)) storage = ns.localStorage;  // global		
	return this.each(function() {
		var $node = $(this);
		$form = $node.find('#collections_form');
		$form.children(':gt(0)').remove();  // Assume the first collection is the built-in "All imported media"
		if ('undefined'==typeof(collections)) var collections = ('undefined'!=typeof(storage.get('collections'))) ? storage.get('collections') : [];
		if ('undefined'==typeof(collections[0])) collections[0] = {items:{}};  // 0: all imported media
		$form.find('.all .num_items').text(Object.keys(collections[0].items).length);
		for (var j = 1; j < collections.length; j++) {  // 0: all imported media
			var lum = luminance(collections[j].color);
			var $col = $('<div class="collection" id="collection_'+j+'"></div>').appendTo($form);
			$col.append('<div class="color '+((lum < 80)?'dark':'light')+'" style="background-color:'+collections[j].color+';"><span class="num_items">'+Object.keys(collections[j].items).length+'</span></div>');
			$col.append('<h5>'+collections[j].title+'</h5>');
		    $col.append('<div class="desc">'+collections[j].description+'</div>');
		    $col.data('collection', collections[j]);
		};
		$form.children().unbind('click').click(function() {
			var $clicked = $(this);
			$clicked.parent().find('.collection').removeClass('clicked');
			$clicked.addClass('clicked');
			$('body').trigger("show_collection", [$clicked.data('collection')]);
		});
	});
};

// The add collection modal
$.fn.add_collection = function($form) {
	if ('undefined'!=typeof($form)) {
		if ('undefined'==typeof(ns)) ns = $.initNamespaceStorage('tensor_ns');  // global
		if ('undefined'==typeof(storage)) storage = ns.localStorage;  // global	
		var obj = {};
		obj.title = $form.find('[name="title"]').val();
		obj.description = $form.find('[name="description"]').val();
		obj.color = '#'+$form.find('input[name="color"]').spectrum("get").toHex();
		obj.items = {};
		if (!obj.title.length) {
			alert('Please enter a title for the collection');
			return;
		} else if (!obj.description.length) {
			alert('Please enter a description for the collection');
			return;
		};
		if ('undefined'==typeof(collections)) var collections = ('undefined'!=typeof(storage.get('collections'))) ? storage.get('collections') : [];
		if ('undefined'==typeof(collections[0])) collections[0] = {items:{}};  // 0: all imported media
		collections.push(obj);
		storage.set('collections', collections);;		
		$('#collections').list_collections(collections);
    	$('#add_collection').modal('hide');
	} else {	
		return this.each(function() {
			var $modal = $(this);
			$modal.find('input').val('');
			$modal.find('input[name="color"]').spectrum({
			    color: "#9999ff"
			});		
		});
	}
};

//Display the contents of a collection
$.fn.show_collection = function(collection) {
	
	if ('undefined'==typeof(ns)) ns = $.initNamespaceStorage('tensor_ns');  // global
	if ('undefined'==typeof(storage)) storage = ns.localStorage;  // global		
	return this.each(function() {
		var $node = $(this);		
		if ('undefined'==typeof(collection)) {
			if ('undefined'==typeof(collections)) var collections = ('undefined'!=typeof(storage.get('collections'))) ? storage.get('collections') : [];
			var items = ('undefined'==typeof(collections[0])) ? {} : collections[0].items;
		} else {
			var items = collection.items;
		}
		var view = $('#collection_view').find('button[class*="btn-primary"]').attr('id'); 
		if ('undefined'!=typeof($.fn.spreadsheet_view)) $.fn.spreadsheet_view.remove();
		//results = sort_rdfjson_by_prop(results, 'http://purl.org/dc/terms/title');
		//$('.num_results').html( $.map(results, function(n, i) { return i; }).length );
		$('.page').text($.fn.search.page);
		$('.prev-page, .next-page').hide();
		if ($.fn.search.page > 1) $('.prev-page').show().data('page', $.fn.search.page - 1);
		$('.next-page').show().data('page', $.fn.search.page + 1);
		var view_path = $('link#base_url').attr('href')+'system/application/views/templates/jquery.'+view+'.js';
		$.getScript(view_path, function() {
			$node.empty();
			$node.attr('class',view+'_view').spreadsheet_view({rows:items,num_archives:1});
		});		
	});
	
};

//The "move" button with attached move action
$.fn.move = function(source_collection) {

	return this.each(function() {
		var $node = $(this);
		$node.empty();
		// Create the split button with a list of the collections
		$node.append('<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Selected items <span class="caret"></span></button>');
		var $list = $('<ul class="dropdown-menu"><li><a href="javascript:void(null);" data-index="meta">Edit metadata</a></li><li role="separator" class="divider"></li></ul>').appendTo($node);
		if ('undefined'==typeof(collections)) var collections = ('undefined'!=typeof(storage.get('collections'))) ? storage.get('collections') : [];
		for (var j = 0; j < collections.length; j++) {  // 0: all imported media
			if (JSON.stringify(source_collection) == JSON.stringify(collections[j])) continue;
			if ('undefined'==typeof(source_collection) && 0==j) {
				var title = 'Remove from all collections';
			} else if (0==j) {
				var title = 'Remove from this collection';
			} else if ('undefined'==typeof(source_collection)) {
				var title = 'Copy into '+collections[j].title;
			} else {
				var title = 'Move to '+collections[j].title;
			};
			$list.append('<li><a href="javascript:void(null);" data-index="'+j+'">'+title+'</a></li>');
		};
		// Move actions
		var do_move = function(index) {
			if ('undefined'==typeof(index)) index = 0;  // 0: all imported media
			var items = {};
			$('#collection_results').find('.clicked').each(function() {
				var $this = $(this);
				var uri = $this.data('uri');
				var values = $this.data('values');
				items[uri] = values;
			});
			if ('undefined'==typeof(collections)) var collections = ('undefined'!=typeof(storage.get('collections'))) ? storage.get('collections') : [];
			if ('undefined'==typeof(collections[0])) collections[0] = {items:{}};  // 0: all imported media
			if ('meta'==index) {  // Edit metadata
				$('#edit_metadata').metadata(items, source_collection);
				return;
			} else if ('undefined'==typeof(source_collection) && 0==index) {  // Delete from all 
				for (var k = 0; k < collections.length; k++) {
					for (var uri in items) {
						if ('undefined'!=collections[k].items[uri]) delete collections[k].items[uri];
					};
				};
			} else if (0==index) {  // Delete from this collection
				for (var k = 0; k < collections.length; k++) {
					if (JSON.stringify(source_collection) != JSON.stringify(collections[k])) continue;
					for (var uri in items) {
						if ('undefined'!=collections[k].items[uri]) delete collections[k].items[uri];
					};
					break;
				};
			} else if ('undefined'==typeof(source_collection)) {  // Copy from all into a collection
				for (var uri in items) {
					collections[index].items[uri] = items[uri];
				};
			} else {  // Move from one to the other
				for (var k = 0; k < collections.length; k++) {
					if (JSON.stringify(source_collection) != JSON.stringify(collections[k])) continue;
					for (var uri in items) {
						if ('undefined'!=collections[k].items[uri]) delete collections[k].items[uri];
					};
					break;
				};		
				for (var uri in items) {
					collections[index].items[uri] = items[uri];
				};
			};						
			storage.set('collections', collections);
			var selected_index = 0;
			$('#collections_form').find('.collection').each(function(index) {
				if ($(this).hasClass('clicked')) selected_index = index;
			});			
			$('#collections').list_collections(collections);
			$('#collections_form').find('.collection').eq(selected_index).click();
			if ($.isNumeric(index) && !$('#moved_tour').length) {
				$(window).joyride("destroy");
				var $joyride = $('<ol id="moved_tour"><li data-id="collection_'+selected_index+'" data-button="Close"><p>Your item'+((Object.keys(items).length>1)?'s have':' has')+' been '+((index>0)?' moved':' copied')+'.</p></li></ol>').appendTo('body');
				$("#moved_tour").joyride({autoStart:true, timer:2000, template:{link:''}});
			};			
		};
		$list.find('a').unbind('click').click(function() {
			var index = $(this).data('index');
			do_move(index);
		});
	});
	
};

//Edit metadata modal
$.fn.metadata = function(items, source_collection) {	
	
	return this.each(function() {
		var $node = $(this);
		
		if (!Object.keys(items).length) {
			alert('Please select one or more items to edit');
			return;
		}
		
		var show_metadata = function(item) {
			$node.modal();
			$form = $node.find('form:first');
			$form.empty();
			$(window).scrollTop(0);
			var total = Object.keys(items).length;
			$node.find('.modal-title .count').text('(item ' + (item+1) + ' of ' + total + ')');
			var count = 0;
			for (var uri in items) {
				if (count != item) {
					count++;
					continue;
				}
				for (var p in items[uri]) {
					for (var j = 0; j < items[uri][p].length; j++) {
						var ns_name = pnode(p);
						var $row = $('<div class="form-group"></div>').appendTo($form);
						$row.append('<label for="'+ns_name+'" class="col-sm-3 control-label">'+ns_name+'</label>');
					    $row.append('<div class="col-sm-9"><input type="text" class="form-control" id="'+ns_name+'" value="'+escapeHtml(items[uri][p][j].value)+'"></div>');
					    if ('art:thumbnail'==ns_name) {
					    	$row.find('div').append('<a href="'+items[uri][p][j].value+'" target="_blank"><img src="'+items[uri][p][j].value+'" class="img-thumbnail" /></a>');
					    } else if (-1!=items[uri][p][j].value.indexOf('://')) {
					    	$row.find('div').append('<a href="'+items[uri][p][j].value+'" class="visit_link" target="_blank">Visit link</a>');
					    }
					};
				};
				$node.find('button:last').unbind('click').click(function() {
					// TODO
					$node.on('hidden.bs.modal', function (e) {
						item++;
						if (item == total) {
							$node.off('hidden.bs.modal');
							return;
						};
						show_metadata(item);
					});
					$node.modal('hide');
				});
				break;
			};
		};
		
		show_metadata(0);
		
	});
	
};

//Push items to through a saver
$.fn.sync = function($form) {

	if ('undefined'!=typeof($form)) {
		return this.each(function() {
			var $node = $(this);	
			var archive = $node.data('archive');
			var base_url = $('link#base_url').attr('href');
			var proxy_url = $('link#proxy_url').attr('href');
			// Default values
			if ('undefined'==typeof(page)) page = 1;
			var $form = $node.find('form:first');
			var $input = $form.find('[name="search"]:first');
			var sq = $input.val();
			// Validation
			var obj = $.fn.parse_search(sq);
			if (!obj.terms.length) {
				alert('Please enter one or more search terms');
				return;
			}
			// Run search
			var parser = base_url+'parsers/'+archive.parser+'/parser.js';
			$.extend(archive, {page:page,query:obj.terms.join(' '),parser:archive.parser,proxy_url:proxy_url,error_callback:error_callback,complete_callback:sync_complete_callback});
			$.getScript(parser, function() {
				loading(true, archive.title);
				$.fn.search.page = page;
				$.fn.search.results = [];
				$.fn.parse(archive);
			}).fail(function() {
				var $error = $('#error');
				$error.find('[class="modal-body"]').html('<p>Could not find parser</p>');
				$error.modal();
			});			
		});		
	} else {
		// TODO: set up sync modal
	};
	
};

function sync_complete_callback(data, archive) {

	loading(false, archive.title);
	console.log(data);
	$('#search_form').find('input').blur();
	$('#search_results').search_results();

};

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

Array.prototype.unique = function() {
    var unique = [];
    for (var i = 0; i < this.length; i++) {
        if (unique.indexOf(this[i]) == -1) {
            unique.push(this[i]);
        }
    }
    return unique;
};

String.prototype.firstLetterCap = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

var hexToRgb = function(hex) {  // http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
	if ('undefined'==typeof(hex)) return hex;
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
};

var luminance = function(hex) {
    var rgb = hexToRgb(hex);
    if (!rgb) return hex;
    return 0.2126 * rgb.r + 0.7152 * rgb.g + 0.0722 * rgb.b;
};

var pnode = function(uri) {
	var namespaces = {
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
			'bibo':'http://purl.org/ontology/bibo/'
		};
	for (var prefix in namespaces) {
		if (-1!=uri.indexOf(namespaces[prefix])) {
			return prefix + ':' + uri.replace(namespaces[prefix],'');
		};
	};
};

function escapeHtml(text) {  // http://stackoverflow.com/questions/1787322/htmlspecialchars-equivalent-in-javascript
	  var map = {
	    '&': '&amp;',
	    '<': '&lt;',
	    '>': '&gt;',
	    '"': '&quot;',
	    "'": '&#039;'
	  };
	  return text.replace(/[&<>"']/g, function(m) { return map[m]; });
};

/**
 * Set UI for the collections sidebar
 * @return null
 */
function set_collections() {

	$('input[name="color"]').spectrum({
	    color: "#9999ff"
	});
	$('#collections_form').children('.all').click(function() {
		switch_to('collections');
		collections_ui(); 
	});
	$('#collections_spreadsheet').find('.view-buttons').find('button').click(function() {
		var $clicked = $(this);
		$clicked.blur();
		$clicked.siblings(':not(.page)').addClass('btn-default').removeClass('btn-primary');
		$clicked.addClass('btn-primary').removeClass('btn-default');
		collections_ui(collections_ui.col_id, $clicked.attr('id'), collections_ui.col_view);
	});	
	$('#edit_collection').on('show.bs.modal', function (event) {
		var $modal = $(this);
		var collections = get_collections();
		var collection = collections[collections_ui.col_id];
		$modal.data('collection_id', collections_ui.col_id);
		$modal.find('[name="title"]').val(collection.title);
		$modal.find('[name="description"]').val(collection.description);
		$modal.find('input[name="color"]').spectrum("set", collection.color);
	});
	$('#edit_collection').find('button:last').click(function() {
		$('#edit_collection').submit();
	});	
	$('#edit_collection').submit(function() {
		var $this = $(this);
		var obj = {};
		var col_id = $this.data('collection_id');
		if ('undefined'==typeof(col_id)) {
			alert('Problem determining the collection ID');
			return false;
		}
		obj.title = $this.find('[name="title"]').val();
		obj.description = $this.find('[name="description"]').val();
		obj.color = '#'+$this.find('input[name="color"]').spectrum("get").toHex();
		if (!obj.title.length) {
			alert('Please enter a title for the collection');
		} else {
			$('body').trigger("collection_edit_node", [ col_id, obj ] );
			$this.find('[name="title"]').val('');
			$this.find('[name="description"]').val('');
			$this.modal('hide');
		}
		return false;
	});	
	$('#create_collection').find('button:last').click(function() {
		$('#create_collection').submit();
	});
	$('#create_collection').submit(function() {
		var $this = $(this);
		var obj = {};
		obj.title = $this.find('[name="title"]').val();
		obj.description = $this.find('[name="description"]').val();
		obj.color = '#'+$this.find('input[name="color"]').spectrum("get").toHex();
		if (!obj.title.length) {
			alert('Please enter a title for the collection');
		} else {
			$('body').trigger("collection_add_node", [ obj ] );
			$this.find('[name="title"]').val('');
			$this.find('[name="description"]').val('');
			$this.modal('hide');
		}	
		return false;
	});
	$('#collection_view').find('button').click(function() {
		collections_ui(collections_ui.col_id, null, $(this).val());
	});	
	$('#delete_collection_link').click(function() {
		if (confirm('Are you sure you wish to delete this collection?')) {
			$('body').trigger("collection_remove_node", [ collections_ui.col_id ] );
		}
	});
	var $filter_collections_form = $('#filter_collections_form');
	$filter_collections_form.submit(function() {  // Submit find archives
		var $this = $(this);
		var $collections_form = $('#collections_form');
		var val = $this.find('input[name="search"]').val().toLowerCase();
		if (!val.length) {
			$collections_form.children().show();
		} else {
			$collections_form.children(':not(.notice,.all)').hide();
			$collections_form.children().each(function() {
				if (-1!=$(this).text().toLowerCase().indexOf(val)) $(this).show();
			});
		}
		return false;
	});	
	$filter_collections_form.find('a').click(function() {
		$(this).closest('form').submit();
	});
	$filter_collections_form.find('input[name="search"]').on('keyup focusout', function() {
		$(this).closest('form').submit();
	});
	$('#advanced_collections_link').click(function() {
		alert('Coming soon!');
	});
	
	collections_ui();
	
}

/**
 * Set UI for the left-side search area
 * @return null
 */
function set_search() {
	
	$find_archives_form = $('#find_archives_form');
	$findable_form = $('#findable_form');
	$findable_form.children('.archive').click(function() {
		switch_to('archives');
		var $this = $(this);
		$this.parent().find('.archive').removeClass('clicked');
		$this.addClass('clicked');
		var index = $this.data('index');
		search_ui(index); 
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
	$search_form = $('#search_form');
	$search_form.submit(function() {
		search(1);
		return false;
	});
	$search_form.find('a').click(function() {
		$(this).closest('form').submit();
	});
	var $search_bar = $('#search_bar');
	$search_bar.find('.view-buttons').find('button').click(function() {
		var $clicked = $(this);
		$clicked.blur();
		$clicked.siblings(':not(.page)').addClass('btn-default').removeClass('btn-primary');
		$clicked.addClass('btn-primary').removeClass('btn-default');
		search_results_ui($clicked.attr('id'));
	});		
	$search_bar.find('.page').click(function() {
		var $this = $(this);
		var dir = null;
		var page = null;
		if ($this.hasClass('prev-page')) dir = 'prev';
		if ($this.hasClass('next-page')) dir = 'next';
		switch (dir) {
			case 'prev':
				page = do_search.page - 1;
				break;
			case 'next':
				page = do_search.page + 1;
				break;
		};
		if (null!=page) search(page);
	});	
	$('#advanced_find_archives_link').click(function() {
		var $manage_archives = $('#manage_archives');
		if (!$manage_archives.is(':hidden')) {
			$manage_archives.hide();
			return;
		}		
		$manage_archives.show();
		$manage_archives.css('min-height', $(window).height());
		$('#advanced_find_archives_link').blur();
		set_manage_archives();
		$manage_archives.find('.close_btn').click(function() {
			$manage_archives.hide();
		});
	});
	
}

/**
 * Set the sync modal
 * @return null
 */
function set_sync() {
	
	var $sync = $('#sync');
	$sync.find('button:last').click(function() {
		sync();
	});
	
	$sync.on('show.bs.modal', function (event) {
		$sync.find('#sync_complete_btn').remove();
		$sync.find('.modal-footer button').show();
		$sync.find('.sync_details').empty();
		$sync.find('#content_progress').width('0%');
		$sync.find('#content_progress span').html('Content 0 of 0');
		var $modal = $(this);
		var $collections = $modal.find('#sync_collections');
		var $destinations = $modal.find('#sync_destinations');
		$collections.empty();
		$destinations.html('Loading Scalar books ....');
		var all = get_imported();
		var collections = get_collections();
		// Collections
		$('#collections_form').find('.collection:not(.notice)').clone().removeClass('clicked').appendTo($collections);
		$collections.find('.collection').click(function() {
			var $this = $(this);
			var is_clicked = $this.hasClass('clicked') ? true : false;
			if ($this.hasClass('all')) {
				$this.parent().children().removeClass('clicked');
				if (is_clicked) {
					$this.removeClass('clicked');
				} else {
					$this.addClass('clicked');
				}
			} else {
				$this.parent().find('.all').removeClass('clicked');
				if (is_clicked) {
					$this.removeClass('clicked');
				} else {
					$this.addClass('clicked');
				}				
			};
			sync_ui();
		});
		// Scalar books
		var base = getParameterByName('base');
		var slug = getParameterByName('slug');
		if (!base.length) {
			$destinations.html('<div class="alert alert-danger" role="alert">Could not find a Scalar install to search for books.</div>');
			return;
		}
		var url = base+'system/api/get_user_books';
		$.getJSON(url, function(data) {
			if (jQuery.isEmptyObject(data)) {
				$destinations.html('<div class="alert alert-warning" role="alert">You are not the author of any books in the Scalar install at <b><a href="'+base+'" target="_blank">'+base+'</a></b>.</div>');
				return;
			}
			$destinations.empty();
			for (var j in data) {
				var uri = base+data[j].slug+'/';
				var id = data[j].book_id;
				var thumb = (data[j].thumbnail.length) ? uri+data[j].thumbnail : '';
				var $node = $('<div class="collection" data-slug="'+data[j].slug+'"><div style="background-image:url('+thumb+');" class="thumb"></div><h5>'+data[j].title+'</h5><div class="desc">'+data[j].description+'</div></div>');
				$node.data('uri',uri);
				$node.data('id',id);
				$destinations.append($node);
			}
			$destinations.find('.collection').click(function() {
				var $this = $(this);
				var is_clicked = $this.hasClass('clicked') ? true : false;
				if (is_clicked) {
					$this.removeClass('clicked');
				} else {
					$this.addClass('clicked');
				};
				sync_ui();
			});
			if (slug.length) {
				var $book = $destinations.find('.collection[data-slug="'+slug+'"]');
				if ($book.length) $book.click();
			};
		}).fail(function() {
			$destinations.html('<div class="alert alert-danger" role="alert">You don\'t appear to be logged in to the Scalar install at <b><a href="'+base+'" target="_blank">'+base+'</a></b>.  Please log in to the install and try again.</div>');
		});
	});	
	
}

/**
 * Set the UI for for the current collection in one of many possible views
 * @view str optional view to set 
 * @return null
 */
function collections_ui(col_id, view, col_view) {
	
	var collections = get_collections();
	if ('undefined'==typeof(col_id)) col_id = null;
	collections_ui.col_id = col_id;
	if ('undefined'==typeof(view) || null==view) view = $('#collections_spreadsheet').find('.view-buttons').find('button[class*="btn-primary"]').attr('id');
	var $collections_spreadsheet = $('#collections_spreadsheet');
	var $collection_bar = $('#collection_bar');
	var $collection_view = $('#collection_view');
	var $filter_collections_form = $('#filter_collections_form');
	var $collections_form = $('#collections_form');
	var $edit_collection_link = $('#edit_collection_link');
	var $delete_collection_link = $('#delete_collection_link');

	// Collection view
	var col_view = ('undefined'==typeof(col_view)) ? $collection_view.find('.btn-primary:first').val() : col_view;
	collections_ui.col_view = col_view;
	$collection_view.find('button').removeClass('btn-primary').addClass('btn-default');
	$collection_view.find('button[value="'+col_view+'"]').removeClass('btn-default').addClass('btn-primary');
	
	// Collections
	$filter_collections_form.find('input[name="search"]').val('');
	$collections_form.children('.all').removeClass('clicked');
	$collections_form.children(':not(.notice, .all)').remove();
	for (var j = 0; j < collections.length; j++) {
		var $collection = $('<div class="collection'+((j==col_id)?' clicked':'')+'"></div>');
		$collection.append('<div class="color" style="background-color:'+collections[j].color+';"><span class="num_items">0</span></div>');
		$collection.append('<h5>'+collections[j].title+'</h5>');
	    $collection.append('<div class="desc">'+collections[j].description+'</div>');
	    $collections_form.append($collection);
	    $collection.data('collections_index', j)
	    $collection.click(function() {
			$('#welcome_msg').hide();
			$('#search_spreadsheet').hide();
			$('#findable_form').find('.archive').removeClass('clicked');
			$collection_view.find('button').removeClass('btn-primary').addClass('btn-default');
			$collection_view.find('button[value="view"]').removeClass('btn-default').addClass('btn-primary');
	    	var index = $(this).data('collections_index');
	    	collections_ui(index);
	    });
	}

	set_collections_numbers();
	if (!$('#welcome_msg').is(':hidden')) return;
	if ($collections_spreadsheet.is(':hidden')) $collections_spreadsheet.show();
	var welcome_msg = '<div class="welcome_msg">There are no items in this collection<br />You can add some by clicking <a href="javascript:void(null);"><span class="glyphicon glyphicon-plus"></span> Add / remove</a> above</div>';
	if (null==col_id) var welcome_msg = '<div class="welcome_msg">No items have been imported<br />You can begin importing by selecting an archive to search</div>';
	
	// Current collection
	var results = {};
	var check = {};
	var checkable = false;
	if (null==col_id) {
		if ('edit'==col_view) {
			results = get_imported();
			check = get_imported();
			checkable = true;
		} else {
			results = get_imported();
		}
		//$('#spreadsheet_gradient').css('background', '');
		$collections_form.find('.all').addClass('clicked');
		$edit_collection_link.hide();
		$delete_collection_link.hide();
		$collection_bar.find('#title').html('All imported media');
	} else {
		if ('undefined'==typeof(collections[col_id])) {
			alert('There was a problem trying to find the collection.  Please try again.');
			return;
		}
		if ('edit'==col_view) {
			results = get_imported();
			check = collections[col_id].items;	
			checkable = true;
		} else {
			results = collections[col_id].items;
		}
		//$('#spreadsheet_gradient').css('background', 'linear-gradient(to bottom, '+convertHex(collections[col_id].color,40)+', white)' );
		$edit_collection_link.show();
		$delete_collection_link.show();
		$collection_bar.find('#title').html('<span class="color" style="background-color:'+collections[col_id].color+';"></span>' + collections[col_id].title);
	}

	// Load current view
	if (view == collections_ui.view) {
		$('#collections_spreadsheet_content').attr('class',view+'_view').spreadsheet_view({rows:results,check:check,num_archives:2,checkable:checkable,msg:welcome_msg});
	} else {
		var view_path = $('link#base_url').attr('href')+'application/views/templates/jquery.'+view+'.js';
		$.getScript(view_path, function() {
			collections_ui.view = view;
			$('#collections_spreadsheet_content').attr('class',view+'_view').spreadsheet_view({rows:results,check:check,num_archives:2,checkable:checkable,msg:welcome_msg});
		});
	}
	
}

/** 
 * Interactions inside the sync modal
 * @return null
 */
function sync_ui() {
	
	var items = {};
	var num_collections = 0;
	var num_destinations = 0;
	var $sync_details = $('.sync_details');
	if ($('#sync_collections').find('.all').hasClass('clicked')) {
		items = get_imported();
		num_collections = 1;
	} else {
		var collections = get_collections();
		$('#sync_collections').find('.collection:not(.all)').each(function(index) {
			var $this = $(this);
			if (!$this.hasClass('clicked')) return;
			num_collections++;
			$.extend(items, collections[index].items);
		});
	};
	$('#sync_destinations').children().each(function(index) {
		var $this = $(this);
		if (!$this.hasClass('clicked')) return;
		num_destinations++;
	});
	$sync_details.empty();
	var num_items = $.map(items, function(n, i) { return i; }).length;
	if (num_collections > 0) $sync_details.html('Sync <b>'+num_items+'</b> item'+((num_items>1)?'s':'')+' from <b>'+num_collections+'</b> collection'+((num_collections>1)?'s':''));
	if (num_destinations > 0) $sync_details.append('<span>&nbsp; <span class="glyphicon glyphicon-arrow-right"></span> &nbsp;</span> <b>'+num_destinations+'</b> Scalar book'+((num_destinations>1)?'s':''));	
	
}

/**
 * Set event handlers for managing imported and collection items 
 * @return null
 */
function set_events() {

	if ('undefined'==typeof(ns)) ns = $.initNamespaceStorage('tensor_ns');  // global
	if ('undefined'==typeof(storage)) storage = ns.localStorage;  // global
	
	var imported = ('undefined'!=typeof(storage.get('imported'))) ? storage.get('imported') : {};
	$('.num_imported').html( $.map(imported, function(n, i) { return i; }).length );
	
	$("body").on( "import_add_node", function( event, uri, values ) {
		// All
		var imported = storage.get('imported');
		if ('undefined'==typeof(imported)) imported = {};
		imported[uri] = values;
		storage.set('imported', imported);		
		// Collection
		var col_id = collections_ui.col_id;
		if (null!=col_id) {
			var collections = storage.get('collections');
			if ('undefined'!=typeof(collections[col_id])) {
				collections[col_id].items[uri] = values;
				storage.set('collections', collections);
			};		
		};
		// UI
		set_collections_numbers();
	});	
	$("body").on( "import_remove_node", function( event, uri ) {
		var col_id = collections_ui.col_id;
		if (null==col_id) {		
			var imported = storage.get('imported');
			if ('undefined'==typeof(imported)) imported = {};
			if ('undefined'!=typeof(imported[uri])) delete imported[uri];
			storage.set('imported', imported);	
			// Remove from collection items
			var collections = storage.get('collections');
			if ('undefined'==typeof(collections)) collections = [];
			for (var j in collections) {
				if ('undefined'!=collections[j].items[uri]) {
					delete collections[j].items[uri];
				}
			}
			storage.set('collections', collections);
		} else {
			var collections = storage.get('collections');
			delete collections[col_id].items[uri];
			storage.set('collections', collections);
		}
		set_collections_numbers();
	});		
	
	$("body").on( "node_not_clickable", function( event, uri, values, $el ) {
		var $edit_metadata = $('#edit_metadata');
		var $header = $edit_metadata.find('.modal-header');
		var $body = $edit_metadata.find('.modal-body');
		$header.find('.thumb').css('background-image', '');
		$body.empty();
		$edit_metadata.modal('show');
		values = sort_predicates_by_prop(values);
		var thumb = '';
		for (var p in values) {
			var $p = $('<div class="row"><div class="col-xs-12 col-sm-2 p"></div><div class="col-xs-12 col-sm-10 v"></div></div>');
			$p.find('div:first').data('p',p).html( pnode(p) );
			for (var j = 0; j < values[p].length; j++) {
				$p.find('div:last').append('<input type="text" class="form-control" value="'+escapeHtml(values[p][j].value)+'" />');
			}
			$body.append($p);
			if ('http://simile.mit.edu/2003/10/ontologies/artstor#thumbnail' == p && 'undefined'!=typeof(values[p][0])) {
				thumb = values[p][0].value;
			}
		}
		if (thumb.length) {
			$header.find('.thumb').css('background-image', 'url('+thumb+')');
		}
	});		
	
	$("body").on( "collection_add_node", function( event, obj ) {
		var collections = storage.get('collections');
		if ('undefined'==typeof(collections)) collections = [];
		obj.items = {};
		collections.push(obj);
		storage.set('collections', collections);
		switch_to('collections');
		collections_ui(collections.length-1);
	});	
	$("body").on( "collection_edit_node", function( event, col_id, obj ) {
		var collections = storage.get('collections');
		if ('undefined'==typeof(collections[col_id])) return;
		collections[col_id].title = obj.title;
		collections[col_id].description = obj.description;
		collections[col_id].color = obj.color;
		storage.set('collections', collections);
		collections_ui(col_id);
	});		
	$("body").on( "collection_remove_node", function( event, index ) {
		var collections = storage.get('collections');
		if ('undefined'==typeof(collections)) collections = [];
		if ('undefined'!=typeof(collections[index])) collections.splice(index, 1);
		storage.set('collections', collections);
		collections_ui();
		$('#collections_form').find('.all').click();
	});		
	
}

/**
 * Get the imported object from localStorage
 * @return obj imported items
 */
function get_imported() {
	
	if ('undefined'==typeof(ns)) ns = $.initNamespaceStorage('tensor_ns');  // global
	if ('undefined'==typeof(storage)) storage = ns.localStorage;  // global
	var obj = storage.get('imported');
	if ('undefined'==typeof(obj)) obj = {};
	return obj
	
}

/**
 * Get the collections object from localStorage
 * @return obj imported items
 */
function get_collections() {
	
	if ('undefined'==typeof(ns)) ns = $.initNamespaceStorage('tensor_ns');  // global
	if ('undefined'==typeof(storage)) storage = ns.localStorage;  // global
	var arr = storage.get('collections');
	if ('undefined'==typeof(arr)) arr = [];
	return arr;
	
}

function switch_to(type) {
	
	if ('collections'==type) {
		$('#welcome_msg').hide();
		$('#search_spreadsheet').hide();
		$('#findable_form').find('.archive').removeClass('clicked');
		$('#collection_view').find('button').removeClass('btn-primary').addClass('btn-default');
		$('#collection_view').find('button[value="view"]').removeClass('btn-default').addClass('btn-primary');	
		$('#select_archive').find('button:first').html('Import into collection');
	} else if ('archives'==type) {
		$('#welcome_msg').hide();
		$('#collections_spreadsheet').hide();
		$('#select_archive').find('button:first').html('Import into collection');		
		if (null==collections_ui.col_id) {
			$('#collections_form').find('.collection').removeClass('clicked');
		}
	}
	
}

function set_collections_numbers() {

	var collections = get_collections();
	for (var j in collections) {
		var num = $.map(collections[j].items, function(n, i) { return i; }).length;
		$('#collections_form').find('.collection:not(.all)').eq(j).find('.num_items').text(num);
	}
	var imported = get_imported();
	var num = $.map(imported, function(n, i) { return i; }).length;
	$('#collections_form').find('.all').find('.num_items').text(num);
	
}

function set_sheet_height() {
	var $spreadsheets = $('.spreadsheet');
	var h = parseInt($(window).height());
	$spreadsheets.css('min-height',h);
}

/** 
 * Run sync
 * @return null
 */
function do_sync(items, destinations) {
	
	var $sync = $('#sync');
	$sync.find('button').attr('disabled','disabled');
	
	for (var j in items) {
		items[j]['http://scalar.usc.edu/2012/01/scalar-ns#slug'] = [{type:'uri',value:'media/'+items[j]['http://purl.org/dc/terms/title'][0].value}];
	}
	
	for (var j in destinations) {
		$sync.rdfimporter({
			rdf:items,
			source_url:'',
			dest_urn:'urn:scalar:book:'+destinations[j].id,
			dest_id:'foo',
			dest_url:destinations[j].uri
		}, function() {
			$sync.find('button').removeAttr('disabled');
			var $parent = $sync.find('.modal-footer');
			$parent.find('button').hide();
			$parent.append('<button id="sync_complete_btn" type="button" class="btn btn-success">Return to collections and archives</button>');
			$parent.find('button:last').click(function() {
				$sync.modal('hide');
			});
		});
	};
	
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
    	$this.parent().find('.archive').removeClass('active');
    	var title = $this.attr('title');
    	$this.addClass('active');
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

//http://jsfiddle.net/ekinertac/3Evx5/1/
function convertHex(hex,opacity){
    hex = hex.replace('#','');
    r = parseInt(hex.substring(0,2), 16);
    g = parseInt(hex.substring(2,4), 16);
    b = parseInt(hex.substring(4,6), 16);

    result = 'rgba('+r+','+g+','+b+','+opacity/100+')';
    return result;
}

// http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

// http://phpjs.org/functions/rtrim/
function rtrim(str, charlist) {
	  charlist = !charlist ? ' \\s\u00A0' : (charlist + '')
	    .replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g, '\\$1');
	  var re = new RegExp('[' + charlist + ']+$', 'g');
	  return (str + '')
	    .replace(re, '');
}

function pnode(uri) {
	var namespaces = {
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
	};
	for (var j in namespaces) {
		if (uri.substr(0, namespaces[j].length) == namespaces[j]) return j + ':' + uri.substr(namespaces[j].length);
	}
	return '';
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

// http://stackoverflow.com/questions/1787322/htmlspecialchars-equivalent-in-javascript
function escapeHtml(text) {
	  var map = {
	    '&': '&amp;',
	    '<': '&lt;',
	    '>': '&gt;',
	    '"': '&quot;',
	    "'": '&#039;'
	  };
	  return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}
