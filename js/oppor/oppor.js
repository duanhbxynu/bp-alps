(function($, oppor) {
	/* 
	 * 意向 - 到店客流
	 * */
	oppor.qryOpporList = function(params, callback) {
		//		callback = callback || $.noop;
		//		if(!localStorage.getItem('$state')) {
		//			plus.nativeUI.toast('获取意向列表token出错了，请稍后再试！');
		//			common.baseOption.goToLogin();
		//		}
		//		var token = JSON.parse(localStorage.getItem('$state')).token;
		//		
		//		console.log("token:"+token);
		console.log("opportunity list request:" + JSON.stringify(params));

		console.log(params);
		console.log(JSON.stringify(params));
		var qryUrl = common.URL.opporList();
		$.ajax(qryUrl, {
			data: JSON.stringify(params),
			dataType: 'JSONP', //服务器返回json格式数据
			contentType: 'application/json',
			jsonp: 'callback',
			type: 'POST', //HTTP请求类型
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
				//				plus.nativeUI.toast('哎哟，出错了，请稍后再试！');
				//				common.baseOption.goToLogin();
			}
		});
	}

	//获取意向详情
	oppor.getOpporDetail = function(opporId, callback) {
		var token = common.baseOption.getToken();

		var params = {
			access_token: token,
			code: opporId
		};

		console.log("oppor detail request:" + JSON.stringify(params));
		$.ajax(common.URL.getOpporDetail(), {
			type: "POST",
			dataType: "jsonp",
			jsonp: 'callback',
			data: params,
			success: callback,
			error: function(xhr, textStatus, errorThrown) {
				console.log(xhr);
				console.log(textStatus);
				console.log(errorThrown);
				console.log(xhr.status);
				//			   	common.baseOption.goToLogin();
			}
		});

	}

	//意向 保存
	oppor.updateOpporDetail = function(params, callback) {
		callback = callback || $.noop;
		console.log("customer flow update request51:" + JSON.stringify(params));
		console.log(params);
		console.log(common.URL.updateOppor());
//		var requestUrl = serviceBaseUrl + "alpssalewebservices/opportunity/update";
		$.ajax(common.URL.updateOppor(), {
			type: "POST",
			contentType: 'application/json',
			dataType: "json",
			data: JSON.stringify(params),
			beforeSend: function(xhr) {
				xhr.setRequestHeader("Authorization", "Bearer " + common.baseOption.getToken());
			},
			success: callback,
			error: function(xhr, textStatus, errorThrown) {
				console.log(xhr.status);
			}
		})
	}

	//创建意向
	oppor.createOppor = function(params, callback) {
		callback = callback || $.noop;
		var currentUser = JSON.parse(localStorage.getItem('$state')).username;
		if(!currentUser){
			plus.nativeUI.toast('登录过期，请重新登录！');
			common.baseOption.goToLogin();
			return;
		}
		console.log("customer flow update request51:" + JSON.stringify(params));
		console.log(params);
		$.ajax(common.URL.getOpporDetail(), {
			type: "POST",
			dataType: "jsonp",
			jsonp: 'callback',
			crossDomain: true, //强制使用5+跨域
			timeout: 1000, //超时时间设置为10秒；
			data: params,
			beforeSend: function(xhr) {
				xhr.setRequestHeader("Authorization", "Bearer " + common.baseOption.getToken());
			},
			success: callback,
			error: function(jqXHR, textStatus, errorThrown) {
				//			    common.baseOption.goToLogin();
			}
		});
	}

	oppor.getConfirmQuotaion = function(opporCode, callback) {
		var values = {
			"oppoCode": opporCode
		};
		$.ajax({
			url:serviceBaseUrl + "alpssalewebservices/quotaion/getConfirm",
			type: "POST",
			dataType: "json",
			contentType: 'application/json',
			data: JSON.stringify(values),
			beforeSend: function(xhr) {
				xhr.setRequestHeader("Authorization", "Bearer " + common.baseOption.getToken());
			},
			success: callback,
			error:function(jqXHR, textStatus, errorThrown) {
				
			}
		});
	}

}(mui, window.oppor = {}));