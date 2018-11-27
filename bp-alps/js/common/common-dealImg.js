//====================================
//与上传图片，识别图片相关的函数都写在此
//====================================
(function(owner) {

	/*
	 * 将图片上传至阿里云服务器中，返回存储路径
	 * @param path：本地文件路径
	 * @param filePath：上传至阿里云的文件路径（注意：全路径，带目录名的那种）
	 */
	owner.uploadImgToOss = function(path, filePath, fn) {

		//阿里云需要相关的参数
		var server = common.URL.ossServer(); //阿里云OSS地址
		var OSSAccessKeyId = 'LTAIQDUCgA54MQ32'; //阿里云--子帐户AccessKeyId
		//var AccessKeySecret = ''; //阿里云--子帐户AccessKeySecret

		/*
		 * 阿里云参数设置，用于计算签名signature
		 */
		var policyText = {
			"expiration": "2020-01-01T12:00:00.000Z", //设置该Policy的失效时间，超过这个失效时间之后，就没有办法通过这个policy上传文件了
			"conditions": [
				["content-length-range", 0, 1048576000] // 设置上传文件的大小限制
			]
		};
		//var policyBase64 = Base64.encode(JSON.stringify(policyText));
		//var message = policyBase64;
//		var bytes = Crypto.HMAC(Crypto.SHA1, message, AccessKeySecret, {
//			asBytes: true
//		});
		//var signature = Crypto.util.bytesToBase64(bytes);

		var task = plus.uploader.createUpload(server, {
				method: "post"
			},
			fn
		);
		getsignature();
		//添加对象存储必须的参数
		task.addData("key", filePath);
		task.addData("policy", policytemporary);
		task.addData("OSSAccessKeyId", OSSAccessKeyId);
		task.addData("success_action_status", "200");
		task.addData("signature", signaturetemporary);

		//添加上传文件
		task.addFile(path, {
			key: "file",
			name: "file",
			mime: "image/jpeg"
		});
		//开始上传任务
		task.start();
	};
	
	//获取oss上传图片签名
	var policytemporary;
	var signaturetemporary;
	function getsignature(){
		mui.ajax(common.URL.getosssignature(),{
			data:{
				
			},
			dataType:'json',//服务器返回json格式数据
			type:'get',//HTTP请求类型
			timeout:10000,//超时时间设置为10秒；
			async:false,
			success:function(data){
				if(data.success){
					policytemporary = data.data.policy;
					signaturetemporary = data.data.signature;
				}
			},
			error:function(xhr,type,errorThrown){
				
			}
		});
	}

	/*
	 * 调用api-x的身份证图片识别接口
	 * @param imgUrl 图片所在地址（即 阿里云对象存储地址）
	 * @param successFn 请求发送成功回调（第三方返回的信息都在该函数中处理）
	 * @param errorFn 请求发送失败回调
	 */
	owner.invokeApiX = function(imgUrl, successFn, errorFn) {
		
		//api-x服务接口路径
		var url = common.URL.apixServer();

		mui.ajax(url, {
			data: {
				cmd: 'idcard_front',   //idcard_front：正面识别、idcard_back：背面识别
				imgurl: imgUrl   //图片url
			},
			dataType: 'json', //服务器返回json格式数据
			type: 'post', //HTTP请求类型
			timeout: 10000, //超时时间设置为10秒；
			headers: {
				'apix-key': 'dde568df33d3434b75adcddfcda764d0'
			},
			success: successFn,
			error: errorFn
		});
	};
	
	
	/**
	 * 生成随机的唯一的文件名称
	 * @return 随机字符串（理论上是不会出现重复，恩，是的，理论上是这样的。。。）
	 */
	owner.UUID = function(){
        var s = [];
        var hexDigits = "0123456789abcdef";
        for (var i = 0; i < 32; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4"; 
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); 
                                                            
        s[8] = s[13] = s[18] = s[23] = "-";

        var uuid = s.join("");
        return uuid;
   };

}(window.imgUtils = {}));