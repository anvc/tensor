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
<div class="input-group" style="width:100%;">
<input type="checkbox" id="r1" data-parser="rdf" 
	data-graph-uri="http://karmarestserver.dig.isi.edu:8080/scalar" 
	data-store-uri="http://karmarestserver.dig.isi.edu:8080/sparql-graph-crud-auth/" 
	data-mapping-uri="http://scalar.usc.edu/static/R2RML/WSP1WS2-CriticalCommons-auto-model.ttl" 
	data-source-uri="http://criticalcommons.org/cc/playlist?SearchableText=%1" 
	data-content-type="xml"
	/><label for="r1"> Critical Commons</label><br />
<input type="checkbox" id="r2" /><label for="r2" data-unsupported="1"> Cuban Theater Digital Archive</label><br />
<input type="checkbox" id="r3" /><label for="r3" data-unsupported="1"> Hemispheric Institute DVL</label><br />
<input type="checkbox" id="r4" /><label for="r4" data-unsupported="1"> Hypercities</label><br />
<input type="checkbox" id="r5" /><label for="r5" data-unsupported="1"> Internet Archive</label><br />
<input type="checkbox" id="r6" /><label for="r6" data-unsupported="1"> PLAY!</label><br />
<input type="checkbox" id="r7" /><label for="r7" data-unsupported="1"> Shoah Foundation VHA Online</label><br />
<hr />
<input type="checkbox" id="r8" /><label for="r8" data-unsupported="1"> Getty Museum Collection</label><br />
<input type="checkbox" id="r9" /><label for="r9" data-unsupported="1"> Prezi</label><br />
<input type="checkbox" id="r10" /><label for="r10" data-unsupported="1"> Soundcloud</label><br />
<input type="checkbox" id="r11" /><label for="r11" data-unsupported="1"> Metropolitan Museum of Art</label><br />
<input type="checkbox" id="r12" /><label for="r12" data-unsupported="1"> Vimeo</label><br />
<input type="checkbox" id="r13" data-parser="rdf" 
	data-graph-uri="http://karmarestserver.watproj.org:8080/scalar" 
	data-store-uri="http://karmarestserver.watproj.org:8080/sparql-graph-crud-auth/" 
	data-mapping-uri="http://scalar.usc.edu/static/R2RML/WSP1WS2-YouTube3-auto-model.ttl" 
	data-source-uri="https://www.googleapis.com/youtube/v3/search?part=snippet&q=%1&maxResults=50&type=video&key=AIzaSyAI9koLGtnZpygU7nMuHVT7xJbwUU-sQBw"
	data-content-type="json"
	/><label for="r13"> YouTube</label><br />
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
