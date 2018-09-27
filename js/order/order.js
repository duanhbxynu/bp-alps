<<<<<<< 1194cadd3b3798c5a1a9e1f86f30d7c104a4fe19
(function($, order) {
	/* 
	 * 增值订单 - 订单列表
	 * */
	order.qryOrderList = function(values,callback){
		callback = callback || $.noop;
		if(!localStorage.getItem('$state')) {
			plus.nativeUI.toast('获取订单列表token出错了，请稍后再试！');
			common.baseOption.goToLogin();
		}
		var token = JSON.parse(localStorage.getItem('$state')).token;
		
		console.log("token:"+token);
		console.log("order list request:"+JSON.stringify(values));
		console.log(values);
		$.ajax({
			url: serviceBaseUrl+"alpssalewebservices/order/list",
			type:"POST",
			contentType: 'application/json',
			dataType:"jsonp",
			jsonp:"callback",
            data: JSON.stringify(values),
            beforeSend: function (xhr) {
		       xhr.setRequestHeader("Authorization","Bearer " + token);
		    },
			success:callback,
			error: function(xhr, type, errorThrown) {
				console.log("xhr");
				console.log(xhr); 
				console.log("type");
				console.log(type);
				console.log("errorThrown");
				console.log(errorThrown);
				plus.nativeUI.toast('哎哟，出错了，请稍后再试！');
				common.baseOption.goToLogin();
			}
		});
	}
	
	//获取订单详情
	order.getOrderDetail = function(orderCode,callback){
		callback = callback || $.noop;
		
		if(!localStorage.getItem('$state')) {
			plus.nativeUI.toast('获取订单详情token出错了，请稍后再试！');
			return;
		}
		
		var token = JSON.parse(localStorage.getItem('$state')).token;
		
		var params = {code:'',orderCode:orderCode};
		
		console.log("order detail request:"+params);
		m.ajax({
			url:serviceBaseUrl+"alpssalewebservices/order/detail",
			type:"POST",
			dataType:"json",
			contentType: 'application/json',
			data: JSON.stringify(params),
			beforeSend: function (xhr) {
				xhr.setRequestHeader("Authorization","Bearer " + token);
			},
			success: callback,
		    error: function(xhr, textStatus, errorThrown){
		    	plus.nativeUI.toast('哎哟，出错了，请稍后再试！');
			   	common.baseOption.goToLogin();
		    }
		});
		
	}
	
//	$("#saveOrder").click(function(){
//			var values = getFormValue("#orderForm");
//			var jsonvalue = JSON.stringify(values);
//			console.log("order update request:"+jsonvalue);
//			$.ajax({
//				url:baseConfig.serviceBaseUrl+"alpssalewebservices/order/update",
//				type:"POST",
//				dataType:"json",
//				contentType: 'application/json',
//		        data: jsonvalue,
//		        beforeSend: function (xhr) {
//			       xhr.setRequestHeader("Authorization","Bearer " + token);
//			    },
//				success: function (data) {
//					console.log("order update result:"+JSON.stringify(data));
//					console.log("--------------------------------------------------------------");
//					if(data.success == true){
//						location.href = getUrl(baseConfig.baseUrl+baseConfig.order,{},"&orderCode="+orderCode);
//					}
//				}
//			})
//			return false;
//		})
	

	
=======
(function($, order) {
	/* 
	 * 增值订单 - 订单列表
	 * */
	order.qryOrderList = function(values,callback){
		callback = callback || $.noop;
		if(!localStorage.getItem('$state')) {
			plus.nativeUI.toast('获取订单列表token出错了，请稍后再试！');
			common.baseOption.goToLogin();
		}
		var token = JSON.parse(localStorage.getItem('$state')).token;
		
		console.log("order list request:"+JSON.stringify(values));
		$.ajax({
			url: serviceBaseUrl+"alpssalewebservices/order/list",
			type:"POST",
			contentType: 'application/json',
			dataType:"jsonp",
			jsonp:"callback",
            data: JSON.stringify(values),
            beforeSend: function (xhr) {
		       xhr.setRequestHeader("Authorization","Bearer " + token);
		    },
			success:callback,
			error: function(xhr, type, errorThrown) {
				console.log("xhr");
				console.log(xhr); 
				console.log("type");
				console.log(type);
				console.log("errorThrown");
				console.log(errorThrown);
				plus.nativeUI.toast('哎哟，出错了，请稍后再试！');
				common.baseOption.goToLogin();
			}
		});
	}
	
	//获取订单详情
	order.getOrderDetail = function(orderCode,callback){
		callback = callback || $.noop;
		
		if(!localStorage.getItem('$state')) {
			plus.nativeUI.toast('获取订单详情token出错了，请稍后再试！');
			return;
		}
		
		var token = JSON.parse(localStorage.getItem('$state')).token;
		
		var params = {code:'',orderCode:orderCode};
		
		console.log("order detail request:"+params);
		m.ajax({
			url:serviceBaseUrl+"alpssalewebservices/order/detail",
			type:"POST",
			dataType:"json",
			contentType: 'application/json',
			data: JSON.stringify(params),
			beforeSend: function (xhr) {
				xhr.setRequestHeader("Authorization","Bearer " + token);
			},
			success: callback,
		    error: function(xhr, textStatus, errorThrown){
		    	plus.nativeUI.toast('哎哟，出错了，请稍后再试！');
			   	common.baseOption.goToLogin();
		    }
		});
		
	}
	
//	$("#saveOrder").click(function(){
//			var values = getFormValue("#orderForm");
//			var jsonvalue = JSON.stringify(values);
//			console.log("order update request:"+jsonvalue);
//			$.ajax({
//				url:baseConfig.serviceBaseUrl+"alpssalewebservices/order/update",
//				type:"POST",
//				dataType:"json",
//				contentType: 'application/json',
//		        data: jsonvalue,
//		        beforeSend: function (xhr) {
//			       xhr.setRequestHeader("Authorization","Bearer " + token);
//			    },
//				success: function (data) {
//					console.log("order update result:"+JSON.stringify(data));
//					console.log("--------------------------------------------------------------");
//					if(data.success == true){
//						location.href = getUrl(baseConfig.baseUrl+baseConfig.order,{},"&orderCode="+orderCode);
//					}
//				}
//			})
//			return false;
//		})
	

	
>>>>>>> 107de00d67a45d0d116354a8cc5d23adef6dca1e
}(mui, window.order = {}));