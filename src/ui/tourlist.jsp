<div id="tourlist" ng-controller="TourListCtrl">
	<div class="search">
		<div class="container seach-content">
			<div class="input-group">
		    	<input type="text" class="form-control" placeholder="输入内容...">
		    	<span class="input-group-btn">
		    		<button class="btn btn-default" type="button">搜索</button>
		    	</span>
		    </div><!-- /input-group -->
		</div>
	</div>
	<div class="container">
		<div class="media" ng-repeat="data in tourlist">
			<a ui-sref="tourdetail({Id:12})">
			  	<div class="media-left media-middle">
				    <div class="list-pic">
				      	<img class="media-object" src="{{data.image}}" alt="{{data.title}}">
						<div class="aside-r green">{{data.activity}}</div>
				    </div>
			  	</div>
			  	<div class="media-body">
				    <h4 class="media-heading">{{data.title}}</h4>
				    <p>{{data.description}}</p>
				    <div class="pirce">
				    	<div class="p-l fl">月销：{{data.sales}}</div>
				    	<div class="p-r fr"><span>￥{{data.price}}</span>起</div>
				    </div>
			  	</div>
		  	</a>
		</div>
		<a loading howToLoad="loadTourListInfo" class="more text-center"><div href="">查看更多</div><div class="arrow-r"></div></a>	
		<backTop></backTop>	
	</div>
</div>