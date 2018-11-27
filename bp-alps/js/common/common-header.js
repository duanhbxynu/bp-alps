/**
 * index.html页面事件监听js
 */

//职位页面
function positionPageEventListener() {
		
		
		
		var citysPicker = new mui.PopPicker({
			layer: 2
		});

		var areasPicker = new mui.PopPicker({
			layer: 2
		});
		var jobPicker = new mui.PopPicker();
		var DistancesPicker = new mui.PopPicker();

		citysPicker.setData(cityData);
		areasPicker.setData(cityData);
		jobPicker.setData(jobData);
		DistancesPicker.setData(distancesData);

	
	var showAreaPickerButton = document.getElementById('showAreaPicker');
	var showJobPickerButton = document.getElementById('showJobPicker');
	var showDistancesPickerButton = document.getElementById('showDistancesPicker');
	var showCityPickerButton = document.getElementById("showCityPicker");
	
	//获取当前子页面
	var positionPage = plus.webview.currentWebview().children()[0];
	//var positionPage = plus.webview.getWebviewById("/html/menu/tab-webview-subpage-position.html");
	//console.log(positionPage.getURL());
	
	showAreaPickerButton.addEventListener('tap', function(event) {
				var titleText = '';
			areasPicker.show(function(items) {
				//alert("dddd");
				console.log((items[0] || {}).text);
				//alert((items[2] || {}).text);
				titleText = (items[1] || {}).text;
				areaOptionValue = (items[1] || {}).value;
				console.log(areaOptionValue);
				document.getElementById("areaVar").innerHTML = titleText;
				dealNode();
				pullToRefresh.refresh(true);
				pullToRefresh.pullUpLoading();
			});
	}, false); 
	
	showJobPickerButton.addEventListener('tap',function(){
			var titleText = '';
			jobPicker.show(function(items) {
				console.log(items[0].text);
				titleText = items[0].text;
				jobOptionValue = items[0].value;
				document.getElementById("jobVar").innerHTML = titleText;
				//searchConditionJob();
				dealNode();
				pullToRefresh.refresh(true);
				pullToRefresh.pullUpLoading();
			});
		
	},false);
	
	showDistancesPickerButton.addEventListener('tap',function(){
		var titleText = '';
			DistancesPicker.show(function(items) {
				
				console.log(items[0].text);
				titleText = items[0].text;
				distancesOptionValue = items[0].value;
				document.getElementById("distancesVar").innerHTML = titleText;
				//searchConditionJob();
				dealNode();
				pullToRefresh.refresh(true);
				pullToRefresh.pullUpLoading();
			});
	},false);
	
	showCityPickerButton.addEventListener('tap',function(){
		citysPicker.show(function(items) {
				console.log("条件进来");
				var titleText = (items[0] || {}).text;
				cityOptionValue = (items[0] || {}).value;
				document.getElementById("cityVar").innerHTML = titleText;
				areasPicker.pickers[0].setSelectedValue(cityOptionValue);
				dealNode();
				pullToRefresh.refresh(true);
				pullToRefresh.pullUpLoading();
			});
	},false);
	
	document.getElementById("search").addEventListener('tap',function(){
//		var input = document.getElementById("search").value;
//		positionPage.evalJS('searchConditionJob('+JSON.stringify(input)+')');
		mui.openWindow({
				url: 'position/search-job.html',
				id: 'search-job.html',
				waiting: {
					autoShow: false, //自动显示等待框，默认为true
					
				}
			})
		
		
	},false);
	
}

function positionAgentPageEventListener() {
	//下拉选项卡
		var AgentcitysPicker = new mui.PopPicker({
			layer: 2
		});

		var AgentareasPicker = new mui.PopPicker({
			layer: 2
		});
		var AgentjobPicker = new mui.PopPicker();
		var AgentDistancesPicker = new mui.PopPicker();

		AgentcitysPicker.setData(cityData);
		AgentareasPicker.setData(cityData);
		AgentjobPicker.setData(jobData);
		AgentDistancesPicker.setData(distancesData);

	var AgentshowAreaPickerButton = document.getElementById('AgentshowAreaPicker');
	var AgentshowJobPickerButton = document.getElementById('AgentshowJobPicker');
	var AgentshowDistancesPickerButton = document.getElementById('AgentshowDistancesPicker');
	var AgentshowCityPickerButton = document.getElementById("AgentshowCityPicker");
	
	//获取当前子页面
	//var positionPage = plus.webview.currentWebview().children()[1];
	//var positionPage = plus.webview.getWebviewById("/html/menu/tab-webview-subpage-position-agent.html");
	AgentshowAreaPickerButton.addEventListener('tap', function(event) {
			var titleText = '';
			AgentareasPicker.show(function(items) {
				//alert("dddd");
				console.log((items[0] || {}).text);
				//alert((items[2] || {}).text);
				titleText = (items[1] || {}).text;
				areaOptionAgentValue = (items[1] || {}).value;
				console.log(areaOptionAgentValue);
				document.getElementById("areaAgentVar").innerHTML = titleText;
				dealNodeAgent();
				pullToRefreshAgent.refresh(true);
				pullToRefreshAgent.pullUpLoading();
			});
	}, false); 
	
	AgentshowJobPickerButton.addEventListener('tap',function(){
		var titleText = '';
			AgentjobPicker.show(function(items) {
				console.log(items[0].text);
				titleText = items[0].text;
				jobOptionAgentValue = items[0].value;
				document.getElementById("jobAgentVar").innerHTML = titleText;
				
				dealNodeAgent();
				pullToRefreshAgent.refresh(true);
				pullToRefreshAgent.pullUpLoading();
			});
		
	},false);
	
	AgentshowDistancesPickerButton.addEventListener('tap',function(){
		var titleText = '';
			AgentDistancesPicker.show(function(items) {
				
				console.log(items[0].text);
				titleText = items[0].text;
				distancesOptionAgentValue = items[0].value;
				document.getElementById("distancesAgentVar").innerHTML = titleText;
				//searchConditionJob();
				dealNodeAgent();
				pullToRefreshAgent.refresh(true);
				pullToRefreshAgent.pullUpLoading();
			});
		
	},false);
	
	AgentshowCityPickerButton.addEventListener('tap',function(){
		AgentcitysPicker.show(function(items) {
				console.log("条件进来");
				var titleText = (items[0] || {}).text;
				cityOptionAgentValue = (items[0] || {}).value;
				document.getElementById("cityAgentVar").innerHTML = titleText;
				AgentareasPicker.pickers[0].setSelectedValue(cityOptionAgentValue);
				dealNodeAgent();
				pullToRefreshAgent.refresh(true);
				pullToRefreshAgent.pullUpLoading();
			});
		
	},false);
	
	document.getElementById("agentSearch").addEventListener('tap',function(){

		mui.openWindow({
				url: 'position/agent-search-job.html',
				id: 'agent-search-job.html',
				waiting: {
					autoShow: false, //自动显示等待框，默认为true
					
				}
			})
		
		
	},false);
	
}

//发现页面
function discoverPageEventListener() {
	
}

//工友库页面
function workersPageEventListener() {
	
	var addWorkersBtn = document.getElementById('addWorkers');
	var searchWorkersBtn = document.getElementById('searchWorkers');

	var showSexPickerButton = document.getElementById('showSexPicker');
	var showAgePickerButton = document.getElementById('showAgePicker');
	var showDatePickerButton = document.getElementById('showDatePicker');
	
	
	//添加工友页面跳转
	addWorkersBtn.addEventListener('tap', function(){
		mui.openWindow({
			url: './workers/workers-add-worker.html'
		});
	}, false);
	
	//搜索页面跳转
	searchWorkersBtn.addEventListener('tap', function(){
		mui.openWindow({
			url: './workers/workers-search-worker.html'
		});
	}, false);



	showSexPickerButton.addEventListener('tap', function(event) {
		//获取当前子页面
		var workersPage = plus.webview.currentWebview().children()[1];
		workersPage.evalJS("showSexOption();");
		
	}, false); 

	showAgePickerButton.addEventListener('tap', function(event) {
		//获取当前子页面
		var workersPage = plus.webview.currentWebview().children()[1];
		workersPage.evalJS("showAgeOption();");
	}, false);

	showDatePickerButton.addEventListener('tap', function(event) {
		//获取当前子页面
		var workersPage = plus.webview.currentWebview().children()[1];
		workersPage.evalJS("showDateOption();");
	}, false);


}

//消息页面
function messagePageEventListener() {
	
}

//关于页面
function aboutmePageEventListener() {
	
}
