/**
 * 首页模块
 */
var HomeModule = angular.module("HomeModule", []);
HomeModule.controller('HomeCtrl', function($scope, $http, LoadingInfo) {
    $scope.redirect = ['servepointlist'];
    var req = {
        method: 'GET',
        url: GetUrl.homeinfo
    };
    $http(req).
        success(function(data) {
            $scope.homeinfos = data.data;
        }).
        error(function(data) {
            alert(data.msg);
        });
    $scope.loadRecommendInfo = function(){
        LoadingInfo(GetUrl.homeRecommendinfo+'?type=recommend&page=', $scope.homeinfos.recommend.data);
    };
    $scope.loadItineraryInfo = function(){
        LoadingInfo(GetUrl.homeItineraryinfo+'?type=itinerary&page=', $scope.homeinfos.itinerary.data);
    };
});
/**
 * 旅游景点列表模块
 */
var TourListModule = angular.module("TourListModule", []);
TourListModule.controller('TourListCtrl', function($scope, $http, LoadingInfo) {
    console.log(11)
    var req = {
        method: 'GET',
        url: GetUrl.tourlist
    };
    $http(req).
        success(function(data) {
            $scope.tourlist = data.data.tourlist;
        }).
        error(function(data) {
            alert(data.msg);
        });
    $scope.loadTourListInfo = function(){
        LoadingInfo(GetUrl.tourmoreinfo+'?page=', $scope.tourlist);
    };
});
/**
 * 旅游景点详情页模块
 */
var TourDetailModule = angular.module("TourDetailModule", []);
TourDetailModule.controller('TourDetailCtrl', function($scope, $http, $state, $stateParams) {
    console.log(11)
});
/**
 * 服务网点列表模块
 */
var ServePointListModule = angular.module("ServePointListModule", []);
ServePointListModule.controller('ServePointListCtrl', function($scope, $http, bdMapSev) {
    var req = {
        method: 'GET',
        url: GetUrl.pointlist
    };
    $http(req).
        success(function(data) {
            $scope.pointlist = data.data;
        }).
        error(function(data) {
            alert(data.msg);
        });
});
/**
 * 服务网点模块
 * @function $scope.bdMap {设置地图功能} 
 */
var ServePointModule = angular.module("ServePointModule", []);
ServePointModule.controller('ServePointCtrl', function($scope, $http, bdMapSev) {
    $scope.map = new bdMapSev();  
});

