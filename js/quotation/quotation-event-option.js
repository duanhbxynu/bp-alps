//	if(!localStorage.getItem('$state')) {
//		plus.nativeUI.toast('登陆过期，请重新登陆！');
//		return;
//		common.baseOption.goToLogin();
//	}
//	var token = JSON.parse(localStorage.getItem('$state')).token;
//	var searchAResultPicker = new mui.PopPicker();
//	var mask = mui.createMask(); //callback为用户点击蒙版时自动执行的回调；
//	var count = 0;
	mui('.mui-clone-search').on('tap', '.mui-icon-plus-filled', function() {
		
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
				xhr.setRequestHeader("Authorization", "Bearer " + common.baseOption.getToken());
			},
			success: function(data) {
				console.log("product list result:" + JSON.stringify(data));
				console.log("--------------------------------------------------------------");
				if(data.success == true) {
					console.log("product list result:" + data.productList);
					if(data.productList.length>0){
						var cloneProductList =[];
						mui.each(data.productList,function(i,product){
							console.log(document.getElementById(productType+'-'+product.code));
							if(!document.getElementById(productType+'-'+product.code)){
								cloneProductList.push(product);
							}
						})
						console.log(cloneProductList);
						var productView = template(productType+'-template', {
							"productList": cloneProductList
						});
						document.getElementById(productType+'-comment').innerHTML = productView;
						mui('.mui-numbox').numbox();
					}
					 
				}
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log("xhr");
				console.log(xhr); 
				console.log("type");
				console.log(type);
				console.log("errorThrown");
				console.log(errorThrown);
//				plus.nativeUI.toast('哎哟，出错了，请稍后再试！');
//				common.baseOption.goToLogin();
			}
		})
	
	})
	
	document.getElementById('creatQuotation').addEventListener('tap',function(){
		var page = this.getAttribute('data-page');
		var opportunityCode = document.getElementById('customerName').getAttribute('data-oppoCode');
		var deposit = document.getElementById('deposit').value;
		var lineItemName = document.getElementById('lineItemName').getAttribute('data-value');
		//车辆信息
		var brands = document.getElementsByClassName("brands")[0].getAttribute('data-value');
		var vehicleBrandName = document.getElementsByClassName("brands")[0].getAttribute('data-text');
		
		var vehicle = document.getElementsByClassName("series")[0].getAttribute('data-value');
		var vehicleName = document.getElementsByClassName("series")[0].getAttribute('data-text');
		
		var carModel = document.getElementsByClassName("carType")[0].getAttribute("data-value");
		var carModelName = document.getElementsByClassName("carType")[0].getAttribute("data-text");
		
		var outColors = document.getElementsByClassName("outColors")[0].getAttribute("data-value");
		var carColorName = document.getElementsByClassName("outColors")[0].getAttribute("data-text");
		
		var innerColors = document.getElementsByClassName("innerColors")[0].getAttribute("data-value");
//		var deliveryDate = document.getElementsByClassName("deliveryDate")[0].getAttribute("data-value");
		var carPrice = document.getElementById('carPrice').value;
		var carSalesPrice = document.getElementById('carSalesPrice').value;
		if(!brands){
			return plus.nativeUI.toast('请选择品牌');
		}
		if(!vehicle){
			return plus.nativeUI.toast('请选择车系');
		}
		if(!carModel){
			return plus.nativeUI.toast('请选择车型');
		}
		if(!carPrice){
			return plus.nativeUI.toast('请输入厂方指导价');
		}
		if(!carSalesPrice){
			return plus.nativeUI.toast('请输入车辆销售价');
		}
//		var paymentType = document.getElementsByClassName("payWay")[0].getAttribute("data-value");
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
		//二手车登记
		var secondHandCarMortgage = document.body.querySelector('input[name=secondHandCarMortgage]:checked').value;
		var secondHandCarMileage = document.getElementById('secondHandCarMileage').value;
		var secondHandCarPurchasedDate = document.getElementById('secondHandCarPurchasedDate').value;
		var secondHandCarBrand = document.getElementById('secondHandCarBrand').value;
		var secondHandCarVhicle = document.getElementById('secondHandCarVhicle').value;
		var secondHandCarEvaluationOfPrice = document.getElementById('secondHandCarEvaluationOfPrice').value;
		var secondHandCarRecycleType = document.body.querySelector('input[name=secondHandCarRecycleType]:checked').value;
		var secondHandCarRemark = document.getElementById('secondHandCarRemark').value;
		//上牌
		var licensePlateTax = document.getElementById('licensePlateTax').value;
		var licensePlatePurchaseMethod = document.body.querySelector('input[name=licensePlatePurchaseMethod]:checked').value;
		var vehicleTypeForLicensePlate = document.body.querySelector('input[name=vehicleTypeForLicensePlate]:checked').value;
		var province = document.getElementsByClassName("addressLayer2")[0].getAttribute("data-provinceCode");
		var city = document.getElementsByClassName("addressLayer2")[0].getAttribute("data-cityCode");
		var licensePlateServiceCharge = document.getElementById('licensePlateServiceCharge').value;
		var licensePlateRemake = document.getElementById('licensePlateRemake').value;
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
		//其他
		var serviceInfo = document.getElementById('serviceInfo').value;
		var servicePrice = document.getElementById('servicePrice').value;
		var otherIncomInfo = document.getElementById('otherIncomInfo').value;
		var otherPrice = document.getElementById('otherPrice').value;
		
		var params = {
			opportunityCode:opportunityCode,
			deposit:deposit,
			lineItemName:lineItemName,
			vehicleBrand:brands,
			vehicleBrandName:vehicleBrandName,
			vehicle:vehicle,
			vehicleName:vehicleName,
			carModel:carModel,
			carModelName:carModelName,
			carColor:outColors,
			carColorName:carColorName,
			carInsideColor:innerColors,
//			deliveryDate:deliveryDate,
//			paymentType:paymentType,
			carPrice:carPrice,
			carSalesPrice:carSalesPrice,
			optionalProduct:optionalProduct, 
			upholsteryProduct:upholsteryProduct,
			secondHandCarMortgage:secondHandCarMortgage,
			secondHandCarMileage:secondHandCarMileage,
			secondHandCarPurchasedDated:secondHandCarPurchasedDate,
			secondHandCarBrand:secondHandCarBrand,
			secondHandCarVhicle:secondHandCarVhicle,
			secondHandCarEvaluationOfPrice:secondHandCarEvaluationOfPrice,
			secondHandCarRecycleType:secondHandCarRecycleType,
			secondHandCarRemark:secondHandCarRemark,
			licensePlateTax:licensePlateTax,
			licensePlatePurchaseMethod:licensePlatePurchaseMethod,
			vehicleTypeForLicensePlate:vehicleTypeForLicensePlate,
			licensePlateServiceCharge:licensePlateServiceCharge,
			licensePlateRemake:licensePlateRemake,
			province:province,
			city:city,
			financeType:financeType,
			financeCycle:financeCycle,
			financeCompany:financeCompany,
			financeProduct:financeProduct,
			financeStartTime:financeStartTime,
			financeUnitPrice:financeUnitPrice,
			financeServiceCharge:financeServiceCharge,
			financeRate:financeRate,
			financeMortgage:financeMortgage,
			financeRemark:financeRemark,
			insuranceProduct:insuranceProduct,
			coupon: coupon,
			extendedWarrantyProduct:extendedWarrantyProduct,
			serviceInfo:serviceInfo,
			servicePrice:servicePrice,
			otherIncomInfo:otherIncomInfo,
			otherPrice:otherPrice
		};
		console.log(JSON.stringify(params));
		var params1 ={
			carColor: "A0002_B",
			carInsideColor: "A0001_B",
			carModel: "A0002",
			carPrice: "1005",
			carSalesPrice: "1000",
			coupon:[{code: "V0001", price: "595", actualPrice: "5", quantity: "5"},
					{code: "V0002", price: "596", actualPrice: "5", quantity: "5"}],
			deliveryDate: null,
			deposit: "500",
			extendedWarrantyProduct:[{code: "I0004", price: "593", actualPrice: "5", quantity: "5"}],
			financeCompany: "5",
			financeCycle: "12",
			financeMortgage: "true",
			financeProduct: "5",
			financeRate: "5",
			financeRemark: "5",
			financeServiceCharge: "5",
			financeStartTime: "2018-09-27",
			financeType: "financeType1",
			financeUnitPrice: "5",
			insuranceProduct:[{code: "I0001", price: "590", actualPrice: "5", quantity: "5"},
							 {code: "I0002", price: "591", actualPrice: "5", quantity: "5"}],
			licensePlatePurchaseMethod: "license1",
			licensePlateRemake: "5",
			licensePlateServiceCharge: "5",
			licensePlateTax: "5",
			lineItemName: "type1",
			opportunityCode: "OP0000000",
			optionalProduct:[{code: "M0001", price: "590", actualPrice: "5", quantity: "5"},
							 {code: "M0002", price: "591", actualPrice: "5", quantity: "5"}],
			otherIncomInfo: "5",
			otherPrice: "5",
			secondHandCarBrand: "5",
			secondHandCarMileage: "5",
			secondHandCarMortgage: "true",
			secondHandCarRecycleType: "1",
			secondHandCarVhicle: "5",
			serviceInfo: "5",
			servicePrice: "5",
			upholsteryProduct:[{code: "M0004", price: "593", actualPrice: "5", quantity: "5"},
								{code: "M0003", price: "592", actualPrice: "5", quantity: "5"}],
			vehicle: "a7",
			vehicleBrand: "audi",
			vehicleTypeForLicensePlate: "国内",
			province:null,
			city:null,
			financeRemark:"",
			licensePlateRemake: "",
			secondHandCarEvaluationOfPrice: ""
		}
		mui.ajax({
			url:serviceBaseUrl+"alpssalewebservices/quotaion/create",
			type:"POST",
			dataType:"json",
			contentType: 'application/json',
	        data: JSON.stringify(params),
	        beforeSend: function (xhr) {
		       xhr.setRequestHeader("Authorization","Bearer " + common.baseOption.getToken());
		    },
			success: function (data) {
				console.log("quotation create result:"+JSON.stringify(data));
				console.log("--------------------------------------------------------------");
				if(data.success==true){
					if(page=='add'){
						mui.fire(plus.webview.getWebviewById('quotation-list'), 'showList', {
							type: "商谈报价",
							typeCode:"quotation",
							opporCode:opportunityCode,
							name:document.getElementById('customerName').getAttribute('data-name'),
							mobile:document.getElementById('customerName').getAttribute('data-mobile'),
						});
						mui.openWindow({
							url:'quotation-list.html',
							id: 'quotation-list'//b页面id
						})
					}else if(page=='clone'){
						mui.fire(plus.webview.getWebviewById('quotation-list'), 'showList', {
							type: "商谈报价",
							typeCode:"quotation",
							opporCode:opportunityCode,
							name:document.getElementById('customerName').getAttribute('data-name'),
							mobile:document.getElementById('customerName').getAttribute('data-mobile'),
						});
						mui.openWindow({
							url:'quotation-list.html',
							id: 'quotation-list'//b页面id
						})
					}
					
				}
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log("textStatus");
				console.log(jqXHR); 
				console.log("textStatus");
				console.log(textStatus);
				console.log("errorThrown");
				console.log(errorThrown);
//				plus.nativeUI.toast('quotation create出错了，请稍后再试！');
//				common.baseOption.goToLogin();
			}
		})
		
	})
	

	
	
	
