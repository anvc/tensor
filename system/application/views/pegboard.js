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
		$('#search').data('archive',archive).show().find('#search_form input:first').focus().prop('placeholder',archive.title).val('').closest('form').find('.list-group').remove();
		$('#search').find('.glyphicon-search').unbind('click').click(function() {
			$(this).closest('form').submit();
			$('#search').find('.glyphicon').blur();
		});
		$('#search').find('.glyphicon-pencil').unbind('click').click(function() {
			alert('Coming soon: edit this archive\'s settings');
			$('#search').find('.glyphicon').blur();
		});
		$('#search').find('.glyphicon-trash').unbind('click').click(function() {
			if (!confirm('Are you sure you wish to delete this archive?')) return;
			var profiles = ('undefined'!=typeof(storage.get('profiles'))) ? storage.get('profiles') : [];
			$('#archives').show();
			$('#search').hide();
			for (var j = 0; j < profiles.length; j++) {
				for (var k = 0; k < profiles[j].archives.length; k++) {
					if (JSON.stringify(archive) != JSON.stringify(profiles[j].archives[k])) continue;
					profiles[j].archives.splice(k, 1);
					break;
				};
			};		    	
			storage.set('profiles', profiles);
			$('#archives').list_archives(profiles);
		});
		$('#search_form').unbind('submit').submit(function() {
			$('#search').search();
			return false;
		});
		$('#import_to').import();
		$('#visit_archive').attr('href', archive.url);
		$('.search_pagination').hide();
		var parser = base_url+'parsers/'+archive.parser+'/parser.js';
		$.getScript(parser, function() {
			if ('undefined'!=typeof($.fn.autocomplete)) {
				var autocomplete = $.extend({}, archive, {proxy_url:$('link#proxy_url').attr('href'),complete_callback:autocomplete_callback});
				$('#search_form input:first').autocomplete(autocomplete);
			}
		}).fail(function() {
		  $('#error').modal().find('[class="modal-body"]').html('<p>Could not find parser</p>');
		});
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
	$('#collections').list_collections(profiles);	
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
			var profiles = ('undefined'!=typeof(storage.get('profiles'))) ? storage.get('profiles') : [];
			$('#collections').find('.collection').each(function(index) {
				if (!$(this).hasClass('clicked')) return;
				for (var j = 0; j < profiles.length; j++) {
					for (var k = 0; k < profiles[j].collections.length; k++) {
						if ('undefined'==typeof(profiles[j].collections[k].items)) profiles[j].collections[k].items = {};
						if (JSON.stringify(collection) != JSON.stringify(profiles[j].collections[k])) continue;
						profiles[j].collections.splice(k, 1);
						break;
					};
				};		    	
			});
			storage.set('profiles', profiles);
			$('#collections').list_collections(storage.get('profiles'));
			$('#collection_results').empty();
			$('#collection').hide();
			$('#archives').show();
		});		
		$('#collection_form').unbind('submit').submit(function() {
			$('#collection').search();
			return false;
		});
		$('#collection_results').show_collection(collection);
		$('#move_to').move(collection);
	});	
	$('#collection_view').find('button').unbind('click').click(function() {
		var $this = $(this);
		$this.parent().children().removeClass('btn-primary').addClass('btn-default');
		$this.removeClass('btn-default').addClass('btn-primary');
		$('#collection_results').show_collection( $('#collections_form .clicked').data('collection') );
	});
	$('#collection_close_circle, #collection_close').click(function(e) {
		e.stopPropagation();
		$('#collection_results').empty();
		$('#search').hide();
		$('#collection').hide();
		$('#collections .collection').removeClass('clicked');
		$('#archives').show();
	});	
	// Sync
	$('#sync').on('show.bs.modal', function () {
		$(this).sync();
	});
	$('#sync').find('button:last').unbind('click').click(function() {
		$form.closest('.modal').sync($(this).closest('.modal'));
		return false;
	});
});

//List profiles in an editable way in the provided HTML element
$.fn.set_profiles = function(profiles) {
    if ('undefined' == typeof(ns)) ns = $.initNamespaceStorage('tensor_ns'); // global
    if ('undefined' == typeof(storage)) storage = ns.localStorage; // global
    return this.each(function() {
        var $node = $(this);
        var $profiles = $node.find('#profiles');
        $node.submit(function(event) {
            event.preventDefault();
        });
        if ('undefined' == typeof(profiles)) profiles = [];
        $profiles.empty();
        // Starter profiles
        var hidden = 0;
        $node.find('.startProfiles').show().each(function() {
        	$starter = $(this);
        	for (var j = 0; j < profiles.length; j++) {
        		if (profiles[j].uri == $starter.data('url')) {
        			$starter.hide();
        			hidden++;
        		}
        	};
        });
        $node.find('#startProfilesWrapper').show();
        if (hidden == $node.find('.startProfiles').length) $node.find('#startProfilesWrapper').hide();
        // The additional profile options
        $node.find('#more_profile_options').off('click').click(function() {;
            $node.find('.more_profile_options').toggle(function() {
                var $this = $(this);
                if ($this.is(':hidden')) {
                    $('#more_profile_options').blur().find('.caret').css('transform', '');
                } else {
                    $('#more_profile_options').blur().find('.caret').css('transform', 'rotate(180deg)');
                };
            });
        });
        if (!profiles.length) {
            $node.find('.has-profiles').hide();
            $node.find('.no-profiles').show();
            // List profiles
        } else {
            $node.find('.has-profiles').show();
            $node.find('.no-profiles').hide();
            // List profiles that are presently loaded
            $profiles.html('<p>Profiles currently loaded in your Tensor app:</p>');
            for (var j = 0; j < profiles.length; j++) {
                if ('undefined' == typeof(profiles[j].archives)) profiles[j].archives = [];
                var archive_titles = [];
                for (var k = 0; k < profiles[j].archives.length; k++) {
                    archive_titles.push(profiles[j].archives[k].title);
                };
                if (!archive_titles.length) archive_titles = ['No archives'];
                if ('undefined' == typeof(profiles[j].collections)) profiles[j].collections = [];
                var collection_titles = [];
                for (var k = 0; k < profiles[j].collections.length; k++) {
                    collection_titles.push(profiles[j].collections[k].title);
                };
                if (!collection_titles.length) collection_titles = ['No collections'];
                var $profile = $('<div class="profile"><button type="button" class="btn btn-default">Download</button>&nbsp; <span class="desc"><b title="' + profiles[j].uri + '">' + profiles[j].name + '</b><br />Updated ' + profiles[j].added + ', <a href="javascript:void(null);" data-toggle="tooltip" data-placement="top" title="' + archive_titles.join(', ') + '">' + profiles[j].archives.length + ' archive' + ((profiles[j].archives.length == 0 || profiles[j].archives.length > 1) ? 's' : '') + '</a>, <a href="javascript:void(null);" data-toggle="tooltip" data-placement="top" title="' + collection_titles.join(', ') + '">' + profiles[j].collections.length + ' collection' + ((profiles[j].collections.length == 0 || profiles[j].collections.length > 1) ? 's' : '') + '</a> </span> <button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>').appendTo($profiles);
                $profile.data('profile', profiles[j]);
                if (-1 != profiles[j].uri.indexOf('://')) {
                    var $refresh = $('<a href="javascript:void(null);" class="btn btn-xs btn-default">Refresh from server</a>').appendTo($profile.find('span:first'));
                    $refresh.click(function() {
                        var uri = $(this).closest('.profile').data('profile').uri;
                        if (!confirm('Continuing will overwrite any local changes you may have made to this profile. Do you wish to continue?')) {
                            return;
                        };
                        $.ajax({
                            url: uri,
                            dataType: 'text',
                            type: 'GET',
                            async: true,
                            statusCode: {
                                404: function(response) {
                                    alert('Could not find the start profile on GitHub');
                                },
                                200: function(response) {
                                    var data = eval(response);
                                }
                            },
                            error: function(jqXHR, status, errorThrown) {
                                alert('There was an error: ' + errorThrown);
                            }
                        });
                    });
                };
                var $download = $profile.find('button:first');
                $download.unbind('click').click(function() {
                    var profile = $(this).closest('.profile').data('profile');
                    var text = 'profile(' + JSON.stringify(profile, null, 2) + ');';
                    var filename = profile.uri.split(/[\\/]/).pop();
                    var blob = new Blob([text], {
                        type: "text/plain;charset=utf-8"
                    }); // FileSaver.js
                    saveAs(blob, filename + ".txt");
                });
            };
            $('[data-toggle="tooltip"]').tooltip({
                trigger: 'click'
            });
            $profiles.append('<br clear="both" />');
        };
        // Delete
        $profiles.find('.close').unbind('click').click(function() {
            var profile = $(this).closest('.profile').data('profile');
            if (!confirm('Are you sure you wish to remove ' + profile.name + '? This action cannot be undone.')) return;
            var profiles = ('undefined' != typeof(storage.get('profiles'))) ? storage.get('profiles') : [];
            for (var j = 0; j < profiles.length; j++) {
                if (profile.uri === profiles[j].uri) {
                    profiles.splice(j, 1);
                    break;
                }
            };
            storage.set('profiles', profiles);
            // Starter profiles
            var hidden = 0;
            $(this).closest('.modal-body').find('.startProfiles').show().each(function() {
            	$starter = $(this);
            	var profiles = ('undefined' != typeof(storage.get('profiles'))) ? storage.get('profiles') : [];
            	for (var j = 0; j < profiles.length; j++) {
            		if (profiles[j].uri == $starter.data('url')) {
            			$starter.hide();
            			hidden++;
            		}
            	};
            });
            $node.find('#startProfilesWrapper').show();
            if (hidden == $node.find('.startProfiles').length) $node.find('#startProfilesWrapper').hide();
            $('#set_profiles').set_profiles(storage.get('profiles'));
            $('#archives').list_archives(storage.get('profiles'));
            $('#collections').list_collections(storage.get('profiles'));
        });
        // Start, Reset
        $node.find('#resetProfiles, .startProfiles').removeAttr('disabled');
        $node.find('#resetProfiles, .startProfiles').unbind('click').click(function() {
            var $button = $(this);
            $button.attr('disabled', 'disabled');
            var is_new = ($button.hasClass('startProfiles')) ? true : false;
            if (!is_new && !confirm('Are you sure you wish to remove all profiles? This action cannot be undone.')) {
                $button.removeAttr('disabled');
                return;
            } else if (!is_new) {
            	storage.set('profiles', []);            	
            	$('#set_profiles').set_profiles(storage.get('profiles'));
            	$('#archives').list_archives(storage.get('profiles'));
            	$('#collections').list_collections(storage.get('profiles'));            	
            	return;
            };
            var starter_url = $button.data('url');
            $.ajax({
                url: starter_url,
                dataType: 'text',
                type: 'GET',
                async: true,
                statusCode: {
                    404: function(response) {
                        alert('Could not find the start profile on GitHub');
                    },
                    200: function(response) {
                        var data = eval(response);
                    }
                },
                error: function(jqXHR, status, errorThrown) {
                    alert('There was an error: ' + errorThrown);
                }
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
            json.uri = '_' + (new Date().getTime());
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
                url: value,
                dataType: 'text',
                type: 'GET',
                async: true,
                statusCode: {
                    404: function(response) {
                        alert('Could not find the start profile on GitHub');
                    },
                    200: function(response) {
                        var data = eval(response);
                    }
                },
                error: function(jqXHR, status, errorThrown) {
                    alert('There was an error: ' + errorThrown);
                }
            });
            $(this).closest('.input-group').find('input').val('').blur();
        });
        // File upload
        $node.find('#profileUpload').unbind('click').click(function() {
            var input = document.getElementById('profile-file-selector');
            if ('undefined' == typeof(input.files[0])) {
                alert("Please select a file to upload");
                return;
            }
            file = input.files[0];
            fr = new FileReader();
            fr.onload = function() {
                if (!fr.result) {
                    alert('Could not read the uploaded file');
                    return;
                };
                if ('profile(' != fr.result.substr(0, 8)) {
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

// Accept a profile from JSONP and commit it to storage
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
	if ('undefined'==typeof(json.collections)) json.collections = [];
	var profiles = ('undefined'!=typeof(storage.get('profiles'))) ? storage.get('profiles') : [];
	for (var j = 0; j < profiles.length; j++) {  // See if we're replacing based on the URI
		if (profiles[j].uri == json.uri) {
			profiles.splice(j, 1);
			break;
		}
	}
	profiles.push(json);
	storage.set('profiles', profiles);
	if (!$('.modal.in:not(#set_profiles)').length) $('#set_profiles').set_profiles(storage.get('profiles'));
	$('#archives').list_archives(storage.get('profiles'));
	$('#collections').list_collections(storage.get('profiles'));
	return profiles.length - 1;
};

// List the various archives stored in the various profiles (the default Tensor view)
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
		// Display the archive or an error if the parser can't be found
		$container.children().unbind('click').click(function() {
			var $this = $(this);
			if ($this.data('error').length) {
				var parser_name = $this.data('archive').parser;
				var $error = $('#error');
				$error.find('.modal-title').text('No parser found');
				$error.find('.modal-body').empty().append('The parser folder "'+parser_name+'" is not present in this Tensor install\'s file system. Contact an administrator to add the parser\'s files to <strong>/parsers/'+parser_name+'</strong>.');
				$error.find('.modal-body').append('<br /><br />Once the parser is added you will be able to use this archive and also add new archives based on the same parser.');
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
		var profile = $form.find('[name="profile"]').val();
		if (!profile.length) {
		   var new_profile = $form.find('[name="new_profile"]').val();
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
		var profiles = ('undefined'!=typeof(storage.get('profiles'))) ? storage.get('profiles') : {};
		profiles[profile_index].archives.push(obj);
    	profiles[profile_index].added = new Date().toJSON().slice(0,10);  // Not great semantics, but ...
    	storage.set('profiles', profiles);
    	$('#archives').list_archives(storage.get('profiles'));
    	$('#collections').list_collections(storage.get('profiles'));
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
				profile_options += '<option value="'+profiles[j].uri+'"'+((j==profiles.length-1)?' selected':'')+'>'+profiles[j].name+'</option>';
			}
			var check_profile_options = function() {
				if ($modal.find('[name="profile"]').val().length) {
					$modal.find('[name="profile"]').next().hide();
				} else {
					$modal.find('[name="profile"]').next().show();
				}
			};
			$modal.find('[name="profile"]').empty().html(profile_options).unbind('change').change(check_profile_options);
			check_profile_options();
			// Parsers
			$.getJSON($('link#base_url').attr('href')+'wb/parsers', function(json) {
				var options = '';
				for (var j = 0; j < json.length; j++) {
					options += '<option value="'+json[j]+'"'+((j==Math.ceil(json.length/2)-2)?' selected':'')+'>'+json[j]+'</option>';
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
		$node.find('.prev-page, .next-page').unbind('click').click(function() {
			$('#search').search( parseInt($(this).blur().data('page')) );
		});
		$node.find('.search_pagination .nav li:nth-child(2) a').unbind('click').click(function() {
			$('#search').search(1);
			$(this).blur();
		});
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
		$form.find('.list-group').remove();
		// Run search
		$.extend(archive, {page:page,query:obj.terms.join(' '),parser:archive.parser,proxy_url:proxy_url,error_callback:error_callback,complete_callback:parse_complete_callback});
		try {
			$.fn.parse(archive);
		} catch(err) {
			$('#error').modal().find('[class="modal-body"]').html('<p>'+err+'</p>');
			return;
		};
		loading(true, archive.title);
		$.fn.search.page = page;
		$.fn.search.results = [];	
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

function update_complete_callback(_results, reboot) {  // _results are added to existing results
	
	if ('undefined'==typeof(reboot)) reboot = false;
	for (var uri in _results) {
		if ('undefined'==typeof($.fn.search.results[uri])) continue;
		$.extend($.fn.search.results[uri], _results[uri]);
		$('#search_results .row').each(function() {
			var $this = $(this);
			if ($this.data('uri') != uri) return;
			$this.highlight();
		});
	};
	if (reboot) $('#search_results').search_results();
	
};

function autocomplete_callback(data, options) {
	var $parent = $(options.input).closest('form');
	$parent.find('.list-group').remove();
	var $list = $('<div class="list-group" role="menu"></div>').appendTo($parent);
	for (var j = 0; j < data.length; j++) {
		$list.append('<a class="list-group-item" tabindex="'+(j+2)+'" href="javascript:void(null);" style="white-space:nowrap;">'+data[j]+'</a>');
	};
	$(options.input).blur(function() {
		var self = this;
		setTimeout(function() {
			var $self = $(self);
			if ($self.closest('form').find('.list-group').length) {
				if ($self.closest('form').find('.list-group').find(':focus').length) return;
				$self.closest('form').find('.list-group').remove();
			};
		}, 250);
	});
	var commit = function(text) {  // Replace search string with autocompleted text
		if (!text || !text.length) return;
		var $input = $(options.input);
		if (-1 == $input.val().indexOf(',')) {
			var str = text.trim() + ', ';
		} else {
			var arr = $input.val().split(', ');
			arr.pop();
			var str = arr.join(', ') + ', ' + text.trim() + ', ';
		};
		$input.focus().val(str);
		$input[0].setSelectionRange(str.length, str.length);
	};
	$list.find('a').click(function() {
		var $this = $(this);
		var text = $this.text();
		commit(text);
		$this.parent().remove();
	});
};

// Display search results in one of many templates
$.fn.search_results = function() {
	
	return this.each(function() {
		var $node = $(this);
		var view = $('#search_view').find('button[class*="btn-primary"]').attr('id'); 
		if ('undefined'!=typeof($.fn.spreadsheet_view)) $.fn.spreadsheet_view.remove();
		$('#search').find('.search_pagination').show();
		$node.css('min-height', $(window).height() - $('#search').find('.search_pagination').height() - 60);
		$('.page').text($.fn.search.page);
		$('.prev-page, .next-page').css('visibility', 'hidden');
		if ($.fn.search.page > 1) $('.prev-page').css('visibility', 'visible').data('page', $.fn.search.page - 1);
		$('.next-page').css('visibility', 'visible').data('page', $.fn.search.page + 1);
		var view_path = $('link#base_url').attr('href')+'system/application/views/templates/jquery.'+view+'.js';
		$.getScript(view_path, function() {
			$node.empty();
			$node.attr('class',view+'_view').spreadsheet_view({rows:$.fn.search.results,check:{},num_archives:1});
			window.scrollTo(0, 0);
		});		
	});
	
};

// The "import to" button with attached import action
$.fn.import = function() {

	return this.each(function() {
		var $node = $(this);
		$node.empty();
		var archive = $('#search').data('archive');
		// Import action
		var do_import = function(profile_index, collection_index) {
			if ('undefined'==typeof(profile_index)) profile_index = 0; 
			if ('undefined'==typeof(collection_index)) collection_index = 0;
			var items = {};
			$('#search_results').find('.clicked').each(function() {
				var $this = $(this);
				var uri = $this.data('uri');
				var values = $this.data('values');
				items[uri] = values;
			});
			if ($.isEmptyObject(items)) {
				alert('Please select one or more items to import');
				return;
			};
			var profiles = ('undefined'!=typeof(storage.get('profiles'))) ? storage.get('profiles') : {};
			if ('undefined'==typeof(profiles[profile_index])) {
				alert('There are no collections to import into. First create a new profile then place a new collection in it to be able to import.');
				return;
			};
			if ('undefined'==typeof(profiles[profile_index].collections[collection_index])) {
				alert('A collection needs to be created before you can import');
				return;
			};
			profiles[profile_index].collections[collection_index].items = $.extend({}, profiles[profile_index].collections[collection_index].items, items);
			storage.set('profiles', profiles);	
			$('#collections').list_collections(profiles);
			$('#search_results').find('.clicked').removeClass('clicked').find('.clicked_layer').remove();
			if (!$('#imported_tour').length) {
				$(window).joyride("destroy");
				var $joyride = $('<ol id="imported_tour"><li data-id="collection_'+profile_index+'_'+collection_index+'" data-button="Close"><p>Your item'+((Object.keys(items).length>1)?'s have':' has')+' been imported into this collection.</p></li></ol>').appendTo('body');
				$("#imported_tour").joyride({autoStart:true, timer:2000, template:{link:''}});
			};
		};
		// Create the split button with a list of the collections
		$node.append('<button type="button" class="btn btn-primary">Import</button>');
		$node.append('<button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span class="caret"></span><span class="sr-only">Toggle Dropdown</span></button>');
		var $list = $('<ul class="dropdown-menu"><li class="dropdown-menu-title">Import to...</li></ul>').appendTo($node);
		$list.parent().on('show.bs.dropdown', function () {  // Update the list live so that collections can be added at any time
			$list.children().not('.dropdown-menu-title').remove();
			var profiles = ('undefined'!=typeof(storage.get('profiles'))) ? storage.get('profiles') : {};
			for (var j = 0; j < profiles.length; j++) {
				if ('undefined'==typeof(profiles[j].collections)) profiles[j].collections = [];
				for (var k = 0; k < profiles[j].collections.length; k++) {
					$list.append('<li><a href="javascript:void(null);" data-profile-index="'+j+'" data-collection-index="'+k+'">'+profiles[j].collections[k].title+'</a></li>');
				};
			};
			$list.find('a').unbind('click').click(function() {
				do_import(parseInt($(this).data('profile-index')), parseInt($(this).data('collection-index')));
			});
		})
		$node.find('button:first').unbind('click').click(function() {
			do_import(0, 0);
		});
	});
	
};

// List collections in the sidebar
$.fn.list_collections = function(profiles) {
	if ('undefined'==typeof(ns)) ns = $.initNamespaceStorage('tensor_ns');  // global
	if ('undefined'==typeof(storage)) storage = ns.localStorage;  // global		
	return this.each(function() {
		var $node = $(this);
		$form = $node.find('#collections_form');
		$form.children(':gt(0)').remove();  // Assume the first collection is the built-in "All imported media"
		var items = {};
		for (var j = 0; j < profiles.length; j++) {
			for (var k = 0; k < profiles[j].collections.length; k++) {
				if ('undefined'==typeof(profiles[j].collections[k].items)) profiles[j].collections[k].items = {};
				$.extend(items, profiles[j].collections[k].items);
				var lum = luminance(profiles[j].collections[k].color);
				var $col = $('<div class="collection" id="collection_'+j+'_'+k+'"></div>').appendTo($form);
				$col.append('<div class="color '+((lum < 80)?'dark':'light')+'" style="background-color:'+profiles[j].collections[k].color+';"><span class="num_items">'+Object.keys(profiles[j].collections[k].items).length+'</span></div>');
				$col.append('<h5>'+profiles[j].collections[k].title+'</h5>');
				$col.append('<div class="desc">'+profiles[j].collections[k].description+'</div>');
				$col.data('collection', profiles[j].collections[k]);
			};
		};
		$form.find('.all .num_items').text( Object.keys(items).length );
		$form.children().unbind('click').mousedown(function() {
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
		var profile = $form.find('[name="profile"]').val();
		if (!profile.length) {
		   var new_profile = $form.find('[name="new_profile"]').val();
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
		};
		if (null===profile_index) {
			alert('Could not find selected profile');
			return;
		};
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
		var profiles = ('undefined'!=typeof(storage.get('profiles'))) ? storage.get('profiles') : {};
		profiles[profile_index].collections.push(obj);
		storage.set('profiles', profiles);	
		$('#collections').list_collections(profiles);
    	$('#add_collection').modal('hide');
	} else {	
		return this.each(function() {
			var $modal = $(this);
			$modal.find('input').val('');
			$modal.find('input[name="color"]').spectrum({
			    color: "#9999ff"
			});		
			// Profiles
			var profiles = ('undefined'!=typeof(storage.get('profiles'))) ? storage.get('profiles') : {};
			var profile_options = '<option value="">Create new profile</option>';
			for (var j = 0; j < profiles.length; j++) {
				profile_options += '<option value="'+profiles[j].uri+'"'+((j==profiles.length-1)?' selected':'')+'>'+profiles[j].name+'</option>';
			}
			var check_profile_options = function() {
				if ($modal.find('[name="profile"]').val().length) {
					$modal.find('[name="profile"]').next().hide();
				} else {
					$modal.find('[name="profile"]').next().show();
				}
			};
			$modal.find('[name="profile"]').empty().html(profile_options).unbind('change').change(check_profile_options);
			check_profile_options();
		});
	}
};

// Display the contents of a collection
$.fn.show_collection = function(collection) {
	
	if ('undefined'==typeof(ns)) ns = $.initNamespaceStorage('tensor_ns');  // global
	if ('undefined'==typeof(storage)) storage = ns.localStorage;  // global		
	return this.each(function() {
		var $node = $(this);		
		if ('undefined'==typeof(collection)) {  // All imported media
			var profiles = ('undefined'!=typeof(storage.get('profiles'))) ? storage.get('profiles') : {};
			var items = {};
			for (var j = 0; j < profiles.length; j++) {
				for (var k = 0; k < profiles[j].collections.length; k++) {
					if ('undefined'==typeof(profiles[j].collections[k].items)) profiles[j].collections[k].items = {};
					$.extend(items, profiles[j].collections[k].items);
				};
			};
		} else {
			var items = collection.items;
		};
		var view = $('#collection_view').find('button[class*="btn-primary"]').attr('id'); 
		if ('undefined'!=typeof($.fn.spreadsheet_view)) $.fn.spreadsheet_view.remove();
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

// The "move" button with attached move action
$.fn.move = function(source_collection) {

	if ('undefined'==typeof(ns)) ns = $.initNamespaceStorage('tensor_ns');  // global
	if ('undefined'==typeof(storage)) storage = ns.localStorage;  // global
	var obj = {};
	var profiles = ('undefined'!=typeof(storage.get('profiles'))) ? storage.get('profiles') : {};
	for (var j = 0; j < profiles.length; j++) {
		for (var k = 0; k < profiles[j].collections.length; k++) {
			if (JSON.stringify(source_collection) != JSON.stringify(profiles[j].collections[k])) continue;
			obj.profile_index = j;
			obj.collection_index = k;
			break;
		};
	};
	return this.each(function() {
		var $node = $(this);
		$node.empty();
		// Move actions
		var do_move = function(action, profile_index, collection_index) {
			var items = {};
			$('#collection_results').find('.clicked').each(function() {
				var $this = $(this);
				var uri = $this.data('uri');
				var values = $this.data('values');
				items[uri] = values;
			});
			var profiles = ('undefined'!=typeof(storage.get('profiles'))) ? storage.get('profiles') : {};
			if ('meta'==action) {  // Edit metadata
				$('#edit_metadata').metadata(items, profiles[obj.profile_index].collections[obj.collection_index]);
				return;
			} else if ('remove'==action && isNaN(profile_index)) {  // Delete from all
				for (var j = 0; j < profiles.length; j++) {
					for (var k = 0; k < profiles[j].collections.length; k++) {
						for (var uri in items) {
							if ('undefined'!=profiles[j].collections[k].items[uri]) delete profiles[j].collections[k].items[uri];
						};
					};
				};
			} else if ('remove'==action) {  // Delete from this collection
				for (var uri in items) {
					if ('undefined'!=profiles[obj.profile_index].collections[obj.collection_index].items[uri]) delete profiles[obj.profile_index].collections[obj.collection_index].items[uri];
				};
			} else if ('copy'==action) {  // Copy from all into a collection
				for (var uri in items) {
					profiles[profile_index].collections[collection_index].items[uri] = items[uri];
				};
			} else if ('move'==action) {  // Move from one to the other
				for (var uri in items) {
					if ('undefined'!=profiles[obj.profile_index].collections[obj.collection_index].items[uri]) delete profiles[obj.profile_index].collections[obj.collection_index].items[uri];
				};
				for (var uri in items) {
					profiles[profile_index].collections[collection_index].items[uri] = items[uri];
				};
			} else {
				alert('Could not figure out the action!');
			};			
			storage.set('profiles', profiles);
			var selected_index = 0;
			$('#collections_form').find('.collection').each(function(index) {
				if ($(this).hasClass('clicked')) selected_index = index;
			});			
			$('#collections').list_collections(profiles);
			$('#collections_form').find('.collection').eq(selected_index).mousedown();
			if (!isNaN(profile_index) && !$('#moved_tour').length) {
				$(window).joyride("destroy");
				var $joyride = $('<ol id="moved_tour"><li data-id="collection_'+profile_index+'_'+collection_index+'" data-button="Close"><p>Your item'+((Object.keys(items).length>1)?'s have':' has')+' been '+(('move'==action)?'moved':'copied')+'.</p></li></ol>').appendTo('body');
				$("#moved_tour").joyride({autoStart:true, timer:2000, template:{link:''}});
			};
		};
		// Create the split button with a list of the collections
		$node.append('<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Selected items <span class="caret"></span></button>');
		var $list = $('<ul class="dropdown-menu"><li><a href="javascript:void(null);" data-action="meta">Edit metadata</a></li><li role="separator" class="divider"></li></ul>').appendTo($node);
		$list.parent().on('show.bs.dropdown', function () {  // Update the list live so that collections can be added at any time
			$list.children().not(':first').not('.divider').remove();
			var profiles = ('undefined'!=typeof(storage.get('profiles'))) ? storage.get('profiles') : {};
			if ('undefined'==typeof(source_collection)) {
				$list.append('<li><a href="javascript:void(null);" data-action="remove">Remove from all collections</a></li>');
			};
			for (var j = 0; j < profiles.length; j++) {
				for (var k = 0; k < profiles[j].collections.length; k++) {
					if (JSON.stringify(source_collection) == JSON.stringify(profiles[j].collections[k])) {
						$list.find('.divider').after('<li><a href="javascript:void(null);" data-action="remove" data-profile-index="'+j+'" data-collection-index="'+k+'">Remove from this collection</a></li>');
						continue;
					};
					if ('undefined'==typeof(source_collection)) {
						var action = 'copy';
						var title = 'Copy into '+profiles[j].collections[k].title;
					} else {
						var action = 'move';
						var title = 'Move to '+profiles[j].collections[k].title;
					};
					$list.append('<li><a href="javascript:void(null);" data-action="'+action+'" data-profile-index="'+j+'" data-collection-index="'+k+'">'+title+'</a></li>');
				};
			};
			$list.find('a').unbind('click').click(function() {
				do_move($(this).data('action'), parseInt($(this).data('profile-index')), parseInt($(this).data('collection-index')));
			});
		});
	});
	
};

// Edit metadata modal
$.fn.metadata = function(items, source_collection) {	
	
	if ('undefined'==typeof(ns)) ns = $.initNamespaceStorage('tensor_ns');  // global
	if ('undefined'==typeof(storage)) storage = ns.localStorage;  // global
	var obj = {};
	var profiles = ('undefined'!=typeof(storage.get('profiles'))) ? storage.get('profiles') : {};
	for (var j = 0; j < profiles.length; j++) {
		for (var k = 0; k < profiles[j].collections.length; k++) {
			if (JSON.stringify(source_collection) != JSON.stringify(profiles[j].collections[k])) continue;
			obj.profile_index = j;
			obj.collection_index = k;
			break;
		};
	};
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
					    $row.append('<div class="col-sm-9"><input type="text" class="form-control" id="'+ns_name+'" value="'+escapeHtml(items[uri][p][j].value.toString())+'"></div>');
					    if ('art:thumbnail'==ns_name) {
					    	$row.find('div').append('<a href="'+items[uri][p][j].value+'" target="_blank"><img src="'+items[uri][p][j].value+'" class="img-thumbnail" /></a>');
					    } else if (-1!=items[uri][p][j].value.toString().indexOf('://') || '//'==items[uri][p][j].value.toString().substr(0,2)) {
					    	$row.find('div').append('<a href="'+items[uri][p][j].value+'" class="visit_link" target="_blank">Visit link</a>');
					    }
					};
				};
				$node.find('button:last').unbind('click').click(function() {
					// Save current item
					var to_save = {};
					$form.find('input[id]').each(function() {
						var $input = $(this);
						var field = uri_from_pnode($input.attr('id'));
						if ('undefined'==typeof(to_save[field])) to_save[field] = [];
						to_save[field].push({type:(($input.val().indexOf('//')==-1)?'literal':'uri'),value:$input.val()});
					});
					var profiles = ('undefined'!=typeof(storage.get('profiles'))) ? storage.get('profiles') : {};
					profiles[obj.profile_index].collections[obj.collection_index].items[uri] = to_save;
					storage.set('profiles', profiles);
					// Refresh collection display
					$('#collections_form .clicked').data('collection', profiles[obj.profile_index].collections[obj.collection_index]);
					$('#collection_results').show_collection(profiles[obj.profile_index].collections[obj.collection_index]);
					// Move to next item
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

// Push items to through a saver
$.fn.sync = function($form) {

	if ('undefined'!=typeof($form)) {
		var base_url = $('link#base_url').attr('href');
		var proxy_url = $('link#proxy_url').attr('href');
		// Items in the selected collection
		var items = {};
		var profiles = ('undefined'!=typeof(storage.get('profiles'))) ? storage.get('profiles') : {};	
		$('#sync_collections').find('.clicked').each(function() {
			var profile_index = $(this).data('profile-index');
			var collection_index = $(this).data('collection-index');
			var profiles = ('undefined'!=typeof(storage.get('profiles'))) ? storage.get('profiles') : {};
			if (isNaN(profile_index)) {  // All
				for (var j = 0; j < profiles.length; j++) {
					for (var k = 0; k < profiles[j].collections.length; k++) {
						if ('undefined'==typeof(profiles[j].collections[k].items)) profiles[j].collections[k].items = {};
						$.extend(items, profiles[j].collections[k].items);
					};
				};
			} else {	
				var collection = profiles[profile_index].collections[collection_index];
				items = collection.items;
			};
		});
		if ($.isEmptyObject(items)) {
			alert('Please select a source collection that contains one or more items');
			return;
		};
		var destination = {};
		$('#sync_destinations').find('.clicked').each(function() {
			destination = $(this).data('destination');
		});		
		if ($.isEmptyObject(destination)) {
			alert('Please select a destination');
			return;
		};
		// Run sync
		var parser_url = base_url+'parsers/'+destination.parser+'/parser.js';
		$.getScript(parser_url, function() {
			$form.find('button:last').prop('disabled','disabled');
			$.fn.save({data:items,url:destination.url,parser:destination.parser,proxy_url:proxy_url,error_callback:error_callback,complete_callback:sync_complete_callback});
		}).fail(function() {
			var $error = $('#error');
			$error.find('[class="modal-body"]').html('<p>Could not find parser</p>');
			$error.modal();
		});			
	} else {
		return this.each(function() {
			var $node = $(this);			
			var $sources = $node.find('#sync_collections');
			var $destinations = $node.find('#sync_destinations');
			$sources.empty();
			$destinations.empty();
			// Propagate collections
			var profiles = ('undefined'!=typeof(storage.get('profiles'))) ? storage.get('profiles') : {};
			$('#collection_0').clone().attr('id', 'sync_collection_0').addClass('col-sm-3').appendTo($sources);
			for (var j = 0; j < profiles.length; j++) {
				for (var k = 0; k < profiles[j].collections.length; k++) { 
					var lum = luminance(profiles[j].collections[k].color);
					if ('undefined'==typeof(profiles[j].collections[k].items)) profiles[j].collections[k].items = {};
					var $col = $('<div class="collection col-sm-3" data-profile-index="'+j+'" data-collection-index="'+k+'"></div>').appendTo($sources);
					$col.append('<div class="color '+((lum < 80)?'dark':'light')+'" style="background-color:'+profiles[j].collections[k].color+';"><span class="num_items">'+Object.keys(profiles[j].collections[k].items).length+'</span></div>');
					$col.append('<h5>'+profiles[j].collections[k].title+'</h5>');
					$col.append('<div class="desc">'+profiles[j].collections[k].description+'</div>');
					$col.data('collection', profiles[j].collections[k]);
				};
			};
			$sources.children().unbind('click').click(function() {
				var $clicked = $(this);
				$clicked.parent().find('.collection').removeClass('clicked');
				$clicked.addClass('clicked');
			});
			// Destination is predefined by GET vars (e.g., from Scalar
			if (getVar('parser') && getVar('parent') && getVar('title')) {
				$('#sync_destinations').prev().text('Destination:');
				var parser = decodeURIComponent(getVar('parser'));
				var parent = decodeURIComponent(getVar('parent'));
				var title = decodeURIComponent(getVar('title'));
				var $destinations = $node.find('#sync_destinations');
				$destinations.empty();
				var temp_bg_url = $('link#base_url').attr('href')+'parsers/scalar/thumb.png';
				var $col = $('<div class="collection col-sm-3 clicked" data-index="0"></div>').appendTo($destinations);
				$col.append('<div class="color" style="background-image:url('+temp_bg_url+');background-size:contain;border:0;"><span class="num_items"></div>');
				$col.append('<h5>'+title+'</h5>');
			    $col.append('<div class="desc">'+parent+'</div>');
			    $col.data('destination', {
			    	parser:parser,
			    	title:title,
			    	url:parent
			    });				
			// Destinations
			} else {
				var set_destinations = function() {
					$('#sync_destinations').prev().text('Select a destination:');
					var $destinations = $node.find('#sync_destinations');
					$destinations.empty();
					var destinations = ('undefined'!=typeof(storage.get('destinations'))) ? storage.get('destinations') : [];
					for (var j = 0; j < destinations.length; j++) { 
						var bg_url = $('link#base_url').attr('href')+'parsers/'+destinations[j].parser+'/thumb.png'
						var $col = $('<div class="collection col-sm-3" data-index="'+j+'"></div>').appendTo($destinations);
						$col.append('<button type="button" class="close" style="display:none;">&times;</button>');
						$col.append('<div class="color" style="background-image:url('+bg_url+');background-size:contain;border:0;"><span class="num_items"></div>');
						$col.append('<h5>'+destinations[j].title+'</h5>');
					    $col.append('<div class="desc">'+destinations[j].url+'</div>');
					    $col.data('destination', destinations[j]);
					    $col.data('index', j);
					};
					$destinations.children().unbind('mouseover').mouseover(function() {
						$(this).find('button:first').show();
					}).unbind('mouseout').mouseout(function() {
						$(this).find('button:first').hide();
					});
					$destinations.children().unbind('click').click(function() {
						var $clicked = $(this);
						$clicked.parent().find('.collection').removeClass('clicked');
						$clicked.addClass('clicked');
					});
					$destinations.find('.close').unbind('click').click(function(e) {
						e.stopPropagation();
						$dest = $(this).closest('.collection');
						if (!confirm('Are you sure you wish to remove the destination "'+$dest.data('destination').title+'" from your list of destinations?')) return;
						var destinations = ('undefined'!=typeof(storage.get('destinations'))) ? storage.get('destinations') : [];
						var index = $dest.data('index');
						destinations.splice(index, 1);
						storage.set('destinations', destinations);
						set_destinations();					
					});
				};			
				set_destinations();
				// Add destination form
				var $form = $node.find('#add_destination');
				$form.empty();
				var $pulldown = $('<div class="btn-group"><button type="button" class="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span class="btn-name">Parser</span> <span class="caret"></span></button><ul class="dropdown-menu"></ul></div>').appendTo($form);
				var $name = $pulldown.find('.btn-name');
				var $menu = $pulldown.find('.dropdown-menu');
				$menu.append('<li><a href="javascript:void(null);">Scalar</a></li>');
				$menu.append('<li><a href="javascript:void(null);">Crossroads</a></li>');
				$form.append('<div class="form-group"><input type="text" name="title" class="form-control input-sm" placeholder="Title..." required></div>');
				$form.append('<div class="form-group"><input type="url" name="url" class="form-control input-sm" placeholder="Destination URL..." required></div>');
				$form.append('<div class="form-group"><button type="submit" class="btn btn-default btn-sm">Add</button></div>');
				$menu.find('a').unbind('click').click(function() {
					$name.text($(this).text());
				});
				$form.unbind('submit').submit(function() {
					var parser = $name.text();
					var title = $form.find('[name="title"]').val();
					var url = $form.find('[name="url"]').val();
					if ('parser'==parser.toLowerCase()) {
						alert('Please choose a parser');
						return false;
					};
					var destinations = ('undefined'!=typeof(storage.get('destinations'))) ? storage.get('destinations') : [];
					var dest = {parser:parser.toLowerCase(),title:title,url:url};
					destinations.push(dest);
					storage.set('destinations', destinations);
					set_destinations();
					$form.find('input').val('');
					return false;
				});
			};
		});
	};
	
};

function sync_complete_callback(data) {

	var $sync = $('#sync');
	$sync.find('.modal-footer .btn').hide();
	var $button = $('<button class="btn btn-success">Return to archives</button>').appendTo($sync.find('.modal-footer:first'));
	$button.click(function() {
		$sync.modal('hide');
		$(this).remove();
		$sync.find('.progress-bar').width(0).find('span').text('Content 0 of 0');
		$sync.find('.modal-footer .btn').show().removeProp('disabled');
		$sync.find('#progress_log').empty();
	});
	
};

function loading(bool, archive_title) {
	var $loading = $('#loading');
	if (bool) {
		if ('undefined'!=typeof(archive_title) && !$loading.find('[title="'+archive_title+'"]').length) $loading.children(':first').append('<div class="a" title="'+archive_title+'">'+archive_title+'</div>');
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
	var namespaces = get_namespaces();
	for (var prefix in namespaces) {
		if (-1!=uri.indexOf(namespaces[prefix])) {
			return prefix + ':' + uri.replace(namespaces[prefix],'');
		};
	};
};

var uri_from_pnode = function(pnode) {
	var namespaces = get_namespaces();
	var _prefix = pnode.split(':')[0];
	for (var prefix in namespaces) {
		if (prefix == _prefix) {
			return namespaces[prefix] + pnode.split(':')[1]; 
		}
	}
	return null;
};

function get_namespaces() {
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
			'bibo':'http://purl.org/ontology/bibo/',
			'id3':'http://id3.org/id3v2.4.0#'
		};
	return namespaces;
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

jQuery.fn.highlight = function () {  // http://stackoverflow.com/questions/848797/yellow-fade-effect-with-jquery
    $(this).each(function () {
        var el = $(this);
        $("<div/>")
        .width(el.outerWidth())
        .height(el.outerHeight())
        .css({
            "position": "absolute",
            "left": el.offset().left,
            "top": el.offset().top,
            "background-color": "#ffff99",
            "opacity": ".7",
            "z-index": "9999999"
        }).appendTo('body').fadeOut(1000).queue(function () { $(this).remove(); });
    });
};

function getVar(requested) {
	var vars = {};
	var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
		vars[key] = value;
	});
	if ('undefined'==typeof(vars[requested])) return false;
	return vars[requested];
};