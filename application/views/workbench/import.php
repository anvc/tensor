<script>
$(document).ready(function() {
	$('.spreadsheet tbody').find('tr').css('display','none');  // TODO: this is temporary for demo purposes
});
</script>

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
<form action="" onsubmit="$('.spreadsheet tbody').find('tr').css('display','table-row');return false;">
<input type="text" placeholder="Search" /> <button class="btn btn-xs btn-default" type="submit">Search</button>
</form>
<br /><br />
<p>Select archives to search:</p>
<div class="input-group" style="width:100%;">
<input type="checkbox" id="r1" /><label for="r1"> Critical Commons</label><br />
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
<div class="spreadsheet col-md-9 col-xs-9">    
<table class="table table-hover table-condensed">
<thead>
<tr><th><input type="checkbox" id="checkall" />rdf:resource</th><th>dcterms:title</th><th>dcterms:description</th><th>po:duration</th><th>dcterms:subject</th><th><big><a href="javascript:void(null)" data-toggle="modal" data-target="#column_select">+/-</a></big></th></tr>
</thead>
<tbody>
<tr><td><div><input type="checkbox" /><a href="javascript:void(null)" title="http://example.com/media/foobar.jpg">foobar.jpg</a></div></td><td><div>The Godfather</div></td><td><div>The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.</div></td><td><div>175 min</div></td><td><div>Mob, Conflict</div></td><td><a href="javascript:void(null)">&#8615;</a></td></tr>
<tr><td><div><input type="checkbox" /><a href="javascript:void(null)" title="http://example.com/media/foo.jpg">foo.jpg</a></div></td><td><div>The Shawshank Redemption</div></td><td><div>Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.</div></td><td><div>142 min</div></td><td><div>Prison, Escape, Isolation</div></td><td><a href="javascript:void(null)">&#8615;</a></td></tr>
<tr><td><div><input type="checkbox" /><a href="javascript:void(null)" title="http://example.com/media/barbas.jpg">barbas.jpg</a></div></td><td><div>Schindler's List</div></td><td><div>In Poland during World War II, Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.</div></td><td><div>195 min</div></td><td><div>War, Persecution</div></td><td><a href="javascript:void(null)">&#8615;</a></td></tr>
<tr><td><div><input type="checkbox" /><a href="javascript:void(null)" title="http://example.com/media/foobarbas.jpg">foobarbas.jpg</a></div></td><td><div>Raging Bull</div></td><td><div>An emotionally self-destructive boxer's journey through life, as the violence and temper that leads him to the top in the ring, destroys his life outside it.</div></td><td><div>129 min</div></td><td><div>Sport, Violence</div></td><td><a href="javascript:void(null)">&#8615;</a></td></tr>
<tr><td><div><input type="checkbox" /><a href="javascript:void(null)" title="http://example.com/media/bas.jpg">bas.jpg</a></div></td><td><div>Casablanca</div></td><td><div>Set in unoccupied Africa during the early days of World War II: An American expatriate meets a former lover, with unforeseen complications.</div></td><td><div>102 min</div></td><td><div>Love, Conflict, War</div></td><td><a href="javascript:void(null)">&#8615;</a></td></tr>
<tr><td><div><input type="checkbox" /><a href="javascript:void(null)" title="http://example.com/media/foobar.jpg">foobar.jpg</a></div></td><td><div>The Godfather</div></td><td><div>The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.</div></td><td><div>175 min</div></td><td><div>Mob, Conflict</div></td><td><a href="javascript:void(null)">&#8615;</a></td></tr>
<tr><td><div><input type="checkbox" /><a href="javascript:void(null)" title="http://example.com/media/foo.jpg">foo.jpg</a></div></td><td><div>The Shawshank Redemption</div></td><td><div>Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.</div></td><td><div>142 min</div></td><td><div>Prison, Escape, Isolation</div></td><td><a href="javascript:void(null)">&#8615;</a></td></tr>
<tr><td><div><input type="checkbox" /><a href="javascript:void(null)" title="http://example.com/media/barbas.jpg">barbas.jpg</a></div></td><td><div>Schindler's List</div></td><td><div>In Poland during World War II, Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.</div></td><td><div>195 min</div></td><td><div>War, Persecution</div></td><td><a href="javascript:void(null)">&#8615;</a></td></tr>
<tr><td><div><input type="checkbox" /><a href="javascript:void(null)" title="http://example.com/media/foobarbas.jpg">foobarbas.jpg</a></div></td><td><div>Raging Bull</div></td><td><div>An emotionally self-destructive boxer's journey through life, as the violence and temper that leads him to the top in the ring, destroys his life outside it.</div></td><td><div>129 min</div></td><td><div>Sport, Violence</div></td><td><a href="javascript:void(null)">&#8615;</a></td></tr>
<tr><td><div><input type="checkbox" /><a href="javascript:void(null)" title="http://example.com/media/bas.jpg">bas.jpg</a></div></td><td><div>Casablanca</div></td><td><div>Set in unoccupied Africa during the early days of World War II: An American expatriate meets a former lover, with unforeseen complications.</div></td><td><div>102 min</div></td><td><div>Love, Conflict, War</div></td><td><a href="javascript:void(null)">&#8615;</a></td></tr>
<tr><td><div><input type="checkbox" /><a href="javascript:void(null)" title="http://example.com/media/foobar.jpg">foobar.jpg</a></div></td><td><div>The Godfather</div></td><td><div>The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.</div></td><td><div>175 min</div></td><td><div>Mob, Conflict</div></td><td><a href="javascript:void(null)">&#8615;</a></td></tr>
<tr><td><div><input type="checkbox" /><a href="javascript:void(null)" title="http://example.com/media/foo.jpg">foo.jpg</a></div></td><td><div>The Shawshank Redemption</div></td><td><div>Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.</div></td><td><div>142 min</div></td><td><div>Prison, Escape, Isolation</div></td><td><a href="javascript:void(null)">&#8615;</a></td></tr>
<tr><td><div><input type="checkbox" /><a href="javascript:void(null)" title="http://example.com/media/barbas.jpg">barbas.jpg</a></div></td><td><div>Schindler's List</div></td><td><div>In Poland during World War II, Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.</div></td><td><div>195 min</div></td><td><div>War, Persecution</div></td><td><a href="javascript:void(null)">&#8615;</a></td></tr>
<tr><td><div><input type="checkbox" /><a href="javascript:void(null)" title="http://example.com/media/foobarbas.jpg">foobarbas.jpg</a></div></td><td><div>Raging Bull</div></td><td><div>An emotionally self-destructive boxer's journey through life, as the violence and temper that leads him to the top in the ring, destroys his life outside it.</div></td><td><div>129 min</div></td><td><div>Sport, Violence</div></td><td><a href="javascript:void(null)">&#8615;</a></td></tr>
<tr><td><div><input type="checkbox" /><a href="javascript:void(null)" title="http://example.com/media/bas.jpg">bas.jpg</a></div></td><td><div>Casablanca</div></td><td><div>Set in unoccupied Africa during the early days of World War II: An American expatriate meets a former lover, with unforeseen complications.</div></td><td><div>102 min</div></td><td><div>Love, Conflict, War</div></td><td><a href="javascript:void(null)">&#8615;</a></td></tr>
<tr><td><div><input type="checkbox" /><a href="javascript:void(null)" title="http://example.com/media/foobar.jpg">foobar.jpg</a></div></td><td><div>The Godfather</div></td><td><div>The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.</div></td><td><div>175 min</div></td><td><div>Mob, Conflict</div></td><td><a href="javascript:void(null)">&#8615;</a></td></tr>
<tr><td><div><input type="checkbox" /><a href="javascript:void(null)" title="http://example.com/media/foo.jpg">foo.jpg</a></div></td><td><div>The Shawshank Redemption</div></td><td><div>Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.</div></td><td><div>142 min</div></td><td><div>Prison, Escape, Isolation</div></td><td><a href="javascript:void(null)">&#8615;</a></td></tr>
<tr><td><div><input type="checkbox" /><a href="javascript:void(null)" title="http://example.com/media/barbas.jpg">barbas.jpg</a></div></td><td><div>Schindler's List</div></td><td><div>In Poland during World War II, Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.</div></td><td><div>195 min</div></td><td><div>War, Persecution</div></td><td><a href="javascript:void(null)">&#8615;</a></td></tr>
<tr><td><div><input type="checkbox" /><a href="javascript:void(null)" title="http://example.com/media/foobarbas.jpg">foobarbas.jpg</a></div></td><td><div>Raging Bull</div></td><td><div>An emotionally self-destructive boxer's journey through life, as the violence and temper that leads him to the top in the ring, destroys his life outside it.</div></td><td><div>129 min</div></td><td><div>Sport, Violence</div></td><td><a href="javascript:void(null)">&#8615;</a></td></tr>
<tr><td><div><input type="checkbox" /><a href="javascript:void(null)" title="http://example.com/media/bas.jpg">bas.jpg</a></div></td><td><div>Casablanca</div></td><td><div>Set in unoccupied Africa during the early days of World War II: An American expatriate meets a former lover, with unforeseen complications.</div></td><td><div>102 min</div></td><td><div>Love, Conflict, War</div></td><td><a href="javascript:void(null)">&#8615;</a></td></tr>
<tr><td><div><input type="checkbox" /><a href="javascript:void(null)" title="http://example.com/media/foobar.jpg">foobar.jpg</a></div></td><td><div>The Godfather</div></td><td><div>The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.</div></td><td><div>175 min</div></td><td><div>Mob, Conflict</div></td><td><a href="javascript:void(null)">&#8615;</a></td></tr>
<tr><td><div><input type="checkbox" /><a href="javascript:void(null)" title="http://example.com/media/foo.jpg">foo.jpg</a></div></td><td><div>The Shawshank Redemption</div></td><td><div>Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.</div></td><td><div>142 min</div></td><td><div>Prison, Escape, Isolation</div></td><td><a href="javascript:void(null)">&#8615;</a></td></tr>
<tr><td><div><input type="checkbox" /><a href="javascript:void(null)" title="http://example.com/media/barbas.jpg">barbas.jpg</a></div></td><td><div>Schindler's List</div></td><td><div>In Poland during World War II, Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.</div></td><td><div>195 min</div></td><td><div>War, Persecution</div></td><td><a href="javascript:void(null)">&#8615;</a></td></tr>
<tr><td><div><input type="checkbox" /><a href="javascript:void(null)" title="http://example.com/media/foobarbas.jpg">foobarbas.jpg</a></div></td><td><div>Raging Bull</div></td><td><div>An emotionally self-destructive boxer's journey through life, as the violence and temper that leads him to the top in the ring, destroys his life outside it.</div></td><td><div>129 min</div></td><td><div>Sport, Violence</div></td><td><a href="javascript:void(null)">&#8615;</a></td></tr>
<tr><td><div><input type="checkbox" /><a href="javascript:void(null)" title="http://example.com/media/bas.jpg">bas.jpg</a></div></td><td><div>Casablanca</div></td><td><div>Set in unoccupied Africa during the early days of World War II: An American expatriate meets a former lover, with unforeseen complications.</div></td><td><div>102 min</div></td><td><div>Love, Conflict, War</div></td><td><a href="javascript:void(null)">&#8615;</a></td></tr>
</tbody>
</table>    
</div>
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
