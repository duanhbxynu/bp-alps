/**
 * 演示程序当前的 “注册/登录” 等操作，是基于 “本地存储” 完成的
 * 当您要参考这个演示程序进行相关 app 的开发时，
 * 请注意将相关方法调整成 “基于服务端Service” 的实现。
 **/
(function($, lead) {
	/* 
	 * 线索 - 到店客流
	 * */
	lead.qryCustomerList = function(params,callback){
		callback = callback || $.noop;
		if(!localStorage.getItem('$state')) {
			plus.nativeUI.toast('哎哟，出错了，请稍后再试！');
			return;
		}
		
		var token = JSON.parse(localStorage.getItem('$state')).token;
//		alert(token);
//		var token = "08aaf0e7-e0a7-4736-b6e7-9747d3a0494e";
		var page = common.baseOption.getUrlParam('page');
		page = page>0?page:0;
		params = {access_token:token,currentPage:page,pagesize:10};
		console.log("customer flow list request33:"+JSON.stringify(params));
		console.log(params);
		console.log(JSON.stringify(params));
		var qryUrl = common.URL.customerFlowList();
		console.log(qryUrl);
		$.ajax(qryUrl, {
			data: params,
			dataType: 'json', //服务器返回json格式数据
//			jsonp:'callback',
			type: 'POST', //HTTP请求类型
//			timeout: 1000, //超时时间设置为10秒；
			success: callback,
			error: function(xhr, type, errorThrown) {
				console.log("xhr");
				console.log(xhr); 
				console.log("type");
				console.log(type);
				console.log("errorThrown");
				console.log(errorThrown);
				//TODO
				plus.nativeUI.toast('customer flow list出错了，请稍后再试！');
				$.back();
//				common.baseOption.goToLogin();
			}
		});
	}
	
	//获取到店详情
	lead.getCustomerFlowDetail = function(customerflowId,callback){
		callback = callback || $.noop;
		var token = JSON.parse(localStorage.getItem('$state')).token;
		var params = {access_token:token,code:customerflowId};
		
		console.log("customer flow detail request:"+JSON.stringify(params));
		$.ajax(common.URL.getCustomerFlowDetail(),{
			type:"POST",
			dataType:"json",
//			jsonp:'callback',
//			crossDomain: true,//强制使用5+跨域
	        data: params,
//	        timeout: 1000, //超时时间设置为10秒；
			success: callback,
		    error: function(xhr, textStatus, errorThrown){
		    	plus.nativeUI.toast('哎哟，出错了，请稍后再试！');
		    	$.back();
//			   	common.baseOption.goToLogin();
		    }
		});
	}
	//到店详情 保存
	lead.updateCustomerDetail = function(params,callback){
		callback = callback || $.noop;
		if(!localStorage.getItem('$state')) {
			plus.nativeUI.toast('哎哟，出错了，请稍后再试！');
			return;
		}
		var token = JSON.parse(localStorage.getItem('$state')).token;
		params["access_token"]=token;
		console.log("customer flow update request51:"+JSON.stringify(params));
		console.log(params);
		$.ajax(common.URL.updateCustomerFlow(),{
			type:"POST",
			contentType: 'application/json',
			dataType:"json",
//			jsonp:'callback',
//			crossDomain: true,//强制使用5+跨域
//			timeout: 1000, //超时时间设置为10秒；
	        data: JSON.stringify(params),
	        beforeSend: function (xhr) {
			    xhr.setRequestHeader("Authorization","Bearer " + token);
			},
			success: callback,
			error: function(xhr, textStatus, errorThrown){
				//TODO
//			   	plus.nativeUI.toast('哎哟，出错了，请稍后再试！');
//			   	common.baseOption.goToLogin();
				$.back();
			}
		})
	}
	
	//创建意向
	lead.checkOppor = function(params,callback){
		callback = callback || $.noop;
//		if(!localStorage.getItem('$state')) {
//			plus.nativeUI.toast('哎哟，出错了，请稍后再试！');
//			return;
//		}
//		var token = JSON.parse(localStorage.getItem('$state')).token;
		var currentUser = JSON.parse(localStorage.getItem('$state')).username;
		
		console.log("customer flow update request51:"+JSON.stringify(params));
		console.log(params);
		$.ajax(common.URL.getOpporDetail(),{
			type:"POST",
			dataType:"json",
//			jsonp:'callback',
//			crossDomain: true,//强制使用5+跨域
//			timeout: 1000, //超时时间设置为10秒；
	        data: params,
	        beforeSend: function (xhr) {
			    xhr.setRequestHeader("Authorization","Bearer " + common.baseOption.getToken());
			},
			success: callback,
			error: function(jqXHR, textStatus, errorThrown){
				$.back();
//			    common.baseOption.goToLogin();
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
			 
			

	
}(mui, window.lead = {}));