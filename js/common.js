//===========
//URL统一管理js
//===========


var serviceBaseUrl = "https://52.80.164.240:9002/";


var path = "http://192.168.3.8:8080/app/";


//PC端wxController路径
var pathwx ="http://192.168.2.18/wx/"; 
//var pathwx ="http://120.55.73.45/wx/"; 
//var pathwx ="http://192.168.3.8/wx/"; 
var common = {
	baseClientParameter:{
		client_id:"smartedit",
		grant_type:"password",
		client_secret:""
	},
	//存放页面通用操作
	baseOption:{
		getUrlParam: function (name) {
	        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	        var r = window.location.search.substr(1).match(reg);
	        if (r != null) return unescape(r[2]); return null;
		},
		getSelectHtml:function(value, options){
			var selectText = "";
			for(var i in options){
				if(value == options[i].value){
					selectText = options[i].text;
				}
			}
			return selectText;
			
		},
		goToLogin:function(){
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
		toIndex:function(i) {
			//设置默认值为0 
			var i = i || 0;
			
			var idArr=["leadsTab","opporTab","orderTab","findTab","mineTab"];
			
			var main = plus.webview.getWebviewById("main"); //这里可能返回空；详见官方文档说明
			//显示首页
			console.log("应用首页,并且切换到对应的选项卡");
			mui.fire(main,'tabSwith',{id:idArr[i]});	
			main.show();	
		},
		jsonify:function(obj){
			var seen = [];
			var json = JSON.stringify(obj, function(key, value){
				if (typeof value === 'object') {
				    if ( !seen.indexOf(value) ) {
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
	    ossServer: function(){
	    	return 'http://zfhr.oss-cn-shanghai.aliyuncs.com/';
	    },
	    //api-x身份证图像识别服务接口地址
	    apixServer: function(){
	    	return 'http://a.apix.cn/apixlab/idcardrecog/idcardurl';
	    },
	    //查询最新app版本
	    checkVersion: function(){
	    	return path + 'download/checkVersion';
	    },
	    //获取省市区编码
	    getRegionList:function(){
	    	return serviceBaseUrl+"alpssalewebservices/region/list";
	    },
	    //================登录start==================
	    accountLogin:function(){
	    	return serviceBaseUrl+"alpssalewebservices/oauth/token";
	    },
	    
	    //================登录end==================
	    
	   	//================到店客流==================
	   	//到店客流list
	   	customerFlowList: function(){
	   		return serviceBaseUrl+"alpssalewebservices/customer-flow/today/list";
	   	},
	   	//获取到店客流详情
	    getCustomerFlowDetail:function(){
	    	return serviceBaseUrl+"alpssalewebservices/customer-flow/detail";
	    },
	   	//保存到店客流详情
	   	updateCustomerFlow: function(){
	   		return serviceBaseUrl+"alpssalewebservices/customer-flow/update";
	   	},
	   	//意向list
	   	opporList: function(){
	   		return serviceBaseUrl+"alpssalewebservices/opportunity/list";
	   	},
	   	//意向详情
	   	getOpporDetail:function(){
	   		return serviceBaseUrl+"alpssalewebservices/opportunity/detail";
	   	},
	   	//意向详情
	   	createOppor:function(){
	   		
	   	},
	   	//保存意向详情
	   	updateOppor: function(){
	   		return serviceBaseUrl+"alpssalewebservices/opportunity/update";
	   	},
	   	//意向跟进记录
	   	getOpporFollow:function(){
	   		return serviceBaseUrl+"alpssalewebservices/follow-oppo/list";
	   	},
	   	//创建跟进记录
	   	createFollow:function(){
	   		return serviceBaseUrl+"alpssalewebservices/follow-oppo/creation";
	   	},
	   	getFollowDetail:function(){
	   		return serviceBaseUrl+"alpssalewebservices/follow-oppo/detail";
	   	},
	   	appendFollow:function(){
	   		return serviceBaseUrl+"alpssalewebservices/follow-oppo/appendcontent";
	   	},
	   	quotaionList:function(){
	   		return serviceBaseUrl+"alpssalewebservices/quotaion/list";
	   	},
	   	createQuotaion:function(){
	   		return serviceBaseUrl+"alpssalewebservices/quotaion/create";
	   	},
	   	//搜索市场活动
	   	getMarketactivity:function(){
	   		return serviceBaseUrl+"alpssalewebservices/follow-oppo/getmarketactivity";
	   	},
	   	//【帮工友报名】页面信息拉取
	   	jobList: function(persId){
	   		return path + 'workers/' + persId + '/infoList';
	   	},
	   	//【帮工友报名】数据保存
	   	saveApplyInfo: function(){
	   		return path + 'workers/apply';
	   	},
	   	//工友查询页面查询url
	   	searchWorkers: function(){
	   		return path + 'workers/searchWorkers';
	   	},	   
	   	//查询工友库中已经存在的工友手机号
	   	qryWokerPhoneList: function(persId){
	   		return path + 'workers/' + persId + '/mobiles';
	   	},
	   	//查询工友库（带查询条件）
	   	qryWorkersListByParams: function(persId){
	   		return path + 'workers/' + persId + '/workersLimit';
	   	},
	   	//查询工友库
	   	qryWorkersList: function(persId){
	   		return path + 'workers/' + persId + '/myWorkerlibs';
	   	},
	   	//查询工友详情
	   	workerDetails: function(workerId){
	   		return path + 'workers/' + workerId + '/details';
	   	},
	   	//修改工友信息
	   	workerModifier: function(workerId){
	   		return path + 'workers/' + workerId + '/modifier';
	   	},
	   	//添加工友
	   	workerAdded: function(){
	   		return path + 'workers/' + 'added';
	   	},	   
	   	//==================================
	   	//查询首页页面找工作（不带条件）
	   	findJobSearchJob:function(){
	   		return path + 'Position/searchJob.do';
	   	},
	   	//查询首页页面找工作(带条件查询)
	   	findJobSearchConditionJob:function(){
	   		return path + 'Position/searchConditionJob.do';
	   	},
	   	//查询首页页面找工作详情
	   	findJobSearchJobDetail:function(){
	   		return path + 'Position/searchJobDetail.do';
	   	},
	   	//地图查询工作
	   	findJobSearchMap:function(){
	   		return path + 'Position/searchMapJob.do';
	   	},
	   	//2017.4.13新版地图
	   	NewQueryJobMap:function(){
	   		return path + 'Position/NewQueryJobMap';
	   	},
	   	//发现 经纪人地图找工作
	   	NewQueryJobMapAgent:function(){
	   		return path + 'Position/NewQueryJobMapAgent'
	   	},
	   	//2017.4.13新版地图根据经纬度查职位
	   	queryJobLatLng:function(){
	   		return path + 'Position/queryJobLatLng';
	   	},
	   	//2017.4.19新版地图根据经纬度查职位 经纪人
	   	//经纪人职位详情页面
	   	queryJobLatLngAgent:function(){
	   		return path + 'Position/queryJobLatLngAgent';	
	   	},
	   	//发现 小时工地图
	   	NewQueryHourlyJobMap:function(){
	   		return path + 'Position/NewQueryHourlyJobMap';
	   	},
	   	queryHourlyJobLatLng:function(){
	   		return path + 'Position/queryHourlyJobLatLng'
	   	},
	   	AgentJobSearchJobDetail:function(){
	   		return path + 'Position/SearchAgentJobDetail.do';
	   	},
	   	//附近工作
	   	SearchNearJob:function(){
	   		return path + 'Position/SearchNearJob.do';
	   	},
	   	//精品职位
	   	SearchBoutiqueJob:function(){
	   		return path +'Position/SearchBoutiqueJob.do';
	   	},
	   	//入职返现
	   	SearchEntryReturn:function(){
	   		return path + 'Position/SearchEntryReturn.do';
	   	},
	   	//经纪人附近工作
	   	SearchAgentNearJob:function(){
	   		return path + 'Position/SearchAgentNearJob.do';
	   	},
	   	//火辣佣金
	   	SearchAgentCommissionHot:function(){
	   		return path + 'Position/SearchAgentCommissionHot.do';
	   	},
	   		//经纪人地图查询工作
	   	SearchAgentMapJob:function(){
	   		return path + 'Position/SearchAgentMapJob.do';
	   	},
	   	//职位详情 我要报名检查是否存在身份证
	   	EntryJobCheckIDCards:function(){
	   		return path + 'Position/EntryJobCheckIDCards.do';
	   	},
	   	//职位详情 判断是否报过名 并插数据
	   	EntryJob:function(){
	   		return path + 'Position/EntryJob.do';
	   	},
	   	newEntryJob:function(){
	   		return path +'Position/newEntryJob.do'
	   	},
	   	//职位详情 完善身份证信息
	   	EntryJobPerfectIDCard:function(){
	   		return path +'Position/EntryJobPerfectIDCard.do';
	   	},
	   	//我的报名查询
	   	SearchMyEntry:function(){
	   		return path + 'Position/SearchMyEntry.do';
	   	},
	   	//找工作 input框搜索
	   	findJobSearchInput:function(){
	   		return path + 'Position/findJobSearchInput.do';
	   	},
	   	//经纪人 input框搜索
	   	agentSearchInput:function(){
	   		return path + 'Position/agentSearchInput.do';
	   	},
	   	//找工作 收费职位
	   	searchChargeJob:function(){
	   		return path + 'Position/searchChargeJob.do';
	   	},
	   	//发现  小时工专区
	   	searchHourlyWork:function(){
	   		return path + 'Position/searchHourlyWork.do';
	   	},
	   	//发现  小时工专区 input框搜索
	   	hourlyWorkerSearchInput:function(){
	   		return path + 'Position/hourlyWorkerSearchInput';
	   	},
	   		//小时工地图查询工作
	   	hourlyWorkerSearchMap:function(){
	   		return path + 'Position/hourlyWorkerSearchMap.do';
	   	},
	   	//检查是否加入过专属展架
	   	checkAgentDispalyRack:function(){
	   		return path + 'Position/checkAgentDispalyRack.do';
	   	},
	   	//我的专属展架查询
	   	searchMyDisplayRock:function(){
	   		return path + 'Position/searchMyDisplayRock.do';
	   	},
	   	//我的专属展架上移
	   	DisplayRockSortUp:function(){
	   		return path + 'Position/DisplayRockSortUp.do';
	   	},
	   	//我的专属展架删除
	   	DisplayRockSortRemove:function(){
	   		return path + 'Position/DisplayRockSortRemove.do';
	   	},
	   	//我的专属展架说明
	   	displayRockDeclare:function(){
	   		return path + 'Position/displayRockDeclare.do';
	   	},
	   	personInfo:function(){
	   		return path + 'Position/personInfo.do';
	   	},
	   	//查询工友库列表
	   	searchWorkerList:function(persId){
	   		return path +'Position/'+persId+'/searchWorkerList.do';
	   	},
	   	//工友库报名
	   	saveApplyWorker:function(){
	   		return path + 'Position/saveApplyWorker';
	   	},
	   	//分享职位
	   	shareJob:function(uId,persId,jobId){
	   		return pathwx + 'appPostion/'+uId+'/'+persId+'/'+jobId+'/'+'shareJob';
	   	},
	   	//分享展架
	   	shareDisplayRack:function(uId,persId,persName){
	   		return pathwx+'appPostion/shareDisplayRack?uId='+uId+'&persId='+persId+'&persName='+persName;
	   	},
	   	
	   	//我的（模块）  安全密码
		saveSecurityPassword:function(){
			return  path + 'aboutme/saveSecurityPassword';
		},
		//查询个人用户信息
		queryUser:function(){
			return path + 'aboutme/queryUser';
		},
		//调用支付宝提现
		alipayCash:function(){
			return path + 'aboutme/alipayCash';
		},
		//提现记录查询
		withDrawalRecordQuery:function(persId){
			return path + 'aboutme/withDrawalRecordQuery?persId='+persId;
		},
		//结算记录查询
		settlementRecordQuery:function(persId){
			return path + 'aboutme/settlementRecordQuery?persId='+persId;	
		},
		//佣金支付宝提现
		alipayCommission:function(){
			return path + 'aboutme/alipayCommission'
		},
		//佣金提现记录查询
		commissionWithDrawalRecordQuery:function(persId){
			return path + 'aboutme/commissionRecordQuery?persId='+persId;
		},
		//佣金结算记录查询
		commissionSettlementRecordQuery:function(persId){
			return path + 'aboutme/commissionSettlementQuery?persId='+persId;	
		},
		//微信企业支付
		weixinpay:function(){
			return path + 'aboutme/weixinpay';
		},
		//微信企业支付（佣金提现）
		weixinPayCommission:function(){
			return path + 'aboutme/weixinPayCommission';
		},
		//发现（经纪人）最新职位
		recentJobs:function(){
			return path + 'Position/recentJobs';
		},
		getqrcode:function(jobId,persId,uId){
			return  path +'Position/jobQrCode?jobId=' + jobId + '&persId='+persId+'&uId='+uId;
		},
		checkCode:function(){
			return path + 'Position/checkcheckCode';
		},
		saveLocation:function(){
			return path + 'Position/saveLocation';
		},
		//消息模块我的服务费
		myService:function(){
			return path + 'Position/myService';
		},
	  	myFreetax:function(){
	  		return path +'Position/myFreetax';
	  	},
	  	addAmount:function(){
	  		return path + 'Position/addAmount';
	  	},
	  	serviceWithDrawalRecordQuery:function(persId){
	  		return path + 'Position/serviceWithDrawalRecordQuery?persId='+persId;
	  	},
	  	serviceSettlementRecordQuery:function(persId){
	  		return path + 'Position/serviceSettlementRecordQuery?persId='+persId;
	  	},
	  	invoiceDeductibleAmountSearch:function(persId){
	  		return path + 'Position/invoiceDeductibleAmountSearch?persId='+persId;
	  	},
	  	invoiceUsedAmountSearch:function(persId){
	  		return path + 'Position/invoiceUsedAmountSearch?persId='+persId;
	  	},
	  	alipayService:function(){
	  		return path + 'Position/alipayService';
	  	},
	  	weixinPayService:function(){
	  		return path + 'Position/weixinPayService';
	  	},
	  	searchAgreementType:function(){
	  		return path + 'Position/searchAgreementType'
	  	},
	   	//================“我的”相关链接地址==================
	   	//登陆验证地址
	   	checklogin:function(){
	   		return path + 'login.do';
	   	},
	   	//举报有奖
	   	reportaward:function(){
	   		return path + 'aboutme/reportaward.do';
	   	},
	   	persondetailinformation:function(){
	   		return path+'aboutme/persondetailinformation.do';
	   	},
	   	//上传头像
	   	updateavatar:function(){
	   		return path+'aboutme/updateavatar.do';
	   	},
	   	//修改信息
	   	updatepersoninfo:function(){
	   		return path+'aboutme/updatepersoninfo.do';
	   	},
	   	//手机号唯一性验证
	   	phonenumberunique:function(){
	   		return path+'aboutme/phonenumberunique.do';
	   	},
	   	//获取手机验证码
	   	sendMessage:function(phoneno){
	   		return path+'common/'+phoneno+'/sendMessage';
	   	},
	   	//更新手机号
	   	updatecellphone:function(){
	   		return path+'aboutme/updatecellphone.do';
	   	},
	   	//修改密码
	   	changepassword:function(){
	   		return path+'aboutme/changepassword.do';
	   	},
	   	//邀请码真实性检验
	   	invitationcode:function(){
	   		return path+'aboutme/checkinvitationcode.do';
	   	},
	   	//注册用户
	   	register:function(){
	   		return path+'aboutme/register.do';
	   	},
	   	//用户协议
	   	useragreement:function(){
	   		return path+'aboutme/setupUserAgreement.do';
	   	},
	   	//找工作常见问题
	   	applyjobproblem:function(){
	   		return path+'aboutme/applyjobproblem.do';
	   	},
	   	//找工作常见问题-详情
	   	applyjobproblemdetail:function(){
	   		return path+'aboutme/applyjobproblemdetail.do';
	   	},
	   	//经纪人攻略
	   	brokerguide:function(){
	   		return path+'aboutme/brokerguide.do';
	   	},
	   	//意见反馈
	   	feedback:function(){
	   		return path+'aboutme/feedback.do';
	   	},
	   	//举报有奖
	   	reportawardcontent:function(){
	   		return path+'aboutme/reportawardcontent.do';
	   	},
	   	//关于我们
	   	setupAboutMe:function(){
	   		return path+'aboutme/setupAboutMe.do';
	   	},
	   	//身份证号唯一性验证
	   	idcardUniqueness:function(){
	   		return path+'aboutme/idcarduniqueness.do';
	   	},
	   	//注册用户第二步-填入身份证号信息
	   	register2:function(){
	   		return path+'aboutme/register2.do';
	   	},
	   	//“我的”页面，基本信息查询
   	 	basicinformation:function(){
   		return path+'aboutme/basicinformation.do';
	   	},
	   	//"招聘合作"
	   	recruitmentcooperation:function(){
   		return path+'aboutme/recruitmentcooperation.do';
	   	},
	   	//"我的返现--获取返现页面上的三个数据"
	   	cashback:function(){
   		return path+'aboutme/cashback.do';
	   	},
	   	//"我的返现--身份是否认证判断"
	   	//"我的工资 提现--身份是否认证判断"
	   	cashbackidentityapprove:function(){
   		return path+'aboutme/cashbackidentityapprove.do';
	   	},
	   	//"我的返现--身份证阿里云地址上传数据库"
	   	updateidentity:function(){
   		return path+'aboutme/updateidentity.do';
	   	},
	   	//"我的返现--上传认证修改时的姓名和身份证号码"
	   	updatenameandidentity:function(){
   		return path+'aboutme/updatenameandidentity.do';
	   	},
	   	//我的返现-提现-微信或支付宝提现
	   	cashbackway:function(){
   			return path+'aboutme/cashbackway.do';
	   	},
	   	//"我的佣金--获取佣金页面上的三个数据"
	   	commission:function(){
   		return path+'aboutme/commission.do';
	   	},
	   	//"我的佣金-提现-微信或支付宝提现"
	   	commissionway:function(){
   		return path+'aboutme/commissionway.do';
	   	},
	   	//"微信QQ分享，邀请注册"  IP地址在微信页面中，会提示不安全，这里固定为域名
	   	sharemessage:function(){
   		return path+'aboutme/sharemessage.do';
	   	},
	   	//"忘记密码"
	   	forgetpassword:function(){
   		return path+'aboutme/forgetpassword.do';
	   	},
	   	//"支付弹出层 "
	   	paymentmodal:function(){
   		return path+'aboutme/paymentmodal.do';
	   	},
	   	//"支付弹出层是否显示按钮 "
	   	paymentmodalshowornot:function(){
   		return path+'aboutme/paymentmodalshowornot.do';
	   	},
	    //"生成二维码"
	   	qrCode:function(){
   		return path+'aboutme/qrCode.do';
	   	},
	   	 //"获取oss上传图片签名"
	   	getosssignature:function(){
   		return path+'aboutme/getosssignature.do';
	   	},
	   	 //"更新clientId 和 clientType"
	   	updateClientIdandType:function(){
   		return path+'aboutme/updateClientIdandType.do';
	   	},
	   	//"我的工资--获取工资页面上的三个数据 "（当前可提工资  累计结算工资  累计提现金额）
	   tempsalary:function(){
   		return path+'aboutme/tempsalary.do';
	   	},
	   	//工资提现记录查询
		salaryWithDrawalRecordQuery:function(persId){
			return path + 'aboutme/salaryRecordQuery.do?persId='+persId;
		},
		//工资结算记录查询
		salarySettlementRecordQuery:function(persId){
			return path + 'aboutme/salarySettlementQuery.do?persId='+persId;	
		},
	   		//工资支付宝提现
		alipaysalary:function(){
			return path + 'aboutme/alipaysalary.do'
		},
		//工资微信提现 
		weixinPaySalary:function(){
			return path + 'aboutme/weixinPaySalary.do';
		},
		//提现时检查今天是否提现过，如果提现过，不允许再提现 
		cashchecktoday:function(){
			return path + 'aboutme/cashchecktoday.do';
		},
		//提现时提醒本月累计提现金额
		totalCashThisMonth:function(){
			return path + 'aboutme/totalCashThisMonth.do';
		},
	   	
	   	//================求职进展页面相关链接地址==================
	   	//================求职进展页面相关链接地址==================
	   	//查询求职进展（带查询条件）
	   	qryProcessListByParams: function(belongsPersId){
	   		return path + 'message/' + belongsPersId + '/processLimit';
	   	},
	   	//查询求职进展条数（带查询条件）
	   	qryProcessListCount: function(belongsPersId){
	   		return path + 'message/' + belongsPersId + '/processCount';
	   	},
	   	//查询求职进展职位的下拉选项（带查询条件）
	   	qryProcessJobList: function(belongsPersId){
	   		return path + 'message/' + belongsPersId + '/processJobList';
	   	},
	   	//查询求职进展详情
	   	qryProcessDetail: function(processid,belongsPersId){
	   		return path + 'message/' + processid + '/' + belongsPersId + '/applydetails';
	   	},
	   	//查询经纪人职位列表
	   	qryAgentJobList:function(){
	   		return path + 'message/agentJobsList';
	   	},
	   	//查询求职过程状态列表
	   	qryProcessStatusList:function(belongsPersId,status){
	   		return path + 'message/' + belongsPersId + '/' + status + '/processStatusList';
	   	},
	   	//查询职位面试消息模板
	   	qryJobInterviewTemplate:function(belongsPersId){
	   		return path + 'message/' + belongsPersId + '/messageTemplate';
	   	},
	   	//查询单个职位短信模板
	   	qrySingleTemplate:function(belongsPersId,jobId){
	   		return path + 'message/' + belongsPersId + '/' + jobId + '/messageTemplate';
	   	},
	   	//保存单个消息模板
	   	savaSingleTemplate:function(){
	   		return path +"message/singleTemplate";
	   	},
	   	//批量保存消息模板
	   	saveBatchTemplate:function(){
	   		return path + 'message/batchTemplate';
	   	},
	   	//群发短信列表
	   	qryJobMessageList:function(belongsPersId){
	   		return path + 'message/' + belongsPersId + '/messages';
	   	},
	   	//获取工作通知
	   	qryPersMessagesList:function(persId){
	   		return path + 'message/' + persId + '/persMessages';
	   	},
	   	qryAnouncementList:function(){
	   		return path + 'message/anouncement';
	   	},
	   	qryAnnouncementDetail:function(anouncementId){
	   		return path + 'message/'+anouncementId+'/anouncement';
	   	},
	   	//经纪人批量报名
	   	addProcess:function(anouncementId){
	   		return path + "message/addProcess";
	   	},
	   	//求职进展取消报名
	   	cancelApply:function(processId,jobId,userId){
	   		return path + "message/"+processId+"/"+jobId+"/"+userId+"/process";
	   	},
	   	qryUserRole:function(userId){
	   		return path + "message/"+userId+"/userRole";
	   	},
	   	qryProjectList:function(userId){
	   		return path + "message/"+userId+"/projectList";
	   	},
	   	qryJobProject:function(jobId){
	   		return path + "message/"+jobId+"/jobProject";
	   	},
	   	//项目主管所属职位报名人员查询
	   	searchJobWorkers: function(jobId){
	   		return path + 'message/'+jobId+'/searchJobWorkers';
	   	},
	   	//项目主管操作报名人员状态
	   	handleProject:function(){
	   		return path + "message/handleProject";
	   	},
	   	isExitByNopay:function(){
	   		return path +"message/isExitByNopay";
	   	},
	   	recommendInterview:function (){
	   		return path +"message/recommendInterview";
	   	},
	   	entry:function(){
	   		return path +"message/entry";
	   	},
	   	noEntry:function(){
	   		return path +"message/noEntry";
	   	},
	   	dimission:function(){
	   		return path +"message/dimission";
	   	},
	   	selectHourly:function(){
	   		return path + "message/selectHourly";
	   	},
	   	addWorkerSalary:function(){
	   		return path + "message/addWorkerSalary"
	   	},
	   	addBatchWorkerSalary:function(){
	   		return path + "message/addBatchWorkerSalary"
	   	}
    },
};
