var routerApp = angular.module('xmTourismApp', ['ui.router', 'HomeModule', 'ServePointModule', 'ServePointListModule', 'TourListModule', 'TourDetailModule']);
/**
 * 由于整个应用都会和路由打交道，所以这里把$state和$stateParams这两个对象放到$rootScope上，方便其它地方引用和注入。
 * 这里的run方法只会在angular启动的时候运行一次。
 * @param $rootScope {[type]} 
 * @param $state {[type]} 
 * @param $stateParams {[type]} 
 */
routerApp.run(function($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
});

/**
 * 配置路由。
 * 注意这里采用的是ui-router这个路由，而不是ng原生的路由。
 * ng原生的路由不能支持嵌套视图，所以这里必须使用ui-router。
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
                    templateUrl: 'ui/home.jsp'
                }
            }
        })
        .state('tourlist',{
            url: '/tourlist',
            templateUrl: 'ui/tourlist.jsp'
        })
        .state('tourdetail',{
            url: '/tourdetail/:Id',
            templateUrl: 'ui/tourdetail.jsp'
        })
        .state('servepointlist',{
            url: '/servepointlist',
            templateUrl: 'ui/servepointlist.jsp'
        })
        .state('servepoint',{
            url: '/servepoint',
            templateUrl: 'ui/servepoint.jsp'
        });
});

