(function( $ ) {
	$.fn.condenseCellText = function() {
		return this.each(function() {
			var $this = $(this);
			var width = $this.width();
			var text_wrapper = $this.find(':first');
			if (!text_wrapper.is('div, span, p')) return;
			text_wrapper.css('width','');
			$this.find('.more_text').remove();
			if (parseInt(text_wrapper.outerWidth()) <= parseInt(width)) return;
			text_wrapper.width((width-10));
			if (!$this.find('.more_text').length) $this.append('<span class="more_text" style="float:right;">...</span>');
		});
	};
}( jQuery ));

$(document).ready(function() {
	
	$(".table").resizableColumns();

	$('td').condenseCellText();
  
	$('td').resize(function() {
		$(this).condenseCellText();
	});
	
});