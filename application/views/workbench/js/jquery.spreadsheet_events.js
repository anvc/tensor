(function( $ ) {
	$.fn.condenseCellText = function() {
		return this.each(function() {
			var $this = $(this);
			var width = $this.width();
			var text_wrapper = $this.children(':first');
			if (!text_wrapper.is('div, span, p') || text_wrapper.hasClass('container')) return;
			text_wrapper.css('width','');
			$this.find('.more_text').remove();
			if (parseInt(text_wrapper.outerWidth()) <= parseInt(width)) return;
			text_wrapper.width((width-10));
			if (!$this.find('.more_text').length) $this.append('<span class="more_text" style="float:right;">...</span>');
		});
	};
	$.fn.metadataPanel = function() {
		var $parent = $(this);
		var disallowed_tags = ['input','iframe','embed','object'];
		// Remove
		if ($parent.hasClass('active')) {
			$metadata = $parent.next();
			if (!$metadata.find('.metadata').length) return;
			$parent.removeClass('active');
			$metadata.fadeOut(function() {
				$(this).remove();
			});
		// Add
		} else {
			$parent.addClass('active');
			var $metadata = $('<tr style="display:none;"><td colspan="20" class="metadata"><div class="container" style="width:100%;"></div><br clear="both" /></td></tr>');
			var $container = $metadata.find('.container');
			$('<div class="row"><div class="col-md-12 col-xs-12">All metadata for this item</div></div>').appendTo($container);
			// The following will be replaced by a crawl through the actual RDF-JSON node for the row ... for now, fill in placeholders
			var predicates = [];
			var $values = $('#spreadsheet-table tbody td:not(:last)');
			$('#spreadsheet-table thead th:not(:last)').each(function() {
				predicates.push($.trim($(this).text()));
			});
			for (var k = 0; k < predicates.length; k++) {
				var value = $.trim($('<div>'+$values.eq(k).children(':first').html()+'</div>').find(disallowed_tags.join(',')).remove().end().html());
				var $row = $('<div class="row"><div class="col-md-3 col-xs-3" style="text-align:left;font-weight:bold;">'+predicates[k]+'</div><div class="col-md-9 col-xs-9" style="text-align:left;">'+value+'</div></div>');
				$container.append($row);
			}
			$('<div class="row"><div class="col-md-3 col-xs-3" style="text-align:left;font-weight:bold;">dcterms:source</div><div class="col-md-9 col-xs-9" style="text-align:left;">YouTube</div></div>').appendTo($container);
			$('<div class="row"><div class="col-md-3 col-xs-3" style="text-align:left;font-weight:bold;">dcterms:publisher</div><div class="col-md-9 col-xs-9" style="text-align:left;">Internet Movie Database</div></div>').appendTo($container);
			$('<div class="row"><div class="col-md-3 col-xs-3" style="text-align:left;font-weight:bold;">dcterms:identifier</div><div class="col-md-9 col-xs-9" style="text-align:left;">'+(Math.floor(Math.random()*90000) + 10000)+'</div></div>').appendTo($container);
			$parent.after($metadata);
			$metadata.fadeIn();
		}
	};	
}( jQuery ));