require(["config"], function(){
	require(["jquery","template","cookie","shseido"], function($,template){
		$("header").load("/html/component/header.html ",function(){
			$("").loadLoginUser();
			$("#products_num").products_num();
		});
		$("nav").load("/html/component/nav.html", function(){
				$("").select();
		});
		$("footer").load("/html/component/footer.html", function(){});
		$("").scrollbox();

		//购物车
		function Cart(){
			this.products = null;
			this.load();
			this.addListener();
		}
		Cart.prototype = {
			constructor:Cart,
			//判断是否有cookie 有就把cookie渲染到页面 没有空页面
			load:function(){
				$.cookie.json = true;
				var products = this.products = $.cookie("cart") || [];
				console.log(products)
				if (products.length === 0) { // 购物车为空
					$(".empty").show().siblings(".not-empty").hide();
					return;
				}
				$(".empty").hide().siblings(".not-empty").removeClass("ac");
				//渲染模板
				var data = {products: products}
				var html = template("add_cart_template", data);
				$(".add_cart_info").html(html);				
			},
			//事件监听
			addListener: function() {
				// 删除
				$(".add_cart_info").on("click", ".del", $.proxy(this.delHandler, this))
				// +/-数量
				$(".add_cart_info").on("click", ".decrement,.increment", $.proxy(this.decIncHandler, this))
				// 输入修改数量
				$(".add_cart_info").on("blur", ".amount", $.proxy(this.inputHandler, this));
				// 全选
				$(".allchecked").on("click", $.proxy(this.ckAllHandler, this));
				// 部分选中
				$(".add_cart_info").on("click", ".cart_checked", $.proxy(this.ckProdHandler, this));
			},
			// 删除单行
			delHandler: function(e) {
				var target = e.target;
				// 获取事件源元素所在行
				var li = $(target).parents(".cart_li");
				// 获取商品 id
				var id = li.find(".add_pro_img").attr("data");
				// 从数组中删除该 id 对应的商品对象
				this.products = this.products.filter(function(prod) {
					return !(prod.id == id);
					/*if (prod.id == id)
						return false;
					return true;*/
				});
				//console.log(this.products)

				// 从 cookie 中保存的购物车结构中删除商品数据
				$.cookie("cart", this.products, {path: "/"});
				$("#products_num").products_num()
				li.remove();
				this.calcTotal();

				// 判断是否有购物车商品
				if (this.products.length === 0) { // 购物车为空
					$(".empty").show().siblings(".not-empty").hide();
				}
			},		
			// +/-数量处理
			decIncHandler: function(e) {
				var target = e.target;
				var li = $(target).parents(".cart_li");
				// 商品 id
				var id = li.find(".add_pro_img").attr("data");
				// 商品对象
				var product = this.products.filter(function(prod) {
					 return prod.id == id;
				})[0];
				// +/-数量
				if ($(target).is(".decrement")) {
					if (product.amount <= 1){
						return;
					}
					product.amount--;
				}else{
					product.amount++;
				}
				// 保存到 cookie 中（修改数量后的数组）
				$.cookie("cart", this.products, {path:"/"});
				$("#products_num").products_num()
				// 页面渲染
				li.find(".amount").val(product.amount);
				li.find(".add_pro_calculation").text(product.amount*product.price);

				this.calcTotal();
			},
			// 输入数量处理
			inputHandler: function(e) {
				var target = e.target;
				var li = $(target).parents(".cart_li");
				// 商品 id
				var id = li.find(".add_pro_img").attr("data");
				// 商品对象
				var product = this.products.filter(function(prod) {
					 return prod.id == id;
				})[0];
				// 修改数量
				var _amount = $(target).val();
				var reg = /^[1-9]\d*$/;
				if (!reg.test(_amount)) {
					$(target).val(product.amount);
					return;
				}
				product.amount = _amount;
				$.cookie("cart", this.products, {path:"/"});
				$("#products_num").products_num()
				li.find(".add_pro_calculation").text(product.amount * product.price);

				this.calcTotal();
			},
			// 全选
			ckAllHandler: function(e) {
				var state = $(e.target).prop("checked") //选中为true 没选中false
				//console.log(state); true or false
				// 将各商品行前复选框选中状态设置为全选的选中状态
				$(".cart_checked").prop("checked", state);

				this.calcTotal();
			},	
			// 反选
			ckProdHandler: function(e) {
				// 获取购物车主体中选中的复选框个数
				var count = $(".cart_checked:checked").length;
				// 设置全选复选框选中状态
				var state = count === this.products.length;//全选中为true不然为false
				$(".allchecked").prop("checked", state);

				this.calcTotal();
			},
			// 计算合计金额
			calcTotal: function() {
				// 将选中行中的小计金额累加
				var sum = 0;
				// 选中行中的复选框
				$(".cart_checked:checked").each(function() {
					sum += Number($(this).parents(".cart_li").find(".add_pro_calculation").text());
				});
				// 显示
				$(".allprice").text(sum);
			}
			//判断注册登录
		}
		new Cart();

		$("").cart_href();

	})
})
			

