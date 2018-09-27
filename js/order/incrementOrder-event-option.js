<<<<<<< 1194cadd3b3798c5a1a9e1f86f30d7c104a4fe19
	if(!localStorage.getItem('$state')) {
		plus.nativeUI.toast('登陆过期，请重新登陆！');
		common.baseOption.goToLogin();
	}
	var token = JSON.parse(localStorage.getItem('$state')).token;
	var searchAResultPicker = new mui.PopPicker();
	var mask = mui.createMask(); //callback为用户点击蒙版时自动执行的回调；
	var count = 0;
	mui('.mui-search').on('tap', '.mui-icon-plus-filled', function() {
		
		var searchText = this.parentNode.getElementsByTagName('input')[0].value;
		var categoryCode = this.parentNode.getElementsByTagName('input')[0].getAttribute('data-categoryCode');
		var productType = this.parentNode.getElementsByTagName('input')[0].getAttribute('data-productType');
		var values = {
			currentPage: 0,
			pagesize: 2000,
			categoryCode: categoryCode,
			searchText: searchText
		};
		console.log("product list request:" + JSON.stringify(values));
		mui.ajax({
			url: serviceBaseUrl + "alpssalewebservices/product/list",
			type: "POST",
			dataType: "json",
			contentType: 'application/json',
			data: JSON.stringify(values),
			beforeSend: function(xhr) {
				xhr.setRequestHeader("Authorization", "Bearer " + token);
			},
			success: function(data) {
				console.log("product list result:" + JSON.stringify(data));
				console.log("--------------------------------------------------------------");
				if(data.success == true) {
					console.log("product list result:" + data.productList);
					var productView = template(productType+'-template', {
							"productList": data.productList
						});
					document.getElementById(productType+'-comment').innerHTML = productView;
					mui('.mui-numbox').numbox();
				}
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log("xhr");
				console.log(xhr); 
				console.log("type");
				console.log(type);
				console.log("errorThrown");
				console.log(errorThrown);
				plus.nativeUI.toast('哎哟，出错了，请稍后再试！');
				common.baseOption.goToLogin();
			}
		})
	
	})
	
	document.getElementById('creatOrder').addEventListener('tap',function(){
		console.log(2);
		var params = '';
		var opportunityCode = document.getElementById('customerName').getAttribute('data-oppoCode');
		var attribute = '正式';
		var attributeCode = '正式';
		var customerSource = document.getElementById('customerName').getAttribute('data-platform');
		//客户信息
		var name = document.getElementById('customerName').value;
		var customerType = mui('.mui-radio input[name=customerType]:checked').value;
		var customerTypeCode = mui('.mui-radio input[name=customerType]:checked').value;
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
		var paymentType = document.getElementsByClassName("payWay")[0].getAttribute('data-value');
		var deliveryDate = document.getElementsByClassName("preTime")[0].getAttribute("data-value");
		var customer = {
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
			customer:customer
		}
//		params.push(customer);
		console.log(JSON.stringify(params));
		//车辆信息
		var vehicleBrand = document.getElementsByClassName("brands")[0].getAttribute('data-vehicleBrand');
		var vehicleBrandCode = document.getElementsByClassName("brands")[0].getAttribute('data-vehicleBrandCode');
		var vehicleCategory = document.getElementsByClassName("series")[0].getAttribute('data-vehicleCategory');
		var vehicleCategoryCode = document.getElementsByClassName("series")[0].getAttribute('data-vehicleCategoryCode');
		var vehicle = document.getElementsByClassName("carType")[0].getAttribute("data-vehicle");
		var vehicleCode = document.getElementsByClassName("carType")[0].getAttribute("data-vehicleCode");
		var carColor = document.getElementsByClassName("outColors")[0].getAttribute("data-value");
		var carInsideColor = document.getElementsByClassName("innerColors")[0].getAttribute("data-value");
		var carPrice = document.getElementById('carPrice').value;
		var carSalesPrice = document.getElementById('carSalesPrice').value;
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
		var province = document.getElementsByClassName("address")[0].getAttribute("data-province");
		var city = document.getElementsByClassName("address")[0].getAttribute("data-city");
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
		var params1 = {
			"opportunityCode":"OP0000012",
			"lineItemName":"type1",
			"vehicleBrand":"bmw",
			"vehicle":"G30",
			"carModel":"B0003",
			"carColor":"B0003_B",
			"carSalesPrice":"3000",
			"carPrice":"1017",
			"optionalProduct":[{"code":"M0001","price":"590","actualPrice":"500","quantity":"4"},{"code":"M0002","price":"591","actualPrice":"591","quantity":"1"}],
			"secondHandCarRecycleType":"1",
			"licensePlatePurchaseMethod":"license1",
			"vehicleTypeForLicensePlate":"国内",
			"financeType":"financeType1",
			"financeCycle":"24"
		}
		mui.ajax({
			url:serviceBaseUrl+"alpssalewebservices/order/create",
			type:"POST",
			dataType:"json",
			contentType: 'application/json',
	        data: JSON.stringify(params),
	        beforeSend: function (xhr) {
		       xhr.setRequestHeader("Authorization","Bearer " + token);
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
				plus.nativeUI.toast('quotation create出错了，请稍后再试！');
				common.baseOption.goToLogin();
			}
		})
		
	})
	

	
	
	
=======
	if(!localStorage.getItem('$state')) {
		plus.nativeUI.toast('登陆过期，请重新登陆！');
		common.baseOption.goToLogin();
	}
	var token = JSON.parse(localStorage.getItem('$state')).token;
	var searchAResultPicker = new mui.PopPicker();
	var mask = mui.createMask(); //callback为用户点击蒙版时自动执行的回调；
	var count = 0;
	mui('.mui-search').on('tap', '.mui-icon-plus-filled', function() {
		
		var searchText = this.parentNode.getElementsByTagName('input')[0].value;
		var categoryCode = this.parentNode.getElementsByTagName('input')[0].getAttribute('data-categoryCode');
		var productType = this.parentNode.getElementsByTagName('input')[0].getAttribute('data-productType');
		var values = {
			currentPage: 0,
			pagesize: 2000,
			categoryCode: categoryCode,
			searchText: searchText
		};
		console.log("product list request:" + JSON.stringify(values));
		mui.ajax({
			url: serviceBaseUrl + "alpssalewebservices/product/list",
			type: "POST",
			dataType: "json",
			contentType: 'application/json',
			data: JSON.stringify(values),
			beforeSend: function(xhr) {
				xhr.setRequestHeader("Authorization", "Bearer " + token);
			},
			success: function(data) {
				console.log("product list result:" + JSON.stringify(data));
				console.log("--------------------------------------------------------------");
				if(data.success == true) {
					console.log("product list result:" + data.productList);
					var productView = template(productType+'-template', {
							"productList": data.productList
						});
					document.getElementById(productType+'-comment').innerHTML = productView;
					mui('.mui-numbox').numbox();
				}
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log("xhr");
				console.log(xhr); 
				console.log("type");
				console.log(type);
				console.log("errorThrown");
				console.log(errorThrown);
				plus.nativeUI.toast('哎哟，出错了，请稍后再试！');
				common.baseOption.goToLogin();
			}
		})
	
	})
	
	document.getElementById('creatOrder').addEventListener('tap',function(){
		console.log(2);
		var params = '';
		//客户信息
		var customerId = JSON.parse(localStorage.getItem('customerItem')).customerId;
		var customer = {
			uid:customerId
		}
		var carCode = localStorage.getItem('carCode');
		var vehicleInfo = {
			code:carCode
		}
		params = {
			orderType:'increment',
			customer:customer,
			vehicleInfo:vehicleInfo
		}
//		params.push(customer);
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
		var params1 = {
			"opportunityCode":"OP0000012",
			"lineItemName":"type1",
			"vehicleBrand":"bmw",
			"vehicle":"G30",
			"carModel":"B0003",
			"carColor":"B0003_B",
			"carSalesPrice":"3000",
			"carPrice":"1017",
			"optionalProduct":[{"code":"M0001","price":"590","actualPrice":"500","quantity":"4"},{"code":"M0002","price":"591","actualPrice":"591","quantity":"1"}],
			"secondHandCarRecycleType":"1",
			"licensePlatePurchaseMethod":"license1",
			"vehicleTypeForLicensePlate":"国内",
			"financeType":"financeType1",
			"financeCycle":"24"
		}
		mui.ajax({
			url:serviceBaseUrl+"alpssalewebservices/order/create",
			type:"POST",
			dataType:"json",
			contentType: 'application/json',
	        data: JSON.stringify(params),
	        beforeSend: function (xhr) {
		       xhr.setRequestHeader("Authorization","Bearer " + token);
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
				plus.nativeUI.toast('quotation create出错了，请稍后再试！');
				common.baseOption.goToLogin();
			}
		})
		
	})
	

	
	
	
>>>>>>> 107de00d67a45d0d116354a8cc5d23adef6dca1e
