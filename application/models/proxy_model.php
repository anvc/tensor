<?php
class Proxy_model extends CI_Model {

    public function __construct() {

        parent::__construct();

    }

    public function get() {

		$graph_uri =@ $_REQUEST['graph'];
		$store_uri =@ $_REQUEST['store'];
		$mapping_uri =@ $_REQUEST['mapping'];
		$source_uri =@ $_REQUEST['source'];
		$content_type = (isset($_REQUEST['content_type']) && !empty($_REQUEST['content_type'])) ? $_REQUEST['content_type'] : 'xml';
		$parser =@ $_REQUEST['parser'];

		if (empty($source_uri)) return self::error('Missing source URI');
		if (empty($parser)) return self::error('Missing parser');

		$parser_path = FCPATH."/application/views/ui/parsers/$parser.php";
		if (!file_exists($parser_path)) return self::error('Could not find parser PHP file');
		require_once($parser_path);
		if (empty($content)) {
			$curlinfo['error'] = 'Could not resolve content';
			return self::error($curlinfo);
		}

		return $content;

    }

    private function error($arr='') {

    	if (is_string($arr)) $arr = array('error'=>$arr);

    	return json_encode($arr);

    }

    private function ttl_to_rdf($content='') {

    }

}
?>
