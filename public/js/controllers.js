'use strict';

/* Controllers */

angular.module('portfolioApp.controllers', [])
    .controller('HomeController', function ($scope) {
        $scope.image1 = true;

        $scope.toggle = function () {
            $scope.image1 = !$scope.image1;
        };
    })









//    Testing ------------------------------------------------------------------------

    .controller('MainCtrl', function ($scope, PortfolioListService) {
        $scope.portfolioList = {};

        PortfolioListService.success(function(data) {
            $scope.portfolioList = data;
        });



            $scope.merchantCheckboxes = {};
            $scope.brandCheckboxes = {};
            function getChecked(obj){
                var checked = [];
                for(var key in obj) if(obj[key]) checked.push(key);
                return checked;
            }
            $scope.orderChecked = function(item){
                if(item.Merchantname && $scope.merchantCheckboxes[item.Merchantname])
                    return 0;
                else if(item.brandname && item.brandname.split(/,\s*/).some(function(brand){
                            return $scope.brandCheckboxes[brand];
                        }))
                    return 0;
                else
                    return 1;
            };
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
            $scope.records = [
            {
                "MerchantName": "Fashion and You",
                "BrandList": " Nike, Fila",
                "Description": "Fashion and You Store"
            },
            {
                "MerchantName": "Fashion and You",
                "BrandList": " Levis, Fasttrack, Fila",
                 "Description": "Fashion and You Store"
            },
            {
                "MerchantName": "ebay",
                "BrandList": "Nokia,HTC,Samsung",
                "Description": "Ebay Store"
            },
            {
                "MerchantName": "amazon",
                "BrandList": "Apple,Dell,Samsung",
                 "Description": "amazon Store"
            },
            {
                "MerchantName": "amazon",
                "BrandList": " pepe jeans, peter england, red tape",
                 "Description": "amazon Store"
            }
        ];
            $scope.MerchantList = _.uniq(_.pluck($scope.records, 'MerchantName'));
            $scope.MerchantList = _.map($scope.MerchantList, function(Merchant){
            return { Merchantname : $.trim(Merchant), status : false};
        });
            $scope.BrandList = [];

            _.each($scope.records, function(i){
           if(i.BrandList)
                           $scope.BrandList = _.union($scope.BrandList,i.BrandList.split(','));
        });

        $scope.BrandList = _.map($scope.BrandList, function(brand){
            return { brandname : $.trim(brand), status : false};
        });


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