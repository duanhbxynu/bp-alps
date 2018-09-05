//====================================
//与本地存储的相关操作都写在这个js文件中
//====================================
(function(localdb){
	
	//存储用户登录信息
	localdb.saveUser = function(user){
		user = user || {};
		localStorage.setItem("$user",JSON.stringify(user));
	};
	
	//获取localstorage中指定key的值
	localdb.getAttribute = function(key){
		if (key) {
			return localStorage.getItem("$"+key);
		}
	};
	
	
}(window.localdb = {}));
