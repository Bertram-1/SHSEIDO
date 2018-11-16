"use strict";

require(["config"], function () {
  require(["jquery", "template", "shseido", "cookie"], function ($, template) {
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
      $("#products_num").products_num();
    });
    var emailstr = /^[a-zA-Z0-9_]{3,10}\@[a-zA-Z]{2,4}\.[a-zA-Z]{2,4}$/,
        passwordstr = /^.{6,}$/,
        phonestr = /^[1]{1}[3,5,7,8]{1}[0-9]{9}$/; // 注册

    $(".register").submit(function (e) {
      var email = $(".email").val(),
          password = $(".register_password").val(),
          password1 = $(".register_password1").val(),
          phone = $(".phone").val();
      var arr = [true, true, true, true, true, true, true];

      if (!emailstr.test(email)) {
        alert("请填写电子邮箱");
        arr[0] = false;
      } else if (!passwordstr.test(password)) {
        alert("请填写密码，6-20个字符");
        arr[1] = false;
      } else if (password1 !== password) {
        alert("请再次输入相同的密码");
        arr[2] = false;
      } else if (!phonestr.test(phone)) {
        alert("请填写有效手机号");
        arr[3] = false;
      } else if (!($(".xb1").prop("checked") || $(".xb2").prop("checked"))) {
        arr[4] = false;
        alert("请选择性别");
      } else if (!($(".dy1").prop("checked") || $(".dy2").prop("checked"))) {
        alert("请选择是否需要订阅");
        arr[5] = false;
      } else if (!$(".register_checkbox1").prop("checked")) {
        alert("请阅读并勾选隐私保护条款");
        arr[6] = false;
      }

      var isPass = arr.every(function (item) {
        return item;
      });

      if (isPass) {
        var data = {
          email: email,
          password: password,
          phone: phone
        };
        $.ajax({
          method: "POST",
          url: "http://localhost/SHISEIDO/server/api/register.php",
          dataType: "json",
          data: data,
          success: function success(res) {
            if (res.code === 1) {
              alert("注册成功");
              $.cookie();
              window.location.href = "http://localhost:2333/html/login_register.html";
              e.preventDefault();
            } else {
              alert("注册失败，请重试");
            }
          }
        });
        e.preventDefault();
      } else {
        e.preventDefault();
      }
    }); // 登录

    $(".login").submit(function (e) {
      var login_phone = $(".phone_email").val(),
          login_password = $(".password").val();

      if (login_phone == "") {
        alert("请输入手机号或电子邮箱");
      } else if (login_phone != "" && login_password == "") {
        alert("请输入密码");
      } else {
        var data = {
          login_phone: login_phone,
          login_password: login_password
        }; // 是否接受隐私保护条款

        if ($(".checkbox").prop("checked")) {
          $.ajax({
            method: "POST",
            url: "http://localhost/SHISEIDO/server/api/login.php",
            dataType: "json",
            data: data,
            success: function success(res) {
              console.log(res);

              if (res.code === 1) {
                alert("登陆成功");
                $.cookie.json = true;
                $.cookie("user", login_phone, {
                  path: '/'
                });
                location.href = "http://localhost:2333/index.html";
              } else {
                alert("用户名或者密码错误");
              }
            }
          });
          e.preventDefault();
        } else {
          alert("请阅读并勾选隐私保护条款");
          e.preventDefault();
        }
      }

      e.preventDefault();
    });
  });
});