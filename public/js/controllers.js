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


        PortfolioListService.success(function(data) {
            $scope.portfolioList = data;
            $scope.portfolioArray =[];
            $scope.technologyArray =[];

            for (var portfolioItem in $scope.portfolioList){
                $scope.portfolioArray.push($scope.portfolioList[portfolioItem]);
                var technolist = $scope.portfolioList[portfolioItem].technology;

                for (var tech = 0; tech<technolist.length; tech++){
                    if ($.inArray(technolist[tech], $scope.technologyArray) !=-1){
                        var junk = 0;
                    }
                    else {
                        $scope.technologyArray.push(technolist[tech]);
                    }
                }
            }

                        console.log("The TechArray is: ");
                        console.log($scope.technologyArray);
//            for (var i = 0; i<$scope.portfolioArray.length; i++){
//                for (var tech in $scope.portfolioList[i].technology){
//                    if (tech in $scope.technologyArray){
//                        console.log(tech);
//                    }
//                    else {
//                        $scope.technologyArray.push(tech);
//                    }
//                }
//                $scope.technologyArray.push($scope.portfolioList[portfolioItem]);
//            }

            console.log($scope.technologyArray);
            console.log(JSON.stringify($scope.portfolioArray));





        });
        //console.log($scope.portfolioListArray);
        //$scope.portfolioList = [];

        var portfolioListArray = [], item;
        $scope.portfolioListArray = portfolioListArray;


        PortfolioListService.success(function(data) {
            for (var type in data) {
                item = {};

                item = data[type];
                $scope.portfolioListArray.push(item);

            }


            $scope.merchantCheckboxes = {};
            $scope.brandCheckboxes = {};
            function getChecked(obj){
                var checked = [];
                for(var key in obj) if(obj[key]) checked.push(key);
                return checked;
            }
            $scope.searchFilter = function(row){
                var mercChecked = getChecked($scope.merchantCheckboxes);
                var brandChecked = getChecked($scope.brandCheckboxes);
                if(mercChecked.length == 0 && brandChecked.length == 0)
                    return true;
                else{
                    if(($scope.merchantCheckboxes[row.MerchantName] && brandChecked.length==0)
                      || (mercChecked.length == 0 && row.BrandList.split(/,\s*/).some(function(brand){
                            return $scope.brandCheckboxes[brand];
                        }))
                      || ($scope.merchantCheckboxes[row.MerchantName] && row.BrandList.split(/,\s*/).some(function(brand){
                            return $scope.brandCheckboxes[brand];
                        })))
                        return true;
                    else{
                        return false;
                    }
                }
            };

            $scope.MerchantList = _.uniq(_.pluck($scope.portfolioListArray, 'MerchantName'));
            $scope.MerchantList = _.map($scope.MerchantList, function(Merchant){
                return { Merchantname : $.trim(Merchant), status : false};
            });
                $scope.BrandList = [];

                _.each($scope.portfolioListArray, function(i){
               if(i.BrandList)
                               $scope.BrandList = _.union($scope.BrandList,i.BrandList.split(','));
            });

            $scope.BrandList = _.map($scope.BrandList, function(brand){
                return { brandname : $.trim(brand), status : false};
            });

        }); // end Portfolio List service

    });