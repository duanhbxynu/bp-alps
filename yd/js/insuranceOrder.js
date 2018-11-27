var insuranceOrder = {
    ydServiceType:$("#ydServiceType").val(),
    initPage:function(){

        var pageElement={
            region:$("#region"),
            city:$("#city")
        };
        commonFn.initAddress(pageElement.region,pageElement.city);


        $(".panel-body input[type='text'],.panel-body input[type='number'],.panel-body select").addClass("checkdd");

        var tempV=insuranceOrder.ydServiceType;

        if(tempV=="Finance"){
            $('a[href="#collapseOne"]').removeAttr("data-toggle");
            $("#collapseOne").addClass("in");
            $("#collapseOne").removeAttr("style");

            $("input[name='financeOrder.selected']").attr("checked",true);
            $("input[name='financeOrder.selected']").click(function(){
                return false;
            });

            $("#YdFinanceDepartments").removeAttr("disabled");
            $("#collapseOne").find(".sendDepart").show();

        }else if(tempV=="Insurance"){
            $('a[href="#collapseTwo"]').removeAttr("data-toggle");
            $("#collapseTwo").addClass("in");
            $("#collapseTwo").removeAttr("style");

            $("input[name='insuranceOrder.selected']").attr("checked",true);
            $("input[name='insuranceOrder.selected']").click(function(){
                return false;

            });

            $("#YdInsuranceDepartments").removeAttr("disabled");

            $("#collapseTwo").find(".sendDepart").show();

        }else if(tempV=="DelayInsurance") {
            $("input[name='delayInsuranceOrder.isGive']").val(false);
            $('a[href="#collapseSix"]').removeAttr("data-toggle");
            $("#collapseSix").addClass("in");
            $("#collapseSix").removeAttr("style");

            $("input[name='delayInsuranceOrder.selected']").attr("checked",true);
            $("input[name='delayInsuranceOrder.selected']").click(function(){
                return false;
            });

            $("#YdDelayDepartments").removeAttr("disabled");
            $("#collapseSix").find(".sendDepart").show();
        } else if(tempV=="Guarantee"){
            $("input[name='guaranteeOrder.isGive']").val(false);

            $('a[href="#collapseSeven"]').removeAttr("data-toggle");
            $("#collapseSeven").addClass("in");
            $("#collapseSeven").removeAttr("style");


            $("input[name='guaranteeOrder.selected']").attr("checked",true);
            $("input[name='guaranteeOrder.selected']").click(function(){
                return false;
            });

         //  $(".commoncheck").siblings().children().find(".checkdd").attr("disabled","disabled");

            $("#YdGuaranteeDepartments").removeAttr("disabled");
            $("#collapseSeven").find(".sendDepart").show();
        } else if(tempV=="Icensing") {

        }

        //$(".Select_checkbox:not(.commoncheck)").parent().remove();

        if($(".sendDepartValue").val() != ""){
            $(".selectSendDepart").find("option[value='"+$(".sendDepartValue").val()+"']").attr("selected","selected");
        }


        insuranceOrder.commoncheck();
        insuranceOrder.guaranteeCheck();
        insuranceOrder.delayCheck();
        insuranceOrder.attmentCheck();

        insuranceOrder.submitOrder();
        insuranceOrder.sendDepart();

        insuranceOrder.initGuaranteePage();
        insuranceOrder.initDelayPricePage();
        insuranceOrder.initDecorationPricePage();

        $("body").on("input propertychange blur", ".productQuantity", function() {
            var val = $(this).val();
            var maxVal=9999;
            if(val == "" && e.type != "blur"){

            }else if (!(/^[1-9]{1}[\d]{0,3}$/).test(val)||val>maxVal) {
                if(val>maxVal){
                    $(this).val(maxVal);

                }else{
                    $(this).val(1);

                }
            }else{

            }
        });
        $("#updateVehicleInfo").click(function () {
            window.location.href='/insurance/choicecarforrenewal?ydflag='+$("#orderType").val()+"&formalOrderCode="+$("#orderCode").val();
        });
    },
    sendDepart:function(){
        $(".selectSendDepart").change(function(){
            var tempIndex=$(this).get(0).selectedIndex;
            $(".selectSendDepart").each(function(){
                $(this).get(0).selectedIndex=tempIndex;
            });
            $(".sendDepartValue").val($(this).val());
        });
    },
    initGuaranteePage:function(){
        if($("#ydServiceType").val() != "Guarantee"){
            $('input[id^="salePriceGuarantee"]').each(function(){
                $(this).attr("readonly","readonly");
            });
        }
    },
    initDelayPricePage:function(){
        if($("#ydServiceType").val() != "DelayInsurance"){
           $("#delayInsurance").find('input[id^="delaysalePricecart"]').each(function(){
                $(this).attr("readonly","readonly");
            });
        }
    },
    initDecorationPricePage:function(){
        $("#collapseFive").find('input[id^="salePrice"]').each(function(){
            $(this).attr("readonly","readonly");
        });
    },
    guaranteeCheck:function(){
        if($(".yd_guaranteecheck").is(":checked")){
            $("#cardGuaranteeAddBtn").removeAttr("disabled");
        }else{
            $("#cardGuaranteeAddBtn").attr("disabled","disabled");
        }
    },
    delayCheck:function(){
        if($(".yd_delaycheck").is(":checked")){
            $("#delayProductAddBtn").removeAttr("disabled");
        }else{
            $("#delayProductAddBtn").attr("disabled","disabled");
        }
    },
    attmentCheck:function(){
        if($(".yd_upholstery").is(":checked")){
            $(".yd_upholsteryadd").removeAttr("disabled");
            $(".yd_upholsteryadd").attr("checked",false);
        }else{
            $(".yd_upholsteryadd").attr("disabled","disabled");
            $(".yd_upholsteryadd").attr("checked",true);
        }
    },
    commoncheck:function(){
        $(".commoncheck").change(function(){
            if($(this).is(":checked")){
                $(this).siblings().children().find(".checkdd").removeAttr("disabled");
                if($("#period option:selected").val()=="-1"){
                    $("#insurancePeriodOther").removeAttr("disabled");
                }else{
                    $("#insurancePeriodOther").attr("disabled","disabled");
                }

                if($("#ifdfq option:selected").val()=="true"){
                    $("#dfqnum").removeAttr("readonly");
                    $("#dfqcontract").removeAttr("readonly");
                }else{
                    $("#dfqnum").attr("readonly","readonly");
                    $("#dfqcontract").attr("readonly","readonly");
                }
            }else{
                $(this).siblings().children().find(".checkdd").attr("disabled","disabled");
            }
        });


        $(".yd_guaranteecheck").change(function(){
            insuranceOrder.guaranteeCheck();
        });

        $(".yd_delaycheck").change(function(){
            insuranceOrder.delayCheck();
        });
        $(".yd_upholstery").change(function(){
            insuranceOrder.attmentCheck();
        });
    },
    submitOrder:function(){
        $('#formalOrderSubmitV2').click(function(){
            $(this).attr('disabled','disabled');
            resetOrderInfo();
            if($("input[name='insuranceOrder.selected']").prop('checked'))
            {
                //此处做保险的校验操作
                if(!checkInsuranceOrderFunction()){
                    parent.layer.open({
                        title: '【ECM消息提示】',
                        content: '请完善保险信息！',
                        icon: 0
                    });
                    $(this).removeAttr('disabled');
                    return;
                }else{
                    var ordertype = $("input[name='orderType']").val();

                    ////零售订单 判断险种
                    if(ordertype == 'RetailOrder'){
                        if(!checkInsuranceTypeFunction()){
                            parent.layer.open({
                                title: '【ECM消息提示】',
                                content: '保险必须选择第三责任险和车损险！',
                                icon: 0
                            });
                            $(this).removeAttr('disabled');
                            return;
                        }
                    }
                    //var isnew = $(this).attr('isnew');
                    //if (isnew == null || isnew == "" || isnew == "undefined" || isnew == "new"){
                    //    if(!checkInsuranceTypeFunction()){
                    //        parent.layer.alert('保险必须选择第三责任险和车损险！', {icon: 0});
                    //        return;
                    //    }
                    //}
                }
            }
            if($("input[name='financeOrder.selected']").prop('checked'))
            {
                if(!checkFinanceOrderFunction()){   //金融订单校验
                    parent.layer.open({
                        title: '【ECM消息提示】',
                        content: '请完善金融服务！',
                        icon: 0
                    });
                    $(this).removeAttr('disabled');
                    return;
                }
            }


            var tempV=insuranceOrder.ydServiceType;
            if(tempV=="DelayInsurance"){
                if(!insuranceOrder.checkDelayFunction()){   //延保订单校验
                    parent.layer.open({
                        title: '【ECM消息提示】',
                        content: '请完善延保服务！',
                        icon: 0
                    });
                    $(this).removeAttr('disabled');
                    return;
                }

                if(!checkDelaySalepriceFunction()){
                    parent.layer.open({
                        title: '【ECM消息提示】',
                        content: '请填写延保销售价！',
                        icon: 0
                    });
                    $(this).removeAttr("disabled");
                    return;
                }

                $("input[name='delayInsuranceOrder.selected']").val(true);
            }else if(tempV=="Guarantee"){
                if(!insuranceOrder.checkGuaranteeFunction()){   //保障订单校验
                    parent.layer.open({
                        title: '【ECM消息提示】',
                        content: '请完善保障服务！',
                        icon: 0
                    });
                    $(this).removeAttr('disabled');
                    return;
                }
                $("input[name='guaranteeOrder.selected']").val(true);
            }

            if(tempV!="Icensing"){
                if($(".sendDepartValue").val() == ""){
                   parent.layer.open({
                    title: '【ECM消息提示】',
                    content: '请选择销售部门！',
                    icon: 0
                   });
                    $(this).removeAttr('disabled');
                  return;
                }
            }
            if($("input[name='guaranteeOrder.selected']").prop('checked'))
            {
                if(!insuranceOrder.checkGuaranteeFunction()){
                    parent.layer.open({
                        title: '【ECM消息提示】',
                        content: '请完善保障服务！',
                        icon: 0
                    });
                    $(this).removeAttr('disabled');
                    return;
                }
            }

            if($("input[name='delayInsuranceOrder.selected']").prop('checked'))
            {
                if(!insuranceOrder.checkDelayFunction()){
                    parent.layer.open({
                        title: '【ECM消息提示】',
                        content: '请完善延保服务！',
                        icon: 0
                    });
                    $(this).removeAttr('disabled');
                    return;
                }
            }


            if($("input[name='attachmentOrder.selected']").prop('checked'))
            {
                if(!insuranceOrder.checkAttachmentFunction()){
                    parent.layer.open({
                        title: '【ECM消息提示】',
                        content: '请完善汽车装潢！',
                        icon: 0
                    });
                    $(this).removeAttr('disabled');
                    return;
                }
            }
            if($("#comprehensivePrice").length>0 && (!$("#comprehensivePrice").val() || !$("#remarkforOtherOrder").val())){
                parent.layer.open({
                    title: '【ECM消息提示】',
                    content: '请完善综合服务费信息！',
                    icon: 0
                });
                $(this).removeAttr('disabled');
                return;
            }
            if($('#vehicleBrandOrderCheck').prop('checked'))
            {
                if(!checkVehicleBrandFunction()){
                    parent.layer.open({
                        title: '【ECM消息提示】',
                        content: '请完善上牌服务信息！',
                        icon: 0
                    });
                    $(this).removeAttr('disabled');
                    return;
                }
            }

            $("#formalOrderFormV2").submit();
        });
    },
    checkGuaranteeFunction:function(){
        var temp=$('input[name^="guaranteeOrder.guaranteeProdFormList"]');
        if(temp&&temp.length>1){
            return true;
        }else{
            return false;
        }
    },
    checkDelayFunction:function(){
        var temp=$('input[name^="delayInsuranceOrder.delayInsuranceProdFormList"]');
        if(temp&&temp.length>1){
            return true;
        }else{
            return false;
        }
    },
    checkAttachmentFunction:function(){
        var temp=$('input[name^="attachmentOrder.attachmentProductFormList"]');
        if(temp&&temp.length>1){
            return true;
        }else{
            return false;
        }
    }

};



//var inputs=[];
$(document).ready(function () {
    insuranceOrder.initPage();
    var oldIsGivenBy=$("#oldIsGivenBy");
    if(oldIsGivenBy.length>0){
        $("#YdOtherIsGivenBy").find("option").each(function (index,value) {
            if($(value).val()==oldIsGivenBy.val()){
                $(value).attr("selected","selected");
                return false;
            }
        });
    }
});

window.fns={};