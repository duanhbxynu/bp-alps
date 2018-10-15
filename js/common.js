//===========
//URL统一管理js
//===========

var serviceBaseUrl = "https://52.80.164.240:9002/";

//var path = "http://192.168.3.8:8080/app/";

//PC端wxController路径
var pathwx = "http://192.168.2.18/wx/";
//var pathwx ="http://120.55.73.45/wx/"; 
//var pathwx ="http://192.168.3.8/wx/"; 
var common = {
	baseClientParameter: {
		client_id: "smartedit",
		grant_type: "password",
		client_secret: ""
	},
	//存放页面通用操作
	baseOption: {
		getUrlParam: function(name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
			var r = window.location.search.substr(1).match(reg);
			if(r != null) return unescape(r[2]);
			return null;
		},
		getSelectHtml: function(value, options) {
			var selectText = "";
			for(var i in options) {
				if(value == options[i].value) {
					selectText = options[i].text;
				}
			}
			return selectText;
		},
		setInnerHtml: function(attrList, excludeList) {
			mui.each(excludeList, function(index, exclude) {
				mui.each(attrList, function(i, attr) {
					if(i == exclude) {
						document.getElementById(exclude).innerHTML = attr;
					}
				})
			})
		},
		isInArray:function(arr, value) {
			for(var i = 0; i < arr.length; i++) {
				if(value === arr[i]) {
					return true;
				}
			}
			return false;
		},
		setTextValue:function(attrList, excludeList) {
			mui.each(excludeList, function(index, exclude) {
				mui.each(attrList, function(i, attr) {
					if(i == exclude) {
						console.log(exclude);
						console.log(i);
						document.getElementById(exclude).value = attr;
					}
				})
			})
		},
		setCarSelectValue: function(attrList, excludeList) {
			mui.each(attrList, function(i, attr) {
				mui.each(excludeList, function(index, exclude) {
					var selectOption = exclude.className;
					console.log("exclude.className=" + selectOption);
					var optionText = exclude.textName;
					if(i == selectOption) {
						document.getElementsByClassName(selectOption)[0].setAttribute("data-value", attr);
					}
					if(i == optionText) {
						var textOption = optionText.substring(0, optionText.length - 4);
						document.getElementsByClassName(textOption)[0].innerHTML = attr;
					}

				})
			})
		},
		setSelectValue: function(attrList, excludeList) {
			mui.each(excludeList, function(index, exclude) {
				mui.each(attrList, function(i, attr) {
					if(i == exclude) {
						document.getElementsByClassName(exclude)[0].setAttribute("data-value", attr);
						document.getElementsByClassName(exclude)[0].innerHTML = attr;
					}
				})
			})
		},
		setRadioValue: function(attrList, excludeList) {
			mui.each(excludeList, function(index, exclude) {
				mui.each(attrList, function(i, attr) {
					if(i == exclude) {
						mui.each(document.body.querySelectorAll("input[name=exclude]"), function(i, option) {
							console.log("this = " + this.getAttribute('value'));
							if((this.getAttribute('value') == "true" && attr) || (this.getAttribute('value') == "false" && !attr) || this.getAttribute('value') == attr) {
								this.checked = true;
							}
							return;
						})

					}
				})
			})
		},
		setCarLayer3Value: function(brandValue, vehicleValue) {
			console.log("brandValue:" + brandValue);
			console.log("vehicleValue:" + vehicleValue);
			var vehicle = null;
			mui.each(categoryList, function(i, category) {
				if(category.value == brandValue) {
					vehicle = {
						vehicleBrandText: category.text
					}
					mui.each(category.children, function(i, vehicleCategory) {
						if(vehicleCategory.value == vehicleValue) {
							mui.extend(vehicle, {
								vehicleCategoryText: vehicleCategory.text
							});
						}
					})
					console.log("vehicle:" + JSON.stringify(vehicle));
				}
			})
			return vehicle;
		},
		setCarColorLayer3Value: function(carModelValue, inColorValue, outColorValue) {
			console.log("carModelValue:" + carModelValue);
			console.log("inColorValue:" + inColorValue);
			console.log("outColorValue:" + outColorValue);
			var vehicleModel = null;
			mui.each(productList, function(i, product) {
				if(product.value == carModelValue) {
					vehicleModel = {
						vehicleText: product.text
					}
					mui.each(product.children, function(i, carColor) {
						if(carColor.value == inColorValue) {
							mui.extend(vehicleModel, {
								innerColorsText: carColor.text
							});
						}
						if(carColor.value == outColorValue) {
							mui.extend(vehicleModel, {
								outColorsText: carColor.text
							});
						}
					})
					console.log("vehicle:" + JSON.stringify(vehicleModel));
				}
			})
			return vehicleModel;
		},
		getToken: function() {
			if(!localStorage.getItem('$state')) {
				plus.nativeUI.toast('获取token出错了，请稍后再试！');
				goToLogin();
			}
			var token = JSON.parse(localStorage.getItem('$state')).token;
			return token;
		},
		goToLogin: function() {
			/*
			 *用户登录
			 * */
			mui.openWindow({
				id: 'login',
				url: '/html/login.html',
				show: {
					aniShow: 'pop-in'
				},
				waiting: {
					autoShow: false
				}
			});
		},
		/**
		 * 跳转到首页
		 * 参数默认为0(首页tab bar 的第一个子页面)
		 * */
		toIndex: function(i) {
			//设置默认值为0 
			var i = i || 0;

			var idArr = ["leadsTab", "opporTab", "orderTab", "findTab", "mineTab"];

			var main = plus.webview.getWebviewById("main"); //这里可能返回空；详见官方文档说明
			//显示首页
			console.log("应用首页,并且切换到对应的选项卡");
			mui.fire(main, 'tabSwith', {
				id: idArr[i]
			});
			main.show();
		},
		jsonify: function(obj) {
			var seen = [];
			var json = JSON.stringify(obj, function(key, value) {
				if(typeof value === 'object') {
					if(!seen.indexOf(value)) {
						return '__cycle__' + (typeof value) + '[' + key + ']';
					}
					seen.push(value);
				}
				return value;
			}, 4);
			return json;
		}
	},
	//存放页面跳转常量
	URL: {

		//++++++++++++++系统相关的++++++++++++++++
		//阿里云对象存储服务接口地址
		ossServer: function() {
			return 'http://zfhr.oss-cn-shanghai.aliyuncs.com/';
		},
		//api-x身份证图像识别服务接口地址
		apixServer: function() {
			return 'http://a.apix.cn/apixlab/idcardrecog/idcardurl';
		},
		//查询最新app版本
		checkVersion: function() {
			return serviceBaseUrl + 'download/checkVersion';
		},
		//获取省市区编码
		getRegionList: function() {
			return serviceBaseUrl + "alpssalewebservices/region/list";
		},
		//================登录start==================
		accountLogin: function() {
			return serviceBaseUrl + "alpssalewebservices/oauth/token";
		},

		//================登录end==================

		//================到店客流==================
		//到店客流list
		customerFlowList: function() {
			return serviceBaseUrl + "alpssalewebservices/customer-flow/today/list";
		},
		//获取到店客流详情
		getCustomerFlowDetail: function() {
			return serviceBaseUrl + "alpssalewebservices/customer-flow/detail";
		},
		//保存到店客流详情
		updateCustomerFlow: function() {
			return serviceBaseUrl + "alpssalewebservices/customer-flow/update";
		},
		//意向list
		opporList: function() {
			return serviceBaseUrl + "alpssalewebservices/opportunity/list";
		},
		//意向详情
		getOpporDetail: function() {
			return serviceBaseUrl + "alpssalewebservices/opportunity/detail";
		},
		//意向详情
		createOppor: function() {

		},
		//保存意向详情
		updateOppor: function() {
			return serviceBaseUrl + "alpssalewebservices/opportunity/update";
		},
		//意向跟进记录
		getOpporFollow: function() {
			return serviceBaseUrl + "alpssalewebservices/follow-oppo/list";
		},
		//创建跟进记录
		createFollow: function() {
			return serviceBaseUrl + "alpssalewebservices/follow-oppo/creation";
		},
		getFollowDetail: function() {
			return serviceBaseUrl + "alpssalewebservices/follow-oppo/detail";
		},
		appendFollow: function() {
			return serviceBaseUrl + "alpssalewebservices/follow-oppo/appendcontent";
		},
		quotaionList: function() {
			return serviceBaseUrl + "alpssalewebservices/quotaion/list";
		},
		createQuotaion: function() {
			return serviceBaseUrl + "alpssalewebservices/quotaion/create";
		},
		//搜索市场活动
		getMarketactivity: function() {
			return serviceBaseUrl + "alpssalewebservices/follow-oppo/getmarketactivity";
		},
	},
};