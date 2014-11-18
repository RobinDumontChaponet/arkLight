<?php
if (isset($_GET['load'])) {
	$size=0;
	$encoded='';
	header('Content-Type: text/plain');
	header('Content-Length: '.$size);
	if(!is_array($_GET['load'])) $_GET['load']=array($_GET['load']);
	foreach ($_GET['load'] as $path) {
		if( preg_match('((^\.{2}$)|(^\.{2}\/)|(\/\.{2}\/)', $path) )
			continue;
		$type = mime_content_type($path);
		$file = file_get_contents($path);
		$encoded.='['.$path.']data:'.$type.';base64,'.base64_encode($file).';';
	}
	$size = strlen($encoded);
	echo 'size:'.$size.';'.$encoded;

} else {

	$rep = '.';
	$dir = opendir($rep);
	$nb=0;
	while($scan=readdir($dir)) {
		if(is_file($rep."/".$scan)) {
			$ext = strtolower(substr($scan, strrpos($scan, '.') + 1));
			//if (($ext=="jpg") || ($ext=="jpeg") || ($ext=="gif") || ($ext=="bmp") || ($ext=="png")) {
			if (($ext!="php") && ($ext!="asp") && $scan[0]!='.') {
				$file = file_get_contents($rep.'/'.$scan);
				$encoded=/*'data:'.$type.';base64,'.*/base64_encode($file);
				$size = strlen($encoded);
				echo '<a href="index.php?load='.$rep.'/'.$scan.'">'.$rep.'/'.$scan.'</a> ( '.$size.' o)<br />'."\n";
				$nb++; 
			}
		}
	}
	closedir($dir);

	echo '<br />'.$nb.' asset'.(($nb>1)?'s':'').'.';

}
?>