window.onload=function(){

    //费随车， 内部工单方式 独立发送装潢.
    $('#sendDecoration').click(function () {/*
        $.ajax({
            type: "GET",
            url: "/insurance/senddecorationseparately?foc="+$("#formalOrderCode").val(),
            dataType: "json",
            success: function(data){
                if(data==0) {
                    layer.msg("发送成功");
                    $(this).parent().remove();
                }else if(data==2){
                    layer.msg("装潢单已发料，已开票，已归集不能发送。");
                }else if(data==3){
                    layer.msg("主单尚未登记，装潢不能登记");
                }else{
                    layer.msg("发送失败");
                }
            }
        });
    */});


};