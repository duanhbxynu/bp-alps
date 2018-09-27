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
	
	
	
