"use strict";
MyApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/table");

    $stateProvider
        .state("table", {
            url: "/table",
            templateUrl: "app/features/table/tableView.html",
            controller: "TableController"
        });
});

