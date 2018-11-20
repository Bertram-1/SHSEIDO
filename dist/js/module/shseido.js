"use strict";

define(["jquery", "cookie"], function ($) {
  $.fn.extend({
    //list侧边栏菜单
    asidemenu: function asidemenu() {
      $('.setupMenu .subMenu .ac').parents('ul').show();
      $(".ac").parent().parent().prev().attr("style", "color:#76130e;background: url(../images/l_down.jpg) no-repeat 113px 14px");
      $(".setupMenu li:has('.subMenu')").children('a').click(function () {
        $(this).next('ul').stop().slideToggle("fast");

        if ($(this).attr("style") === "color:#737373;background: url(../images/l_right.jpg) no-repeat 113px 14px") {
          $(this).attr("style", "color:#76130e;background: url(../images/l_down.jpg) no-repeat 113px 14px");
        } else {
          $(this).attr("style", "color:#737373;background: url(../images/l_right.jpg) no-repeat 113px 14px");
        }
      });
    },
    //点击隐藏
    hidden: function hidden() {
      var flag = false;
      $(".px").click(function () {
        if (!flag) {
          $("#hidden_box").attr("style", "display:block");
          flag = true;
        } else {
          $("#hidden_box").attr("style", "display:none");
          flag = false;
        }
      });
    },
    //轮播图
    lunbo: function lunbo(obj) {
      var goPrev = $("#" + obj.goPrev);
      var goNext = $("#" + obj.goNext);
      var $ul = this.find("ul"),
          $imgs = this.find("ul li"),
          $ol = this.find("ol"),
          $a = this.find("ul li a");
      var index = 0,
          len = $imgs.length,
          flag = false,
          timer = null,
          imgWidth = $imgs.eq(0).width(),
          aWidth = $a.eq(0).width(),
          lbWidth = this.eq(0).width(); //console.log(imgWidth)//0	

      imgWidth = lbWidth;
      console.log(imgWidth);
      $imgs.css("width", imgWidth); //li的宽

      $imgs.each(function () {
        $("<li>").html($(this).index() + 1).addClass($(this).index() == 0 ? "ac" : "").appendTo($ol);
      });
      $imgs.eq(0).clone(true).appendTo($ul);
      $ul.css("width", imgWidth * (len + 1));
      $ol.on("click", "li", function () {
        if (!flag) {
          flag = true;
          $(this).addClass("ac").siblings().removeClass("ac");
          index = $(this).index();
          $ul.animate({
            "left": -index * imgWidth
          }, "slow", function () {
            flag = false;
          });
        }
      });
      goPrev.click(function () {
        if (!flag) {
          flag = true;

          if (--index < 0) {
            $ul.css("left", -len * imgWidth);
            index = len - 1;
            $ul.animate({
              "left": -index * imgWidth
            }, "slow", function () {
              flag = false;
            });
          } else {
            $ul.animate({
              "left": -index * imgWidth
            }, "slow", function () {
              flag = false;
            });
          }

          $ol.children().eq(index).addClass("ac").siblings().removeClass("ac");
        }
      });
      goNext.click(function () {
        if (!flag) {
          flag = true;

          if (++index >= len) {
            $ul.animate({
              "left": -len * imgWidth
            }, "slow", function () {
              $ul.css("left", 0); //$ul.css({"left": 0});

              flag = false;
            });
            index = 0;
          } else {
            $ul.animate({
              "left": -index * imgWidth
            }, "slow", function () {
              flag = false;
            });
          }

          $ol.children().eq(index).addClass("ac").siblings().removeClass("ac");
        }
      }); //console.log(this)

      this.hover(function () {
        clearInterval(timer);
      }, function autoPlay() {
        timer = setInterval(function () {
          goNext.trigger("click");
        }, 3000);
        return autoPlay;
      }());
    },
    //点击隐藏显示
    select: function select() {
      $("#nav_select1").hover(function () {
        $("#box1").attr("style", "display:block");
      }, function autoPlay() {
        //$("#box").removeAttr("style");
        $("#box1").attr("style", "display:none");
        return autoPlay;
      }());
      $("#nav_select2").hover(function () {
        $("#box2").attr("style", "display:block");
      }, function autoPlay() {
        //$("#box").removeAttr("style");
        $("#box2").attr("style", "display:none");
        return autoPlay;
      }());
    },
    // list加入购物车
    addCart: function addCart() {
      // 加入购物车				   
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
    },
    //右侧滚动盒子
    scrollbox: function scrollbox() {
      var offsetTOP = 300;
      var FloatMenu = document.createElement("DIV");
      FloatMenu.style.cssText = "position:absolute;right:0;top:" + offsetTOP + "px;z-index:99999;";
      FloatMenu.innerHTML = "<ul id='backTop'>" + "<li class='call'><span>电话咨询</span><div class='phone'>" + "<img src='../../images/call.png' />" + " <p>咨询热线</p>" + "<p>400-821-6076</p>" + "</div></li>" + "<li class='wxcode'><span>关注我们</span><div>扫一扫<br/>  即刻关注官方微信<img src='../../images/wxcode.jpg' /></div></li>" + "<li><a href='javascript:;'><img src='../../images/ChatIcon.png'><p>在线客服</p></a></li>" + "<li id='to_top'><a><img src='../../images/ArrowUp.png'></a></li></ul>";
      document.body.appendChild(FloatMenu);
      var stmnGAP2 = 121;
      var stmnGAP1 = 198;
      var stmnScrollSpeed = 10;
      var stmnActivateSpeed = 80;

      var RefreshStaticMenu = function RefreshStaticMenu() {
        var stmnStartPoint, stmnEndPoint, stmnRefreshTimer;
        stmnStartPoint = parseInt(FloatMenu.style.top, 10);
        stmnEndPoint = document.body.scrollTop || document.documentElement.scrollTop; //网页被卷去的高||滚动条纵坐标

        stmnEndPoint += offsetTOP;

        if (stmnStartPoint != stmnEndPoint) {
          var stmnScrollAmount = Math.ceil(Math.abs(stmnEndPoint - stmnStartPoint) / 15);
          FloatMenu.style.top = parseInt(FloatMenu.style.top, 10) + (stmnEndPoint < stmnStartPoint ? -stmnScrollAmount : stmnScrollAmount) + "px";
          stmnRefreshTimer = stmnScrollSpeed;
        } else {
          stmnRefreshTimer = stmnActivateSpeed;
        }

        if (stmnEndPoint >= 700) {
          FloatMenu.style.display = 'block';
        } else {
          FloatMenu.style.display = 'none';
        }

        setTimeout(function () {
          RefreshStaticMenu();
        }, stmnRefreshTimer);
      };

      RefreshStaticMenu();
      $(".call").on("mouseover", function () {
        $(this).find(".phone").show();
      });
      $(".call").on("mouseout", function () {
        $(this).find(".phone").hide();
      });
      $(".wxcode").on("mouseover", function () {
        $(this).find("div").show();
      });
      $(".wxcode").on("mouseout", function () {
        $(this).find("div").hide();
      });
      var oTop = document.getElementById("to_top");

      oTop.onclick = function () {
        document.documentElement.scrollTop = document.body.scrollTop = 0;
      };
    },
    //登录成功换头部html与样式
    loadLoginUser: function loadLoginUser() {
      $.cookie.json = true;
      var user = $.cookie("user"); // 如果不能读取到 cookie 则返回 undefined
      //console.log(user)

      if (user) // 有登录用户
        $(".link-login").parent("p").html("<a href=\"#\">\u6B22\u8FCE\u60A8\uFF1A".concat(user, "</a> <a href=\"http://localhost:2333/html/login_register.html\" class=\"logout\">\u9000\u51FA</a>"));
      $(".head_right").css("width", "316px");
      $(".p-left").css("width", "198px");
      $(".logout").click(function () {
        $.cookie("user", null, {
          path: '/'
        });
      });
    },
    //随商品数量改变显示值
    num: function num() {
      var $num = $(".main_content li").length; //console.log($num)

      $("#num").html($num);
    },
    //商品数量 变化
    products_num: function products_num() {
      $.cookie.json = true;
      var $products_num = 0;
      $.each($.cookie("cart"), function (index, item) {
        $products_num += Number(item.amount);
      });
      $("#products_num").html($products_num);
    },
    //购物车结算是否登录 确定跳转的页面
    cart_href: function cart_href() {
      $.cookie.json = true;
      var user = $.cookie("user");
      $(".settlement").click(function () {
        if (user) {
          $(".settlement").attr("href", "http://localhost:2333/html/order-information.html");
        } else {
          if (confirm("请登录，是否需要跳转到登录页面")) {
            $(".settlement").attr("href", "http://localhost:2333/html/login_register.html");
          }
        }
      });
    }
  });
});