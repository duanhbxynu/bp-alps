(function($, oppor) {
	/* 
	 * 意向 - 到店客流
	 * */
	oppor.qryOpporList = function(params,callback){
		callback = callback || $.noop;
		if(!localStorage.getItem('$state')) {
			plus.nativeUI.toast('获取意向列表token出错了，请稍后再试！');
			common.baseOption.goToLogin();
		}
		var token = JSON.parse(localStorage.getItem('$state')).token;
		
		console.log("token:"+token);
		console.log("opportunity list request:"+JSON.stringify(params));
	
		console.log(params);
		console.log(JSON.stringify(params));
		var qryUrl = common.URL.opporList();
		$.ajax(qryUrl, {
			data: params,
			dataType: 'jsonp', //服务器返回json格式数据
			contentType: 'application/json',
			jsonp:'callback',
			crossDomain: true,//强制使用5+跨域
			type: 'POST', //HTTP请求类型
			timeout: 10000, //超时时间设置为10秒；
			beforeSend: function (xhr) {
			    xhr.setRequestHeader("Authorization","Bearer " + token);
			},
			success:callback,
//			success: function(data){
//				console.log(data);
//				var data1 = JSON.parse(data);
//				console.log(data1);
//				console.log(data1.success);
//				console.log(data1.opportunityList);
//			},
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
	
	//获取意向详情
	oppor.getOpporDetail = function(opporId,callback){
		callback = callback || $.noop;
		
		if(!localStorage.getItem('$state')) {
			plus.nativeUI.toast('获取意向详情token出错了，请稍后再试！');
			return;
		}
		
		var token = JSON.parse(localStorage.getItem('$state')).token;
//		
//		var getaccess = common.baseOption.getUrlParam('getaccess');
//		var defaultData = {};
//		if(getaccess){
//			defaultData = {code:opporId,getAccess:'true'};
//		}else{
//			defaultData = {code:opporId};
//		}
		
		
		var params = {access_token:token,code:opporId};
		
		console.log("customer flow detail request:"+JSON.stringify(params));
		$.ajax(common.URL.getOpporDetail(),{
			type:"POST",
			dataType:"jsonp",
			jsonp:'callback',
			crossDomain: true,//强制使用5+跨域
	        data: params,
	        timeout: 1000, //超时时间设置为10秒；
			success: callback,
		    error: function(xhr, textStatus, errorThrown){
		    	plus.nativeUI.toast('哎哟，出错了，请稍后再试！');
			   	common.baseOption.goToLogin();
		    }
		});
		
	}
	
	//意向 保存
	oppor.updateOpporDetail = function(params,callback){
		callback = callback || $.noop;
		if(!localStorage.getItem('$state')) {
			plus.nativeUI.toast('哎哟，出错了，请稍后再试！');
			return;
		}
		var token = JSON.parse(localStorage.getItem('$state')).token;
		console.log("customer flow update request51:"+JSON.stringify(params));
		console.log(params);
		console.log(common.URL.updateOppor());
		$.ajax(common.URL.updateOppor(),{
			type:"POST",
			contentType: 'application/json',
			dataType:"jsonp",
			jsonp:'callback',
			crossDomain: true,//强制使用5+跨域
			timeout: 1000, //超时时间设置为10秒；
	        data: JSON.stringify(params),
	        beforeSend: function (xhr) {
			    xhr.setRequestHeader("Authorization","Bearer " + token);
			},
			success: callback,
			error: function(xhr, textStatus, errorThrown){
			   	plus.nativeUI.toast('哎哟，出错了，请稍后再试！');
			   	common.baseOption.goToLogin();
			}
		})
	}
	
//	//创建意向
//	oppor.createOppor = function(params,callback){
//		callback = callback || $.noop;
//		if(!localStorage.getItem('$state')) {
//			plus.nativeUI.toast('哎哟，出错了，请稍后再试！');
//			return;
//		}
//		var token = JSON.parse(localStorage.getItem('$state')).token;
//		var currentUser = JSON.parse(localStorage.getItem('$state')).username;
//		
//		console.log("customer flow update request51:"+JSON.stringify(params));
//		console.log(params);
//		$.ajax(common.URL.createOppor(),{
//			type:"POST",
//			dataType:"jsonp",
//			jsonp:'callback',
//			crossDomain: true,//强制使用5+跨域
//			timeout: 1000, //超时时间设置为10秒；
//	        data: params,
//	        beforeSend: function (xhr) {
//			    xhr.setRequestHeader("Authorization","Bearer " + token);
//			},
//			success: callback,
//			error: function(jqXHR, textStatus, errorThrown){
//			    common.baseOption.goToLogin();
//			}
//		});
//	}
	
	//创建意向
	oppor.createOppor = function(params,callback){
		callback = callback || $.noop;
		if(!localStorage.getItem('$state')) {
			plus.nativeUI.toast('哎哟，出错了，请稍后再试！');
			return;
		}
		var token = JSON.parse(localStorage.getItem('$state')).token;
		var currentUser = JSON.parse(localStorage.getItem('$state')).username;
		
		console.log("customer flow update request51:"+JSON.stringify(params));
		console.log(params);
		$.ajax(common.URL.getOpporDetail(),{
			type:"POST",
			dataType:"jsonp",
			jsonp:'callback',
			crossDomain: true,//强制使用5+跨域
			timeout: 1000, //超时时间设置为10秒；
	        data: params,
	        beforeSend: function (xhr) {
			    xhr.setRequestHeader("Authorization","Bearer " + token);
			},
			success: callback,
			error: function(jqXHR, textStatus, errorThrown){
			    common.baseOption.goToLogin();
			}
		});
	}
	
	
		
//	lead.getRegion = function(){
//		
////		if(!localStorage.getItem('$state')) {
////			plus.nativeUI.toast('哎哟，出错了，请稍后再试！');
////			return;
////		}
//		var token = JSON.parse(localStorage.getItem('$state')).token;
////		var token = '3571ecbd-6eea-4c4c-a600-c61d3221215d';
//
//		
//		$.ajax(common.URL.getRegionList(),{
//			type:"GET",
//			data:{},
//			dataType:"jsonp",
//			jsonp:'callback',
//			crossDomain: true,//强制使用5+跨域
////	        timeout: 1000, //超时时间设置为10秒；
////	        headers: {
////				'Content-Type': 'application/json'
////     		},
//	        beforeSend: function (xhr) {
//	        	console.log("Bearer " + token);
//		        xhr.setRequestHeader("Authorization","Bearer " + token);
//		    },
//		    success: function(data){
//		    	
//						var data = JSON.parse(data);
////						console.log(data);
//						if(data.success==true){
//							var provinceDataList = data.provinceDataList;
////							console.log(provinceDataList);
////							console.log(JSON.parse(provinceDataList));
//							console.log(JSON.stringify(provinceDataList));
//							return JSON.stringify(provinceDataList);
//						}else{
//							plus.nativeUI.toast('地址查询出错！');
//						   	common.baseOption.goToLogin();
//						}
//					},
//		    error: function(xhr, textStatus, errorThrown){
////		    	console.log("xhr");
////				console.log(xhr); 
////				console.log("type");
////				console.log(textStatus);
////				console.log("errorThrown");
////				console.log(errorThrown);
//		    	plus.nativeUI.toast('=======error地址查询出错=======！');
//			   	common.baseOption.goToLogin();
//		    }
//		});
//		
//	}
	
	//###########数据列表查询#############
//			function print(obj){
//			    try{
//			        var seen = [];
//			        json = JSON.stringify(obj, function(key, val) {
//			           if (typeof val == "object") {
//			                if (seen.indexOf(val) >= 0) return;
//			                seen.push(val)
//			            }
//			            return val;
//			        });
//			        return json;
//			    }catch(e){
//			        return e;
//			    }
//			}
//			var jsonify = function(obj){
//			    var seen = [];
//			    var json = JSON.stringify(obj, function(key, value){
//			        if (typeof value === 'object') {
//			            if ( !seen.indexOf(value) ) {
//			                return '__cycle__' + (typeof value) + '[' + key + ']'; 
//			            }
//			            seen.push(value);
//			        }
//			        return value;
//			    }, 4);
//			    return json;
//			};
			 
			

	
}(mui, window.oppor = {}));