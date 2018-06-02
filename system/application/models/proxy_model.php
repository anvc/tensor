<?php
class Proxy_model extends CI_Model {

    public function __construct() {

        parent::__construct();

    }

    public function get() {

		$page =@ (int) $_REQUEST['page'];
		$query =@ (string) $_REQUEST['query'];
		$parser =@ (string) $_REQUEST['parser'];
		$url =@ (string) $_REQUEST['url'];
		$single = (isset($_REQUEST['single']) && !empty($_REQUEST['single'])) ? true : false;
		$autocomplete =@ (string) $_REQUEST['autocomplete'];

		if (empty($page)) $page = 1;
		if (empty($parser)) return self::error('Missing the parser name');

		$parser_path = FCPATH."/parsers/$parser/handler.php";
		if (!file_exists($parser_path)) return self::error('Could not find the parser directory or handler file');
		$err = require_once($parser_path);
		if (!empty($err) && !is_numeric($err)) {
			return self::error(json_decode($err));
		} elseif (empty($content)) {
			return self::error('No content was returned. This could be caused by a number of things including Internet connection problems or the archive\'s server being unavailable.');
		}

		return $content;

    }

    public function put() {

		$data =@ (string) $_REQUEST['data'];
		$parser =@ (string) $_REQUEST['parser'];
		$url =@ (string) $_REQUEST['url'];

		if (empty($data)) return self::error('Missing the data to save');
		if (empty($parser)) return self::error('Missing the parser name');

		$data = json_decode($data);

		$parser_path = FCPATH."/parsers/$parser/saver.php";
		if (!file_exists($parser_path)) return self::error('Could not find the parser directory or saver file');
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
