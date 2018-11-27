
//小订单的checkbox事件
    $(".panel-body input[type='text'],.panel-body input[type='number'],.panel-body select").addClass("checkdd");
//金融checkbox
    function financeCheck(val){
        if($("#financeSta").val()=="FOLLOW_UP"|| !$("#financeSta").val()||$("#financeSta").val()=="SAVED"){
            $(".yd_smallStatus").hide();
            if($("#selected").is(":checked")){
                $("#selected").siblings().children().find(".checkdd") .removeAttr("disabled");
                // console.log($("#financeInstitution").val());
                window.fns.controllerFinanceInstitution(val);
                $("#loanRatio").attr("readonly","readonly");
                $("#financeInstitution").attr("disabled","disabled");
                if($("#interestDiscount option:selected").val()=="true"){
                        $(".yd_financeYes").removeAttr("disabled");
                }else{
                    $(".yd_financeYes").attr("disabled","disabled");
                }
                if($("#financeTerm option:selected").val==""){
                    $(".financeTerminput").removeAttr("disabled");
                }else{
                    $(".financeTerminput").attr("disabled","disabled");
                }

            }else{
                $("#selected").siblings().children().find(".checkdd").attr("disabled","disabled");
            }
        }else{
            $(".yd_smallStatus").show();
            //$("span[flag='Finance']").attr("isRest","false");
           //x $("span[flag='Finance']").removeClass("display");
            $("span[flag='Finance']").css("display","none");

            $("#selected").attr("disabled","disabled");
            $("#selected").siblings().children().find(".checkdd").attr("disabled","disabled");
        }
    };
    $("#selected").change(function(){
        financeCheck($("#financeInstitution").val());
    });
//保险checkbox
    function insuranCheck(){
       // console.log($("#insuranceStatus").val());
       if($("#insuranceStatus").val()=="PENDING_REGISTER"||!$("#insuranceStatus").val()){
           $(".yd_insuranceStatus").hide();
           if($(".insuranCheck").is(":checked")){
               $(".insuranCheck").siblings().children().find(".checkdd") .removeAttr("disabled");
               if($("#period option:selected").val()=="-1"){
                   $("#insurancePeriodOther").removeAttr("disabled");
               }else{
                   $("#insurancePeriodOther").attr("disabled","disabled");
               };
               if($("#ifdfq option:selected").val()=="true"){
                   $('#mormode').removeAttr('disabled');
               }else{
                   $('#mormode').attr('disabled','disabled');
               }
           }else{
               $(".insuranCheck").siblings().children().find(".checkdd").attr("disabled","disabled");
           }
       }
       else{
           $(".yd_insuranceStatus").show();
           $(".insuranCheck").attr("disabled","disabled");
           $(".insuranCheck").siblings().children().find(".checkdd").attr("disabled","disabled");
       }
       
       if($("#sessionScope_1123").val() == 'renew'){
    	   $("#ifdfq").attr("disabled","disabled");
    	   $("#mormode").attr("disabled","disabled");
       }
    };
    $(".insuranCheck").change(function(){
        insuranCheck();
    });


    /////// 重置按钮 根据状态来显示，
    // if($("#insuranceStatus").val()=="PENDING_REGISTER"){
    //     $('#resetspan').show();
    // }else{
    //     $('#resetspan').hide();
    // }



//上牌checkbox
    function icensingCheck(){
        // console.log($("#icensingStatus").val())
        //综合服务费是否归集
        var lockstatus = $('#statusData').data("lockstatus");

        if(($("#icensingStatus").val()=="SAVED"||!$("#icensingStatus").val()) && !lockstatus){
            $(".yd_icensingStatus").hide();
            if($(".icensingCheck").is(":checked")){
                $(".icensingCheck").siblings().children().find(".checkdd[changeDisable!='false']") .removeAttr("disabled");
            }else{
                $(".icensingCheck").siblings().children().find(".checkdd").attr("disabled","disabled");
            }
        }else{
            var flag = false;
            //上牌已登记或者综合服务费已归集，不可修改
            if ($("#icensingStatus").val()=="REGISTER" || lockstatus){
                $(".yd_icensingStatus").show();
                flag = true;
            }

            if (flag) {
                $(".icensingCheck").attr("disabled","disabled");
                $(".icensingCheck").siblings().children().find(".checkdd").attr("disabled","disabled");
            }
        }
    };
    $(".icensingCheck").change(function(){
        icensingCheck();
    });
// 二手车置换checkbox
//      function secondCheck(){
//          if($(".second_check").is(":checked")){
//              $(".secondButt").removeAttr("disabled");
//              $("#seconhHandTable td select").removeAttr("disabled");
//              $("#seconhHandTable tr").eq(1).nextAll().children(".inputTd").attr("contenteditable","true");
//              $("#seconhHandTable td button").removeAttr("disabled");
//          }else{
//              $(".secondButt").attr("disabled","true");
//              $("#seconhHandTable td select").attr("disabled","true");
//              $("#seconhHandTable tr").eq(1).nextAll().children(".inputTd").attr("contenteditable","false");
//              $("#seconhHandTable td button").attr("disabled","true");
//          }
//      };
        function secondStatus(){
            setTimeout(function () {
                if($(".second_check").is(":checked")) {
                    $(".secondButt").removeAttr("disabled");
                    var falg=true;
                    $('.seconhHandTable').each(function () {
                        //   console.log($(this).children(".secondStatus").text());
                        /*   if ($(this).children(".secondStatus").text() == "SAVED"||!$(this).children(".secondStatus").text()) {
                               $(".yd_secondStatus").hide();
                               $(this).children("td").children("select").removeAttr("disabled");
                               $(this).children(".inputTd").attr("contenteditable", "true");
                               $(this).children("td").children("button").removeAttr("disabled");
                           } else {
                               $(".yd_secondStatus").show();
                               $(".second_check").attr("disabled","disabled");
                               $(this).children("td").children("select").attr("disabled","disabled");
                               $(this).children(".inputTd").attr("contenteditable", "false");
                               $(this).children("td").children("button").attr("disabled", "true");
                           }*/

                        if($(this).children(".secondStatus").text() == "REGISTER"){
                            falg=false;
                        }

                        if(falg){
                            $('.seconhHandTable').each(function () {
                                $(".yd_secondStatus").hide();
                                $("#sencondHandBtn").hide();
                                $(this).children("td").children("select").removeAttr("disabled");
                                $(this).children(".inputTd").attr("contenteditable", "true");
                                $(this).children("td").children("button").removeAttr("disabled");
                            });
                        }else{
                            $("#seconhHandBtn").attr("disabled","disabled");
                            $("input[flag='SecondHand']").attr("isRest","false");
                            $(".yd_secondStatus").show();
                            $("#sencondHandBtn").hide();
                            $('.seconhHandTable').each(function () {
                                $(".second_check").attr("disabled","disabled");
                                $(this).children("td").children("select").attr("disabled","disabled");
                                $(this).children(".inputTd").attr("contenteditable", "false");
                                $(this).children("td").children("button").attr("disabled", "true");
                            });
                        }
                    });
                }else{
                    $(".yd_secondStatus").hide();
                    $("#sencondHandBtn").hide();
                    $(".secondButt").attr("disabled","true");
                    $('.seconhHandTable').each(function () {
                        // console.log($(this).children(".secondStatus").text());
                        $(this).children("td").children("select").attr("disabled","disabled");
                        $(this).children(".inputTd").attr("contenteditable", "false");
                        $(this).children("td").children("button").attr("disabled","true");
                    })
                }
            },500);
        };
     $(".second_check").change(function(){
         secondStatus();
     });

//     //随车装潢
      function upholsteryCheck(){
          if($(".yd_upholstery").is(":checked")){
              $(".yd_upholsteryadd").removeAttr("disabled");
              $(".yd_upholsteryadd").attr("checked",false);
         }else{
              $(".yd_upholsteryadd").attr("disabled","disabled");
              $(".yd_upholsteryadd").attr("checked",true);
         }
      };
      $(".yd_upholstery").change(function(){
          upholsteryCheck();
      });
//  //卡券checkbox
      function voucherCheck(){
          if($(".yd_vouhercheck").is(":checked") && $("#cartOrderStatus").val()!="INVOICED"){
              $("#cardOrderAddBtn").removeAttr("disabled");
          }else{
              $("#cardOrderAddBtn").attr("disabled","disabled");
         }

      };
      $(".yd_vouhercheck").change(function(){
          voucherCheck();
      });

    function guaranteeCheck(){
        if($(".yd_guaranteecheck").is(":checked")){
            $("#cardGuaranteeAddBtn").removeAttr("disabled");
        }else{
            $("#cardGuaranteeAddBtn").attr("disabled","disabled");
        }
    };
    $(".yd_guaranteecheck").change(function(){
        guaranteeCheck();
    });
    function delayCheck(){
        if($(".yd_delaycheck").is(":checked")){
            $("#delayProductAddBtn").removeAttr("disabled");
        }else{
            $("#delayProductAddBtn").attr("disabled","disabled");
        }
    };
    $(".yd_delaycheck").change(function(){
        delayCheck();
    });

//其他服务checkbox
    function otherorderCheck(){
        // console.log($("#otherorderStatus").val());
       /* if(false){
            $(".yd_otherorderStatus").show();
            $("#checkboxForOtherOrder").attr("disabled","disabled");
            $("#checkboxForOtherOrder").siblings().children().find(".checkdd").attr("disabled","disabled");
            $("#remarkforOtherOrder").attr("disabled","disabled");
        }else{*/
            /*$(".yd_otherorderStatus").hide();*/
            if($("#checkboxForOtherOrder").is(":checked")){
                //180816 注释，不清除本来就应该禁用的
                // $("#checkboxForOtherOrder").siblings().children().find(".checkdd").removeAttr("disabled");
                //获得 class 为checkdd 的元素
                var checkboxForOtherOrder = $("#checkboxForOtherOrder").siblings().children().find(".checkdd");
                //遍历
                $.each(checkboxForOtherOrder,function () {
                    //判断是否可以编辑
                    var flag = $(this).data("flag");
                    if (!flag){
                        //设置为可编辑
                        $(this).removeAttr("disabled");
                    }
                })
                $("#remarkforOtherOrder").removeAttr("disabled");
            }else{
                $("#checkboxForOtherOrder").siblings().children().find(".checkdd").attr("disabled","disabled");
                if($("#orderType").val()!='Icensing'){
                    $("#remarkforOtherOrder").attr("disabled","disabled");
                }
            }
            /*  }*/
    };
    //其他服务中备注输入字数限制
    var totalWordNum = 510;//510个字符，代表255个汉字
    $("#remarkforOtherOrder").on('keyup',wordNum);
    function wordNum(){
    	var len = $("#remarkforOtherOrder").val().length;
    	var currentCharNum = 0;
    	if (len >= 0) {   
			for (var i = 0; i < len; i++) {
				if ($("#remarkforOtherOrder").val().charCodeAt(i) > 255) {
					currentCharNum += 2;
				} else{
					currentCharNum += 2;
				}
			}
			var result = Math.floor((totalWordNum - currentCharNum)/2);
			if (result >= 0) {
				$(".tips").html("还可以输入：<strong>"+result+"</strong>个字。");
			} else{
				$(".tips").html("您的输入已经超出：<strong style='color:red;'>"+(-result)+"</strong>个字。");
				$("#remarkforOtherOrder").val($("#remarkforOtherOrder").val().substring(0,totalWordNum/2-1));//超出的字自动删除
			}
		}
    }
    
    //判断是否为空
    function isEmpty(obj){
        if (obj == "" || obj == null || obj == "undefined"){
            return true;
        }
        return false;
    };
    $("#checkboxForOtherOrder").change(function(){
        otherorderCheck();
    })
    window.onload=function(){
        setTimeout(function(){
            financeCheck($("#financeInstitution").val());
            insuranCheck();
            icensingCheck();
            // secondCheck();
            secondStatus();
            upholsteryCheck();
            voucherCheck();
            otherorderCheck();
            guaranteeCheck();
            delayCheck();

        },101)
    };
    //如果缴纳方式为自行上牌，上牌方式
    $('select[name="vehicleBrandOrder.payMethod"]').change(function () {
        //缴纳方式
        var payMethod = $(this).val();
        //自行上牌
        var self = $('select[name="vehicleBrandOrder.cardMethod"] option[value="Self"]');
        //本店上牌
        var replace = $('select[name="vehicleBrandOrder.cardMethod"] option[value="Replace"]');
        if (payMethod == "SelfPay") {
            replace.attr('selected','selected')
            //自行缴纳，隐藏自行上牌
            self.hide();
        } else {
            replace.removeAttr('selected');
            //显示自行上牌
            self.show();
        }
    });
    //手动触发change事件,判断是初始化就是自行缴纳
    $('select[name="vehicleBrandOrder.payMethod"]').trigger('change');


    function resetOrder(){
        if($("#orderIsRetail").length>0&&$("#orderIsRetail").val()){
            if($("#formalOrderUpdateForm").length>0){
                $(".restOrder").each(function(){
                     if($(this).attr("isRest")=='true'){
                         $(this).show();
                     }
                });
            }
            $(".restOrder").click(function(){
               var tempflag=$(this).attr("flag");
               var tempObj=$(this);

                //提示消息
                var promptMsg = '';
                if(tempflag=="DelayInsurance"){
                   if($("input[name^='delayInsuranceOrder.delayInsuranceProdFormList']").length>0){
                       layer.msg("请删除延保项");
                       return;
                   }
                    promptMsg = "延保";
                }else if(tempflag=="Guarantee"){
                    if($("input[name^='guaranteeOrder.guaranteeProdFormList']").length>0){
                        layer.msg("请删除保障项");
                        return;
                    }
                    promptMsg = "保障";
                }else if(tempflag=="Decoration"){
                    promptMsg = "装潢";
                }else if (tempflag == "Insurance") {
                    //保险重置
                    promptMsg = "保险";
                }else if (tempflag == "icensing"){
                	//上牌重置
                    promptMsg = "上牌";
                }else if(tempflag == "CartOrder"){
                    if($("input[name='cartOrder.cardsVoucherProdFormList[0].code']").length>0){
                        layer.msg("请删除卡券行项");
                        return;
                    }
                    promptMsg = "卡券";
                }else if(tempflag == "SecondHand"){
                    if($("input[name='secondHandOrderList[0].replaceInfo']").length>0){
                        layer.msg("请删除二手车行项");
                        return;
                    }
                    promptMsg = "二手车置换";
                }else if(tempflag == "Finance"){
                    promptMsg = "金融";
                }

                layer.confirm('确认重置'+promptMsg+'信息吗？', {
                    btn: ['确定','取消']
                }, function(){
                    $.ajax({
                        type: "GET",
                        url: "/insurance/cleanFormOrderModel?formCode="+$("#orderCode").val()+"&orderType="+tempflag,
                        dataType: "json",
                        success: function(data){
                            if(data==1) {
                                layer.msg("重置成功");
                                if(tempflag=="DelayInsurance"){
                                    $("#delayInsurance").find("tbody").empty();
                                    $("input[name^='delayInsuranceOrder.delayInsuranceProdFormList']").remove();
                                    $("input[name='delayInsuranceOrder.totalPrice']").val(0.00);
                                    $("input[name='delayInsuranceOrder.totalNum']").val(0);
                                    //$("input[name='delayInsuranceOrder.selected']").removeAttr('onclick');
                                    $("input[name='delayInsuranceOrder.selected']").prop("checked", false);
                                    $("input[name='delayInsuranceOrder.selected']").attr("disable",true);
                                    $("input[name='delayInsuranceOrder.resetFlag']").val(true);
                                    $("#delayProductAddBtn").attr("disabled","disabled");

                                }else if(tempflag=="Guarantee"){
                                    $("#guaranteeTable").find("tbody").empty();
                                    $("input[name^='guaranteeOrder.guaranteeProdFormList']").remove();
                                    $("input[name='guaranteeOrder.totalPrice']").val(0.00);
                                    $("input[name='guaranteeOrder.totalNum']").val(0);
                                    // $("input[name='guaranteeOrder.selected']").removeAttr('onclick');
                                    $("input[name='guaranteeOrder.selected']").prop("checked", false);
                                    $("input[name='guaranteeOrder.selected']").attr("disable",true);
                                    $("input[name='guaranteeOrder.resetFlag']").val(true);
                                    $("#cardGuaranteeAddBtn").attr("disabled","disabled");
                                }else if(tempflag=="Decoration"){

                                    $(".decorationTable").find("tbody").empty();
                                    $("input[name='attachmentOrder.totalPrice']").val(0.00);
                                    $("input[name='attachmentOrder.totalNum']").val(0);

                                    $("input[name='attachmentOrder.resetFlag']").val(true);
                                    $("input[name='attachmentOrder.selected']").val(false);
                                    $("input[name='attachmentOrder.selected']").prop("checked",false);
                                    $("input[name='attachmentOrder.selected']").attr("disable",true);
                                    $("#followCarAddBtn").attr("disabled",true);


                                }else if(tempflag=="Insurance"){
                                    $("input[name='insuranceOrder.insuranceRegister.trysummoney']").val('');
                                    $("input[name='insuranceOrder.insuranceRegister.estimateMoney']").val('');
                                    $("input[name='insuranceOrder.insuranceRegister.discountpercent']").val('');
                                    $("input[name='insuranceOrder.resetFlag']").val(true);

                                    $('#discountpercentShow').val('');
                                    $('#insurancetypecode').val('');
                                    $('.select2-search-choice').hide(); /////多选下拉里的清掉
                                    $(".insuranCheck").prop("checked",false);
                                    //$(".insuranCheck").removeAttr('onclick');   重置后不能再次选
                                    $(".insuranCheck").change();

                                } else if (tempflag == "icensing"){//上牌重置
                                    //清空新车购置税（预估）
                                    $('input[name="vehicleBrandOrder.estimatedPrice"]').val('');
                                    //清空折扣率
                                    $('input[name="vehicleBrandOrder.discount"]').val('');
                                    //改变缴纳方式
                                    $('select[name="vehicleBrandOrder.payMethod"] option:first').prop("selected", 'selected');
                                    $('select[name="vehicleBrandOrder.payMethod"]').trigger('change');
                                    //改变上牌方式
                                    $('select[name="vehicleBrandOrder.cardMethod"] option:first').prop("selected", 'selected');
                                    //改变上牌地区
                                    $('select[name="vehicleBrandOrder.region"] option:first').prop("selected", 'selected');
                                    $('select[name="vehicleBrandOrder.region"]').trigger('change');
                                    //改变上牌市区
                                    $('select[name="vehicleBrandOrder.city"] option:first').prop("selected", 'selected');
                                    //默认不选中，并触发change事件，禁用
                                    $('#vehicleBrandOrderCheck').attr('checked', false).trigger('change').attr("disabled",true);
                                    //重置表示设为true
                                    $("input[name='vehicleBrandOrder.resetFlag']").val(true);
                                }else if(tempflag == "CartOrder"){
                                    //$("#lockCartOrderForReset").show();
                                    $("#cardOrderAddBtn").attr('disabled',"true");
                                    $("#cardOrderTab").find("tbody").empty();
                                    $("input[name='cartOrder.selected']").removeAttr("checked");
                                    $("input[name='cartOrder.selected']").attr("onclick","return false;");
                                    $("input[name='cartOrder.resetFlag']").val(true);
                                     $("input[name='cartOrder.totalPrice']").val(0.00);
                                     $("input[name='cartOrder.totalNum']").val(0);


                                }else if(tempflag == "SecondHand"){
                                    $("input[name='secondHandOrderList[0].resetFlag']").val("false");
                                    $("input[name='isSelectSecondHand']").attr("checked",false);
                                    $("input[name='isSelectSecondHand']").val("false");
                                    $("input[name='isSelectSecondHand']").attr("disabled","disabled");
                                    $("#seconhHandBtn").attr("disabled","disabled");
                                }else if(tempflag == "Finance"){
                                      $("#collapseOne").find("select,input").each(function (index,value) {
                                            if(value.tagName=='SELECT'){
                                                $(value).find("option").eq(0).attr("selected","selected");
                                            }else{
                                                $(value).val("");
                                            }
                                              if($(value).attr("id")!='financeResetFlag'){
                                                  $(value).attr("disabled","disabled");
                                              }
                                        });

                                        $("input[name='financeOrder.resetFlag']").val("true");
                                        $("#selected").attr("checked",false);
                                        $("#selected").val("false");
                                        $("#selected").attr("disabled","disabled");

                                }
                                tempObj.remove();
                            }else if(data == -1){
                                if(tempflag == "Finance"){
                                    layer.msg("不是待跟进状态不能重置！");
                                }else{
                                    layer.msg("已登记或已归集状态不能重置！");
                                }
                            }
                        }
                    });
                });
            });

        }

    }
    resetOrder();