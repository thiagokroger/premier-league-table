"use strict";
MyApp
    .factory("Config", [function () {
        var factory = {
            getApiUrl : function () {
                return "http://localhost:8080";
            }
        };
        return factory;
    }]);

MyApp
    .config(function (wsProvider) {
        wsProvider.setUrl('ws://localhost:8080/games');
    });