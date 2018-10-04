(function($, follow) {

	//获取意向跟进
	follow.getOpporFollow = function(params, callback) {
		callback = callback || $.noop;
//		if(!localStorage.getItem('$state')) {
//			plus.nativeUI.toast('哎哟，出错了，请稍后再试！');
//			return;
//		}
//		var token = JSON.parse(localStorage.getItem('$state')).token;
		//		var token = '7e6f7671-94dc-47bf-9f83-157691733a93';

		console.log("follow oppo list request:" + JSON.stringify(params));
		console.log(params);
		$.ajax(common.URL.getOpporFollow(), {
			type: "POST",
			dataType: "json",
			//			contentType: 'application/json',
			data: params,
			beforeSend: function(xhr) {
				xhr.setRequestHeader("Authorization", "Bearer " + common.baseOption.getToken());
			},
			success: callback,
			error: function(jqXHR, textStatus, errorThrown) {
				console.log(jqXHR);
				console.log(textStatus);
				console.log(errorThrown);
				plus.nativeUI.toast(jqXHR);
//				common.baseOption.goToLogin();
			}
		});
	}
	//搜索市场活动
	follow.searchMarketActivity = function(params, callback) {
		callback = callback || $.noop;
//		if(!localStorage.getItem('$state')) {
//			plus.nativeUI.toast('哎哟，出错了，请稍后再试！');
//			return;
//		}
//		var token = JSON.parse(localStorage.getItem('$state')).token;
		//		var token = '7e6f7671-94dc-47bf-9f83-157691733a93';

		console.log("market activity request:" + JSON.stringify(params));
		$.ajax(common.URL.getMarketactivity(), {
			type: "POST",
			dataType: "json",
			contentType: 'application/json',
			data: JSON.stringify(params),
			beforeSend: function(xhr) {
				xhr.setRequestHeader("Authorization", "Bearer " + common.baseOption.getToken());
			},
			success: callback,
			error: function(jqXHR, textStatus, errorThrown) {
//				common.baseOption.goToLogin();
				//location.href = baseConfig.baseUrl+baseConfig.login_page;
			}
		})
	}

	follow.saveFollow = function(params, callback) {
		callback = callback || $.noop;
//		if(!localStorage.getItem('$state')) {
//			plus.nativeUI.toast('哎哟，出错了，请稍后再试！');
//			return;
//		}
//		var token = JSON.parse(localStorage.getItem('$state')).token;
		console.log("follow append content request:" + JSON.stringify(params));
		console.log("follow append content request:" + params);
		$.ajax(common.URL.createFollow(), {
			type: "POST",
			dataType: "json",
			contentType: 'application/json',
			data: JSON.stringify(params),
			beforeSend: function(xhr) {
				xhr.setRequestHeader("Authorization", "Bearer " + common.baseOption.getToken());
			},
			success: callback,
			error: function(jqXHR, textStatus, errorThrown) {
				console.log(jqXHR);
				console.log(textStatus);
				console.log(errorThrown);
//				common.baseOption.goToLogin();
			}
		})
	}
	//获取意向详情
	follow.getFollowDetail = function(followCode, callback) {
		callback = callback || $.noop;

//		if(!localStorage.getItem('$state')) {
//			plus.nativeUI.toast('获取跟进记录详情token出错了，请稍后再试！');
//			return;
//		}
//		var token = JSON.parse(localStorage.getItem('$state')).token;
		var params = {
			code: followCode
		};

		console.log("follow detail request:" + JSON.stringify(params));
		$.ajax(common.URL.getFollowDetail(), {
			type: "POST",
			dataType: "jsonp",
			jsonp: 'callback',
			data: params,
			beforeSend: function(xhr) {
				xhr.setRequestHeader("Authorization", "Bearer " + common.baseOption.getToken());
			},
			success: callback,
			error: function(xhr, textStatus, errorThrown) {
				plus.nativeUI.toast('哎哟，出错了，请稍后再试！');
				console.log(xhr);
				console.log(textStatus);
				console.log(errorThrown);
//				common.baseOption.goToLogin();
			}
		});

	}

	follow.appendContent = function(followCode, contentlist, callback) {
		callback = callback || $.noop;

//		if(!localStorage.getItem('$state')) {
//			plus.nativeUI.toast('获取跟进记录详情token出错了，请稍后再试！');
//			return;
//		}
//		var token = JSON.parse(localStorage.getItem('$state')).token;

		var followContentData = "";
		console.log(followContentData);
		var values = {
			followOpportunityCode: followCode,
			followContentData: {
				content: contentlist
			}
		}
		//		values.append(followContentData);
		console.log(values);
		console.log("follow append content request:" + JSON.stringify(values));
		$.ajax(common.URL.appendFollow(), {
			type: "POST",
			dataType: "json",
			contentType: 'application/json',
			data: JSON.stringify(values),
			beforeSend: function(xhr) {
				xhr.setRequestHeader("Authorization", "Bearer " + common.baseOption.getToken());
			},
			success: function(data) {
				console.log("follow append content result:" + JSON.stringify(data));
				console.log("--------------------------------------------------------------");
				if(data.success == true) {
//					alert("success");
					$.back();
				}
			},
			error: function(jqXHR, textStatus, errorThrown) {
				$.back();
//				location.href = baseConfig.baseUrl + baseConfig.login_page;
			}
		})
	}

}(mui, window.follow = {}));