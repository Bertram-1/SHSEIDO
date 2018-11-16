require(["config"], function(){
	require(["jquery","template","cookie","shseido"], function($,template){
		$("header").load("/html/component/header.html ",function(){
			$("").loadLoginUser();
			$("#products_num").products_num()
		});
		$("nav").load("/html/component/nav.html", function(){
				$("").select();
		});
		$("footer").load("/html/component/footer.html", function(){});
		$("").asidemenu();
		$("").scrollbox();

		
		//同时发送异步请求渲染主体部分

		//从url上取出id参数，然后携带这个参数去请求当前数据
		var str = location.search.slice(1);
		var arr = str.split("="); // ["id","3"];
		var obj = {};
		obj[arr[0]] = arr[1];

		$.ajax({
			url:"http://localhost/SHISEIDO/server/api/detail.php",
			data: obj,
			method:"POST",
			dataType:"json",
			success: function(res){
				console.log(res);
				if(res.code === 1){
					var str = template("detail-template",{product: res.product});
					$(".mainright_top").html(str);
					$(".add").click(function(event) {
						var currentProduct = {
							id: arr[1],
							name: $(".product_name").text(),
							img: $(".product_img").attr("src"),
							price: $(".product_price1").text(),
							amount:1
						};
						console.log(currentProduct);
						/* 判断是否已选购过当前商品 */
						// 从 cookie 中读取以有的购物车数据
						$.cookie.json = true; // 配置自动在JS值与JSON文本之间相互转换
						var products = $.cookie("cart") || [];
						// 判断是否已有选购
						var has = products.some(function(prod) {
							if (prod.id == currentProduct.id) { // 已有选购商品
								prod.amount++; // 数量自增
								return true;
							}
							return false;
						});
						if (!has) // 未选购
							products.push(currentProduct);

						// 保存购物车：存回cookie
						// 数据结构：[{id,title,img,price,amout},{id,title,img,price,amout},{id,title,img,price,amout}]
						$.cookie("cart", products, {path:"/"});
						$("#products_num").products_num()
						return false;
					})
				}
			}
		})

		$.ajax({
			method: "get",
			url:"http://rap2api.taobao.org/app/mock/116824/detail",
			success: function(data){
				//console.log(data);
				var strrecommend = template("pro-recommend",{recommend: data.recommend});
				$("#r-recommend").html(strrecommend);
			}

		})
	})
})