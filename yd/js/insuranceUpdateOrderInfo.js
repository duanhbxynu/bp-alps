
$(document).ready(function () {
    $('input[id^="salePriceGuarantee"]').each(function(){
        $(this).attr("readonly","readonly");
    });
    $("#delayInsurance").find('input[id^="delaysalePricecart"]').each(function(){
        $(this).attr("readonly","readonly");
    });

    $("#collapseFive").find('input[id^="salePrice"]').each(function(){
        $(this).attr("readonly","readonly");
    });
    $('#formalOrderSubmitV2').click(function(){
        var _this = $(this);
        _this.attr('disabled', true);
        if($("input[name='attachmentOrder.selected']").prop('checked'))
        {
            var temp=$('input[name^="attachmentOrder.attachmentProductFormList"]');
            if(temp&&temp.length<1){
                if($("#attachmentLength").val()!=""&&$("#attachmentLength").val()>0) {
                    parent.layer.open({
                        title: '【ECM消息提示】',
                        content: '删除装潢保存提交并发送DBM！',
                        icon:0,
                        end:function(){
                            $.ajax({
                                type: "GET",
                                url: "/statementOrder/senddecorationseparatelyDelete?foc="+$("#orderCode").val(),
                                dataType: "json",
                                success: function(data){
                                    parent.layer.close(index);
                                    if(data==0) {
                                        layer.msg("删除成功");
                                        $("#formalOrderFormV2").submit();
                                    }else if(data==2){
                                        layer.msg("发送失败,装潢单状态已发送。");
                                    }else{
                                        layer.msg("删除失败");
                                        _this.attr('disabled', false);
                                    }
                                }
                            });
                        }
                    });
                    return;
                }
            }
        }
        $("#formalOrderFormV2").submit();
    });


    $('a[data-toggle="#collapse"]').removeAttr("data-toggle");
    $(".panel-collapse").addClass("in");
    $(".panel-collapse").removeAttr("style");


    $(".yd_guaranteecheck").change(function(){
        guaranteeCheck();
    });

    $(".yd_delaycheck").change(function(){
        delayCheck();
    });

    $(".yd_upholstery").change(function(){
        upholsteryCheck();
    });

    upholsteryCheck();
    guaranteeCheck();
    delayCheck();
});

function upholsteryCheck(){
    if($(".yd_upholstery").is(":checked")){
        $(".yd_upholsteryadd").removeAttr("disabled");
        $(".yd_upholsteryadd").attr("checked",false);
    }else{
        $(".yd_upholsteryadd").attr("disabled","disabled");
        $(".yd_upholsteryadd").attr("checked",true);
    }
};
function guaranteeCheck(){
    if($(".yd_guaranteecheck").is(":checked")){
        $("#cardGuaranteeAddBtn").removeAttr("disabled");
    }else{
        $("#cardGuaranteeAddBtn").attr("disabled","disabled");
    }
};
function delayCheck(){
    if($(".yd_delaycheck").is(":checked")){
        $("#delayProductAddBtn").removeAttr("disabled");
    }else{
        $("#delayProductAddBtn").attr("disabled","disabled");
    }
};


window.fns={};