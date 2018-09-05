/**
 * +++++++++++++++++++++
 * 软件更新工具类
 * +++++++++++++++++++++
 */
(function(owner) {

	owner.updateApp = function(flag) {

		//版本检查url
		var checkVersion = common.URL.checkVersion();

		//获取当前版本
		var local_version = plus.runtime.version;

		//比较
		function versionCompare(curStr, maxStr) {

			var maxVersion = maxStr.replace('.', '').replace('.', '');
			var curVersion = curStr.replace('.', '').replace('.', '');
			return(maxVersion - curVersion) > 0 ? true : false;
		}

		//检查更新
		mui.ajax(checkVersion, {
			data: {

			},
			dataType: 'json', //服务器返回json格式数据
			type: 'get', //HTTP请求类型
			timeout: 10000, //超时时间设置为10秒；
			success: function(data) {
				var result = data.data;

				if(result) {
					var newly_version = result.appVersion;
					console.log('最新版本号为：' + newly_version);
					if(local_version && newly_version && versionCompare(local_version, newly_version)) {
						//需要更新，提示是否下载软件更新包

						if(mui.os.ios) {
							mui.confirm(result.appVersionDeclare, '下载更新', ['前往App Store下载', '取消'], function(event) {
								var index = event.index;
								if(index == 0) {
									var url = 'itms-apps://itunes.apple.com/cn/app/%E6%98%93%E8%81%8C%E6%8B%9B/id1219843450?mt=8'; // HelloH5应用在appstore的地址
									plus.runtime.openURL(url);
								}
							});
						} else {
							mui.confirm(result.appVersionDeclare, '下载更新', ['确定', '取消'], function(event) {
								var index = event.index;
								if(index == 0) {
									//下载等待提示
									plus.nativeUI.showWaiting('资源下载中...');

									var downloadApp = common.URL.ossServer() + result.appUrl;

									//点击确定，开始下载安装任务
									var dtask = plus.downloader.createDownload(downloadApp, {
											method: 'GET',
											filename: '_downloads/'
										},
										function(download, status) {
											var fileName = download.filename;
											console.log('文件名:' + fileName);
											console.log('下载状态：' + status);

											//安装更新包文件
											plus.runtime.install(fileName, {}, function() {
												plus.nativeUI.closeWaiting();
												console.log("安装wgt文件成功！");
												plus.nativeUI.alert("应用资源更新完成！", function() {
													plus.runtime.restart();
												});
											}, function(e) {
												plus.nativeUI.closeWaiting();
												console.log("安装wgt文件失败[" + e.code + "]：" + e.message);
												plus.nativeUI.alert("安装wgt文件失败[" + e.code + "]：" + e.message);
											});

										});

									dtask.start();
								}

							});
						}
					} else {
						//
						if(!flag) {
							plus.nativeUI.alert("已是最新版本！");
						}
					}
				}
			},
			error: function(xhr, type, errorThrown) {

			}
		});
	}

}(window.updateUtils = {}));