<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Workbench extends CI_Controller {

	public function __construct() {
		
		parent::__construct();
		
		$this->data = array();
		
		$this->load->helper('url');
		
		$this->load->library("template");
		$this->template->set_layout('workbench/wrapper.php');
	
	}
	
	public function index() {
		
		$this->template->render('workbench/index');
		
	}
	
	public function import() {
		
		$this->data['title'] = 'Workbench: Import';
		$this->data['proxy_uri'] = base_url().strtolower(get_class()).'/proxy';
		
		$this->template->add_css(APPPATH.'views/common/bootstrap/css/bootstrap.min.css');
		$this->template->add_css(APPPATH.'views/common/resizable-columns/jquery.resizableColumns.css');
		$this->template->add_css(APPPATH.'views/common/spreadsheet/spreadsheet.css');
		$this->template->add_js('https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js'); // TODO: make local
		$this->template->add_js(base_url().APPPATH.'views/common/bootstrap/js/bootstrap.min.js'); 
		$this->template->add_js(base_url().APPPATH.'views/common/resizable-columns/jquery.resizableColumns.js'); 
		$this->template->add_js(base_url().APPPATH.'views/common/ba-resize/jquery.ba-resize.js'); 
		$this->template->add_js(base_url().APPPATH.'views/common/linkify/linkify.js'); 
		$this->template->add_js(base_url().APPPATH.'views/common/spreadsheet/jquery.spreadsheet_model.js'); 
		$this->template->add_js(base_url().APPPATH.'views/common/spreadsheet/jquery.spreadsheet_view.js');
		$this->template->add_js(base_url().APPPATH.'views/common/spreadsheet/jquery.spreadsheet_events.js'); 
		$this->template->add_js(base_url().APPPATH.'views/common/parsers/jquery.scalar.js'); 
		$this->template->add_js(base_url().APPPATH.'views/workbench/js/import.js'); 
		$this->template->render("workbench/import", $this->data);
		
	}	
	
	public function manage() {
		
		$this->data['title'] = 'Workbench: Manage';
		
		$this->template->add_css(APPPATH.'views/common/bootstrap/css/bootstrap.min.css');
		$this->template->add_css(APPPATH.'views/common/resizable-columns/jquery.resizableColumns.css');
		$this->template->add_css(APPPATH.'views/workbench/css/spreadsheet.css');
		$this->template->add_js('https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js'); // TODO: make local
		$this->template->add_js(base_url().APPPATH.'views/common/bootstrap/js/bootstrap.min.js'); 
		$this->template->add_js(base_url().APPPATH.'views/common/resizable-columns/jquery.resizableColumns.js'); 
		$this->template->add_js(base_url().APPPATH.'views/common/ba-resize/jquery.ba-resize.js'); 
		$this->template->add_js(base_url().APPPATH.'views/common/linkify/linkify.js'); 
		$this->template->add_js(base_url().APPPATH.'views/workbench/js/spreadsheet.js'); 
		$this->template->render("workbench/manage", $this->data);
		
	}
	
	public function proxy() {
		
		$this->load->model('proxy_model');
		$this->data['results'] = $this->proxy_model->get();
		$this->load->view('workbench/proxy', $this->data);

	}
	
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */