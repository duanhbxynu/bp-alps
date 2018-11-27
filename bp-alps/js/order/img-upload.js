var lfs = null; //保留上次选择图片的列表
// 从相册中选择图片 
function galleryImg() {
	plus.gallery.pick(function(a) {
		plus.io.resolveLocalFileSystemURL(a, function(entry) {
			plus.io.resolveLocalFileSystemURL("_doc/", function(root) {
				root.getFile("head.png", {}, function(file) {
					//文件已存在 
					file.remove(function() {
						console.log("file remove success");
						entry.copyTo(root, 'head.png', function(e) {
								var e = e.fullPath + "?version=" + new Date().getTime();
								uploadHead(e); /*上传图片*/
								//变更大图预览的src 
								//目前仅有一张图片，暂时如此处理，后续需要通过标准组件实现 
							},
							function(e) {
								console.log('copy image fail:' + e.message);
							});
					}, function() {
						console.log("delete image fail:" + e.message);
					});
				}, function() {
					//文件不存在 
					entry.copyTo(root, 'head.png', function(e) {
							var path = e.fullPath + "?version=" + new Date().getTime();
							uploadHead(path); /*上传图片*/
						},
						function(e) {
							console.log('copy image fail:' + e.message);
						});
				});
			}, function(e) {
				console.log("get _www folder fail");
			})
		}, function(e) {
			console.log("读取拍照文件错误：" + e.message);
		});
	}, function(a) {}, {
		filter: "image"
	})
};
//上传头像图片 
function uploadHead(imgPath) {
	console.log("imgPath = " + imgPath);
	var image = new Image();
	image.src = imgPath;
	image.style.width = "281px";
	image.style.height = "170px";
	image.onload = function() {
		var imgData = getBase64Image(image);
		console.log(imgData);
		var uploadBackground = document.getElementById('uploadAccessory');
		while(uploadBackground.hasChildNodes()){
			uploadBackground.removeChild(uploadBackground.firstChild);
		}
		var img = document.createElement("img");
		img.setAttribute('id','head-img1');
		img.style.width = "281px";
		img.style.height = "170px";
		img.style.margin = "4px auto";
		img.setAttribute("src", imgPath);
		uploadBackground.appendChild(img);
		/*在这里调用上传接口*/
		//              mui.ajax("图片上传接口", { 
		//                  data: { 
		//                       
		//                  }, 
		//                  dataType: 'json', 
		//                  type: 'post', 
		//                  timeout: 10000, 
		//                  success: function(data) { 
		//                      console.log('上传成功'); 
		//                  }, 
		//                  error: function(xhr, type, errorThrown) { 
		//                      mui.toast('网络异常，请稍后再试！'); 
		//                  } 
		//              }); 
	}
}
//将图片压缩转成base64 
function getBase64Image(img) {
	var canvas = document.createElement("canvas");
	var width = img.width;
	var height = img.height;
	// calculate the width and height, constraining the proportions 
	if(width > height) {
		if(width > 100) {
			height = Math.round(height *= 100 / width);
			width = 100;
		}
	} else {
		if(height > 100) {
			width = Math.round(width *= 100 / height);
			height = 100;
		}
	}
	canvas.width = width; /*设置新的图片的宽度*/
	canvas.height = height; /*设置新的图片的长度*/
	var ctx = canvas.getContext("2d");
	ctx.drawImage(img, 0, 0, width, height); /*绘图*/
	var dataURL = canvas.toDataURL("images/png", 0.8);
	console.log(dataURL);
	return dataURL.replace("data:images/png;base64,", "");
}
document.getElementById('uploadAccessory').addEventListener('tap', function() {
	galleryImg();
})

