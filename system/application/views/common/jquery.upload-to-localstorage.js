(function( $ ) {
	
	var defaults = {
	   
	};  	
	
    $.fn.uploadToLocalStorage = function(options) {
    	var $self = $(this);
    	opts = $.extend( {}, defaults, options );
    	
    	var $imgObj = $('<img id="upload-to-localstorage" src="" />').appendTo('body');
    	
    	// Getting a file through XMLHttpRequest as an arraybuffer and creating a Blob
    	var storage = localStorage.getItem("upload-to-localstorage");
    	var imgObj = document.getElementById("upload-to-localstorage");
    	
    };
    
}( jQuery ));