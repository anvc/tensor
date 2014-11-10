<?php 
class Proxy_model extends CI_Model {

    public function __construct() {
    	
        parent::__construct();
        
    }
    
    public function get() {
    	
    	$graph_uri =@ $_REQUEST['graph_uri'];
		$store_uri =@ $_REQUEST['store_uri'];
		$mapping_uri =@ $_REQUEST['mapping_uri'];
		$source_uri =@ $_REQUEST['source_uri'];

		if (empty($source_uri)) return self::error('Missing source URI');
		
		// Route through Karma Triples Store
		if (!empty($store_uri) && !empty($mapping_uri)) {
			require_once(FCPATH."/application/views/common/arc2/ARC2.php");
			$url = 'http://fusion-sqid.isi.edu:8080/publishrdf/rdf/r2rml/rdf';
			$arr = array(
				'SparqlEndPoint'=>$store_uri,
				'GraphURI'=>$graph_uri,
				'TripleStore'=>'Virtuoso',
				'Overwrite'=>'true',
				'DataURL'=>$source_uri,
				'R2rmlURI'=>$mapping_uri,
				'ContentType'=>'XML',
				'RefreshModel'=>'true'
			);
			// url-ify the data for the POST
			$arr_string = '';
			foreach($arr as $key=>$value) { $arr_string .= $key.'='.$value.'&'; }
			rtrim($arr_string, '&');
			// CURL
			$ch = curl_init();
			curl_setopt($ch,CURLOPT_URL, $url);
			curl_setopt($ch,CURLOPT_POST, count($arr));
			curl_setopt($ch,CURLOPT_POSTFIELDS, $arr_string);
			curl_setopt($ch,CURLOPT_RETURNTRANSFER, 1);
			$content = curl_exec($ch);
			curl_close($ch);			
			// Convert from TTL to RDF-JSON
			$parser = ARC2::getTurtleParser();
			$parser->parse('http://example.com/', $content);
			$triples = $parser->getTriples();
			$ser = ARC2::getRDFJSONSerializer();
			$content = $ser->getSerializedTriples($triples);
			
		// Direct request
		} else {
			$content = file_get_contents($source_uri);
		}
		
		if (empty($content)) return self::error('Could not resolve content');
		
		return $content;
    	
    }
    
    private function error($str='') {
    	
    	return '{"error":"'.htmlspecialchars($str).'"}';
    	
    }
    
    private function ttl_to_rdf($content='') {

    	
    }
    
}
?>