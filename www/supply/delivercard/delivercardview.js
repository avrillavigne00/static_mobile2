define(["zepto",
        "underscore",
        "backbone",
        "baseView",
        "text!../delivercard/delivercard.vue.html",
        "common",
        "vue",
        "css!../delivercard/delivercard.css"],
    function($,_,Backbone,BaseView,template,Common,Vue){
        var view = BaseView.extend({
            el:$("#main"),
            template:_.template(template),
            vdeliverbill:{
                el: '#main',
                data: {
                    delivedate: "",
                },
                computed: {
                    cplanrevdate: {
                        get: function () {
                            if(!this.planrevdate){
                                var curdate = new Date();
                                curdate.setDate(curdate.getDate()+3);
                                this.planrevdate = curdate.toJSON().substr(0,10);
                            }
                            return this.planrevdate;
                        },
                        set: function (v) {
                            if(v){
                                this.planrevdate = v.toString();
                            }
                            return this.planrevdate;
                        }
                    },
                    cdelivedate: {
                        get: function () {
                            if(!this.delivedate){
                                this.delivedate = new Date().toJSON().substr(0,10);
                            }
                            return this.delivedate;
                        },
                        set: function (v) {
                            if(v){
                                this.delivedate = v.toString();
                            }
                            return this.delivedate;
                        }
                    }
                },
                methods: {
                }
            },
            url:"../delivercard/deliverbill.json",
            events:{
                "touchend .j-submit":"deliversubmit"
            },
            queryData : function(op){
                Common.ajax({
                    url:this.url,
                    type:"get",
                    dataType:"json",
                    success:function(data){
                        var bill = data || {};
                        if(this.option.billid){
                            bill.ordercode= bill.ordercode+"+++"+this.option.billid;
                        }
                        this.render(bill);
                    }.bind(this)
                })
            },
            render:function(data){
                this.viewmodel.$data = data || {};
                this.$el.animate({"opacity":"1"});
                return this;
            },
            initialize:function(option){
                this.option = this.option||{};
                this.$el.html(template);
                if(option && option.queryString) {
                    //eval(option.queryString);
                    this.option[option.queryString.split("=")[0].trim()]=option.queryString.split("=")[1].replace("\"");
                }
                this.$el.css({"opacity":0});
                this.viewmodel = new Vue(this.vdeliverbill);
                this.queryData(this.option);
            },
            deliversubmit:function(){
                alert("hi");
            }
        });
        return view;
    }
);