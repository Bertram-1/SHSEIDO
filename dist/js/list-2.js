"use strict";

require(["config"], function () {
  require(["jquery", "template", "cookie", "shseido"], function ($, template, shseido) {
    new Promise(function (resolve, reject) {
      $("header").load("/html/component/header.html", function () {
        resolve();
      });
      $("nav").load("/html/component/nav.html", function () {
        $("").select();
      });
      $("footer").load("/html/component/footer.html", function () {});
      $("").asidemenu();
      $("").hidden();
      $("").scrollbox();
    }).then(function () {
      $("").loadLoginUser();
    }).then(function () {
      $.ajax({
        method: "get",
        url: "http://rap2api.taobao.org/app/mock/116824/list",
        success: function success(res) {
          console.log(res);
          var strlist = template("pro-template", {
            products: res.products
          });
          $(".main_content").html(strlist);
          $(".main_content").num(); // 加入购物车				   

          $(".addcart").on("click", ".add", function (event) {
            console.log($(this));
            var currentProduct = {
              id: $(this).parent().find(".product_name").attr("id"),
              name: $(this).parent().find(".product_name").text(),
              img: $(this).parent().find(".product_img").attr("src"),
              price: $(this).parent().find(".product_price1").text(),
              amount: 1
            };
            console.log(currentProduct);
            /* 判断是否已选购过当前商品 */
            // 从 cookie 中读取以有的购物车数据

            $.cookie.json = true;
            var products = $.cookie("cart") || []; // 判断是否已有选购

            var has = products.some(function (prod) {
              if (prod.id == currentProduct.id) {
                prod.amount++;
                return true;
              }

              return false;
            });
            if (!has) // 未选购
              products.push(currentProduct); // 保存购物车：存回cookie

            $.cookie("cart", products, {
              path: "/"
            });
            $("#products_num").products_num();
            return false;
          });
        }
      });
    }).then(function () {
      $("#products_num").products_num();
    });
  });
});