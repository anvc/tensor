<?php
/**
 * @projectDescription	Archive List config for Workbench
*/

$config['archives'] = array();

$config['archives'][] = array(
	'title'   		=> 'Critical Commons',
	'subtitle'		=> 'For Fair &amp; Critical Participation in Media Culture',
	'categories' 	=> array('affiliated', 'video', 'image'),
	'logo'			=> 'views/ui/images/criticalcommons.logo.png',
	'thumbnail'		=> 'views/ui/images/criticalcommons.thumb.png',
	'teaser'		=> '',
	'request-1'		=> array(
		'handler'		=> 'rdf',
		'parser'  		=> "rdf",
		'store'   		=> "http://karmarestserver.dig.isi.edu:8080/sparql-graph-crud-auth/",
		'source'  		=> "http://criticalcommons.org/cc/playlist?SearchableText=%1",
		'content_type'	=> "xml",
		'mapping' 		=> "http://scalar.usc.edu/static/R2RML/WSP1WS2-CriticalCommons-auto-model.ttl",
		'graph'   		=> "http://karmarestserver.dig.isi.edu:8080/scalar"
	)
);
$config['archives'][] = array(
	'title'   		=> 'YouTube',
	'subtitle'		=> 'Hosts user-generated videos. Includes network and professional content.',
	'categories' 	=> array('video', 'other'),
	'logo'			=> 'views/ui/images/youtube.logo.png',
	'thumbnail'		=> 'views/ui/images/youtube.thumb.png',
	'teaser'		=> array('art:thumbnail'=>'','dcterms:title'=>'','dcterms:creator'=>''),
	'request-1'		=> array(
		'handler'		=> 'rdf',
		'parser'  		=> "rdf",
		'store'   		=> "http://karmarestserver.dig.isi.edu:8080/sparql-graph-crud-auth/",
		'source'  		=> "https://www.googleapis.com/youtube/v3/search?part=snippet&q=%1&maxResults=50&type=video&key=AIzaSyAI9koLGtnZpygU7nMuHVT7xJbwUU-sQBw",
		'content_type' 	=> "json",
		'mapping' 		=> "http://scalar.usc.edu/static/R2RML/WSP1WS2-YouTube3-auto-model.ttl",
		'graph'   		=> "http://karmarestserver.dig.isi.edu:8080/scalar"
	)
);