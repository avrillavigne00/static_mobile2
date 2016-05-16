define(["zepto",
        "underscore",
        "backbone",
        "baseView",
        "vue",
        "text!deliverlistview.vue.html",
        "common",
        "css!deliverlistview.css"],
    function($,_,Backbone,BaseView,Vue,template,Common){
        var view = BaseView.extend({
            el:$("#main"),
            events:{
            },
            vlistdata:{
                el: '#datalist',
                data: {
                    pages : 0,
                    items:[
                    ]
                },
                methods: {

                }
            },
            render:function(data) {
                if (data && data.length>0) {
                    if(this.viewmodel.items && this.viewmodel.items.length==0){
                        this.viewmodel.items = data;
                    }else {
                        for (i in data) {
                            this.viewmodel.items.push(data[i]);
                        }
                    }
                }else{
                    this.viewmodel.items=[];
                }
                if(!this.option.status){
                    this.option.status = 0;
                }
                this.$el.find(".sync-status li").eq(this.option.status).addClass("active");
                this.$el.animate({"opacity":".9"});
                return this;
            },
            initialize:function(option){
                this.$el.css({"opacity":0});
                this.$el.html(template);
                this.option = option;
                this.viewmodel = new Vue(this.vlistdata);
                this.queryData(this.option);
                this.bindEvents();
            },
            queryData: function(op){
                Common.ajax({
                    url:"deliverlistdata.json",
                    type:"get",
                    dataType:"JSON",
                    success:function(data){
                        this.render(JSON.parse(data));
                    }.bind(this)
                });
            },
            bindEvents:function(){
                var that = this;
                $(".segmented-control .control-item").off("touchend").on("touchend",function(){
                    window.location.href=$(this).attr("href");
                });
                this.$el.undelegate().delegate(".sync-status li","touchend",function(){
                    that.$el.html(that.template());
                    if(!that.option){
                        that.option = {};
                    }
                    that.option.status = $(this).attr("data-status");
                    that.queryData({status:$(this).attr("data-status")});
                });
                this.$el.delegate(".j-query4more","touchend",function(){
                    that.viewmodel.pages++;
                    that.queryData();
                });
            }
        });
        return view;
    }
);