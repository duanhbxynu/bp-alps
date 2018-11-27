/**
 * index.html页面事件监听js
 */

//职位页面
function positionPageEventListener() {
	
	var showAreaPickerButton = document.getElementById('showAreaPicker');
	var showJobPickerButton = document.getElementById('showJobPicker');
	var showDistancesPickerButton = document.getElementById('showDistancesPicker');
	var showCityPickerButton = document.getElementById("showCityPicker");
	
	//获取当前子页面
	var positionPage = plus.webview.currentWebview().children()[0];
	//var positionPage = plus.webview.getWebviewById("/html/menu/tab-webview-subpage-position.html");
	console.log(positionPage.getURL());
	
	showAreaPickerButton.addEventListener('tap', function(event) {
		positionPage.evalJS("mui('#pullrefresh').pullRefresh().setStopped(true)");
		positionPage.evalJS("showAreasOption();");
	}, false); 
	
	showJobPickerButton.addEventListener('tap',function(){
		positionPage.evalJS("mui('#pullrefresh').pullRefresh().setStopped(true)");
		positionPage.evalJS("showJobOption();");
		
	},false);
	
	showDistancesPickerButton.addEventListener('tap',function(){
		positionPage.evalJS("mui('#pullrefresh').pullRefresh().setStopped(true)");
		positionPage.evalJS("showDistancesOption();");
		
	},false);
	
	showCityPickerButton.addEventListener('tap',function(){
		positionPage.evalJS("mui('#pullrefresh').pullRefresh().setStopped(true)");
		positionPage.evalJS("showCityPickerOption();");
		
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
	var AgentshowAreaPickerButton = document.getElementById('AgentshowAreaPicker');
	var AgentshowJobPickerButton = document.getElementById('AgentshowJobPicker');
	var AgentshowDistancesPickerButton = document.getElementById('AgentshowDistancesPicker');
	var AgentshowCityPickerButton = document.getElementById("AgentshowCityPicker");
	
	//获取当前子页面
	var positionPage = plus.webview.currentWebview().children()[1];
	//var positionPage = plus.webview.getWebviewById("/html/menu/tab-webview-subpage-position-agent.html");
	AgentshowAreaPickerButton.addEventListener('tap', function(event) {
		positionPage.evalJS("mui('#pullrefresh').pullRefresh().setStopped(true)");
		positionPage.evalJS("showAgentAreasOption();");
	}, false); 
	
	AgentshowJobPickerButton.addEventListener('tap',function(){
		positionPage.evalJS("mui('#pullrefresh').pullRefresh().setStopped(true)");
		positionPage.evalJS("showAgentJobOption();");
		
	},false);
	
	AgentshowDistancesPickerButton.addEventListener('tap',function(){
		positionPage.evalJS("mui('#pullrefresh').pullRefresh().setStopped(true)");
		positionPage.evalJS("showAgentDistancesOption();");
		
	},false);
	
	AgentshowCityPickerButton.addEventListener('tap',function(){
		positionPage.evalJS("mui('#pullrefresh').pullRefresh().setStopped(true)");
		positionPage.evalJS("showAgentCityPickerOption();");
		
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
		var workersPage = plus.webview.currentWebview().children()[3];
		workersPage.evalJS("showSexOption();");
		
	}, false); 

	showAgePickerButton.addEventListener('tap', function(event) {
		//获取当前子页面
		var workersPage = plus.webview.currentWebview().children()[3];
		workersPage.evalJS("showAgeOption();");
	}, false);

	showDatePickerButton.addEventListener('tap', function(event) {
		//获取当前子页面
		var workersPage = plus.webview.currentWebview().children()[3];
		workersPage.evalJS("showDateOption();");
	}, false);


}

//消息页面
function messagePageEventListener() {
	
}

//关于页面
function aboutmePageEventListener() {
	
}
