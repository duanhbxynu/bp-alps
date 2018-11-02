(function($, order) {
	/* 
	 * 订单 - 订单列表
	 * */
	order.qryOrderList = function(values,callback){
		callback = callback || $.noop;
//		if(!localStorage.getItem('$state')) {
//			plus.nativeUI.toast('获取订单列表token出错了，请稍后再试！');
////			common.baseOption.goToLogin();
//		}
//		var token = JSON.parse(localStorage.getItem('$state')).token;
		
//		console.log("token:"+token);
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
		       xhr.setRequestHeader("Authorization","Bearer " + common.baseOption.getToken());
		    },
			success:callback,
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
	
	//获取订单详情
	order.getOrderDetail = function(orderCode,callback){
		callback = callback || $.noop;
		var params = {orderCode:orderCode};
		console.log("order detail request:"+params);
		mui.ajax({
			url:serviceBaseUrl+"alpssalewebservices/order/detail",
			type:"POST",
			dataType:"json",
			contentType: 'application/json',
			data: JSON.stringify(params),
			beforeSend: function (xhr) {
				xhr.setRequestHeader("Authorization","Bearer " + common.baseOption.getToken());
			},
			success: callback,
		    error: function(xhr, textStatus, errorThrown){
		    	console.log(xhr.status);
		    	console.log(textStatus);
//		    	plus.nativeUI.toast('哎哟，出错了，请稍后再试！');
//			   	common.baseOption.goToLogin();
		    }
		});
		
	}
	order.getOrderMessage=function(orderCode){
		var values = {
			orderCode:orderCode
		}
		$.ajax({
			url:serviceBaseUrl+"alpssalewebservices/order/message/list",
			type:"POST",
			contentType: 'application/json',
			dataType:"json",
            data: JSON.stringify(values),
            beforeSend: function (xhr) {
		       xhr.setRequestHeader("Authorization","Bearer " + common.baseOption.getToken());
		    },
			success: function (data) {
				console.log("order message list result:"+JSON.stringify(data));
				console.log("--------------------------------------------------------------");
				if(data.success==true){
					var recordList = data.recordList;
					console.log(recordList.length);
					if(document.getElementById('messageList')){
						document.getElementById('messagesCount').innerHTML = recordList.length;
					}else{
						document.getElementById('messagesCount').innerHTML = recordList.length;
					}
					
				}
		    },
		    error: function(jqXHR, textStatus, errorThrown){
		    	plus.nativeUI.toast('order message list error！');
//			   	common.baseOption.goToLogin();
		    }
		})    
	}
	$('#messages').on('tap','a',function(){
		var status = this.getAttribute('data-status');
		var statusText = this.getAttribute('data-statusText');
		var orderCode = document.getElementById('messages').getAttribute('data-orderCode');
		var values = {"orderCode" :orderCode, "status": status};
		var jsonvalue = JSON.stringify(values);
		console.log("change order status request:"+jsonvalue);
		var options = {
//			title:statusText,
			buttons:["取消","确定"],
			verticalAlign:"center"
		}
		plus.nativeUI.confirm( "确定"+statusText+"？", function(e){
			console.log("Close confirm: "+e.index);
			if(e.index == 1){
				$.ajax({
					url:serviceBaseUrl+"alpssalewebservices/order/update/status",
					type:"POST",
					dataType:"json",
					contentType: 'application/json',
				    data: jsonvalue,
				    beforeSend: function (xhr) {
						xhr.setRequestHeader("Authorization","Bearer " + common.baseOption.getToken());
					},
					success: function (data) {
						console.log("change order status:"+JSON.stringify(data));
						console.log("--------------------------------------------------------------");
						if(data.success){
							$('#messages').popover('hide');
							
//							$.back();
		//					location.href = getUrl(baseConfig.baseUrl+baseConfig.order,{},"&orderCode="+orderCode);
						}
					}
				});
			}else{
				$('#messages').popover('hide');
			}
			
		},options);
		
	})
	
	$('#share').on('tap','a',function(){
		// 扩展API加载完毕，现在可以正常调用扩展API
		plus.share.getServices(function(ss) {
			//		s = ss[0];sinaweibo
			//		s = ss[1];tencentweibo
			//		s = ss[2];qq
			//		s = ss[3];weixin
			for(var i in ss) {
	
				var s = ss[i];
				if(s.id == "weixin") {
					var msg = {
						href:"#",
						title: username + '为您服务',
						content: "您刚刚下了一个整车订单，点击查看详情！",
	//					thumbs: ['../../image/logo.png'],
//						pictures: ['../../image/logo.png'],
						//"WXSceneSession";/*微信好友*/"WXSceneTimeline" /*微信朋友圈*/
						extra: {
							scene: "WXSceneSession"
						} /*微信好友*/
					};
					s.send(msg, function() {
						plus.nativeUI.alert("分享成功");
						$.back();
	
						}, function(e) {
							plus.nativeUI.alert("分享失败!");
						});
						break;
					}
				}
			}, function(e) {
				plus.nativeUI.alert("获取分享服务列表失败：" + e.message);
			});
	})
	
	
	
	
}(mui, window.orderjs = {}));