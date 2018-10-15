	document.getElementById('creatOrder').addEventListener('tap',function(){
		var page = this.getAttribute('data-page');
		var uid = this.getAttribute('data-customerId');
		console.log(2);
		var params = '';
		
		if(page == 'clone'){
			var requestUrl = serviceBaseUrl+"alpssalewebservices/order/update";
			params.code = this.getAttribute('data-orderCode');
		}else{
			var requestUrl = serviceBaseUrl+"alpssalewebservices/order/create";
		}
		var opportunityCode = document.getElementById('customerName').getAttribute('data-oppoCode');
		var attribute = '正式';
		var attributeCode = '正式';
		var customerSource = document.getElementById('customerName').getAttribute('data-platform');
		//客户信息
		var name = document.getElementById('customerName').value;
		var customerType = document.querySelector('input[name=customerType]:checked').getAttribute('data-text');
		var customerTypeCode = document.querySelector('input[name=customerType]:checked').value;
		var identityType =  document.getElementsByClassName("idType")[0].getAttribute('data-value');
		var identityNumber =  document.getElementById('idNumber').value;
		var mobileNumber =  document.getElementById('customerMobile').value;
		var otherContactNumber = document.getElementById('otherContactNumber').value;
		var provinceCode = document.getElementById('contactAddress').getAttribute('data-provinceCode');
		var cityCode = document.getElementById('contactAddress').getAttribute('data-cityCode');
		var districtCode = document.getElementById('contactAddress').getAttribute('data-districtCode');
		var address = document.getElementById('address').value;
		var postcode = document.getElementById('postcode').value;
		var operatorName = document.getElementById("operatorName").value;
		var operatorMobile = document.getElementById('operatorMobile').value;
		var operatorIdType = document.getElementById('operatorIdType').getAttribute('data-value');
		var operatorIdNumber = document.getElementById('operatorIdNumber').value;
		var paymentType = document.getElementsByClassName("paymentMethod")[0].getAttribute('data-value');
		var deliveryDate = document.getElementsByClassName("deliveryDate")[0].getAttribute("data-value");
		var customer = {
			uid:uid,
			address:address,
			cityCode:cityCode,
			customerType:customerType,
			customerTypeCode:customerTypeCode,
			districtCode:districtCode,
			identityNumber:identityNumber,
			identityType:identityType,
			mobileNumber:mobileNumber,
			name:name,
			otherContactNumber:otherContactNumber,
			provinceCode:provinceCode
		}
		params = {
			opportunityCode:opportunityCode,
			orderType:"wholeVehicle",
			customer:customer,
			deliveryDate:deliveryDate,
			paymentType:paymentType,
			lineItemName:document.getElementById('lineItemName').getAttribute('data-value')||''
		}
//		params.push(customer);
		console.log(JSON.stringify(params));
		//车辆信息
		var vehicleBrand = document.getElementsByClassName("brands")[0].getAttribute('data-text');
		var vehicleBrandCode = document.getElementsByClassName("brands")[0].getAttribute('data-value');
		var vehicleCategory = document.getElementsByClassName("series")[0].getAttribute('data-text');
		var vehicleCategoryCode = document.getElementsByClassName("series")[0].getAttribute('data-value');
		var vehicle = document.getElementsByClassName("carType")[0].getAttribute("data-text");
		var vehicleCode = document.getElementsByClassName("carType")[0].getAttribute("data-value");
		var carColor = document.getElementsByClassName("outColors")[0].getAttribute("data-value");
		var carInsideColor = document.getElementsByClassName("innerColors")[0].getAttribute("data-value");
		var carPrice = document.getElementById('carPrice').value;
		var carSalesPrice = document.getElementById('carSalesPrice').value;
		if(!carSalesPrice){
			return plus.nativeUI.toast('请输入销售价格');
		}
		var vehicleInfo = {
			vehicleBrand:vehicleBrand,
			vehicleBrandCode:vehicleBrandCode,
			vehicleCategory:vehicleCategory,
			vehicleCategoryCode:vehicleCategoryCode,
			vehicle:vehicle,
			vehicleCode:vehicleCode,
			carColor:carColor,
			carInsideColor:carInsideColor,
			carPrice:carPrice,
			carSalesPrice:carSalesPrice
		}
		mui.extend(params,vehicleInfo);
		console.log(JSON.stringify(params));
		//原厂选装
		var optionalProduct = [];
		mui('.optionalProduct input[type=checkbox]:checked').each(function(){
			
			var produceId = this.getAttribute("data-code");
			var name = this.getAttribute("data-name");
			var price = this.getAttribute("data-price");
			var actualPriceStr = mui('#optionalProduct-'+produceId+"-actualPrice")[0].innerHTML;
			var actualPrice = actualPriceStr.substring(1,actualPriceStr.length);
			var quantity = mui('#optionalProduct-'+produceId+"-quantity")[0].value;
			var product ={
				actualPrice:actualPrice,
//				actualPrice:parseInt(actualPrice),
				code:produceId,
				price:price,
//				name:name,
//				price:parseInt(price),
				quantity:quantity
			}
			optionalProduct.push(product);
		})
		console.log(optionalProduct);
//		mui.extend(params,optionalProduct);
		params.optionalProduct = optionalProduct;
		console.log(JSON.stringify(params));
		//装潢
		var upholsteryProduct = [];
		mui('.upholsteryProduct input[type=checkbox]:checked').each(function(){
			
			var produceId = this.getAttribute("data-code");
			var name = this.getAttribute("data-name");
			var price = this.getAttribute("data-price");
			var actualPriceStr = mui('#upholsteryProduct-'+produceId+"-actualPrice")[0].innerHTML;
			var actualPrice = actualPriceStr.substring(1,actualPriceStr.length);
			var quantity = mui('#upholsteryProduct-'+produceId+"-quantity")[0].value;
			var product ={
				actualPrice:actualPrice,
				code:produceId,
				price:price,
				quantity:quantity
			}
			upholsteryProduct.push(product);
		})
		console.log(upholsteryProduct);
		params.upholsteryProduct = upholsteryProduct;
		console.log(JSON.stringify(params));
		//二手车登记
//		var secondHandCarMortgage = document.body.querySelector('input[name=secondHandCarMortgage]:checked').value;
		var secondHandCarMileage = document.getElementById('secondHandCarMileage').value;
		var secondHandCarPurchasedDate = document.getElementById('secondHandCarPurchasedDate').value;
		var secondHandCarBrand = document.getElementById('secondHandCarBrand').value;
		var secondHandCarVhicle = document.getElementById('secondHandCarVhicle').value;
		var secondHandCarEvaluationOfPrice = document.getElementById('secondHandCarEvaluationOfPrice').value;
		var secondHandCarRecycleType = document.body.querySelector('input[name=secondHandCarRecycleType]:checked').value;
		var secondHandCarRemark = document.getElementById('secondHandCarRemark').value;
		var secondHand = {
			secondHandCarMileage:secondHandCarMileage,
			secondHandCarPurchasedDate:secondHandCarPurchasedDate,
			secondHandCarBrand:secondHandCarBrand,
			secondHandCarVhicle:secondHandCarVhicle,
			secondHandCarEvaluationOfPrice:secondHandCarEvaluationOfPrice,
			secondHandCarRecycleType:secondHandCarRecycleType,
			secondHandCarRemark:secondHandCarRemark
		}
		console.log(secondHand);
		mui.extend(params,secondHand);
		console.log(JSON.stringify(params));
		//上牌
		var licensePlateTax = document.getElementById('licensePlateTax').value;
//		var licensePlatePurchaseMethod = document.body.querySelector('input[name=licensePlatePurchaseMethod]:checked').value;
		var vehicleTypeForLicensePlate = document.body.querySelector('input[name=vehicleTypeForLicensePlate]:checked').value;
		var province = document.getElementsByClassName("addressLayer2")[0].getAttribute("data-provinceCode");
		var city = document.getElementsByClassName("addressLayer2")[0].getAttribute("data-cityCode");
		var licensePlateServiceCharge = document.getElementById('licensePlateServiceCharge').value;
		var licensePlateRemake = document.getElementById('licensePlateRemake').value;
		var licensePlate = {
			licensePlateTax:licensePlateTax,
//			licensePlatePurchaseMethod:licensePlatePurchaseMethod,
			province:province,
			city:city,
			licensePlateServiceCharge:licensePlateServiceCharge,
			licensePlateRemake:licensePlateRemake
		}
		console.log(licensePlate);
		mui.extend(params,licensePlate);
		console.log(JSON.stringify(params));
		//金融产品
		var financeType = document.getElementsByClassName("financeType")[0].getAttribute("data-value");
		var financeCycle = document.getElementsByClassName("financeCycle")[0].getAttribute("data-value");
		var financeCompany = document.getElementsByClassName("financeCompany")[0].getAttribute("data-value");
		var financeProduct = document.getElementById('financeProduct').value;
		var financeStartTime = document.getElementById('financeStartTime').value;
		var financeUnitPrice = document.getElementById('financeUnitPrice').value;
		var financeServiceCharge = document.getElementById('financeServiceCharge').value;
		var financeRate = document.getElementById('financeRate').value;
		var financeMortgage = document.body.querySelector('input[name=financeMortgage]:checked').value;
		var financeRemark = document.getElementById('financeRemark').value;
		var finance = {
			financeType:financeType,
			financeCycle:financeCycle,
			financeCompany:financeCompany,
			financeProduct:financeProduct,
			financeStartTime:financeStartTime,
			financeUnitPrice:financeUnitPrice,
			financeServiceCharge:financeServiceCharge,
			financeRate:financeRate,
			financeMortgage:financeMortgage,
			financeRemark:financeRemark
		}
		console.log(finance);
		mui.extend(params,finance);
		console.log(JSON.stringify(params));
		//车险
		var insuranceProduct = [];
		mui('.insuranceProduct input[type=checkbox]:checked').each(function(){
			
			var produceId = this.getAttribute("data-code");
			var name = this.getAttribute("data-name");
			var price = this.getAttribute("data-price");
			var actualPriceStr = mui('#insuranceProduct-'+produceId+"-actualPrice")[0].innerHTML;
			var actualPrice = actualPriceStr.substring(1,actualPriceStr.length);
			var quantity = mui('#insuranceProduct-'+produceId+"-quantity")[0].value
			var product ={
				actualPrice:actualPrice,
				code:produceId,
				price:price,
				quantity:quantity
			}
			insuranceProduct.push(product);
		})
		console.log(insuranceProduct);
		params.insuranceProduct = insuranceProduct;
		console.log(JSON.stringify(params));
		//卡券
		var coupon = [];
		mui('.coupon input[type=checkbox]:checked').each(function(){
			
			var produceId = this.getAttribute("data-code");
			var name = this.getAttribute("data-name");
			var price = this.getAttribute("data-price");
			var actualPriceStr = mui('#coupon-'+produceId+"-actualPrice")[0].innerHTML;
			var actualPrice = actualPriceStr.substring(1,actualPriceStr.length);
			var quantity = mui('#coupon-'+produceId+"-quantity")[0].value
			var product ={
				actualPrice:actualPrice,
				code:produceId,
				price:price,
				quantity:quantity
			}
			coupon.push(product);
		})
		console.log(coupon);
		params.coupon = coupon;
		console.log(JSON.stringify(params));
		//延保
		var extendedWarrantyProduct = [];
		mui('.extendedWarrantyProduct input[type=checkbox]:checked').each(function(){
			
			var produceId = this.getAttribute("data-code");
			var name = this.getAttribute("data-name");
			var price = this.getAttribute("data-price");
			var actualPriceStr = mui('#extendedWarrantyProduct-'+produceId+"-actualPrice")[0].innerHTML;
			var actualPrice = actualPriceStr.substring(1,actualPriceStr.length);
			var quantity = mui('#extendedWarrantyProduct-'+produceId+"-quantity")[0].value
			var product ={
				actualPrice:actualPrice,
				code:produceId,
				price:price,
				quantity:quantity
			}
			extendedWarrantyProduct.push(product);
		})
		console.log(extendedWarrantyProduct);
		params.extendedWarrantyProduct = extendedWarrantyProduct;
		console.log(JSON.stringify(params));
		//其他
		var serviceInfo = document.getElementById('serviceInfo').value;
		var servicePrice = document.getElementById('servicePrice').value;
		var otherIncomInfo = document.getElementById('otherIncomInfo').value;
		var otherPrice = document.getElementById('otherPrice').value;
		var other = {
			serviceInfo:serviceInfo,
			servicePrice:servicePrice,
			otherIncomInfo:otherIncomInfo,
			otherPrice:otherPrice
		}
		mui.extend(params,other);
		console.log(JSON.stringify(params));
		
		var parmas2 = {
			"opportunityCode":"OP0000000",
			"orderType":"wholeVehicle",
			"customer":{
				"address":"1111",
				"cityCode":"上海市",
				"districtCode":"上海市",
				"identityNumber":"429006199001011010",
				"identityType":"身份证",
				"mobileNumber":"13320181014",
				"name":"刘诗诗",
				"otherContactNumber":"",
				"provinceCode":"上海市"
			},
			"lineItemName":"零售订单",
			"vehicleBrand":"audi",
			"vehicleBrandCode":"audi",
			"vehicleCategory":"a6",
			"vehicleCategoryCode":"a6",
			"vehicle":"TFSI 风尚版",
			"vehicleCode":"A0001",
			"carColor":"A0001_B",
			"carInsideColor":"A0001_B",
			"carPrice":"1003",
			"carSalesPrice":"",
			"optionalProduct":[],
			"upholsteryProduct":[],
			"secondHandCarMileage":"",
			"secondHandCarPurchasedDate":"",
			"secondHandCarBrand":"",
			"secondHandCarVhicle":"",
			"secondHandCarEvaluationOfPrice":"",
			"secondHandCarRecycleType":"1",
			"secondHandCarRemark":"",
			"licensePlateTax":"",
			"province":null,
			"city":null,
			"licensePlateServiceCharge":"",
			"licensePlateRemake":"",
			"financeType":null,
			"financeCycle":null,
			"financeCompany":null,
			"financeProduct":"",
			"financeStartTime":"",
			"financeUnitPrice":"",
			"financeServiceCharge":"",
			"financeRate":"",
			"financeMortgage":"true",
			"financeRemark":"",
			"insuranceProduct":[],
			"coupon":[],
			"extendedWarrantyProduct":[],
			"serviceInfo":"",
			"servicePrice":"",
			"otherIncomInfo":"",
			"otherPrice":""
			}
		console.log(JSON.stringify(parmas2));
		mui.ajax({
			url:requestUrl,
			type:"POST",
			dataType:"json",
			contentType: 'application/json',
	        data: JSON.stringify(params),
	        beforeSend: function (xhr) {
		       xhr.setRequestHeader("Authorization","Bearer " + common.baseOption.getToken());
		    },
			success: function (data) {
				console.log("order create result:"+JSON.stringify(data));
				console.log("--------------------------------------------------------------");
				if(data.success==true){
//					mui.back();
					common.baseOption.toIndex(2);
				}
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log("textStatus");
				console.log(jqXHR); 
				console.log("textStatus");
				console.log(textStatus);
				console.log("errorThrown");
				console.log(errorThrown);
//				common.baseOption.toIndex(2);
//				plus.nativeUI.toast('order create出错了，请稍后再试！');
//				common.baseOption.goToLogin();
			}
		})
		
	})
	