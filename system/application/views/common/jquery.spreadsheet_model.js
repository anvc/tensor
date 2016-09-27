(function( $ ) {
	
	var defaults = {
			page: null,
			query: null, 
			url: null,
			parser: null,
    		proxy_url: null,
    		error_callback: null,
    		complete_callback: null
	};  	
	
    $.fn.spreadsheet_model = function(options) {
    	
    	var self = this;
    	var opts = $.extend( {}, defaults, options );
    	this.opts = opts;
    	
    	this.parse = function() {alert('You need to override spreadsheet_model\'s parse() method!')}; 
    	
        this.fetch = function(data_type) {
        	if (!opts.proxy_url) {
        		alert('Non-proxy ajax requests not supported');
        		return;
        	};	
            $.ajax({
                url: opts.proxy_url,
                data: proxy_data(),
                dataType: data_type,
                type: 'GET',
                success: function (data) {
            		parse_store_results(data);
                },
                error: function (jqXHR) {
                	error_callback(jqXHR);
                }
            });        	
        };
        
        var proxy_data = function() {
        	return {
        		page:(opts.page)?opts.page:'',
        		query:(opts.query)?opts.query:'',
        		url:(opts.url)?opts.url:'',
        		parser:(opts.parser)?opts.parser:'',
        		proxy_url:(opts.proxy_url)?opts.proxy_url:''
        	};
        };
        
        var error_callback = function(jqXHR) {
        	opts.error_callback(jqXHR.status+' '+jqXHR.statusText, opts);  	
        };
        
        var parse_store_results = function(data) {
        	try {
        		var obj = $.parseJSON(data);
            	if ('undefined'!=typeof(obj.error) && obj.error.length) {
            		error_callback({status:'Proxy error:',statusText:obj.error});
            		return;
            	};        		
        	} catch(e) {};
        	self.parse(data, opts);
        }    	

    };
    
}( jQuery ));