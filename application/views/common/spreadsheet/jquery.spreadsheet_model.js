(function( $ ) {
	
	var defaults = {
			store_uri: null,
    		mapping_uri: null,
    		data_uri: null,
    		proxy: true,
    		proxy_uri: null,
    		error_callback: null,
    		complete_callback: null
	};  	
	var $self = null;
	var opts = null;
	var results = {};
	
    $.fn.spreadsheet_model = function(options) {
    	$self = this;
    	opts = $.extend( {}, defaults, options );
    	this.fetch = fetch;
    	this.opts = opts;
    	this.parse = function() {alert('Override spreadsheet_model\'s parse() method!')}; 
        return $self;
    };
    
    function fetch() {
    	if (!opts.proxy) {
    		alert('Non-proxy ajax requests not supported');
    		return;
    	};
    	if (window['loading']) loading(true);
    	$.getJSON(opts.proxy_uri, proxy_data(), function( data ) {
    		if (window['loading']) loading(false);
    		parse_store_results(data);
    	}).fail(function(jqXHR) {
    		error_callback(jqXHR);
    	});
    };
    
    function proxy_data() {
    	return {
    		store_uri:opts.store_uri
    	};
    };
    
    function error_callback(jqXHR) {
    	opts.error_callback(jqXHR.status+' '+jqXHR.statusText);  	
    };
    
    function parse_store_results(data) {
    	if ('undefined'!=typeof(data.error) && data.error.length) {
    		error_callback({status:'Proxy error:',statusText:data.error});
    		return;
    	};
    	$self.parse(data);
    }
    
}( jQuery ));