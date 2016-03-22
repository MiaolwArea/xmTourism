routerApp
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
});