<div id="loading"><div>Loading</div></div>

<div class="container-fluid">

<div class="header row">
  <img style="float:left;" src="<?php echo base_url().APPPATH ?>views/workbench/images/header-left.jpg" />
  <img style="float:right;" src="<?php echo base_url().APPPATH ?>views/workbench/images/header-right.jpg" />
</div>

<div class="teaser row">
  <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
     <!-- <div id="carousel-example-generic" class="carousel slide" data-ride="carousel" data-interval="5000"> -->
     <div id="carousel-example-generic">
          <!-- <img src="http://www.criticalcommons.org/Members/craigdietrich/clips/space-shuttle-endeavour-arrives-at-los-angeles/thumbnailImage" /> -->
          <!-- <img src="https://ia802304.us.archive.org/6/items/flickr-ows-OccupyWallStreetMLKprotestattheFederalRe-6716514913/6716514913_b779516562_o.jpg" /> -->
          <!-- <img src="http://img.youtube.com/vi/Av8AmiZnz9U/hqdefault.jpg" /> -->
      <!-- Wrapper for slides -->
        <div class="slide-item" style="background-image:url(http://www.criticalcommons.org/Members/craigdietrich/clips/space-shuttle-endeavour-arrives-at-los-angeles/thumbnailImage);">
          <div class="slide-caption">
            <h4>Space Shuttle Endeavour arrives at Los Angeles Exposition Park<span>Craig Dietrich</span></h4>
          </div>
          <span class="icon critical-commons-icon"></span>
        </div>
        <div class="slide-item" style="background-image:url(https://ia802304.us.archive.org/6/items/flickr-ows-OccupyWallStreetMLKprotestattheFederalRe-6716514913/6716514913_b779516562_o.jpg);">
          <div class="slide-caption">
            <h4>Occupy Wall Street MLK protest at the Federal Reserve Bank of New York<span>Craig Dietrich</span></h4>
          </div>
          <span class="icon internet-archive-icon"></span>
        </div>
        <div class="slide-item" style="background-image:url(http://img.youtube.com/vi/Av8AmiZnz9U/hqdefault.jpg);">
          <div class="slide-caption">
            <h4>Trinity: Nuclear Wind<span>Craig Dietrich</span></h4>
          </div>
          <span class="icon youtube-icon"></span>
        </div>
      <!-- Controls -->
      <!-- <a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev"> -->
      <!-- <a class="left carousel-control" href="#carousel-example-generic" role="button"> -->
        <!-- <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span> -->
        <!-- <span class="sr-only">Previous</span> -->
      <!-- </a> -->
      <!-- <a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next"> -->
      <!-- <a class="right carousel-control" href="#carousel-example-generic" role="button"> -->
        <!-- <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span> -->
        <!-- <span class="sr-only">Next</span> -->
      <!-- </a> -->
    </div>
  </div>
</div><!-- /teaser -->

<div id="switch-manage-wrap">
  <form>
    <div class="switch-manage-highlight"><h3>Manage<br />Selection</h3></div>
    <button id="switch-manage" type="button" class="btn btn-default btn-lg">
      <div class="glyphicon glyphicon-triangle-right" aria-hidden="true"></div>
    </button>
  </form>
</div>
<div id="switch-import-wrap">
  <form>
    <button id="switch-import" type="button" class="btn btn-default btn-lg">
      <span class="glyphicon glyphicon-triangle-left" aria-hidden="true"></span>
    </button>
    <div class="switch-import-highlight"><h3>Import<br />Media</h3></div>
  </form>
</div>
<div class="sheet row">
<div class="search col-max-height col-lg-3 col-md-3 col-sm-3 col-xs-3">
<div>
  <form id="search_form">
    <div class="right-inner-addon">
      <input id="search" type="search" class="form-control" placeholder="Search" />
      <a href="javascript:void(null);" class="glyphicon glyphicon-search"></a>
    </div>
  </form>
  <div class="advanced">Search archives<a href="javascript:void(null);" id="advanced_search_link"><span class="glyphicon glyphicon glyphicon-cog" aria-hidden="true"></span> Advanced Search</a></div>
  <form id="searchable_form">
    <div class="notice">Add archives from the list below</div>
  </form>
  <form id="find_archives_form">
    <div class="right-inner-addon">
      <input name="search" class="form-control" placeholder="Filter Archives" />
      <a href="javascript:void(null);" class="glyphicon glyphicon-search"></a>
    </div>
  </form>
  <div class="advanced">Additional archives<a href="javascript:void(null);" id="advanced_find_archives_link"><span class="glyphicon glyphicon glyphicon-cog" aria-hidden="true"></span> Manage Archives</a></div>
  <form id="findable_form">
<!-- Archives -->
<?
  foreach ($archives as $archive) {
    echo '<div ';
    echo 'class="archive" ';
    echo 'style="background-image:url('.base_url().APPPATH.$archive['thumbnail'].');" ';
    echo 'title="'.$archive['title'].': '.$archive['subtitle'].'" ';
    echo 'data-categories="'.implode(',',$archive['categories']).'" ';
    echo 'data-request-1="'.htmlspecialchars(json_encode(array_merge($archive['request-1'],array('title'=>$archive['title']))), ENT_QUOTES, 'UTF-8' ).'"';
    echo '>'."\n";
    echo '<h5>'.$archive['title'].'</h5>'."\n";
    echo $archive['subtitle']."\n";
    echo "</div>\n";
  }
?>
  </form>
</div>
</div><!-- /search -->
<div id="spreadsheet" class="spreadsheet col-lg-9 col-md-9 col-sm-9 col-xs-9">
<div id="welcome_msg">Search for media in the panel to the left<br />Click archives to change those that are searched</div>
<div id="advanced_search" class="spreadsheet_panel">
  <a href="javascript:void(null);" class="close_btn"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></a>
  <form id="advanced_form">
 	<div class="tr"><div class="field"><a href="javascript:void(null);" class="add glyphicon glyphicon-plus" aria-hidden="true"></a></div><div class="value"><button type="submit" class="btn btn-sm btn-primary">Search</button></div></div>
  </form>
</div><!-- /manage_archive -->
<div id="manage_archives" class="spreadsheet_panel">
  <a href="javascript:void(null);" class="close_btn"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></a>
  <div class="btn-group btn-group-sm" role="group">
	  <button type="button" value="" class="btn btn-primary">All</button>
	  <button type="button" value="affiliated" class="btn btn-default">Affiliated</button>
	  <button type="button" value="other" class="btn btn-default">Non-affiliated</button>
	  <button type="button" value="theme" class="btn btn-default">Themed</button>
	  <button type="button" value="image" class="btn btn-default">Image</button>
	  <button type="button" value="audio" class="btn btn-default">Audio</button>
	  <button type="button" value="video" class="btn btn-default">Video</button>
  </div>
  <form id="managable_form"></form>
</div><!-- /manage_archive -->
</div>
<div class="manage col-max-height col-lg-3 col-md-3 col-sm-3 col-xs-3">
<div>
  <form id="manage_form">
    <div class="right-inner-addon">
      <input id="search" type="search" class="form-control" placeholder="Search" />
      <a href="javascript:void(null);" class="glyphicon glyphicon-search"></a>
    </div>
  </form>
  <div class="advanced">Collections<a href="javascript:void(null);" id="collections_link"><span class="glyphicon glyphicon glyphicon-cog" aria-hidden="true"></span> View Collections</a></div>
  <form id="searchable_form">
    <div class="notice">Add archives from the list below</div>
  </form>
  <div class="advanced">Scalar Books<a href="javascript:void(null);" id="scalar_book_link"><span class="glyphicon glyphicon glyphicon-cog" aria-hidden="true"></span> Send to Scalar Book</a></div>
</div>
</div><!-- /manage -->
</div>

</div><!-- /sheet -->

<div id="footer" class="footer-center">
<div class="btn-group view-buttons" role="group">
  <button type="button" class="btn btn-xs btn-primary" id="list"><img src="<?php echo base_url().APPPATH ?>views/ui/images/list_icon.jpg" />Spreadsheet view</button>
  <button type="button" class="btn btn-xs btn-default" id="tile"><img src="<?php echo base_url().APPPATH ?>views/ui/images/tile_icon.jpg" />Thumbnail view</button>
  <button type="button" class="btn btn-xs btn-default" id="detail"><img src="<?php echo base_url().APPPATH ?>views/ui/images/detail_icon.jpg" />Metadata view</button>
</div>
<div class="toggle-buttons">
	<!-- <button type="button" class="btn btn-primary btn-xs" data-toggle="modal" data-target="#imported">Import Selected Items</button>-->
	<button type="button" class="btn btn-xs btn-primary toggle-teaser" data-toggle="modal"><span class="glyphicon glyphicon-sound-stereo" aria-hidden="true"></span>&nbsp; Gallery </button>
  <button type="button" class="btn btn-xs btn-primary toggle-search" data-toggle="modal"><span class="glyphicon glyphicon-search" aria-hidden="true"></span>&nbsp; Search</button>
  <button type="button" class="btn btn-xs btn-primary toggle-manage" data-toggle="modal"><span class="glyphicon glyphicon-wrench" aria-hidden="true"></span>&nbsp; Manage</button>
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
