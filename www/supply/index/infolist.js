define(["zepto","underscore","backbone","baseCollection","common"],
    function($,_,Backbone,baseCollection,common){
        var infolistdata = baseCollection.extend({
            url:"info.json",
            initialize:function(option){
                this.query(option);
            },
            query:function(option){
                var that = this;
                var data = this.mergeDefault(option);
                /**此处用于模拟不同参数不同查询结果*/
                if(option&&option.status == 1){
                    this.url = "msg.json";
                }
                else{
                    this.url = "info.json";
                }
                common.ajax({
                    url:this.url,
                    type:"get",
                    data:data,
                    success:function(data){
                        //that.add(data);
                        that.reset(data);
                    }
                })
            },
            mergeDefault:function(option){
                var DefaultOption ={
                    "pageIndex":this.pageIndex,
                    "pageSize":this.pageSize
                };
                $.extend(DefaultOption,option)
                return DefaultOption;
            }
        });
        return infolistdata;
    }
);