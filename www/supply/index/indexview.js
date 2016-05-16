define(["zepto",
        "underscore",
        "backbone",
        "baseView",
        "text!infoview.tpl.html",
        "text!msgview.tpl.html",
        "common",
        "infolist",
        "css!index.css"
],
    function($,_,Backbone,BaseView,template,msgtemplate,Common,InfoList){
        var view = BaseView.extend({
            el:$("#main-list"),
            template:_.template(template),
            template_msg:_.template(msgtemplate),
            clickinfo : function(){
                this.option={status:2};
                this.listdata.query(this.option);
                $("#ibtn-info").toggleClass("active",true);
                $("#ibtn-msg").toggleClass("active",false);
            },
            clickmsg : function(){
                this.option={status:1};
                this.listdata.query(this.option);
                $("#ibtn-info").toggleClass("active",false);
                $("#ibtn-msg").toggleClass("active",true);
            },
            events:{
            },
            render:function(){
                if(this.option&&this.option.status==1){
                    this.$el.html(this.template_msg({
                        model: this.listdata.models
                    }));
                }else {
                    this.$el.html(this.template({
                        model: this.listdata.models
                    }));
                }
                this.$el.animate({"opacity":"1"});
                return this;
            },
            initialize:function(option){
                this.option = option;
                this.$el.html(this.template({model:{}}));
                this.$el.css({"opacity":0});
                this.listdata =  new InfoList();
                this.listenTo(this.listdata, "add reset", this.render);
                this.bindEvents();
                //this.render();
            },
            bindEvents:function(){
                var that = this;
                $("#ibtn-info").bind("touchend click",function(){
                    that.clickinfo();
                });
                $("#ibtn-msg").bind("touchend click",function(){
                    that.clickmsg();
                });
            }
        });
        return view;
    }
);