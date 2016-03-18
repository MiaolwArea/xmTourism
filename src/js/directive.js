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
.directive('active', function() {
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
});