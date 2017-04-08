(function( $ ) {
	
	var defaults = {
			page: null,  /* Page number when getting */
			query: null,  /* The query string when getting */
			data: null,  /* The data object when putting */
			url: null,  /* Base URL of the archive */
			url_override: null, /* Force the handler to this URL */
			parser: null,  /* Name of the parser directory */
    		proxy_url: null,  /* The URL to the proxy controller */
    		error_callback: null,
    		complete_callback: null
	};  	
	
    $.fn.spreadsheet_model = function(options) {
    	
    	var self = this;
    	var opts = $.extend( {}, defaults, options );
    	this.opts = opts;
    	
    	this.parse = function() {alert('You need to override spreadsheet_model\'s parse() method!')}; 
    	
    	this.save = function() {alert('You need to override spreadsheet_model\'s save() method!')}; 
    	
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
            		success_callback(data);
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
        		data:(opts.data)?opts.data:'',
        		url:(opts.url)?opts.url:'',
        		url_override:(opts.url_override)?opts.url_override:'',
        		parser:(opts.parser)?opts.parser:'',
        		proxy_url:(opts.proxy_url)?opts.proxy_url:''
        	};
        };
        
        var error_callback = function(jqXHR) {
        	opts.error_callback(jqXHR.status+' '+jqXHR.statusText, opts);  	
        };
        
        var success_callback = function(data) {
        	try {
        		var obj = $.parseJSON(data);
            	if ('undefined'!=typeof(obj.error) && obj.error.length) {
            		error_callback({status:'Proxy error:',statusText:obj.error});
            		return;
            	};        		
        	} catch(e) {};
    		if ('undefined'!=typeof(data.error) && data.error.length) {
    			opts.error_callback(data.error);
    			return;
    		};        	
        	if (null!==opts.data) {
        		self.save(data, opts);
        	} else {
        		self.parse(data, opts);
        	};
        };

    };
    
}( jQuery ));