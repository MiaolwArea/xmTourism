routerApp
.directive('loading', function($http){
	return {
    	restrict:"AE",
    	link:function(scope,element,attrs){
    		element.bind('click', function(event) {
    			scope.$apply(attrs.howtoload)();
    		});
        }
    }; 
})
.directive('backtop', function($http){
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
			})
        }
    }; 
});