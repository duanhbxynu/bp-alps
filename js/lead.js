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
		console.log("customer flow list request33:"+JSON.stringify(params));
		var qryUrl = common.URL.customerFlowList();
		console.log(qryUrl);
		$.ajax(qryUrl, {
			data: params,
			dataType: 'json', //服务器返回json格式数据
			type: 'POST', //HTTP请求类型
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
		var params = {access_token:common.baseOption.getToken(),code:customerflowId};
		console.log("customer flow detail request:"+JSON.stringify(params));
		$.ajax(common.URL.getCustomerFlowDetail(),{
			type:"POST",
			dataType:"json",
	        data: params,
			success: callback,
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				//(默 认: 自动判断 (xml 或 html)) 请求失败时调用时间。
				//参数有以下三个：XMLHttpRequest 对象、错误信息、（可选）捕获的错误对象。
				//如果发生了错误，错误信息（第二个参数）除了得到null之外，
				//还可能是"timeout", "error", "notmodified" 和 "parsererror"。
				  
				//textStatus: "timeout", "error", "notmodified" 和 "parsererror"。
				 console.log(XMLHttpRequest.status);//0
				 console.log(XMLHttpRequest.readyState);//4
				 console.log(textStatus);//abort
				 
//				 error事件返回的第一个参数XMLHttpRequest：
//					XMLHttpRequest.readyState: 状态码的意思
//					0 － （未初始化）还没有调用send()方法
//					1 － （载入）已调用send()方法，正在发送请求
//					2 － （载入完成）send()方法执行完成，已经接收到全部响应内容
//					3 － （交互）正在解析响应内容
//					4 － （完成）响应内容解析完成，可以在客户端调用了
			},
			complete: function(XMLHttpRequest, textStatus) {
//				 this; // 调用本次AJAX请求时传递的options参数
			}
//		    error: function(xhr, textStatus, errorThrown){
//		    	console.log("customer flow detail result");
//		    	console.log(xhr);
//		    	console.log(textStatus);
//		    	alert(xhr.status);
//		    	plus.nativeUI.toast('哎哟，出错了，请稍后再试！');
//		    	$.back();
////			   	common.baseOption.goToLogin();
//		    }
		});
	}
	//到店详情 保存
	lead.updateCustomerDetail = function(params,callback){
		callback = callback || $.noop;
//		params["access_token"]="common.baseOption.getToken()";
		console.log("customer flow update request51:"+JSON.stringify(params));
		$.ajax(common.URL.updateCustomerFlow(),{
			type:"POST",
			contentType: 'application/json',
			dataType:"json",
	        data: JSON.stringify(params),
	        beforeSend: function (xhr) {
			    xhr.setRequestHeader("Authorization","Bearer " + common.baseOption.getToken());
			},
			success: callback,
			ajaxError: function(jqXHR, textStatus, errorThrown){
				console.log('jqXHR');
				console.log(JSON.stringify(jqXHR));
////				console.log(xhr.readyState);
//				console.log("error: " + data.responseText);
				//TODO
//			   	common.baseOption.goToLogin();
//				$.back();
			}
		})
	}
	
	//创建意向
	lead.checkOppor = function(params,callback){
		callback = callback || $.noop;
		var currentUser = JSON.parse(localStorage.getItem('$state')).username;
		console.log("customer flow update request51:"+JSON.stringify(params));
		console.log(params);
		$.ajax(common.URL.getOpporDetail(),{
			type:"POST",
			dataType:"json",
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