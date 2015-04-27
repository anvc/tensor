<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Wb extends CI_Controller {

	public function __construct() {

		parent::__construct();

		$this->data = array();

		$this->load->helper('url');

		$this->load->library("template");
		$this->template->set_layout('workbench/wrapper.php');

	}

	public function index() {

		header('Location: '.base_url().'wb/import');
		exit;

	}

	public function import() {

		$this->load->helper('array');

		$this->data['title'] = 'Workbench: Import';
		$this->data['proxy_url'] = base_url().strtolower(get_class()).'/proxy';

		$this->config->load('archives');
		$this->data['archives'] = $this->config->item('archives');
		usort($this->data['archives'], "cmp_archives");

		$this->template->add_css(APPPATH.'views/common/jquery-ui-1.11.4.custom/jquery-ui.min.css');
		$this->template->add_css(APPPATH.'views/common/bootstrap/css/bootstrap.min.css');
		$this->template->add_css(APPPATH.'views/common/resizable-columns/jquery.resizableColumns.css');
		$this->template->add_css(APPPATH.'views/ui/spreadsheet.css');
		$this->template->add_js('https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js');
		$this->template->add_js(base_url().APPPATH.'views/common/jquery-ui-1.11.4.custom/jquery-ui.min.js');
		$this->template->add_js(base_url().APPPATH.'views/common/bootstrap/js/bootstrap.min.js');
		$this->template->add_js(base_url().APPPATH.'views/common/resizable-columns/jquery.resizableColumns.js');
		$this->template->add_js(base_url().APPPATH.'views/common/match-height/jquery.matchHeight.js');
		$this->template->add_js(base_url().APPPATH.'views/common/linkify/linkify.js');
		$this->template->add_js(base_url().APPPATH.'views/workbench/js/jquery.spreadsheet_model.js');
		$this->template->add_js(base_url().APPPATH.'views/workbench/js/jquery.spreadsheet_events.js');
		$this->template->add_js(base_url().APPPATH.'views/workbench/js/jquery.advanced_search.js');
		$this->template->add_js(base_url().APPPATH.'views/workbench/js/import.js');
		$this->template->render("workbench/import", $this->data);

	}

	public function manage() {

		$this->data['title'] = 'Workbench: Manage';

		echo 'Coming soon...';

	}

	public function proxy() {

		$this->load->model('proxy_model');
		$this->data['results'] = $this->proxy_model->get();
		$this->load->view('workbench/proxy', $this->data);

	}

}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */