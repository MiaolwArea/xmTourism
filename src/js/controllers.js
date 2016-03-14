/**
 * 首页模块
 */
var HomeModule = angular.module("HomeModule", []);
HomeModule.controller('HomeCtrl', function($scope, LoadingInfo, GetInfo) {
    $scope.modal = true;
    $scope.pageClass = 'hello'
    GetInfo(GetUrl.homeinfo, function(data) {
        $scope.homeinfos = data.data;
    })
    $scope.loadRoadInfo = function(action){
        LoadingInfo(action, GetUrl.loaddata, {type: 'road'}, $scope.homeinfos.road.data);
    };
    $scope.loadItineraryInfo = function(action){
        LoadingInfo(action, GetUrl.loaddata, {type: 'itinerary'}, $scope.homeinfos.itinerary.data);
    };
});
/**
 * 旅游景点列表模块
 */
var TourListModule = angular.module("TourListModule", []);
TourListModule.controller('TourListCtrl', function($scope, $stateParams, $timeout, LoadingInfo, GetInfo) {
    var type = $stateParams.type;
    $scope.IsShow = true;
    $scope.IsData = true;
    GetInfo(GetUrl.tourlist, {type: type}, function(data) {
        $scope.tourlist = data.data.tourlist;
        $scope.num = data.data.num;
    });
    $scope.loadTourListInfo = function(action){
        LoadingInfo(action, GetUrl.loaddata, {type: 'tour'}, $scope.tourlist);
    };
    $scope.SearchResult = function(){
        if($scope.results){
            $scope.IsShow = false;
            GetInfo(GetUrl.tourlist, {type: 'tour', keyword: NewSearchTxt}, function(data) {
                $scope.num = data.data.num;
                $scope.tourlist = data.data.results;
                // 数字分页：根据返回总数字段total划分页码，视图层reapt呈现并标记页码;设置$watch监听'当前页+单页个数'的变化，执行翻页请求,得到数据替换tourlist.
            },function(){
                $scope.IsData = false;
            });
            $scope.loadInfo = function(action){
                LoadingInfo(action, GetUrl.loaddata, {type: 'itinerary'}, $scope.homeinfos.itinerary.data);
            };
        }else{
            console.log('请输入关键字!');
        }
    };
});
/**
 * 旅游景点详情页模块
 */
var TourDetailModule = angular.module("TourDetailModule", []);
TourDetailModule.controller('TourDetailCtrl', function($scope, $stateParams, $timeout, GetInfo) {
    var id = $stateParams.Id;
    GetInfo(GetUrl.tourdetail, {id: id}, function(data) {
        $scope.tourdetail = data.data;
    });
    $scope.ticketNotice = function(){
        $('.ticket .row').fadeOut(400,function(){
            $('.ticket-notice').fadeIn(400);
            $timeout(function() {
                $('.ticket-notice').fadeOut(400, function(){
                    $('.ticket .row').fadeIn(400)
                });
            }, 3000, true);
        });
    }
});
/**
 * 推荐景点列表页模块
 */
var RoadListModule = angular.module("RoadListModule", []);
RoadListModule.controller('RoadListCtrl', function($scope, $stateParams, LoadingInfo, GetInfo) {
    $scope.type = $stateParams.type;
    GetInfo(GetUrl.roadlistinfo, {type: $scope.type}, function(data) {
        $scope.roadlist = data.data.data;
    });
    $scope.loadRoadListInfo = function(){
        LoadingInfo(GetUrl.roadmoreinfo+'?page=', $scope.roadlist.data);
    }
});
/**
 * 推荐景点详情页模块
 */
var RoadDetailModule = angular.module("RoadDetailModule", []);
RoadDetailModule.controller('RoadDetailCtrl', function($scope, $stateParams, LoadingInfo, GetInfo) {
    $scope.type = $stateParams.type;
    // $http.get(GetUrl.roaddetailinfo+'?type='+type).
    //     success(function(data) {
    //         $scope.roaddetail = data.data.data;
    //     }).
    //     error(function(data) {
    //         alert(data.msg);
    //     });
});
/**
 * 推荐景点详情页模块
 */
var RoadDetailModule = angular.module("RoadDetailModule", []);
RoadDetailModule.controller('RoadDetailCtrl', function($scope, $stateParams, LoadingInfo, GetInfo) {
    $scope.type = $stateParams.type;
    // $http.get(GetUrl.roaddetailinfo+'?type='+type).
    //     success(function(data) {
    //         $scope.roaddetail = data.data.data;
    //     }).
    //     error(function(data) {
    //         alert(data.msg);
    //     });
});
/**
 * 订单列表页模块
 */
var OrderListModule = angular.module("OrderListModule", []);
OrderListModule.controller('OrderListCtrl', function($scope, GetInfo) {
    // $http.get(GetUrl.roaddetailinfo+'?type='+type).
    //     success(function(data) {
    //         $scope.roaddetail = data.data.data;
    //     }).
    //     error(function(data) {
    //         alert(data.msg);
    //     });
});
/**
 * 订单详情页模块
 */
var OrderDetailModule = angular.module("OrderDetailModule", []);
OrderDetailModule.controller('OrderDetailCtrl', function($scope, GetInfo) {
    // $http.get(GetUrl.roaddetailinfo+'?type='+type).
    //     success(function(data) {
    //         $scope.roaddetail = data.data.data;
    //     }).
    //     error(function(data) {
    //         alert(data.msg);
    //     });
});
/**
 * 服务网点列表模块
 */
var ServePointListModule = angular.module("ServePointListModule", []);
ServePointListModule.controller('ServePointListCtrl', function($scope, GetInfo) {
    GetInfo(GetUrl.pointlist, function(data) {
        $scope.pointlist = data.data;
    });
});
/**
 * 服务网点模块
 * @function $scope.bdMap {设置地图功能} 
 */
var ServePointModule = angular.module("ServePointModule", []);
ServePointModule.controller('ServePointCtrl', function($scope, bdMapSev, GetInfo) {
    $scope.map = new bdMapSev();  
});
/**
 * 资讯列表模块
 */
var InformatListModule = angular.module("InformatListModule", []);
InformatListModule.controller('InformatListCtrl', function($scope, GetInfo) {
    
});
/**
 * 资讯详情页模块
 */
var InformatDetailModule = angular.module("InformatDetailModule", []);
InformatDetailModule.controller('InformatDetailCtrl', function($scope, GetInfo) {
    
});
/**
 * 注意事项页模块
 */
var AttentionModule = angular.module("AttentionModule", []);
AttentionModule.controller('AttentionCtrl', function($scope, GetInfo) {
    
});
/**
 * 攻略页模块
 */
var StrategyModule = angular.module("StrategyModule", []);
StrategyModule.controller('StrategyCtrl', function($scope, GetInfo) {
    
});

