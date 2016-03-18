var routerApp = angular.module('xmTourismApp', ['ui.router', 'ui.bootstrap', 'ngTouch', 'ngAnimate', 'ngMessages', 'HomeModule', 'ServePointModule', 'ServePointListModule', 'TourListModule', 'TourDetailModule', 'RoadListModule', 'RoadDetailModule',
    'OrderListModule', 'OrderDetailModule', 'OrderFillModule', 'InformatListModule', 'InformatDetailModule', 'AttentionModule', 'StrategyModule']);
/**
 * 把$state和$stateParams这两个对象放到$rootScope上，方便其它地方引用和注入。
 */
routerApp.run(function($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
});

/**
 * 配置路由。
 */
routerApp.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/index');
    $stateProvider
        .state('index', {
            url: '/index',
            views: {
                '': {
                    templateUrl: 'ui/home.html',
                    controller: 'HomeCtrl'
                }
            }
        })
        .state('tourlist',{
            url: '/tourlist',
            templateUrl: 'ui/tourlist.html',
            controller: 'TourListCtrl'
        })
        .state('tourdetail',{
            url: '/tourdetail/:Id',
            templateUrl: 'ui/tourdetail.html',
            controller: 'TourDetailCtrl'
        })
        .state('roadlist',{
            url: '/roadlist/:type',
            templateUrl: 'ui/roadlist.html',
            controller: 'RoadListCtrl'
        })
        .state('roaddetail',{
            url: '/roaddetail/:Id/:type',
            templateUrl: 'ui/roaddetail.html',
            controller: 'RoadDetailCtrl'
        })
        .state('orderlist',{
            url: '/orderlist/:type',
            templateUrl: 'ui/orderlist.html',
            controller: 'OrderListCtrl'
        })
        .state('orderdetail',{
            url: '/orderdetail/:Id',
            templateUrl: 'ui/orderdetail.html',
            controller: 'OrderDetailCtrl'
        })
        .state('orderfill',{
            url: '/orderfill/:Id',
            templateUrl: 'ui/orderfill.html',
            controller: 'OrderFillCtrl'
        })
        .state('servepointlist',{
            url: '/servepointlist',
            templateUrl: 'ui/servepointlist.html',
            controller: 'ServePointListCtrl'
        })
        .state('servepoint',{
            url: '/servepoint',
            templateUrl: 'ui/servepoint.html',
            controller: 'ServePointCtrl'
        })
        .state('informatlist',{
            url: '/informatlist',
            templateUrl: 'ui/informatlist.html',
            controller: 'InformatListCtrl'
        })
        .state('informatdetail',{
            url: '/informatdetail',
            templateUrl: 'ui/informatdetail.html',
            controller: 'InformatDetailCtrl'
        })
        .state('attention',{
            url: '/attention/:page',
            templateUrl: 'ui/attention.html',
            controller: 'AttentionCtrl'
        })
        .state('strategy',{
            url: '/strategy',
            templateUrl: 'ui/strategy.html',
            controller: 'StrategyCtrl'
        })
        .state('activity',{
            url: '/activity',
            templateUrl: 'ui/activity.html',
            controller: 'ActivityCtrl'
        });
});

