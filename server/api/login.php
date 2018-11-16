<?php

	header("Access-Control-Allow-Origin:*");
	include("../connect.php");

	$login_phone = $_POST["login_phone"];
	$login_password = $_POST["login_password"];

	 $sql = "select * from user where phone='$login_phone' or email='$login_phone' and password='$login_password'";
	 //echo $sql;
	$isSuc = mysql_query($sql);

	$row = mysql_num_rows($isSuc);
	
	if($row>0){
   	 echo '{"code":1}'; 
   }
   else{
   	echo '{"code":0}';
   }
   mysql_close();

?>