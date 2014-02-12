'use strict';

/* Controllers */

angular.module('portfolioApp.controllers', [])
    .controller('HomeController', function ($scope) {
        $scope.image1 = true;

        $scope.toggle = function () {
            $scope.image1 = !$scope.image1;
        };
    })
    .controller('MainCtrl', function ($scope, PortfolioListService) {
    })

//   End Testing ------------------------------------------------------------------------

    .controller('ContactController', function ($scope) {
    })

    .controller('PortItemCtrl', function ($scope) {
    })

    .controller('ProjectController', function ($scope, $routeParams, PortfolioListService) {

        //This is used for the looping and displaying of each project
        $scope.portfolioList = {};
        PortfolioListService.success(function(data) {
            $scope.portfolioList = data;
            $scope.rows = [];
            var i = 0;
            var row = [];
            for (var portfolioItem in $scope.portfolioList){
                row.push($scope.portfolioList[portfolioItem]);
                i++;
                if (i%4==0){
                    i=0;
                    $scope.rows.push(row);
                    row = [];
                }

            }
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


        $scope.showAll = true;
        $scope.checkChange = function() {
            for(var t in $scope.technologyArray){
                if($scope.technologyArray[t].on){
                    $scope.showAll = false;
                    return;
                }
            }
            $scope.showAll = true;
        };

        $scope.myFunc = function(a) {
           if($scope.showAll) { return true; }

           var sel = false;

            for(var tech in $scope.technologyArray){
                var t = $scope.technologyArray[tech];
                console.log(t);
                if(t.on){
                    if(a.technology.indexOf(t.name) == -1){
                        return false;
                    }else{
                        sel = true;
                    }
                }
            }
           return sel;
        };

        PortfolioListService.success(function (data) {
            $scope.portfolioList = data;
            $scope.portfolioArray = [];
            $scope.technologyArray = [];
            $scope.technologyArrayTemp = [];

            for (var portfolioItem in $scope.portfolioList) {
                $scope.portfolioArray.push($scope.portfolioList[portfolioItem]);
                var technolist = $scope.portfolioList[portfolioItem].technology; // this adds all technologies to a single list (with Duplicates)

                for (var tech = 0; tech < technolist.length; tech++) {
                    if ($.inArray(technolist[tech], $scope.technologyArrayTemp) != -1) { // this filters the duplicates from technologyArrayTemp by seeing if the value already exists in the technologyArrayTemp
                        var junk = 0;  // this does nothing, it's just filler
                    }
                    else {
                        $scope.technologyArrayTemp.push(technolist[tech]); // this adds unique values to the technologyArrayTemp
                    }
                }
            }
            for (var techno = 0; techno < $scope.technologyArrayTemp.length; techno++) {
                $scope.technologyArray.push({ name: $scope.technologyArrayTemp[techno], on: false}); // this formats the values in technologyArrayTemp and puts it in technologyArray
            }

        });
    });