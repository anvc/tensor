<?php
/**
 * @projectDescription	Archive List config for Workbench
*/

$config['archives'] = array();

$config['archives'][] = array(
	'title'   		=> 'USC Digital Library',
	'subtitle'		=> 'USC Libraries Digital Collections',
	'categories' 	=> array('audio', 'video', 'image'),
	'logo'			=> '',
	'thumbnail'		=> 'views/ui/images/uscdigitallibrary.thumb.png',
	'teaser'		=> '',
	'request'		=> array(
		'handler'		=> 'http',
		'parser'  		=> "contentdm",
		'source'		=> "http://digitallibrary.usc.edu/cdm/search/searchterm/%1/field/all/mode/all/conn/and/order/nosort/page/%2/display/50",
		'content_type'	=> "xml"
	)
);
$config['archives'][] = array(
	'title'   		=> 'Iowa Digital Library',
	'subtitle'		=> 'The Iowa Digital Library features more than a million digital objects created from the holdings of the University of Iowa Libraries and its campus partners. Included are illuminated manuscripts, historic maps, fine art, historic newspapers, scholarly works, and more. Digital collections are coordinated by Digital Research & Publishing.',
	'categories' 	=> array('audio', 'video', 'image'),
	'logo'			=> '',
	'thumbnail'		=> 'views/ui/images/iowadigitallibrary.thumb.png',
	'teaser'		=> '',
	'request'		=> array(
		'handler'		=> 'http',
		'parser'  		=> "contentdm",
		'source'        => "http://digital.lib.uiowa.edu/cdm/search/searchterm/%1/mode/all/page/%2",
		'content_type'	=> "xml"
	)
);
$config['archives'][] = array(
	'title'   		=> 'University of Victoria Digital Collections',
	'subtitle'		=> 'The University of Victoria Libraries support a variety of digital initiatives to promote wider access to our unique UVic collections.',
	'categories' 	=> array('audio', 'video', 'image'),
	'logo'			=> '',
	'thumbnail'		=> 'views/ui/images/uvicdigitalcollections.thumb.png',
	'teaser'		=> '',
	'request'		=> array(
		'handler'		=> 'http',
		'parser'  		=> "contentdm",
		'source'  		=> "http://contentdm.library.uvic.ca/cdm/search/searchterm/%1/order/nosort",
		'content_type'	=> "xml"
	)
);
$config['archives'][] = array(
	'title'   		=> 'University of Washington Digital Collections',
	'subtitle'		=> 'This site features materials such as photographs, maps, newspapers, posters, reports and other media from the University of Washington Libraries, University of Washington Faculty and Departments, and organizations that have participated in partner projects with the UW Libraries. The collections emphasize rare and unique materials.',
	'categories' 	=> array('audio', 'video', 'image'),
	'logo'			=> '',
	'thumbnail'		=> 'views/ui/images/default.thumb.png',
	'teaser'		=> '',
	'request'		=> array(
		'handler'		=> 'http',
		'parser'  		=> "contentdm",
		'source'		=> "http://digitalcollections.lib.washington.edu/cdm/search/searchterm/%1/mode/all/order/title/page/%2",
		'content_type'	=> "xml"
	)
);
$config['archives'][] = array(
	'title'   		=> 'Critical Commons',
	'subtitle'		=> 'For Fair &amp; Critical Participation in Media Culture',
	'categories' 	=> array('affiliated', 'video', 'image'),
	'logo'			=> 'views/ui/images/criticalcommons.logo.png',
	'thumbnail'		=> 'views/ui/images/criticalcommons.thumb.png',
	'teaser'		=> '',
	'request'		=> array(
		'handler'		=> 'http',
		'parser'  		=> "critical_commons",
		'source'  		=> "http://criticalcommons.org/cc/playlist?SearchableText=%1",
		'content_type'	=> "xml"
	)
);
$config['archives'][] = array(
	'title'   		=> 'YouTube',
	'subtitle'		=> 'Hosts user-generated videos. Includes network and professional content.',
	'categories' 	=> array('video', 'other'),
	'logo'			=> 'views/ui/images/youtube.logo.png',
	'thumbnail'		=> 'views/ui/images/youtube.thumb.png',
	'teaser'		=> '',
	'request'		=> array(
		'handler'		=> 'https',
		'parser'  		=> "youtube",
		'source'  		=> "https://www.googleapis.com/youtube/v3/search?part=snippet&q=%1&maxResults=50&type=video&key=AIzaSyAI9koLGtnZpygU7nMuHVT7xJbwUU-sQBw",
		'content_type' 	=> "json"
	)
);