(function($, owner){
	
	/**
	 * 用户登录操作参数校验
	 */
	owner.login = function(loginInfo, callback){
		callback = callback || $.noop;
		loginInfo = loginInfo || {};
		loginInfo.account = loginInfo.account || '';
		loginInfo.password = loginInfo.password || '';
		//检验逻辑如下：
		if (loginInfo.account.length < 5) {
			return callback('用户名至少为5个字符');
		}
		if (loginInfo.password.length < 6) {
			return callback('密码至少为6个字符');
		}
		
		//验证通过，不向回调函数传递错误信息
		return callback;
		
	};
	
}(mui, window.validator = {}));
