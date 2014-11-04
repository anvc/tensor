<?php 
class Proxy_model extends CI_Model {

    public function __construct() {
    	
        parent::__construct();
        
    }
    
    public function get() {
    	
		$store_uri =@ $_REQUEST['store_uri'];
		
		$content = file_get_contents($store_uri);
		if (!$content) return error('Could not resolve store URI');
		
		return $content;
    	
    }
    
    private function error($str='') {
    	
    	return '{"error":"'.htmlspecialchars($str).'"}';
    	
    }
    
}
?>