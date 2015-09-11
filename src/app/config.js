"use strict";
MyApp
    .factory("Config", [function () {
        var factory = {
            getApiUrl : function () {
                return "http://premier-league-api.herokuapp.com";
            }
        };
        return factory;
    }]);

MyApp
    .config(function (wsProvider) {
        wsProvider.setUrl('ws://premier-league-api.herokuapp.com/games');
    });