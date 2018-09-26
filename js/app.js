/**
 * 演示程序当前的 “注册/登录” 等操作，是基于 “本地存储” 完成的
 * 当您要参考这个演示程序进行相关 app 的开发时，
 * 请注意将相关方法调整成 “基于服务端Service” 的实现。
 **/
(function($, owner) {
	
	/**
	 * 用户登录
	 **/
	owner.login = function(loginInfo, callback) {
		callback = callback || $.noop;
		var loginInfo = loginInfo || {};
		loginInfo.account = loginInfo.account || '';
		loginInfo.password = loginInfo.password || '';
		if (loginInfo.account.length < 4) {
			return callback('账号最短为 4 个字符');
		}
		if (loginInfo.password.length < 4) {
			return callback('密码最短为 4 个字符');
		}
		
		$.ajax(common.URL.accountLogin(), {
			dataType: 'json', //服务器返回json格式数据
			type: 'post', //HTTP请求类型
			data:loginInfo,
			timeout: 10000, //超时时间设置为10秒；
			success: function(data) {

//				if(data.data) {
//					authed = true;
//					if((!data.data.userName)||(!data.data.userIdentity)){ //名字或身份证号没有值的情况下，向本地存临时值--仅作注册一半的用户再次登陆时使用
//						localStorage.setItem('sysuseridTemp',data.data.id);
//						localStorage.setItem('persIdTemp',data.data.persId);
//						localStorage.setItem('userMobileTemp',data.data.userMobile);
//					}else{
//						localStorage.setItem('sysuserid',data.data.id);
//						localStorage.setItem('persId',data.data.persId);
//						if(data.data.userName){
//							localStorage.setItem('userName',data.data.userName);
//						}
//						if(data.data.userIdentity){
//							localStorage.setItem('userIdentity',data.data.userIdentity);//高远加，本地填入身份证号
//						}
//						if(data.data.persLOGO){
//							localStorage.setItem('persLogo',data.data.persLOGO);
//						}
//						localStorage.setItem('userMobile',data.data.userMobile);
//						localStorage.setItem('key',data.data.userSecurityPassword);
//						console.log("已将sysuserid存入本地");
//						console.log("pers_id:"+data.data.persId);
//					}
//					
//					
//				} else {
//					authed = false;
//				}
				console.log("login result:"+JSON.stringify(data));
				console.log("--------------------------------------------------------------");
				var token = data.token;
//				location.href = "index.html?token="+token;

//				if(authed) {
					return owner.createState(loginInfo.account,token, callback);
//				} else {
//					return callback('用户名或密码错误');
//				}
			},
			error: function(xhr, type, errorThrown) {

			}
		});
//		if (authed) {
//			return owner.createState(loginInfo.account, callback);
//		} else {
//			return callback('用户名或密码错误');
//		}
	};
	
	owner.loginValidate = function(loginInfo, callback) {
		callback = callback || $.noop;
		var loginInfo = loginInfo || {};
		loginInfo.username = loginInfo.username || '';
		loginInfo.password = loginInfo.password || '';
		if (loginInfo.username.length < 4) {
			return callback('账号最短为 4 个字符');
		}
		if (loginInfo.password.length < 4) {
			return callback('密码最短为 4 个字符');
		}
		loginInfo = $.extend(loginInfo,common.baseClientParameter);
		console.log(loginInfo);
		console.log("login request121:"+JSON.stringify(loginInfo));
		console.log("common.URL.accountLogin():"+common.URL.accountLogin());
		$.ajax(common.URL.accountLogin(), {
			type:"POST",
			dataType:"JSONP",
			jsonp:"callback",
			crossDomain: true,
            data: loginInfo,
//          timeout: 10000, //超时时间设置为10秒；
			success: function(data) {
				var jsonData = JSON.parse(data);
				var token = jsonData.token;
				return owner.createState(loginInfo.username,token,callback);
			},
			error: function(xhr, type, errorThrown) {
				console.log("xhr");
				console.log(xhr); 
				console.log("type");
				console.log(type);
				console.log("errorThrown");
				console.log(errorThrown);
				
				return callback;
			}
		});
		
	};

	owner.createState = function(name,token,callback) {
		var state = owner.getState();
		state.username = name;
		state.token = "token123456789";
		if(token){
			state.token = token;
		}
		owner.setState(state);
		return callback();
		
	};

	/**
	 * 新用户注册
	 **/
	owner.reg = function(regInfo, callback) {
		callback = callback || $.noop;
		regInfo = regInfo || {};
		regInfo.account = regInfo.account || '';
		regInfo.password = regInfo.password || '';
		if (regInfo.account.length < 5) {
			return callback('用户名最短需要 5 个字符');
		}
		if (regInfo.password.length < 6) {
			return callback('密码最短需要 6 个字符');
		}
		if (!checkEmail(regInfo.email)) {
			return callback('邮箱地址不合法');
		}
		var users = JSON.parse(localStorage.getItem('$users') || '[]');
		users.push(regInfo);
		localStorage.setItem('$users', JSON.stringify(users));
		return callback();
	};

	/**
	 * 获取当前状态
	 **/
	owner.getState = function() {
		var stateText = localStorage.getItem('$state') || "{}";
		return JSON.parse(stateText);
	};

	/**
	 * 设置当前状态
	 **/
	owner.setState = function(state) {
		state = state || {};
		localStorage.setItem('$state', JSON.stringify(state));
//		var settings = owner.getSettings();
//		settings.gestures = '';
//		owner.setSettings(settings);
	};

	var checkEmail = function(email) {
		email = email || '';
		return (email.length > 3 && email.indexOf('@') > -1);
	};

	/**
	 * 找回密码
	 **/
	owner.forgetPassword = function(email, callback) {
		callback = callback || $.noop;
		if (!checkEmail(email)) {
			return callback('邮箱地址不合法');
		}
		return callback(null, '新的随机密码已经发送到您的邮箱，请查收邮件。');
	};

	/**
	 * 获取应用本地配置
	 **/
	owner.setSettings = function(settings) {
		settings = settings || {};
		localStorage.setItem('$settings', JSON.stringify(settings));
	}

	/**
	 * 设置应用本地配置
	 **/
	owner.getSettings = function() {
			var settingsText = localStorage.getItem('$settings') || "{}";
			return JSON.parse(settingsText);
		}
		/**
		 * 获取本地是否安装客户端
		 **/
	owner.isInstalled = function(id) {
		if (id === 'qihoo' && mui.os.plus) {
			return true;
		}
		if (mui.os.android) {
			var main = plus.android.runtimeMainActivity();
			var packageManager = main.getPackageManager();
			var PackageManager = plus.android.importClass(packageManager)
			var packageName = {
				"qq": "com.tencent.mobileqq",
				"weixin": "com.tencent.mm",
				"sinaweibo": "com.sina.weibo"
			}
			try {
				return packageManager.getPackageInfo(packageName[id], PackageManager.GET_ACTIVITIES);
			} catch (e) {}
		} else {
			switch (id) {
				case "qq":
					var TencentOAuth = plus.ios.import("TencentOAuth");
					return TencentOAuth.iphoneQQInstalled();
				case "weixin":
					var WXApi = plus.ios.import("WXApi");
					return WXApi.isWXAppInstalled()
				case "sinaweibo":
					var SinaAPI = plus.ios.import("WeiboSDK");
					return SinaAPI.isWeiboAppInstalled()
				default:
					break;
			}
		}
	}
	
	owner.getRegion = function(callback){
		
		if(!localStorage.getItem('$state')) {
			plus.nativeUI.toast('token过期，重新登录');
			common.baseOption.goToLogin();
		}
		var token = JSON.parse(localStorage.getItem('$state')).token;
//		var token = '3571ecbd-6eea-4c4c-a600-c61d3221215d';
		
		$.ajax(common.URL.getRegionList(),{
			type:"GET",
			data:{},
			dataType:"jsonp",
//			jsonp:'callback',
//			crossDomain: true,//强制使用5+跨域
//	        timeout: 1000, //超时时间设置为10秒；地址请求时间有点长，容易超时
//	        headers: {//忽略
//				'Content-Type': 'application/json'
//     		},
	        beforeSend: function (xhr) {
	        	console.log("Bearer " + token);
		        xhr.setRequestHeader("Authorization","Bearer " + token);
		    },
		    success: callback,
		    error: function(xhr, textStatus, errorThrown){
		    	plus.nativeUI.toast('=======error地址查询出错=======！');
			   	common.baseOption.goToLogin();
		    }
		});
		
	},
	owner.getProduct = function(callback){
		
	}
}(mui, window.app = {}));