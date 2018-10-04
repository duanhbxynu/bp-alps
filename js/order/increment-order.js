(function($, increment) {
	/* 
	 * 增值订单
	 * */
	//新建增值订单 --搜索客户

	increment.searchCustomer = function(values, callback) {

		var jsonvalue = JSON.stringify(values);
		console.log("search user request:" + jsonvalue);
		$.ajax({
			url: serviceBaseUrl + "alpssalewebservices/customer/list",
			type: "POST",
			dataType: "json",
			contentType: 'application/json',
			data: jsonvalue,
			beforeSend: function(xhr) {
				xhr.setRequestHeader("Authorization", "Bearer " + common.baseOption.getToken());
			},
			success: callback,
			error: function(xhr, type, errorThrown) {
				console.log("xhr");
				console.log(xhr);
				console.log("type");
				console.log(type);
				console.log("errorThrown");
				console.log(errorThrown);
				plus.nativeUI.toast('新建增值订单 --搜索客户出错了，请稍后再试！');
//				common.baseOption.goToLogin();
			}
		})

	}
	increment.searchCar = function(values, callback) {

		var jsonvalue = JSON.stringify(values);
		console.log("search vehicle request:" + jsonvalue);
		$.ajax({
			url: serviceBaseUrl + "alpssalewebservices/vehicle/list",
			type: "POST",
			dataType: "json",
			contentType: 'application/json',
			data: jsonvalue,
			beforeSend: function(xhr) {
				xhr.setRequestHeader("Authorization", "Bearer " + common.baseOption.getToken());
			},
			success: callback,
			error: function(xhr, type, errorThrown) {
				console.log("xhr");
				console.log(xhr);
				console.log("type");
				console.log(type);
				console.log("errorThrown");
				console.log(errorThrown);
				plus.nativeUI.toast('新建增值订单 --搜索客户出错了，请稍后再试！');
//				common.baseOption.goToLogin();
			}
		})

	}

}(mui, window.increment = {}));