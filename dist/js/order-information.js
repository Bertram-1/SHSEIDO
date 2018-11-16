"use strict";

require(["config"], function () {
  require(["jquery", "template", "cookie", "shseido"], function ($, template) {
    new Promise(function (resolve, reject) {
      $("header").load("/html/component/header.html", function () {
        resolve();
      });
      $("nav").load("/html/component/nav.html", function () {
        $("").select();
      });
      $("footer").load("/html/component/footer.html", function () {});
      $("").scrollbox();
    }).then(function () {
      $("").loadLoginUser();
      $("#products_num").products_num();
    });
  });
});