"use strict";

require.config({
  baseUrl: "/",
  paths: {
    "header": "js/module/header",
    "jquery": "libs/jquery/jquery-1.11.3",
    "bootstrap": "libs/bootstrap/js/bootstrap",
    "tools": "libs/tools",
    "template": "libs/template-web",
    "shseido": "js/module/shseido",
    "cookie": "/libs/jquery.cookie"
  },
  //垫片
  shim: {
    "bootstrap": {
      deps: ["jquery"]
    }
  }
});