define([
	"zepto",
	"underscore",
	"backbone",
	"baseRouter","headView",	
	"keyword"
	],function($,_,Backbone,baseRouter,headView,keyword){
	var AppRouter = baseRouter.extend({
	        routes: {
	            "*path(?*queryString)": "any"
	        },
			routerpath:function(path, queryString){
				path= path?path:Backbone.history.root.substr(1,Backbone.history.root.length-2);
				if(path){
				/*init header*/
				var params = path.trim().split('?');
				if(params.length>1){
					path = params[0];
					queryString=params[1];
				}
				var headerTpl = $("#tpl_"+path.replace('/','_'));
				if(headerTpl.length>0){
					$("#header").html(headerTpl.html());
				}
				if(window.app.curview){
					//window.app.curview.remove&&window.app.curview.remove();
					//$("#main-ctn").html("<div id='main'></div>");
				}
				requirejs.undef("../"+path);
				require(["../"+path],function(module){
					if(module == undefined ){
						console.log('路径有误，请重试！');
						return ;
					}
					var view = new module({queryString:queryString});
					window.app.curview = view;
				});
				}
			}
	    });
	return AppRouter;
});