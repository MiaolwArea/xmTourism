routerApp
.factory('bdMapSev', function($http){
	var bdMap = function(){
		this.marker = '';
		this.map = new BMap.Map("mappoint-map");  
        this.init();
    };
	bdMap.prototype = {
		init : function(){         
	        this.map.centerAndZoom(new BMap.Point(116.404, 39.915), 15);
	        var local = new BMap.LocalSearch(this.map, {
	            renderOptions:{map: this.map}  
	        });
	        this.map.clearOverlays(); 
	        this.dragMarker(118.07491,24.482206);
		},
		dragMarker : function(pointX,pointY){
			var new_point = new BMap.Point(pointX, pointY);
            this.map.panTo(new_point);
            // 拖拽坐标
            marker = new BMap.Marker(new_point);  // 创建标注
            this.map.addOverlay(marker);              // 将标注添加到地图中
            var label = new BMap.Label("拖拽坐标确定位置",{offset:new BMap.Size(20,-10)});
            marker.setLabel(label);
            this.map.addOverlay(marker); 
            marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画 
            marker.enableDragging();    //可拖拽
            marker.addEventListener("dragend", function(e){//将结果进行拼接并显示到对应的容器内
                pointX = e.point.lng;
                pointY = e.point.lat;
                $('.quicklist-r .linktop .message-num').attr('data-point',pointX+','+pointY);
            });
		},
		dragEvent: function(){
			this.map.addEventListener("click", function(e){
	            pointX = e.point.lng;
	            pointY = e.point.lat;
	            $('.quicklist-r .linktop .message-num').attr('data-point',pointX+','+pointY);
	            this.map.removeOverlay(marker);
	            dragMarker(pointX,pointY);
	        });
	        local.search($scope.start);
		},
		transformation: function(){

		}
	};
	return bdMap;
})
.factory('GetInfo',function($http){
	return function (url, params, callback, error) {
		if(typeof params == 'function'){
			callback = params;
			error = callback;
			params = '';
		}
        var req = {
	        method: 'GET',
	        url: url,
            params: params
	    };
		$http(req).
	        success(function(data) {
	            callback(data);
	        }).
	        error(function(data) {
	            error(data.msg);
	        });
	};
})
.service('LoadingInfo',function(GetInfo){
	var num = 1;
	return function (action, geturlofser, key, originaldata) {
		if(key.page === undefined){
			if(action == 'next'){
				num++;
			}else if(action == 'prev'){
				num--;
			}else{
				return false;
			}
			key.page = num;
			GetInfo(geturlofser, key, function(data) {
		        for(var i in data.data.data)
	                originaldata.push(data.data.data[i]);
	            num = data.data.num;
		    },function(){
		    	alert(data.msg);
		    })
		}
	};
})
.service('Search',function(GetInfo){
	return function (searchpage) {
		var timeout;
		$scope.$watch('searchtxt', function(NewSearchTxt){
	        if(NewSearchTxt) {
	            if(timeout) {
	                $timeout.cancel(timeout);
	            }
	            timeout = $timeout(function() {
	                GetInfo(GetUrl.search, {type: searchpage, keyword: NewSearchTxt}, function(data) {
	                    // 搜索关键词加粗处理：遍历，正则匹配搜索词，加标签替换搜索结果
	                    $scope.results = data.data.results;
	                });
	            }, 350);
	        }
	    })
	};
}).factory("pageClass",function(){
 return {};
});