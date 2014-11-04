<div id="loading"><div>Loading...</div></div>

<div class="container-fluid">

<div class="header row">
<img style="float:left;" src="<?php echo base_url().APPPATH ?>views/workbench/images/header-left.jpg" />
<img style="float:right;" src="<?php echo base_url().APPPATH ?>views/workbench/images/header-right.jpg" />
</div>

<div class="row">
<div class="archives col-max-height col-md-3 col-xs-3">
<form action="/workbench/workbench/manage">
<div class="btn-group btn-group-justified">
<button type="button" class="btn btn-two btn-sm">Import</button>
<button type="submit" class="btn btn-two btn-sm btn-default">Manage</button>
</div>
</form>
<div class="archives-content">
<form id="search" action="" onsubmit="do_search(this);return false;">
<input type="text" placeholder="Search" /> <button class="btn btn-xs btn-default" type="submit">Search</button>
</form>
<p>Select places to search:</p>
<div class="input-group" style="width:100%;">
<input type="checkbox" id="s1" data-parser="scalar" data-store-uri-from="next-input" data-store-append="/rdf/instancesof/media?format=json&sq=%1" /><label for="s1"> Scalar book URL: </label> <input name="scalar_book_url" type="text" placeholder="http://" />
</div>
<hr style="height:1px;color:#aaaaaa;background-color:#aaaaaa;overflow:hidden;margin:8px 0px 15px 0px;" />
<div class="input-group" style="width:100%;">
<input type="checkbox" id="r1" data-parser="rdf" data-store-uri-from="" data-store-append="http://criticalcommons.org/cc/playlist?SearchableText=$1" /><label for="r1"> Critical Commons</label><br />
<input type="checkbox" id="r2" /><label for="r2"> Cuban Theater Digital Archive</label><br />
<input type="checkbox" id="r3" /><label for="r3"> Hemispheric Institute DVL</label><br />
<input type="checkbox" id="r4" /><label for="r4"> Hypercities</label><br />
<input type="checkbox" id="r5" /><label for="r5"> Internet Archive</label><br />
<input type="checkbox" id="r6" /><label for="r6"> PLAY!</label><br />
<input type="checkbox" id="r7" /><label for="r7"> Shoah Foundation VHA Online</label><br />
<hr style="height:1px;color:#aaaaaa;background-color:#aaaaaa;overflow:hidden;margin:8px 0px 15px 0px;" />
<input type="checkbox" id="r8" /><label for="r8"> Getty Museum Collection</label><br />
<input type="checkbox" id="r9" /><label for="r9"> Prezi</label><br />
<input type="checkbox" id="r10" /><label for="r10"> Soundcloud</label><br />
<input type="checkbox" id="r11" /><label for="r11"> Metropolitan Museum of Art</label><br />
<input type="checkbox" id="r12" /><label for="r12"> Vimeo</label><br />
<input type="checkbox" id="r13" /><label for="r13"> YouTube</label><br />
</div>
</div>
</div>
<div id="spreadsheet" class="spreadsheet col-md-9 col-xs-9"></div>
</div>

</div>

<div id="footer" class="footer-center">
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
		<p>Items have been imported into your workbench.</p>
		<p>(List of items here with links)</p>
	  </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        <form action="/workbench/workbench/manage" style="display:inline;">
        	<button type="submit" class="btn btn-primary">Manage</button>
        </form>
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
