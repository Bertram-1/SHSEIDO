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
            data: res.data
          });
          $(".main_content").html(strlist);
          $(".main_content").num(); //按价格升序降序

          $(".sx").click(function () {
            res.data.sort(function (x, y) {
              return x.price - y.price;
            });
            var strlist = template("pro-template", {
              data: res.data
            });
            $(".main_content").html(strlist);
            $(".main_content").num();
            $("").addCart();
          });
          $(".jx").click(function () {
            res.data.sort(function (x, y) {
              return y.price - x.price;
            });
            var strlist = template("pro-template", {
              data: res.data
            });
            $(".main_content").html(strlist);
            $(".main_content").num();
            $("").addCart();
          });
          $("").addCart();
        }
      });
    }).then(function () {
      $("#products_num").products_num();
    });
  });
});