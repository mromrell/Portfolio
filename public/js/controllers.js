'use strict';

/* Controllers */

angular.module('portfolioApp.controllers', [])
    .controller('HomeController', function ($scope) {
        $scope.image1 = true;

        $scope.toggle = function () {
            $scope.image1 = !$scope.image1;
        };
    })

    .controller('AboutController', function ($scope) {
    })

    .controller('ContactController', function ($scope) {
    })

    .controller('PortItemCtrl', function ($scope) {
    })

    .controller('ProjectController', function ($scope, $routeParams, PortfolioListService) {

        //This is used for the looping and displaying of each project
        $scope.portfolioList = {};
        PortfolioListService.success(function(data) {
            $scope.portfolioList = data;
        });

        //This is used to choose the right project data to display based on the URL/project selected
        PortfolioListService.success(function(portfolioList) {
            $scope.project = portfolioList[$routeParams.id];

        });
    })

    .controller('PortfolioController', function($scope, PortfolioListService) {
        //This is used for the looping and displaying of each project
        $scope.portfolioList = {};
        $scope.strict = {};

        PortfolioListService.success(function(data) {
            $scope.portfolioList = data;
        });
    });