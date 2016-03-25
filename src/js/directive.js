routerApp
.directive('loading', function($http) {
	return {
    	restrict:"AE",
    	link:function(scope, element, attrs){
    		element.bind('click', function(event) {
    			scope.$apply(attrs.howtoload);
    		});
        }
    }; 
})
.directive('backtop', function($http) {
	return {
    	restrict: "AE",
    	template: "<a class='backtops'></a>",
    	replace: true,
    	link:function(scope,element,attrs){
			$(window).scroll(function(){
				var scrollt = document.documentElement.scrollTop + document.body.scrollTop;
				if( scrollt >10 ){ 
					element.fadeIn(400).bind('click',function(){
						$("html,body").animate({scrollTop:"0px"},200);
					});
				}else{      
					element.stop().fadeOut(400); 
				}
			});
        }
    }; 
})
.directive('actives', function() {
    return {
        restrict: "AE",
        link:function(scope, element, attrs){
            element.bind('click', function(){
                element.addClass('active');
                element.siblings().removeClass('active');
                scope.userinfo.price = parseInt(attrs.price);
                scope.userinfo.date = attrs.date;
                if (!scope.$$phase) {
                    scope.$apply();
                }
                if(attrs.price === undefined){
                    scope.userinfo.price = scope.initprice;
                    scope.userinfo.date = scope.dt;
                    angular.element('.date-list>div').removeClass('active');
                }
            })
        }
    }; 
})
.directive('getelmatrs', function() {
    return {
        restrict: "AE",
        link:function(scope, element, attrs){
            scope.attrs = attrs;
        }
    }; 
})
.directive('dirmessages', function() {
    return {
        restrict: "AE",
        template: '<div class="alert alert-danger" role="alert" ng-message="required">必填项</div>\
                    <div class="alert alert-danger" role="alert" ng-message="email">邮件格式不对</div>\
                    <div class="alert alert-danger" role="alert" ng-message="pattern">格式不对</div>\
                    <div class="alert alert-danger" role="alert" ng-message="minlength">字符太短,小于{{attrs.ngMinlength}}</div>\
                    <div class="alert alert-danger" role="alert" ng-message="maxlength">字符太长,大于{{attrs.ngMaxlength}}</div>',
        link:function(scope, element, attrs, ctrl){}
    }; 
})
.directive('datepicker', function() {
    return {
        restrict: "AE",
        template: '<p class="input-group">\
                        <input type="text" class="form-control" uib-datepicker-popup="{{format}}" ng-model="dt" is-open="popup1.opened" datepicker-options="dateOptions" ng-required="true" close-text="Close" alt-input-formats="altInputFormats" />\
                        <span class="input-group-btn">\
                            <button type="button" class="btn btn-default" ng-click="open1()"><i class="glyphicon glyphicon-calendar"></i></button>\
                        </span>\
                    </p>',
        replace: true,
        link:function(scope, element, attrs){
                scope.today = function() {
                scope.dt = new Date();
            };
            scope.today();

            scope.clear = function() {
                scope.dt = null;
            };

            scope.inlineOptions = {
                customClass: getDayClass,
                minDate: new Date(),
                showWeeks: true
            };

            scope.dateOptions = {
                dateDisabled: disabled,
                formatYear: 'yy',
                maxDate: new Date(2020, 5, 22),
                minDate: new Date(),
                startingDay: 1
            };

            // Disable weekend selection
            function disabled(data) {
                var date = data.date,
                    mode = data.mode;
                return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
            }

            scope.toggleMin = function() {
                scope.inlineOptions.minDate = scope.inlineOptions.minDate ? null : new Date();
                scope.dateOptions.minDate = scope.inlineOptions.minDate;
            };

            scope.toggleMin();

            scope.open1 = function() {
                scope.popup1.opened = true;
            };

            scope.format = 'dd-MMMM-yyyy';
            scope.altInputFormats = ['M!/d!/yyyy'];

            scope.popup1 = {
                opened: false
            };
            
            function getDayClass(data) {
                var date = data.date,
                    mode = data.mode;
                if (mode === 'day') {
                    var dayToCheck = new Date(date).setHours(0,0,0,0);

                    for (var i = 0; i < scope.events.length; i++) {
                        var currentDay = new Date(scope.events[i].date).setHours(0,0,0,0);
                        if (dayToCheck === currentDay) {
                            return scope.events[i].status;
                        }
                    }
                }
                return '';
            }
        }
    }; 
})
.directive('bdmap', function($http,$compile,$timeout){ 
    return {
        restrict: "AE",
        template: '<div class="mapfunction"><div id="mappoint-map"></div>\
                    <div class="pointsearch">\
                        <i class="iconfont icon-sousuo"></i>\
                        <div class="goleft"></div>\
                        <input type="text" class="form-control" ng-model="searchctxt" placeholder="搜索...">\
                        <pre ng-show="searchctxt">\
                            <ul class="searchctxt-list list-group">\
                                <li class="list-group-item" ng-repeat="result in results track by $index"><a ng-click="searchIn(result.id,result.coordinate)" ng-bind-html="result.name|to_trusted"></a></li>\
                            </ul>\
                            <div ng-show="nodata" class="nodata">无搜索结果！</div>\
                        </pre>\
                    </div>\
                    </div>',
        replace: true,
        link:function(scope, element, attrs){
            $http.get(GetUrl.guide).success(function(data){
                scope.guideinfo = data.data;
                bdMap(scope.guideinfo);
                // 搜索
                scope.$watch('searchctxt', function(newVal, oldVal) {
                    scope.results = [];
                    if(scope.searchctxt != undefined) var ft = scope.searchctxt.toLowerCase();
                    if (newVal !== oldVal) {
                        $timeout(function() {
                            angular.forEach(scope.guideinfo, function(data,index,array){
                                var patten = new RegExp(""+ft+"");
                                if(patten.test(data.name)){
                                    scope.nodata = false;
                                    var newname = data.name.replace(patten, "<span style='font-weight: bold;color: #000;'>"+ft+"</span>");
                                    scope.results.push({
                                        id: data.id,
                                        name: newname,
                                        coordinate: data.coordinate
                                    });
                                }else{
                                    scope.nodata = true;
                                }
                            });
                        }, 100, true);
                    }
                }, true);
            });
            var bdMap = function(guideinfo){
                var pwe = guideinfo[0].coordinate.split(',')
                var map = new BMap.Map("mappoint-map");
                var point = new BMap.Point(parseFloat(pwe[0]), parseFloat(pwe[1]));
                var top_right_navigation = new BMap.NavigationControl({anchor: BMAP_ANCHOR_BOTTOM_RIGHT, type: BMAP_NAVIGATION_CONTROL_SMALL});
                map.addControl(top_right_navigation);    
                map.centerAndZoom(point, 14);

                var wininfo = [];
                // 编写自定义函数,创建标注
                function addMarker(point,infodata){
                    var marker = new BMap.Marker(point);
                    map.addOverlay(marker);
                    var sContent = "<div class='markerinfo'><h4 class='markerinfotitle'>"+infodata.name+"</h4>" 
                        + "<p class='markerinfoaddress'>地址："+infodata.address+"</p>" 
                        + "<a ui-sref='tourdetail({Id:"+infodata.id+"})'>详细信息>></a>" 
                        + "<a class='tohere' href='http://map.baidu.com/mobile/webapp/place/linesearch/foo=bar/end=word="+infodata.name+"&point="+infodata.coordinate+"&citycode=194&from=place'>到这里<i class='iconfont icon-dingweiyuandian'></i></a>" 
                        + "</div>";
                    var infoWindow = new BMap.InfoWindow($compile(sContent)(scope)[0]);  // 创建信息窗口对象 
                    marker.addEventListener("click", function(e){
                        map.openInfoWindow(infoWindow,point); //开启信息窗口
                    });
                    wininfo[infodata.id] = infoWindow;
                }
                scope.searchIn = function(id, coordinate){
                    scope.searchctxt = '';
                    var pwe = coordinate.split(',');
                    map.openInfoWindow(wininfo[id],new BMap.Point(parseFloat(pwe[0]), parseFloat(pwe[1])));
                }
                angular.forEach(guideinfo, function(data,index,array){
                    var we = data.coordinate.split(',')
                    var point = new BMap.Point(parseFloat(we[0]), parseFloat(we[1]));
                    addMarker(point,data);
                });
            };
        }
    };
});
