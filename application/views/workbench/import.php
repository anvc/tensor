<div id="loading"><div>Loading...</div></div>

<div class="container-fluid">

<div class="header row">
<img style="float:left;" src="<?php echo base_url().APPPATH ?>views/workbench/images/header-left.jpg" />
<img style="float:right;" src="<?php echo base_url().APPPATH ?>views/workbench/images/header-right.jpg" />
</div>

<div class="row">
<div class="archives col-max-height col-lg-3 col-md-3 col-sm-3 col-xs-3">
<form action="/workbench/workbench/manage">
<div class="btn-group btn-group-justified">
<button type="button" class="btn btn-two btn-sm">Import</button>
<button type="button" class="btn btn-two btn-sm btn-default">Manage</button>
</div>
</form>
<div class="archives-content">
<form id="search" action="" onsubmit="do_search();return false;">
<input type="text" placeholder="Search" class="form-control input-xs" /> 
<button class="btn btn-xs btn-primary" type="submit">Search</button>
<br clear="both" />
</form>
<hr />
<div class="archives-multi-select">
<input type="checkbox" data-parser="scalar" 
	data-source-uri-from="next-input" 
	data-source-append="/rdf/instancesof/media?format=json&sq=%1" 
	/><label class="label_for"> Scalar book URL</label>
<input class="form-control input-xs" name="scalar_book_url" type="text" placeholder="http://" />
</div>
<a class="add_another" href="javascript:void(null);">add another</a>
<hr />
<input class="form-control input-sm" id="archive-filter" type="text" placeholder="Filter Archives" onkeyup="filter_archives();return false;" />
<div id="selected-archives"></div>
<div class="input-group" id="archive-list" style="width:100%;">
<?foreach($archives as $key => $archive_set):?>
  <?foreach($archive_set as $index => $archive):?>
    <?if(isset($archive['parser'])):?>
      <div for="<?=$key.$index?>"><div><input onchange="select_archive.call(this);return false;" type="checkbox" id="<?=$key.$index?>" data-parser="<?=$archive['parser']?>" 
      	data-graph-uri="<?=$archive['graph']?>"
      	data-store-uri="<?=$archive['store']?>"
      	data-mapping-uri="<?=$archive['mapping']?>"
      	data-source-uri="<?=$archive['source']?>"
      	data-content-type="<?=$archive['content']?>"
      	/><label for="r<?=$index?>"><?=$archive['title']?></label></div></div>
    <?else:?>
      <div for="<?=$key.$index?>"><div><input type="checkbox" id="r<?=$index?>" /><label for="<?=$key.$index?>" data-unsupported="1"><?=$archive['title']?></label></div></div>
    <?endif;?>
  <?endforeach;?>
  <hr />
<?endforeach;?>
</div>
</div>
</div>
<div id="spreadsheet" class="spreadsheet col-lg-9 col-md-9 col-sm-9 col-xs-9"></div>
</div>

</div>

<div id="footer" class="footer-center">
<div class="btn-group view-buttons view-buttons" role="group">
  <button type="button" class="btn btn-xs btn-default" id="list"><img src="<?php echo base_url().APPPATH ?>views/ui/images/list_icon.jpg" />Spreadsheet view</button>
  <button type="button" class="btn btn-xs btn-primary" id="tile"><img src="<?php echo base_url().APPPATH ?>views/ui/images/tile_icon.jpg" />Thumbnail view</button>
  <button type="button" class="btn btn-xs btn-primary" id="detail"><img src="<?php echo base_url().APPPATH ?>views/ui/images/detail_icon.jpg" />Metadata view</button>
</div>
<button type="button" class="btn btn-primary btn-xs" data-toggle="modal" data-target="#imported">Import Selected Items</button>
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
