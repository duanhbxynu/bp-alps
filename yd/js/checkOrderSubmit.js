

//校验--金融订单
var validatorfinance = {
	//仅做非空判断
	normAll :/\S+/,
	
	
	//金融产品
	financeProductCode:$("#financeProductCode"),
	financeProductName:$("#financeProductName"),
	
	errfinanceProductCode:$('.errfinanceProductCode'),
	errTxtfinanceProductCode:  '请选择金融产品',
	errTxtfinanceProductName:  '请输入金融产品',
	
	//金融服务费
	financeServerMoney:$("#financeServerMoney"),
	errfinanceServerMoney:$('.errfinanceServerMoney'),
	errTxtfinanceServerMoney:  '请输入金融服务费',
	
	//金融期限
	financeTerm:$("#financeTerm"),
	financeTermTow:$("#financeTermTow"),
	errfinanceTerm:$('.errfinanceTerm'),
	errTxtfinanceTerm:  '请选择金融期限',
	 
	//是否享受贴息
	discountMoney:$("#discountMoney"),
	errdiscountMoney:$(".errdiscountMoney"),
	errTxtdiscountMoney:  '请输入您享受贴息的金额',
	
	//贷款金额（预估）
	loanAmount:$("#loanAmount"),
	errloanAmount:$(".loanAmount"),
	errTxtloanAmount:'请输入预估贷款金额',
	
	//贷款比例(%)(预估)
	loanRatio   :$("#loanRatio"),
	errloanRatio :$(".loanRatio"),
	errTxtloanRatio :'请输入预估贷款比例',
	
	//融资范围
	financingRange  :$("#financingRange"),
	errfinancingRange :$(".financingRange"),
	errTxtfinancingRange :'请选择融资范围',
		
	//融资总额
	financingTotal:$("#financingTotal"),
	errfinancingTotal :$(".financingTotal"),
	errTxtfinancingTotal :'请输入融资总额',
	
	//保证金
	cautionMoney :$("#cautionMoney"),
	errcautionMoney :$(".cautionMoney"),
	errTxtcautionMoney :'请输入保证金',
	
	//首付
	downPayments   :$("#downPayments"),
	errdownPayments :$(".downPayments"),
	errTxtdownPayments :'请输入首付',
	
};

//校验--other订单
var validatorother={
		//仅做非空判断
		normAll :/\S+/,	
		
		//综合服务费
		comprehensivePrice   :$("#comprehensivePrice"),
		errcomprehensivePrice :$(".comprehensivePrice"),
		errTxtcomprehensivePrice :'请输入综合服务费',
		
		//其他费用
		otherPrice   :$("#otherPrice"),
		errotherPrice :$(".otherPrice"),
		errTxtotherPrice :'请输入其他费用',
		
		//备注
		remark   :$("#remarkforOtherOrder"),
		errremark :$(".remark"),
		errTxtremark :'请输入备注信息',
		
};

//validate Vehicle Brand
var validateVehicleBrand={
		normAll :/\S+/,	
		
		carTaxPriceEst   :$("#taxEstimatedPrice"),
		errCarTaxPriceEst :$(".taxEstimatedPrice"),
		errTxtCarTaxPriceEst :'请输入新车购置税（预估）'
//			,
//
//		carTaxPrice   :$("#taxActualPrice"),
//		errCarTaxPrice :$(".taxActualPrice"),
//		errTxtCarTaxPrice :'请输入新车购置税（实际）',
		
};

var validateInsurance={
	normAll :/\S+/,

	estimateMoney   :$("#estimateMoney"),
	errestimateMoney :$(".estimateMoney"),
	errTxtestimateMoney :'请输入保费（预估）',

	trysummoney   :$("#trysummoney"),
	errtrysummoney :$(".trysummoney"),
	errTxttrysummoney :'请输入金额',

	insuranceCompany: $('#insuranceCompany'),
	errinsuranceCompany :$(".insuranceCompany"),
	errTxtinsuranceCompany :'请选保险公司',

	discountpercent   :$("#discountpercent"),
	errdiscountpercent :$(".discountpercent"),
	errTxtdiscountpercent :'请输入折扣',
};


//////保险登记单页面 insuranceregister.jsp 校验
var validateInsuranceRegister={
	normAll :/\S+/,

	beneficiaries   :$("#beneficiaries"),
	errbeneficiaries :$(".beneficiaries"),
	errTxtbeneficiaries :'必填信息',

	beneficiariesID   :$("#beneficiariesID"),
	errbeneficiariesID :$(".beneficiariesID"),
	errTxtbeneficiariesID :'必填信息',

	policyHolder: $('#policyHolder'),
	errpolicyHolder :$(".policyHolder"),
	errTxtpolicyHolder :'必填信息',

    useType : $('select[name="insuranceOrder.insuranceRegister.useType"]'),
    errUseType:$('.errUseType'),
    errUseTypeHolder:'必填信息',

	downpayment : $('#downpayment'),
	errdownpayment:$('.downpayment'),
	errdownpaymentHolder:'必填信息'
};




function checkFinanceOrderFunction(){

	
	var interestDiscount= $("#interestDiscount").val();
	var financeType=$("#financeType").val();
	var financeInstitutionStr=$("#financeInstitution").val();
	if(financeInstitutionStr.indexOf("融资租赁")>0){
		if(financeType=="SelfFinance"){
			if(validatorfinance.financeProductCode.validator( validatorfinance.normAll, validatorfinance.errfinanceProductCode, validatorfinance.errTxtfinanceProductCode )
				&&validatorfinance.financeServerMoney.validator( validatorfinance.normAll, validatorfinance.errfinanceServerMoney, validatorfinance.errTxtfinanceServerMoney )
				&&((validatorfinance.financeTerm.validator( validatorfinance.normAll, validatorfinance.errfinanceTerm, validatorfinance.errTxtfinanceTerm ))
						 ||(validatorfinance.financeTermTow.validator( validatorfinance.normAll, validatorfinance.errfinanceTerm, validatorfinance.errTxtfinanceTerm )))
						// &&((interestDiscount=='true'&&validatorfinance.discountMoney.validator( validatorfinance.normAll, validatorfinance.errdiscountMoney, validatorfinance.errTxtdiscountMoney ))
						// 		 ||	interestDiscount=='false')
						&&validatorfinance.financingRange.validator( validatorfinance.normAll, validatorfinance.errfinancingRange, validatorfinance.errTxtfinancingRange )
						&&validatorfinance.financingTotal.validator( validatorfinance.normAll, validatorfinance.errfinancingTotal, validatorfinance.errTxtfinancingTotal )
						&&validatorfinance.cautionMoney.validator( validatorfinance.normAll, validatorfinance.errcautionMoney, validatorfinance.errTxtcautionMoney )
						&&validatorfinance.downPayments.validator( validatorfinance.normAll, validatorfinance.errdownPayments, validatorfinance.errTxtdownPayments )
			
				){
					return true;
				} 
		}else{
			if(validatorfinance.financeProductName.validator( validatorfinance.normAll, validatorfinance.errfinanceProductName, validatorfinance.errTxtfinancefinanceProductName)
					&&((validatorfinance.financeTerm.validator( validatorfinance.normAll, validatorfinance.errfinanceTerm, validatorfinance.errTxtfinanceTerm ))
							 ||(validatorfinance.financeTermTow.validator( validatorfinance.normAll, validatorfinance.errfinanceTerm, validatorfinance.errTxtfinanceTerm )))
							// &&((interestDiscount=='true'&&validatorfinance.discountMoney.validator( validatorfinance.normAll, validatorfinance.errdiscountMoney, validatorfinance.errTxtdiscountMoney ))
							// 		 ||	interestDiscount=='false')
							&&validatorfinance.financingRange.validator( validatorfinance.normAll, validatorfinance.errfinancingRange, validatorfinance.errTxtfinancingRange )
							&&validatorfinance.financingTotal.validator( validatorfinance.normAll, validatorfinance.errfinancingTotal, validatorfinance.errTxtfinancingTotal )
							&&validatorfinance.cautionMoney.validator( validatorfinance.normAll, validatorfinance.errcautionMoney, validatorfinance.errTxtcautionMoney )
							&&validatorfinance.downPayments.validator( validatorfinance.normAll, validatorfinance.errdownPayments, validatorfinance.errTxtdownPayments ))
			{
				return true;
			}
		}
		return false;
	}else{
		if(financeType=="SelfFinance"){
			if(validatorfinance.financeProductCode.validator( validatorfinance.normAll, validatorfinance.errfinanceProductCode, validatorfinance.errTxtfinanceProductCode )
					&&validatorfinance.financeServerMoney.validator( validatorfinance.normAll, validatorfinance.errfinanceServerMoney, validatorfinance.errTxtfinanceServerMoney )
					&&((validatorfinance.financeTerm.validator( validatorfinance.normAll, validatorfinance.errfinanceTerm, validatorfinance.errTxtfinanceTerm ))
					 ||(validatorfinance.financeTermTow.validator( validatorfinance.normAll, validatorfinance.errfinanceTerm, validatorfinance.errTxtfinanceTerm )))
					// &&((interestDiscount=='true'&&validatorfinance.discountMoney.validator( validatorfinance.normAll, validatorfinance.errdiscountMoney, validatorfinance.errTxtdiscountMoney ))
					// 		 ||	interestDiscount=='false')
					&&validatorfinance.loanAmount.validator( validatorfinance.normAll, validatorfinance.errloanAmount, validatorfinance.errTxtloanAmount )
					&&validatorfinance.loanRatio.validator( validatorfinance.normAll, validatorfinance.errloanRatio, validatorfinance.errTxtloanRatio )
				){
					return true;
				} 
		}else{
			if(validatorfinance.financeProductName.validator( validatorfinance.normAll, validatorfinance.errfinanceProductName, validatorfinance.errTxtfinancefinanceProductName)
					&&validatorfinance.financeServerMoney.validator( validatorfinance.normAll, validatorfinance.errfinanceServerMoney, validatorfinance.errTxtfinanceServerMoney )
					&&((validatorfinance.financeTerm.validator( validatorfinance.normAll, validatorfinance.errfinanceTerm, validatorfinance.errTxtfinanceTerm ))
					 ||(validatorfinance.financeTermTow.validator( validatorfinance.normAll, validatorfinance.errfinanceTerm, validatorfinance.errTxtfinanceTerm )))
					// &&((interestDiscount=='true'&&validatorfinance.discountMoney.validator( validatorfinance.normAll, validatorfinance.errdiscountMoney, validatorfinance.errTxtdiscountMoney ))
					// 		 ||	interestDiscount=='false')
					&&validatorfinance.loanAmount.validator( validatorfinance.normAll, validatorfinance.errloanAmount, validatorfinance.errTxtloanAmount )
					&&validatorfinance.loanRatio.validator( validatorfinance.normAll, validatorfinance.errloanRatio, validatorfinance.errTxtloanRatio )
					){
				return true;
			}
		}
		return false;
	}
}


/////校验保险小订单，必填项
function checkInsuranceOrderFunction(){

	if(validateInsurance.estimateMoney.validator(validateInsurance.normAll,validateInsurance.errestimateMoney,validateInsurance.errTxtestimateMoney)
		&&validateInsurance.trysummoney.validator(validateInsurance.normAll,validateInsurance.errtrysummoney,validateInsurance.errTxttrysummoney)
		&&validateInsurance.discountpercent.validator(validateInsurance.normAll,validateInsurance.errdiscountpercent,validateInsurance.errTxtdiscountpercent)
	    ){

		return true ;
	}else{
		return false;
	}
}


function checkInsuranceRegisterFunction(){

	if(validateInsuranceRegister.beneficiaries.validator(validateInsuranceRegister.normAll,validateInsuranceRegister.errbeneficiaries,validateInsuranceRegister.errTxtbeneficiaries)
		&&validateInsuranceRegister.beneficiariesID.validator(validateInsuranceRegister.normAll,validateInsuranceRegister.errbeneficiariesID,validateInsuranceRegister.errTxtbeneficiariesID)
		&&validateInsuranceRegister.policyHolder.validator(validateInsuranceRegister.normAll,validateInsuranceRegister.errpolicyHolder,validateInsuranceRegister.errTxtpolicyHolder)
		&&validateInsuranceRegister.useType.validator(validateInsuranceRegister.normAll,validateInsuranceRegister.errUseType,validateInsuranceRegister.errUseTypeHolder)
	){

		////按揭选是， 要判断首付是否填写
		if($('#selinst').val()=='true'){
			if(validateInsuranceRegister.downpayment.validator(validateInsuranceRegister.normAll,validateInsuranceRegister.errdownpayment,validateInsuranceRegister.errdownpaymentHolder)){
				return true ;
			}else{
				return false;
			}
		}

		return true ;
	}else{
		return false;
	}



}

/////校验保险小订单，必须选 三者 和车损
function checkInsuranceTypeFunction(){
	var selins = $('#insurancetypecode').val();
	// C000000003    C000000004
	var chesun = $.inArray('C000000003',selins);
	var disan = $.inArray('C000000004',selins);

	if(chesun != -1 && disan != -1){   ///说明都存在，通过
		return true ;
	}else{
		return false;
	}
}
	
function checkVehicleBrandFunction(){
	if(validateVehicleBrand.carTaxPriceEst.validator( validatorother.normAll, validatorother.errCarTaxPriceEst, validatorother.errTxtCarTaxPriceEst )
//			&&validateVehicleBrand.carTaxPrice.validator( validatorother.normAll, validatorother.errCarTaxPrice, validatorother.errTxtCarTaxPrice )
			){
			return true;
		}else {
			return false;
		}
}

function checkOtherOrderFunction(){
	if(validatorother.comprehensivePrice.validator( validatorother.normAll, validatorother.errcomprehensivePrice, validatorother.errTxtcomprehensivePrice )
			/*&&validatorother.otherPrice.validator( validatorother.normAll, validatorother.errotherPrice, validatorother.errTxtotherPrice )*/
			&&validatorother.remark.validator( validatorother.normAll, validatorother.errremark, validatorother.errTxtremark )
			){
			return true;
		}else {
			return false;
		}
}
function checkGuaranteeFunction(){
    var temp=$('input[name^="guaranteeOrder.guaranteeProdFormList"]');
    if(temp&&temp.length>1){
        return true;
    }else{
        return false;
    }
}
function checkDelayFunction(){
    var temp=$('input[name^="delayInsuranceOrder.delayInsuranceProdFormList"]');
    if(temp&&temp.length>1){
        return true;
    }else{
        return false;
    }
}
/////检查延保销售价是否为空
function checkDelaySalepriceFunction(){
	var temp=$('input[name^="delayInsuranceOrder.delayInsuranceProdFormList"]');
	if(temp&&temp.length>1){
		var n = temp.length/7 ;
		for(var i=0 ;i<n; i++){
			var sale = $('input[name="delayInsuranceOrder.delayInsuranceProdFormList['+i+'].salesPrice"]').val();
			if($.trim(sale)== ''){
				return false;
			}
		}
		return true;
	}
}



function checkAttachmentFunction(){
    var temp=$('input[name^="attachmentOrder.attachmentProductFormList"]');
    if(temp&&temp.length>1){
        return true;
    }else{
        return false;
    }
}


function resetOrderInfo(){
	$('.errfinanceServerMoney').text("");
	$('.errfinanceTerm') .text("");
	$(".errdiscountMoney").text("");
	$(".loanAmount").text("");
	$(".loanRatio").text("");
	$(".financingRange").text("");
	$(".financingTotal").text("");
	$(".cautionMoney").text("");
	$(".downPayments").text("");
	$(".comprehensivePrice").text("");
	$(".otherPrice").text("");
	$(".remark").text("");
}

function checkSecondHandOrder() {
	var returnResult=true;
    var secondHandOrderList=$("input[name='secondHandOrderList[0].replaceInfo']");
	if($("input[name='isSelectSecondHand']").val()=='true' && secondHandOrderList.length==0){
        returnResult=false;
        return returnResult;
	}
	$("[name^='secondHandOrderList']").each(function (index,value) {
		if(!$(value).val() && $(value).attr("name").indexOf("code")==-1 && $(value).attr("id")!='secondHandOrderResetInput'){
            returnResult=false;
            return false;
		}
    });
    return returnResult;
}
