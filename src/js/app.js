var routerApp = angular.module('xmTourismApp', ['ui.router', 'ngTouch', 'ngAnimate', 'HomeModule', 'ServePointModule', 'ServePointListModule', 'TourListModule', 'TourDetailModule', 'RoadListModule', 'RoadDetailModule',
    'OrderListModule', 'OrderDetailModule', 'InformatListModule', 'InformatDetailModule', 'AttentionModule', 'StrategyModule']);
/**
 * 这里把$state和$stateParams这两个对象放到$rootScope上，方便其它地方引用和注入。
 */
routerApp.run(function($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
});

/**
 * 配置路由。
 * @param $stateProvider {[type]} 
 * @param $urlRouterProvider {[type]} 
 */
routerApp.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/index');
    $stateProvider
        .state('index', {
            url: '/index',
            views: {
                '': {
                    templateUrl: 'ui/home.html'
                }
            }
        })
        .state('tourlist',{
            url: '/tourlist',
            templateUrl: 'ui/tourlist.html'
        })
        .state('tourdetail',{
            url: '/tourdetail/:Id',
            templateUrl: 'ui/tourdetail.html'
        })
        .state('roadlist',{
            url: '/roadlist/:type',
            templateUrl: 'ui/roadlist.html'
        })
        .state('roaddetail',{
            url: '/roaddetail/:Id/:type',
            templateUrl: 'ui/roaddetail.html'
        })
        .state('orderlist',{
            url: '/orderlist/:type',
            templateUrl: 'ui/orderlist.html'
        })
        .state('orderdetail',{
            url: '/orderdetail/:Id',
            templateUrl: 'ui/orderdetail.html'
        })
        .state('servepointlist',{
            url: '/servepointlist',
            templateUrl: 'ui/servepointlist.html'
        })
        .state('servepoint',{
            url: '/servepoint',
            templateUrl: 'ui/servepoint.html'
        })
        .state('informatlist',{
            url: '/informatlist',
            templateUrl: 'ui/informatlist.html'
        })
        .state('informatdetail',{
            url: '/informatdetail',
            templateUrl: 'ui/informatdetail.html'
        })
        .state('attention',{
            url: '/attention',
            templateUrl: 'ui/attention.html'
        })
        .state('strategy',{
            url: '/strategy',
            templateUrl: 'ui/strategy.html'
        });
});

