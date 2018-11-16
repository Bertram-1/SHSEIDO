<?php
	header("Access-Control-Allow-Origin:*");
	include("../connect.php");
	$phone = $_POST["phone"];
	$password = $_POST["password"];
	$email = $_POST["email"];
	$sql  ="insert into user (phone, password,email) values ('$phone','$password','$email')";
	
	$isSucc = mysql_query($sql);

	if ($isSucc) {
		echo '{"code" : 1}';
	}else{
		echo '{"code" : 0}';
	}

	mysql_close();
?>