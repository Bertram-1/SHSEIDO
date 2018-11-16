<?php

	header("Access-Control-Allow-Origin:*");
	include("../connect.php");

	 $sql = "select * from list";

	$res = mysql_query($sql);

	$arr = array();
	while ($row = mysql_fetch_assoc($res)) {
		array_push($arr, $row);
	}

	$data = array(
		"code" => 1,
		"data" => $arr
	);

	echo json_encode($data);

	mysql_close();

?>