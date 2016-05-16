define(["zepto","underscore","backbone","/carouselmodel","common","baseCollection"],
		function($,_,Backbone,BizModel,common,baseCollection){
	var prodcollection = baseCollection.extend({
		debugUrl:"/static/market/widget/carousel/carouse.json",
		url:"",
		model:BizModel,
		initialize:function(option){
			var that = this;	
			//var data = this.mergeDefault(option)
		},
		query:function(){
			common.ajax({
				url:this.debugUrl,
				type:"GET",
				dataType:"json",
				success:function(data){
					this.reset(data);
				}.bind(this)
			})
		}
	});
	return prodcollection;
	}
);