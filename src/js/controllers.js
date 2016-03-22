/**
 * 首页模块
 */
var HomeModule = angular.module("HomeModule", []);
HomeModule.controller('HomeCtrl', function($scope, LoadingInfo, GetInfo) {
    $scope.modal = true;
    $scope.AnimateClass = 'scaling';
    $scope.myInterval = 5000;
    $scope.noWrapSlides = false;
    GetInfo(GetUrl.homeinfo, function(data) {
        $scope.homeinfos = data.data;
    })
    $scope.loadRoadInfo = function(action) {
        LoadingInfo(action, GetUrl.loaddata, {type: 'road'}, $scope.homeinfos.road.data);
    };
    $scope.loadItineraryInfo = function(action) {
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
            alert('请输入关键字!');
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
 * 推荐路线列表页模块
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
 * 推荐路线详情页模块
 */
var RoadDetailModule = angular.module("RoadDetailModule", []);
RoadDetailModule.controller('RoadDetailCtrl', function($scope, $stateParams, LoadingInfo, GetInfo) {
    $scope.id = $stateParams.Id;
    $scope.type = $stateParams.type;
    GetInfo(GetUrl.roaddetail, {id: $scope.id}, function(data) {
        $scope.roaddetail = data.data;
        $scope.roaddetail.roadtitle = data.data.roadtitle.split('|');
    });
});
/**
 * 订单列表页模块
 */
var OrderListModule = angular.module("OrderListModule", []);
OrderListModule.controller('OrderListCtrl', function($scope, GetInfo) {
    GetInfo(GetUrl.orderlist, function(data) {
        $scope.orderlist = data.data;
    });
});
/**
 * 订单详情页模块
 */
var OrderDetailModule = angular.module("OrderDetailModule", []);
OrderDetailModule.controller('OrderDetailCtrl', function($scope, $stateParams, GetInfo) {
    $scope.id = $stateParams.Id;
    GetInfo(GetUrl.orderdetail, {id: $scope.id}, function(data) {
        $scope.orderdetail = data.data;
    });
});

/**
 * 订单填写页模块
 */
var OrderFillModule = angular.module("OrderFillModule", []);
OrderFillModule.controller('OrderFillCtrl', function($scope, $stateParams, $http, GetInfo) {
    var price,date,userInfoCache = [];
    $scope.action = 'ticket';
    $scope.id = $stateParams.id;
    $scope.userinfo = {};
    $scope.userInfoCache = [];

    GetInfo(GetUrl.orderticket, {id: $scope.id}, function(data) {
        $scope.orderticket = data.data;
        $scope.initprice = $scope.orderticket.price;
        price = $scope.orderticket.today.price;
        date = $scope.orderticket.today.date;
        $scope.initdata();
    });
    $scope.initdata = function() {
        $scope.userinfo.price = price;
        $scope.userinfo.date = date;
        $scope.userinfo.type = '成人票';
    };
    $scope.add = function(params) {
        $scope.userInfoCache.push($scope.userinfo);
        $scope.userinfo = {};
        $scope.initdata();
        $scope.action = params;
    };
    $scope.newadd = function(params) {
        $scope.initdata();
        $scope.action = params;
    };
    $scope.save = function() {
        $http.post(GetUrl.orderticket, {data: $scope.userInfoCache}).success(function(data){

        });
    };
    // $scope.isUnchanged = function(user) {
    //     return angular.equals(user, $scope.master);
    // };
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
 * 景点导览模块
 */
var GuideModule = angular.module("GuideModule", []);
GuideModule.controller('GuideCtrl', function($scope, $http) {
    
});
/**
 * 资讯列表模块
 */
var InformatListModule = angular.module("InformatListModule", []);
InformatListModule.controller('InformatListCtrl', function($scope, GetInfo) {
    GetInfo(GetUrl.informatList, function(data) {
        $scope.informatList = data.data;
    });
});
/**
 * 注意事项页模块
 */
var AttentionModule = angular.module("AttentionModule", []);
AttentionModule.controller('AttentionCtrl', function($scope, $stateParams, GetInfo) {
    var pagename = $stateParams.page;
    if(pagename == ''){
        $scope.showpic = false;
        angular.element('html head title').text('注意事项');
        GetInfo(GetUrl.attention, function(data) {
            $scope.attention = data.data;
        });
    }else{
        $scope.showpic = true;
        angular.element('html head title').text('关于我们')
    }
});
/**
 * 攻略页模块
 */
var StrategyModule = angular.module("StrategyModule", []);
StrategyModule.controller('StrategyCtrl', function($scope, GetInfo) {
    GetInfo(GetUrl.strategy, function(data) {
        $scope.strategy = data.data;
    });
});
/**
 * 活动页模块
 */
var ActivityModule = angular.module("ActivityModule", []);
ActivityModule.controller('ActivityCtrl', function($scope, GetInfo) {
    GetInfo(GetUrl.activity, function(data) {
        $scope.activity = data.data;
    });
});

