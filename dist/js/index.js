"use strict";

require(["config"], function () {
  require(["jquery", "template", "shseido"], function ($, template) {
    //promise
    new Promise(function (resolve, reject) {
      $("header").load("/html/component/header.html", function () {
        resolve();
      });
      $("nav").load("/html/component/nav.html", function () {
        $("").select();
      });
      $("#lunbo").load("/html/component/lunbo.html", function () {
        $("#lunbo").lunbo({
          goPrev: "left",
          goNext: "right"
        });
      });
      $("footer").load("/html/component/footer.html", function () {});
    }).then(function () {
      $("").loadLoginUser();
    }).then(function () {
      $("#products_num").products_num();
    });
    $("").scrollbox();
  });
});