/*$(function(){
	$("#refunds1,#refunds2").change(function(){
		$(".yd_qt").hide();
	})
	$("#refunds3").change(function(){
		$(".yd_qt").show();
	})
})*/

//表单必填项控制
var eles = {
    form: $('#financeform'),//form
    institutionType:$("#institutionType"),//1
    financeInstitutionCode:$("#financeInstitutionCode"),//01
    finanaceProduct : $("#finanaceProduct"),//2
    financeTime : $('[name="financeTime"]'),//3
    financingRange : $("#financingRange"),//4
    financingTotal : $("#financingTotal"),//5
    purchasePrice : $('[name="purchasePrice"]'),//留购价
    installGPS : $("#installGPS"),//是否GPS安装
    loanDate : $("#loanDate"),//放款日期
    cautionMoney : $("#cautionMoney"),//6
    downPayments : $('[name="downPayments"]'),//7
    rentingDate : $("#rentingDate"),//8
    loanAmount : $("#loanAmount"),//9
    loanRatio : $("#loanRatio"),//10
    financeServerMoney : $("financeServerMoney"),//11
    serviceAmountProportion:$("#serviceAmountProportion"),//12
    pledgeRemark:$("#pledgeRemark"),//13
    discountMoney:$("#discountMoney"),//14
    serviceCharge:$("#serviceCharge"),//15
    loanAmountEstimate:$("#loanAmountEstimate"),//16
    loanRatioEstimate:$("#loanRatioEstimate"),//17
    commissionMoney:$("#commissionMoney"),//18
    commissionRatio:$("#commissionRatio"),//19
    submit:$("#financesave"),
    err1 : $('.err1'),
    err01 : $('.err01'),
    err2 : $('.err2'),
    err3 : $('.err3'),
    err4 : $('.err4'),
    err5 : $('.err5'),
    err51: $(".err51"),
    err52: $(".err52"),
    err6 : $('.err6'),
    err7 : $('.err7'),
    err8 : $('.err8'),
    err88:$(".err88"),
    err9: $('.err9'),
    err10:$('.err10'),
    err11:$('.err11'),
    err12:$('.err12'),
    err13:$('.err13'),
    err14:$('.err14'),
    //err15:$('.err15'),
    err16:$('.err16'),
    err17:$('.err17'),
    err18:$('.err18'),
    err19:$('.err19'),
    errTxt1:  '请选择金融机构',
    errTxt2 : '请选择金融产品',
    errTxt3 : '请选择金融年限',
    errTxt4 : '请选择融资范围',
    errTxt5 : '请输入融资总额',
    errTxt51 : '请输入留购价',
    errTxt52 : '请选择是否GPS安装',
    errTxt6 : '请输入保证金',
    errTxt7 : '请输入首付',
    errTxt8: '请选择起租日期',
    errTxt88:'请选择放款日期',
    errTxt9 : '请输入贷款金额（预估）',
    // errTxt10 : '请输入贷款比例（预估）',
    errTxt11 : '请输入金融服务费',
    errTxt12:'请输入金融服务费比例(%)',
    errTxt13:'请输入抵押信息',
    errTxt14:'请输入贴息信息',
    //errTxt15:'请输入手续费',
    errTxt16:'请输入贷款金额（实际）',
    // errTxt17:'请输入贷款比例（实际）',
    errTxt18:'请输入佣金金额（预估）',
    errTxt19:'请输入佣金比例(预估)',
    norm_institutionType :/\S+/,//1
    norm_financeInstitutionCode :/\S+/,//01
    norm_finanaceProduct :/\S+/,//2
    norm_financeTime :/\S+/,//3
    norm_financingRange : /\S+/,//4
    norm_financingTotal :/\S+/,//5
    norm_purchasePrice:/\S+/,//留购价
    norm_installGPS:/\S+/,//GPS安装
    norm_cautionMoney :/\S+/,//6
    norm_downPayments :/\S+/,//7
    norm_rentingDate : /\S+/,//8
    norm_loanDate : /\S+/,//88放款日期
    norm_loanAmount : /\S+/,//9
    norm_loanRatio :/\S+/,//10
    norm_financeServerMoney : /\S+/,//11
    norm_serviceAmountProportion:/\S+/,//12
    norm_pledgeRemark:/\S+/,//13
    norm_discountMoney:/\S+/,//14
    //norm_serviceCharge:/\S+/,//15
    norm_loanAmountEstimate:/\S+/,//16
    norm_loanRatioEstimate:/\S+/,//17
    norm_commissionMoney:/\S+/,//18
    norm_commissionRatio:/\S+/,//19

}

//金融机构校验
eles.financeInstitutionCode.on('change',function(){
	eles.financeInstitutionCode.validator( eles.norm_financeInstitutionCode, eles.err01, eles.errTxt01 );
})
//金融产品校验
eles.finanaceProduct.on('change',function(){
    eles.finanaceProduct.validator( eles.norm_finanaceProduct, eles.err2, eles.errTxt2 );
})
//金融年限校验
eles.financeTime.on('change',function(){
    eles.financeTime.validator( eles.norm_financeTime, eles.err3, eles.errTxt3 );
})
//融资范围校验
eles.financingRange.on('change',function(){
    eles.financingRange.validator( eles.norm_financingRange, eles.err4, eles.errTxt4 );
})
//融资总额校验
eles.financingTotal.on('change',function(){
    eles.financingTotal.validator( eles.norm_financingTotal, eles.err5, eles.errTxt5 );
})
//留购价
eles.purchasePrice.on('change',function(){
    eles.purchasePrice.validator( eles.norm_purchasePrice, eles.err51, eles.errTxt51 );
})
//GPS安装
eles.installGPS.on('change',function(){
    eles.installGPS.validator( eles.norm_installGPS, eles.err52, eles.errTxt52 );
})
//保证金校验
eles.cautionMoney.on('change',function(){
    eles.cautionMoney.validator( eles.norm_cautionMoney, eles.err6, eles.errTxt6 );
})
//首付校验
eles.downPayments.on('change',function(){
    eles.downPayments.validator( eles.norm_downPayments, eles.err7, eles.errTxt7 );
})
//起租日期校验
eles.rentingDate.on('change',function(){
    eles.rentingDate.validator( eles.norm_rentingDate, eles.err8, eles.errTxt8 );
})
//放款日期校验
eles.loanDate.on('change',function(){
    eles.loanDate.validator( eles.norm_loanDate, eles.err88, eles.errTxt88 );
})
//贷款金额（预估）校验
eles.loanAmount.on('change',function(){
    eles.loanAmount.validator( eles.norm_loanAmount, eles.err9, eles.errTxt9 );
})
// //金融服务费校验
// eles.financeServerMoney.on('change',function(){
//     eles.financeServerMoney.validator( eles.norm_financeServerMoney, eles.err11, eles.errTxt11 );
// })
//抵押信息校验
eles.pledgeRemark.on('change',function(){
    eles.pledgeRemark.validator( eles.norm_pledgeRemark, eles.err13, eles.errTxt13 );
})
//享受贴息校验
eles.discountMoney.on('change',function(){
    eles.discountMoney.validator( eles.norm_discountMoney, eles.err14, eles.errTxt14 );
})
//手续费校验
/*eles.serviceCharge.on('change',function(){
    eles.serviceCharge.validator( eles.norm_serviceCharge, eles.err15, eles.errTxt15 );
})*/
//贷款金额（实际）校验
eles.loanAmountEstimate.on('change',function(){
    eles.loanAmountEstimate.validator( eles.norm_loanAmountEstimate, eles.err16, eles.errTxt16 );
})
//佣金金额（预估）校验
eles.commissionMoney.on('change',function(){
    eles.commissionMoney.validator( eles.norm_commissionMoney, eles.err18, eles.errTxt18 );
})
//佣金比例（预估）校验
eles.commissionRatio.on('change',function(){
    eles.commissionRatio.validator( eles.norm_commissionRatio, eles.err19, eles.errTxt19 );
})

//提交
// var options=$("#interestDiscount option:selected");
$("#financesave").click(function(ev){
    disabled(this,true);
    // console.log($("#financeType").attr("hiddenVal")=="SelfFinance");
    // console.log($("#financeInstitutionCode").text());
    if($("#financeType").attr("hiddenVal")=="SelfFinance"){
        if($("#financeInstitutionCode option:selected").text().indexOf('融资租赁')!=-1){
            if(
                eles.financeInstitutionCode.validator( eles.norm_financeInstitutionCode, eles.err01, eles.errTxt01 )&&
                eles.finanaceProduct.validator( eles.norm_finanaceProduct, eles.err2, eles.errTxt2 )&&
                eles.financingRange.validator( eles.norm_financingRange, eles.err4, eles.errTxt4 )&&
                eles.financingTotal.validator( eles.norm_financingTotal, eles.err5, eles.errTxt5 )&&
                eles.purchasePrice.validator( eles.norm_purchasePrice, eles.err51, eles.errTxt51 )&&
                eles.installGPS.validator( eles.norm_installGPS, eles.err52, eles.errTxt52 )&&
                eles.cautionMoney.validator( eles.norm_cautionMoney, eles.err6, eles.errTxt6 )&&
                eles.downPayments.validator( eles.norm_downPayments, eles.err7, eles.errTxt7 )&&
                // eles.financeTime.validator( eles.norm_financeTime, eles.err3, eles.errTxt3 ) &&

                // eles.pledgeRemark.validator( eles.norm_pledgeRemark, eles.err13, eles.errTxt13 )&&
                // eles.discountMoney.validator( eles.norm_discountMoney, eles.err14, eles.errTxt14 )&&
                //eles.serviceCharge.validator( eles.norm_serviceCharge, eles.err15, eles.errTxt15 )&&
                // eles.loanAmountEstimate.validator( eles.norm_loanAmountEstimate, eles.err16, eles.errTxt16 )&&
                eles.commissionMoney.validator( eles.norm_commissionMoney, eles.err18, eles.errTxt18 ) &&
                // eles.commissionRatio.validator( eles.norm_commissionRatio, eles.err19, eles.errTxt19 )&&
                eles.rentingDate.validator( eles.norm_rentingDate, eles.err8, eles.errTxt8 )
            ){
                //eles.form.submit();
                checkCustomerVehicleRelation(eles.form);
            }

        }else{
            if(
                eles.financeInstitutionCode.validator( eles.norm_financeInstitutionCode, eles.err01, eles.errTxt01 )&&
                eles.finanaceProduct.validator( eles.norm_finanaceProduct, eles.err2, eles.errTxt2 )&&
                // eles.financeTime.validator( eles.norm_financeTime, eles.err3, eles.errTxt3 ) &&
                // eles.rentingDate.validator( eles.norm_rentingDate, eles.err8, eles.errTxt8 )&&
                // eles.loanAmount.validator( eles.norm_loanAmount, eles.err9, eles.errTxt9 )&&
                // eles.pledgeRemark.validator( eles.norm_pledgeRemark, eles.err13, eles.errTxt13 )&&
                // eles.discountMoney.validator( eles.norm_discountMoney, eles.err14, eles.errTxt14 )&&
                //eles.serviceCharge.validator( eles.norm_serviceCharge, eles.err15, eles.errTxt15 )&&
                eles.installGPS.validator( eles.norm_installGPS, eles.err52, eles.errTxt52 )&&
                eles.loanAmountEstimate.validator( eles.norm_loanAmountEstimate, eles.err16, eles.errTxt16 )&&
                eles.commissionMoney.validator( eles.norm_commissionMoney, eles.err18, eles.errTxt18 )&&
                eles.loanDate.validator( eles.norm_loanDate, eles.err88, eles.errTxt88 )
                // eles.commissionRatio.validator( eles.norm_commissionRatio, eles.err19, eles.errTxt19 )
                // eles.rentingDate.validator( eles.norm_rentingDate, eles.err8, eles.errTxt8 )
            ){
                //eles.form.submit();
                checkCustomerVehicleRelation(eles.form);
            }

        }

    }else{
        if(
            eles.financeInstitutionCode.validator( eles.norm_financeInstitutionCode, eles.err01, eles.errTxt01 )&&
            eles.finanaceProduct.validator( eles.norm_finanaceProduct, eles.err2, eles.errTxt2 )&&
            // eles.financeTime.validator( eles.norm_financeTime, eles.err3, eles.errTxt3 ) &&
            // eles.rentingDate.validator( eles.norm_rentingDate, eles.err8, eles.errTxt8 )&&
            // eles.pledgeRemark.validator( eles.norm_pledgeRemark, eles.err13, eles.errTxt13 )&&
            // eles.discountMoney.validator( eles.norm_discountMoney, eles.err14, eles.errTxt14 )&&
            //eles.serviceCharge.validator( eles.norm_serviceCharge, eles.err15, eles.errTxt15 )&&
            eles.loanAmountEstimate.validator( eles.norm_loanAmountEstimate, eles.err16, eles.errTxt16 )&&
            eles.commissionMoney.validator( eles.norm_commissionMoney, eles.err18, eles.errTxt18 )&&
            eles.loanDate.validator( eles.norm_loanDate, eles.err88, eles.errTxt88 )
            // eles.commissionRatio.validator( eles.norm_commissionRatio, eles.err19, eles.errTxt19 )
            // eles.rentingDate.validator( eles.norm_rentingDate, eles.err8, eles.errTxt8 )
        ){
            checkCustomerVehicleRelation(eles.form);
            //eles.form.submit();
        }
    }
    ev.preventDefault();
});

var checkCustomerVehicleRelation=function (form) {
    $.ajax({
        url: '/financeOrder/checkCustomerVehicleRelation',
        method: "get",
        data: {
            formalOrderCode:$("#f_code").val()
        },
        success: function(data) {
            if(data){
                form.submit();
            }else{
                parent.layer.open({
                    title: '【ECM消息提示】',
                    content: '人车关系没有同步,不能登记!',
                    icon: 0
                });
            }
        }
    });
};

/*$("#cancelBrandOrderBtn").click(function() {
//	confirm("确认", "确认重置订单？", function(r) {
//		if(r) {
    var url = $("#cancelBrandOrderUrl").val();
    $.ajax({
        url: url,
        method: "get",
        sync: false,
        cache: false,
        success: function(data) {
            if(data.flag) {
                infoMes("操作成功！");
                window.location.reload();
            } else {
                errerMes(data.msg);
            }
        }
    })
//		}
//	})
})*/

// $("#cancelBrandOrderBtn").click(function() {
//
//     layerConfirm("确认重置订单?",function () {
//         var url = $("#cancelBrandOrderUrl").val();
//         $.ajax({
//             url: url,
//             method: "get",
//             sync: false,
//             cache: false,
//             success: function(data) {
//                 if(data.flag) {
//                     layerSuccessFn("操作成功!",function () {
//                         window.location.reload();
//                     });
//                 } else {
//                     layerError(data.msg);
//                 }
//             }
//         })
//     });
// })
//
// $(document).ready(function () {
//
//     var region = $("#region").val();
//     if(region!=null) {
//         var cartCodePrex = $("#cartCodePrex_" + region);
//         $("#cartCodePrex").val(cartCodePrex.val());
//     }
// });
//
// function checkChangeTime() {
//     setTimeout(function () {
//         $("#laydate_table td").click(function () {
//             bindFn();
//         })
//     },100);
// }
//
// function bindFn() {
//     if($("#creationtime").val()){
//         $(".err2").hide();
//     }
//     if($("#endtime").val()){
//         $(".err6").hide();
//     }
// }