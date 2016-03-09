<div class="home" ng-controller="HomeCtrl">
	<div id="mycarousel" class="carousel slide" data-ride="carousel">
		<!-- Indicators -->
	  <ol class="carousel-indicators">
	    <li ng-repeat="data in homeinfos.slidepics" data-target="#mycarousel" data-slide-to="{{$index}}" class="{{$index==0?'active':''}}"></li>
	  </ol>
	  <!-- Wrapper for slides -->
	  <div class="carousel-inner" role="listbox">
	    <div ng-repeat="data in homeinfos.slidepics" class="item {{$index==0?'active':''}}">
	      <img src="{{data.image}}" alt="{{data.title}}">
	    </div>
	  </div>
	  <!-- Controls -->
	  <a class="left carousel-control" href="#mycarousel" role="button" data-slide="prev"></a>
	  <a class="right carousel-control" href="#mycarousel" role="button" data-slide="next"></a>
	</div>
	<!-- end:首页轮播图 -->
	<div class="container row notice">
		<div class="col-xs-4 text-center"><i class="iconfont icon-gonggao fz24 mr10"></i><span class="fz24">公告</span><span class="fr">|</span></div>	
		<div class="col-xs-8"><span>厦门旅游最新消息</span></div>	
	</div>
	<!-- end:公告 -->
	<hr class="line"></ht>
	<div id="main">
		<div class="container">
			<div class="modal fade" id="myModal">
			  	<div class="modal-dialog">
			    	<div class="modal-content">
			      	<div class="modal-header">
			        	<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
			        	<h4 class="modal-title">Sorry!</h4>
			      	</div>
			      	<div class="modal-body">
			        	<p>敬请期待&hellip;</p>
			      	</div>
			      	<div class="modal-footer">
			        	<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
			        	<button type="button" class="btn btn-primary">确认</button>
			      	</div>
			    	</div><!-- /.modal-content -->
			  	</div><!-- /.modal-dialog -->
			</div><!-- /.modal -->
			<!-- end:模态框 -->
			<div class="row navs pb20">
				<div class="col-xs-3">
					<a ui-sref="tourlist">
						<div class="img-circle shallowgreen navs-item text-center">
							<i class="iconfont icon-xiangji"></i>
							<span>旅游景点</span>
						</div>
					</a>
				</div>	
				<div class="col-xs-3">
					<a href="">
						<div class="img-circle pink navs-item text-center">
							<i class="iconfont icon-zuobiao"></i>
							<span>推荐路线</span>
						</div>
					</a>
				</div>	
				<div class="col-xs-3">
					<a href="">
						<div class="img-circle orange navs-item text-center">
							<i class="iconfont icon-liebiao"></i>
							<span>我的订单</span>
						</div>
					</a>
				</div>		
				<div class="col-xs-3">
					<a ui-sref="servepointlist">
						<div class="img-circle deepbrown navs-item text-center">
							<i class="iconfont icon-Partner_07"></i>
							<span>服务网点</span>
						</div>
					</a>
				</div>
			</div>
			<!-- end:navs -->
			<section class="theme">
				<h3>特色主题</h3>
				<div class="row">
					<div class="col-xs-6">
						<div class="thumbnail">
							<div class="row">
								<div class="col-xs-8"><a href="">景区导览</a></div>
								<div class="col-xs-4 text-center"><div class="theme-icon"><i class="iconfont icon-iconfontluxian fz21"></i></div></div>
							</div>
						</div>
					</div>	
					<div class="col-xs-6">
						<div class="thumbnail">
							<div class="row">
								<div class="col-xs-8"><a href="">旅游资讯</a></div>
								<div class="col-xs-4 text-center"><div class="theme-icon"><i class="iconfont icon-lvxing fz21"></i></div></div>
							</div>
						</div>
					</div>	
					<div class="col-xs-6">
						<div class="thumbnail">
							<div class="row">
								<div class="col-xs-8"><a href="">自定义导览</a></div>
								<div class="col-xs-4 text-center"><div class="theme-icon"><i class="iconfont icon-feiji fz21"></i></div></div>
							</div>
						</div>
					</div>
					<div class="col-xs-6">
						<div class="thumbnail">
							<div class="row">
								<div class="col-xs-8"><a href="">自定义导览</a></div>
								<div class="col-xs-4 text-center"><div class="theme-icon"><i class="iconfont icon-wenjian fz21"></i></div></div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<!-- end:主题theme -->
			<section class="recommend">
				<h3>景点推荐</h3>
				<div class="row">
					<div class="col-xs-6" ng-repeat="data in homeinfos.recommend.data">
						<div class="thumbnail">
							<a href="">
								<img src="{{data.image}}" alt="{{data.title}}">
								<div class="aside-r {{data.activity=='今日可用'? 'green':'red'}}">{{data.activity}}</div>
						      	<div class="caption">
						        	<h5>{{data.title}}</h5>
						        	<div class="content"><del class="offered">￥{{data.offered}}</del><span class="fr"><span class="price">￥{{data.price}}</span>起</span></div>
						      	</div>
							</a>
						</div>
					</div>		
				</div>
				<a loading howToLoad="loadRecommendInfo" class="more text-center"><div href="">查看更多</div><div class="arrow-r"></div></a>
			</section>
			<!-- end:主题recommend -->
			<section class="itinerary">
				<h3>路线推荐</h3>
				<div class="row">
					<div class="col-xs-6" ng-repeat="data in homeinfos.itinerary.data">
						<div class="thumbnail">
							<a href="">
								<img src="{{data.image}}" alt="{{data.title}}">
								<div class="aside-r {{data.activity=='今日可用'? 'green':'red'}}">{{data.activity}}</div>
						      	<div class="caption">
						        	<h5>{{data.title}}</h5>
						        	<div class="content"><del class="offered">￥{{data.offered}}</del><span class="fr"><span class="price">￥{{data.price}}</span>起</span></div>
						      	</div>
							</a>
						</div>
					</div>		
				</div>
				<a loading howToLoad="loadItineraryInfo" class="more text-center"><div href="">查看更多</div><div class="arrow-r"></div></a>
			</section>
			<!-- end:路线itinerary -->
		</div>
	</div>
	<!-- end:main -->
<script type="text/javascript" src="js/common/toucher.js"></script>
<script type="text/javascript" src="js/common/public.js"></script>
</div>