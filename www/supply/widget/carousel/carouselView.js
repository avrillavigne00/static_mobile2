define(["zepto",
        "underscore",
        "backbone",       
        "text!widget/carousel/carousel.tpl.html",
        "/carouselcollection",
        "common",
        "swipe"],
	function($,_,Backbone,template,carouselcollection,Common,Swipe){
		var carousel = Backbone.View.extend({
			template:_.template(template),			
			render:function(){
				var that = this;
				this.$el.html(this.template({ADList:this.collection.models,Common:Common}));
				this.$el.find("#carouselswipe").Swipe({callback:function(index){
					//fix wrong indicator position when length < 3 caused by Swiper.js . 8/4/2014
					var critical = that.collection.models.length;
					if(critical < 3){
						that.$el.find(".carousel-indicator span").removeClass("curr").eq(index%critical).addClass("curr");	
					}
					else{
						that.$el.find(".carousel-indicator span").removeClass("curr").eq(index).addClass("curr");	
					}
					//that.$el.find(".carousel-indicator span").eq(index)
				}});
				this.$el.find(".carousel-indicator span").first().addClass("curr");			
				return this;
			},
			initialize:function(option){			
				this.el = option.el;				
				this.collection = new carouselcollection();
				this.listenTo(this.collection,"reset",this.render);							
			}
		});
		return carousel;
	}
);