<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<link id="base_url" href="<?php echo base_url() ?>">
<link id="proxy_uri" href="<?php if (isset($proxy_uri)) echo $proxy_uri ?>">
<title><?php echo $title ?></title>
<?php echo $styles ?>
<?php echo $scripts_header ?>
</head>
<body>
<?php echo $content ?>
</body>
</html>