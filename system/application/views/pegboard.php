<div id="loading"><div>Loading</div></div>

<div class="container-fluid">
	<div class="row col-max-height">
		<!-- Sidebar -->
		<div class="col-xs-3 col-max-height sidebar">
			<div class="collections">
				<div>
				  <form id="filter_collections_form">
				    <div class="right-inner-addon">
				      <input name="search" class="form-control" placeholder="Filter Collections" />
				      <a href="javascript:void(null);" class="glyphicon glyphicon-search"></a>
				    </div>
				  </form>
				  <div class="advanced">
				    <a href="javascript:void(null);" class="l" data-toggle="modal" data-target="#create_collection"><span class="glyphicon glyphicon-plus"></span> Create New Collection</a>
				  	<a href="javascript:void(null);" id="advanced_collections_link"><span class="glyphicon glyphicon glyphicon-cog" aria-hidden="true"></span> Manage</a>
				  </div>
				  <form id="collections_form">
					<div class="collection all">
						<div class="color" style="background-color:#ffffff;"><span class="num_items">0</span></div>
						<h5>All imported media</h5>
					    <div class="desc">All media imported from the archives</div>
					</div>
				  </form>
				  <div class="sync"><a href="javascript:void(null);" data-toggle="modal" data-target="#sync"><span class="glyphicon glyphicon-cloud" style="position:relative;top:2px;"></span>&nbsp; Sync Collections to Scalar</a></div>
				</div>
			</div>
		</div>
		<!-- List of archives -->
		<div id="archives" class="col-xs-9">
		  	<span style="float:right;">
		  		<a href="javascript:void(null);" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-plus"></span> Add archive</a>
				<a href="javascript:void(null);" class="btn btn-default btn-sm" data-toggle="modal" data-target="#set_profiles"><span class="glyphicon glyphicon-cog"></span> Set profiles</a>
			</span>		
		  	<div class="btn-group btn-group-sm" role="group"></div>
			<div class="container-fluid"></div>
		</div>
		<!-- Search an archive -->
		<div id="search" class="col-xs-9">
			<a href="javascript:void(null);" id="search_close" class="glyphicon glyphicon-remove"></a>
			<form id="search_form">
				<div class="right-inner-addon">
				<input type="text" name="search" class="form-control" placeholder="Search archive" />
				<a href="javascript:void(null);" class="glyphicon glyphicon-search glyphicon-xs"></a>
			</div>
			</form>
			<div id="search_collection" class="btn-group" role="group">
				<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					No collection
				    <span class="caret"></span>
				</button>
				<ul class="dropdown-menu"></ul>
			</div>
			<div id="search_view" class="btn-group btn-group-sm" role="group">
				<button type="button" class="btn btn-primary" id="icon">Icon</button>
				<button type="button" class="btn btn-default" id="tile">Tile</button>
				<button type="button" class="btn btn-default" id="list">List</button>
				<button type="button" class="btn btn-default" id="detail">Detail</button>
			</div>
			<div id="search_pagination">
				<a href="javascript:void(null);" class="prev-page"><span class="glyphicon glyphicon-chevron-left"></span> Prev</a>
				&nbsp;<span class="page">0</span> of <span class="total">0</span>&nbsp;
				<a href="javascript:void(null);" class="next-page">Next <span class="glyphicon glyphicon-chevron-right"></span></a>			
			</div>
			<div id="search_results"></div>
		</div>
	</div>
</div>

<div class="modal fade" id="set_profiles">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title">Set Profiles</h4>
      </div>
      <div class="modal-body">
        <form>
          <div id="profiles" class="form-horizontal"></div>
          <div class="form-group">
            <label for="resetProfiles">Reset profiles</label>
            <p class="help-block">Remove all existing profiles and load the starter profile from <a href="https://github.com/craigdietrich/tensor-profiles" target="_blank">GitHub</a>.</p>
            <button type="button" id="resetProfiles" class="btn btn-default btn-xs">Reset</button>
          </div>
	 	  <div class="form-group">
	        <label for="uploadProfile">Upload pofile</label>
	        <p class="help-block">Profiles can be provided by other Tensor users or downloaded from <a href="https://github.com/craigdietrich/tensor-profiles" target="_blank">repositories</a>.</p>
	        <input type="file" style="float:left;" id="uploadProfile">
	        <button type="button" style="float:left;" class="btn btn-default btn-xs" id="doUploadProfile">Upload</button>
	        <br clear="both" />
	      </div>			
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="create_collection">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">Create Collection</h4>
      </div>
      <div class="modal-body">
        <form id="create_collection_form">
		  <div class="form-group">
		    <label>Title</label>
		    <input type="text" class="form-control" name="title" placeholder="My new collection">
		  </div>
		  <div class="form-group">
		    <label>Description</label>
		    <input type="text" class="form-control" name="description" placeholder="A collection of imported media">
		  </div>
		  <div class="form-group">
		  	<label>Color</label><br />
		  	<input type="text" name="color">
		  </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Create collection</button>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->

<div class="modal fade" id="edit_collection">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">Edit Collection</h4>
      </div>
      <div class="modal-body">
        <form id="create_collection_form">
		  <div class="form-group">
		    <label>Title</label>
		    <input type="text" class="form-control" name="title" placeholder="My new collection">
		  </div>
		  <div class="form-group">
		    <label>Description</label>
		    <input type="text" class="form-control" name="description" placeholder="A collection of imported media">
		  </div>
		  <div class="form-group">
		  	<label>Color</label><br />
		  	<input type="text" name="color">
		  </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save collection</button>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->

<div class="modal fade" id="add_archive">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">Add archive</h4>
      </div>
      <div class="modal-body">
        <form id="add_archive_form">
		  <div class="form-group">
		    <label>Title</label>
		    <input type="text" class="form-control" name="title" placeholder="My new archive">
		  </div>
		  <div class="form-group">
		    <label>Description</label>
		    <input type="text" class="form-control" name="description" placeholder="An archive of digital assets">
		  </div>
		  <div class="form-group">
		  	<label>Parser</label><br />
		  	<select class="form-control" name="parser" style="max-width:33%;">
		  		<option value=""></option>
		  		<option value="atom">ATOM</option>
		  		<option value="contentdm">CONTENTdm</option>
		  		<option value="scalar">Scalar</option>
		  	</select>
		  </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Add archive</button>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->

<div class="modal fade" id="sync">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">Sync Collections</h4>
      </div>
      <div class="modal-body">
        <h4>Select one or more source collection</h4>
      	<div id="sync_collections"></div>
      	<br clear="both" /><br />
        <h4>Select one or more destination Scalar book</h4>
      	<div id="sync_destinations"></div>
      	<br clear="both" />
      </div>
      <div class="modal-footer">
		<div class="progress">
			<div id="content_progress" class="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 0%;">
				<span>Content 0 of 0</span>
			</div>
		</div>
		<div style="float:left;" class="sync_details"></div>
        <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-primary">Synchronize</button>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->

<div class="modal fade" id="edit_metadata">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <div class="thumb"></div>
        <h4 class="modal-title">Edit Metadata</h4>
      </div>
      <div class="modal-body"></div>
      <div class="modal-footer">
      	<button type="button" class="btn btn-default pull-left">Add Additional Metadata</button>
        <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-primary">Save Metadata</button>
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
