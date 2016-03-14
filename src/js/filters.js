routerApp
.filter('to_trusted', function ($sce) {  
        return function (text) {  
            return $sce.trustAsHtml(text);  
        }  
    }  
) 
.filter('cut', function () { // 自带过滤器limitTo,不符合需求时可使用
	return function (value, wordwise, max, tail) {
		if (!value) return '';

		max = parseInt(max, 10);
		if (!max) return value;
		if (value.length <= max) return value;

		value = value.substr(0, max);
		if (wordwise) {
			var lastspace = value.lastIndexOf(' ');
			if (lastspace != -1) {
				value = value.substr(0, lastspace);
			}
		}

		return value + (tail || '…');
	};
}); 