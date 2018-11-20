<?php
	header("Access-Control-Allow-Origin:*");
	include("../connect.php");
	$phone = $_POST["phone"];
	$password = $_POST["password"];
	$email = $_POST["email"];
	$sql1 = "select * from user where email='$email' or phone='$phone'";
	$isSuc = mysql_query($sql1);
	$row = mysql_num_rows($isSuc);

	if($row>0){
		echo '{"code" : 0}';
	}else{
		$sql  ="insert into user (phone, password,email) values ('$phone','$password','$email')";
		$isSucc = mysql_query($sql);
		echo '{"code" : 1}';
	}
	mysql_close();
?>