<div id="loading"><div>Loading...</div></div>

<div class="container-fluid">

<div class="header row">
<img style="float:left;" src="<?php echo base_url().APPPATH ?>views/workbench/images/header-left.jpg" />
<img style="float:right;" src="<?php echo base_url().APPPATH ?>views/workbench/images/header-right.jpg" />
</div>

<div class="teaser row">
<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
 <div id="carousel-example-generic" class="carousel slide" data-ride="carousel" data-interval="5000">
  <!-- Wrapper for slides -->
  <div class="carousel-inner" role="listbox">
    <div class="item active" style="background-image:url(http://www.criticalcommons.org/Members/craigdietrich/clips/space-shuttle-endeavour-arrives-at-los-angeles/thumbnailImage);">
      <div class="carousel-caption">
        <span class="icon critical-commons-icon"></span> <h4>Space Shuttle Endeavour arrives at Los Angeles Exposition Park<span>Craig Dietrich</span></h4>
      </div>
    </div>
    <div class="item" style="background-image:url(https://ia802304.us.archive.org/6/items/flickr-ows-OccupyWallStreetMLKprotestattheFederalRe-6716514913/6716514913_b779516562_o.jpg);">
      <div class="carousel-caption">
        <span class="icon internet-archive-icon"></span> <h4>Occupy Wall Street MLK protest at the Federal Reserve Bank of New York<span>Craig Dietrich</span></h4>
      </div>
    </div>
    <div class="item" style="background-image:url(http://img.youtube.com/vi/Av8AmiZnz9U/hqdefault.jpg);">
      <div class="carousel-caption">
        <span class="icon youtube-icon"></span> <h4>Trinity: Nuclear Wind<span>Craig Dietrich</span></h4>
      </div>
    </div>
  </div>
  <!-- Controls -->
  <a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
    <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
    <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
 </div>
</div>
</div><!-- /teaser -->

<div class="sheet row">

<div class="search col-max-height col-lg-3 col-md-3 col-sm-3 col-xs-3">
<div>
  <form id="search_form">
    <div class="right-inner-addon">
      <input id="search" type="search" class="form-control" placeholder="Search" />
      <a href="javascript:void(null);" class="glyphicon glyphicon-search"></a>
    </div>
  </form>
  <div class="advanced">Search archives:<a href="javascript:void(null);" id="advanced_search_link">Advanced Search</a></div>
  <form id="searchable_form">
	<div class="archive archive-critical-commons" title="Critical Commons: For Fair &amp; Critical Participation in Media Culture">
      <h5>Critical Commons</h5>
      For Fair &amp; Critical Participation in Media Culture
	</div>
  </form>
  <form id="find_archives_form">
    <div class="right-inner-addon">
      <input name="search" class="form-control" placeholder="Filter Archives" />
      <a href="javascript:void(null);" class="glyphicon glyphicon-search"></a>
    </div>
  </form>
  <div class="advanced">Additional archives:<a href="javascript:void(null);" id="advanced_find_archives_link">Manage Archives</a></div>
  <form id="findable_form">
	<div class="archive archive-internet-archive" title="Internet Archive: Digital Library of Free Books, Movies, Music &amp; Wayback Machine">
      <h5>Internet Archive</h5>
      Digital Library of Free Books, Movies, Music &amp; Wayback Machine
	</div>
	<div class="archive archive-vimeo" title="Vimeo: High-quality home for ad-free HD videos">
      <h5>Vimeo</h5>
      High-quality home for ad-free HD videos
	</div>
	<div class="archive archive-youtube" title="YouTube: Hosts user-generated videos">
      <h5>YouTube</h5>
      Hosts user-generated videos
	</div>
  </form>
</div>
</div><!-- /archives -->
<div id="spreadsheet" class="spreadsheet col-lg-9 col-md-9 col-sm-9 col-xs-9">
<div id="welcome_msg">Search for media in the panel to the left<br />Click archives to change those that are searched</div>
</div>
</div>

</div><!-- /sheet -->

<div id="footer" class="footer-center">
<div class="btn-group view-buttons" role="group">
  <button type="button" class="btn btn-xs btn-default" id="list"><img src="<?php echo base_url().APPPATH ?>views/ui/images/list_icon.jpg" />Spreadsheet view</button>
  <button type="button" class="btn btn-xs btn-primary" id="tile"><img src="<?php echo base_url().APPPATH ?>views/ui/images/tile_icon.jpg" />Thumbnail view</button>
  <button type="button" class="btn btn-xs btn-primary" id="detail"><img src="<?php echo base_url().APPPATH ?>views/ui/images/detail_icon.jpg" />Metadata view</button>
</div>
<div class="toggle-buttons">
	<!-- <button type="button" class="btn btn-primary btn-xs" data-toggle="modal" data-target="#imported">Import Selected Items</button>-->
	<button type="button" class="btn btn-xs toggle-teaser" data-toggle="modal"><span class="glyphicon glyphicon-sound-stereo" aria-hidden="true"></span>&nbsp; Gallery </button>
	<button type="button" class="btn btn-xs toggle-search" data-toggle="modal"><span class="glyphicon glyphicon-search" aria-hidden="true"></span>&nbsp; Search</button>
</div>
</div>

<div class="modal fade" id="column_select">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
        <h4 class="modal-title">Manage Spreadsheet</h4>
      </div>
      <div class="modal-body">
        <p>Clicking the <b>+/-</b> button will open this box, intended to allow authors to add or remove the fields (predicates) displayed in the spreadsheet.</p>
        <p>For example, an author might remove <b>dcterms:description</b> while adding <b>dcterms:source</b>.  This won't change the ability to see a row's entire metadata record by clicking the row which will expand the metadata a box containing the record underneath.</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" data-dismiss="modal">Update</button>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->

<div class="modal fade" id="imported">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
        <h4 class="modal-title">Items Imported</h4>
      </div>
      <div class="modal-body">
		<p>TODO: List of items here</p>
	  </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        <!-- <form action="/workbench/workbench/manage" style="display:inline;">
        	<button type="submit" class="btn btn-primary">Manage</button>
        </form> -->
        <button type="button" class="btn btn-primary" data-dismiss="modal">Manage</button>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->

<div class="modal fade" id="error">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
        <h4 class="modal-title">Error</h4>
      </div>
      <div class="modal-body"></div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
