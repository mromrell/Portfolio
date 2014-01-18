'use strict';

var portfolioApp = angular.module('portfolioApp', [
        'ngRoute',
        'portfolioApp.services',
        'portfolioApp.controllers',
        'portfolioApp.constants',
        'portfolioApp.filters',
        'portfolioApp.directives'
    ])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/home', {
            templateUrl: 'partials/home.tpl.html',
            controller: 'HomeController',
            title: 'Home Page',
            nav:'partials/standard/header.tpl.html',
            footer:'partials/standard/footer.tpl.html',
            portfoliolist:'partials/standard/portfolio-list.html'
            });
        $routeProvider.when('/about', {
            templateUrl: 'partials/about.html',
            controller: 'AboutController',
            title: 'About Page',
            nav:'partials/standard/header.tpl.html',
            footer:'partials/standard/footer.tpl.html'});
        $routeProvider.when('/contact', {
            templateUrl: 'partials/contact.tpl.html',
            controller: 'ContactController',
            title: 'Contact Page',
            nav:'partials/standard/header.tpl.html',
            footer:'partials/standard/footer.tpl.html'});
        $routeProvider.when('/portfolio-project/:id', {
            templateUrl: 'partials/portfolio-item.html',
            controller: 'ProjectController', // 'PortfolioController',
            title: 'Project Detail Page',
            nav:'partials/standard/header.tpl.html',
            footer:'partials/standard/footer.tpl.html',
            portfoliolist:'partials/standard/portfolio-list.html'
            });
        $routeProvider.otherwise({redirectTo: '/home'});
    }])


    .run(['$location', '$rootScope', 'baseTitle', function ($location, $rootScope, baseTitle) {
        $rootScope.$on('$routeChangeSuccess', function (event, current) {
            $rootScope.title = baseTitle + current.$$route.title;
            $rootScope.nav = current.$$route.nav;
            $rootScope.footer = current.$$route.footer;
            $rootScope.portfoliolist = current.$$route.portfoliolist;
        });
    }]);

