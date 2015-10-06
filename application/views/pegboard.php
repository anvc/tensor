<div id="loading"><div>Loading</div></div>

<div class="container-fluid">

	<div class="sheet row">
		<div class="search col-lg-3 col-md-3 col-sm-3 col-xs-3">
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
<?
				  foreach ($archives as $archive) {
				    echo '				<div ';
				    echo 'class="archive" ';
				    echo 'style="background-image:url('.base_url().APPPATH.$archive['thumbnail'].');" ';
				    echo 'title="'.$archive['title'].': '.$archive['subtitle'].'" ';
				    echo 'data-categories="'.implode(',',$archive['categories']).'" ';
				    echo 'data-request="'.htmlspecialchars(json_encode(array_merge($archive['request'],array('title'=>$archive['title']))), ENT_QUOTES, 'UTF-8' ).'"';
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
			<div id="welcome_msg">
			  Search for media in the panel to the left<br />
			  Click archives to change those that are searched<br /><br />
			  After you've imported media, you can&nbsp;
			  <a href="javascript:void();"><span class="glyphicon glyphicon-book" aria-hidden="true" style="font-size:smaller;"></span> Manage content</a><br />
			  to create collections and sync to your Scalar books
			</div>
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
				  <button type="button" value="image" class="btn btn-default">Image</button>
				  <button type="button" value="audio" class="btn btn-default">Audio</button>
				  <button type="button" value="video" class="btn btn-default">Video</button>
				  <button type="button" value="contentdm" class="btn btn-default">CONTENTdm</button>
			  </div>
			  <form id="managable_form"></form>
			</div><!-- /manage_archive -->
		</div><!-- spreadsheet -->
	</div><!-- /sheet -->

</div><!-- /container -->

<div id="footer" class="footer-center">
	<div class="btn-group view-buttons" role="group">
		<a class="page prev-page"><span class="glyphicon glyphicon-chevron-left"></span> Page <span class="num"></span></a>
		<button type="button" class="btn btn-xs btn-primary" id="icon"><img src="<?php echo base_url().APPPATH ?>views/images/icon_icon.jpg" />Icon</button>
	  	<button type="button" class="btn btn-xs btn-default" id="tile"><img src="<?php echo base_url().APPPATH ?>views/images/tile_icon.jpg" />Tile</button>
	  	<button type="button" class="btn btn-xs btn-default" id="list"><img src="<?php echo base_url().APPPATH ?>views/images/list_icon.jpg" />List</button>
	  	<button type="button" class="btn btn-xs btn-default" id="detail"><img src="<?php echo base_url().APPPATH ?>views/images/detail_icon.jpg" />Detail</button>
	  	<a class="page next-page">Page <span class="num"></span> <span class="glyphicon glyphicon-chevron-right"></span></a>
	</div>
	<div class="left-buttons">
	  	<button type="button" class="btn btn-xs btn-primary" data-toggle="modal"><span class="glyphicon glyphicon-search" aria-hidden="true"></span>&nbsp; Search archives</button>
	  	&nbsp; &nbsp;<b class="num_results">0</b> results
	</div>
	<div class="right-buttons">
	    <b class="num_imported">0</b> imported&nbsp; &nbsp;
		<button type="button" class="btn btn-xs btn-default" data-toggle="modal"><span class="glyphicon glyphicon-book" aria-hidden="true"></span>&nbsp; Manage content</button>
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
