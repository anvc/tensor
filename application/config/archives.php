<?php
/**
 * @projectDescription	Archive List config for Workbench
*/

$config['archives'] = array();
$config['archives']['scalar_affiliated'] = array();
$config['archives']['other'] = array();

// Dashboard plugins (present the only supported plugin type)
$config['archives']['scalar_affiliated'][] = array(
	'title'   => "Critical Commons",
	'parser'  => "rdf",
	'graph'   => "http://karmarestserver.dig.isi.edu:8080/scalar",
	'store'   => "http://karmarestserver.dig.isi.edu:8080/sparql-graph-crud-auth/",
	'mapping' => "http://scalar.usc.edu/static/R2RML/WSP1WS2-CriticalCommons-auto-model.ttl",
	'source'  => "http://criticalcommons.org/cc/playlist?SearchableText=%1",
	'content' => "xml" );

$config['archives']['scalar_affiliated'][] = array('title' => "Cuban Theater Digital Archive");
$config['archives']['scalar_affiliated'][] = array('title' => "Hemispheric Institute DVL");
$config['archives']['scalar_affiliated'][] = array('title' => "Hypercities");
$config['archives']['scalar_affiliated'][] = array('title' => "Internet Archive");
$config['archives']['scalar_affiliated'][] = array('title' => "PLAY!");
$config['archives']['scalar_affiliated'][] = array('title' => "Shoah Foundation VHA Online");
$config['archives']['other'][] = array('title' => "Getty Museum Collection");
$config['archives']['other'][] = array('title' => "Prezi");
$config['archives']['other'][] = array('title' => "Soundcloud");
$config['archives']['other'][] = array('title' => "Metropolitan Museum of Art");
$config['archives']['other'][] = array('title' => "Vimeo");

$config['archives']['other'][] = array(
	'title'   => "Youtube",
	'parser'  => "rdf",
	'graph'   => "http://karmarestserver.watproj.org:8080/scalar",
	'store'   => "http://karmarestserver.watproj.org:8080/sparql-graph-crud-auth/",
	'mapping' => "http://scalar.usc.edu/static/R2RML/WSP1WS2-YouTube3-auto-model.ttl",
	'source'  => "https://www.googleapis.com/youtube/v3/search?part=snippet&q=%1&maxResults=50&type=video&key=AIzaSyAI9koLGtnZpygU7nMuHVT7xJbwUU-sQBw",
	'content' => "json" );
