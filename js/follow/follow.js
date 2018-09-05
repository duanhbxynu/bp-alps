(function($, follow) {
	
	
	//获取意向跟进
	follow.getOpporFollow = function(params,callback){
		callback = callback || $.noop;
		if(!localStorage.getItem('$state')) {
			plus.nativeUI.toast('哎哟，出错了，请稍后再试！');
			return;
		}
		var token = JSON.parse(localStorage.getItem('$state')).token;
//		var token = '7e6f7671-94dc-47bf-9f83-157691733a93';
		
		console.log("follow oppo list request:"+JSON.stringify(params));
		console.log(params);
		$.ajax(common.URL.getOpporFollow(),{
			type:"POST",
			dataType:"jsonp",
			jsonp:'callback',
	        data: JSON.stringify(params),
	        beforeSend: function (xhr) {
			    xhr.setRequestHeader("Authorization","Bearer " + token);
			},
			success: callback,
			error: function(jqXHR, textStatus, errorThrown){
				console.log(jqXHR);
				console.log(textStatus);
				console.log(errorThrown);
				plus.nativeUI.toast(jqXHR);
			    common.baseOption.goToLogin();
			}
		});
	}
	//搜索市场活动
	follow.searchMarketActivity = function(params,callback){
		callback = callback || $.noop;
		if(!localStorage.getItem('$state')) {
			plus.nativeUI.toast('哎哟，出错了，请稍后再试！');
			return;
		}
		var token = JSON.parse(localStorage.getItem('$state')).token;
//		var token = '7e6f7671-94dc-47bf-9f83-157691733a93';
		
		console.log("market activity request:"+JSON.stringify(params));
		$.ajax(common.URL.getOpporFollow(),{
			type:"POST",
			dataType:"json",
			contentType: 'application/json',
	        data: JSON.stringify(params),
	        beforeSend: function (xhr) {
			    xhr.setRequestHeader("Authorization","Bearer " + token);
			},
			success: callback,
			error: function(jqXHR, textStatus, errorThrown){
			    	common.baseOption.goToLogin();
			    	//location.href = baseConfig.baseUrl+baseConfig.login_page;
			}
		})
	}
	
	
}(mui, window.follow = {}));