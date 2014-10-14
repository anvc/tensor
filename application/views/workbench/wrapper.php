<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Workbench</title>
<?php echo $styles ?>
<style type="text/css">
html, body, .container-fluid, .row-fluid, .row, .col-max-height {height:100%;}
body {font-size:12px;}
.table-hover {cursor:pointer;}
thead tr th:last-child {text-align:center;color:#888888;}
tbody tr td:last-child {text-align:center;color:#888888;}
th {border-left:solid 1px #dddddd;}
th:first-of-type {border-left:inherit;}
</style>
<?php echo $scripts_header ?>
</head>
<body>
<?php echo $content ?>
</body>
</html>