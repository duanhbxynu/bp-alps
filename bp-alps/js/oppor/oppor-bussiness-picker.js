(function($, doc) {
	
	/*购车类型*/
	var purchaseTypeCodePicker = new $.PopPicker();
	purchaseTypeCodePicker.setData(purchaseTypeCodeData);

	/*预购日期*/
	var purchaseTimeTypeCodePicker = new $.PopPicker();
	purchaseTimeTypeCodePicker.setData(purchaseTimeTypeCodeData);

	/*意向级别*/
	var levelCodePicker = new $.PopPicker();
	levelCodePicker.setData(levelCodeData);

	/*购车预算*/
	var budgetPicker = new $.PopPicker();
	budgetPicker.setData(budgetData);

	/*付款方式*/
	var paymentMethodPicker = new $.PopPicker();
	paymentMethodPicker.setData(paymentMethodData);

	/*购车用途*/
	var purposePicker = new $.PopPicker();
	purposePicker.setData(purposeData);

	/*购车类型*/
	var purchaseTypeCodeButton = doc.getElementById('purchaseTypeCode');
	purchaseTypeCodeButton.addEventListener('tap', function(event) {
		purchaseTypeCodePicker.show(function(items) {
			purchaseTypeCodeButton.innerHTML = items[0].text;
			purchaseTypeCodeButton.setAttribute("data-value", items[0].value);
			
			//返回 false 可以阻止选择框的关闭
			//return false;
		});
	}, false);
	
	var purchaseTimeTypeCodeBtn = doc.getElementById('purchaseTimeTypeCode');
	purchaseTimeTypeCodeBtn.addEventListener('tap', function(event) {
		purchaseTimeTypeCodePicker.show(function(items) {
			purchaseTimeTypeCodeBtn.innerHTML = items[0].text;
			purchaseTimeTypeCodeBtn.setAttribute("data-value", items[0].value);
			//返回 false 可以阻止选择框的关闭
			//return false;
			
			mui.each(levelCodeData, function(i, levelCode) {
				
				if(items[0].value == levelCode.purchaseValue) {
					doc.getElementById('levelCode').innerHTML = levelCode.text;
					doc.getElementById('levelCode').setAttribute("data-value", levelCode.value);
					return;
				}
			})
		});
	}, false);
	/*意向级别*/
	var levelCodeButton = doc.getElementById('levelCode');
	levelCodeButton.addEventListener('tap', function(event) {
		levelCodePicker.show(function(items) {
			levelCodeButton.innerHTML = items[0].text;
			levelCodeButton.setAttribute("data-value", items[0].value);

			//						modelsPicker.setData(items[0]);

			//返回 false 可以阻止选择框的关闭
			//return false;
		});
	}, false);

	/*购车预算*/
	var budgetButton = doc.getElementById('budget');
	budgetButton.addEventListener('tap', function(event) {
		budgetPicker.show(function(items) {
			budgetButton.innerHTML = items[0].text;
			budgetButton.setAttribute("data-value", items[0].value);

			//返回 false 可以阻止选择框的关闭
			//return false;
		});

	}, false);

	/*付款方式*/
	var paymentMethodButton = doc.getElementById('paymentMethod');

	paymentMethodButton.addEventListener('tap', function(event) {
		paymentMethodPicker.show(function(items) {
			paymentMethodButton.innerHTML = items[0].text;
			paymentMethodButton.setAttribute("data-value", items[0].value);

		});
	}, false);
	/*购车用途*/
	var purposeButton = doc.getElementById('purpose');

	purposeButton.addEventListener('tap', function(event) {
		purposePicker.show(function(items) {
			purposeButton.innerHTML = items[0].text;
			purposeButton.setAttribute("data-value", items[0].value);

		});
	}, false);


//	purchaseTimeTypeCodeBtn.addEventListener('tap', function() {
//		var dDate = new Date();
////		dDate.setFullYear(dDate.getFullYear(), dDate.getMonth(), dDate.getDate());
//		/*
//		 * 首次显示时实例化组件
//		 * 示例为了简洁，将 options 放在了按钮的 dom 上
//		 * 也可以直接通过代码声明 optinos 用于实例化 DtPicker
//		 */
//
//		this.picker = new $.DtPicker({
//			type: "date", //设置日历初始视图模式 
//			beginDate: new Date() //设置开始日期 
//			//				    labels: ['Year', 'Mon', 'Day', 'Hour', 'min'],//设置默认标签区域提示语 
//			//				    customData: { 
//			//				        h: [
//			//				            { value: 'AM', text: 'AM' },
//			//				            { value: 'PM', text: 'PM' }
//			//				        ] 
//			//				    }//时间/日期别名 
//		});
//		this.picker.show(function(rs) {
//			/*
//			 * rs.value 拼合后的 value
//			 * rs.text 拼合后的 text
//			 * rs.y 年，可以通过 rs.y.value 和 rs.y.text 获取值和文本
//			 * rs.m 月，用法同年
//			 * rs.d 日，用法同年
//			 * rs.h 时，用法同年
//			 * rs.i 分（minutes 的第二个字母），用法同年
//			 */
//			purchaseTimeTypeCodeBtn.innerHTML = rs.text;
//			purchaseTimeTypeCodeBtn.setAttribute("data-value",rs.value )
//			/* 
//			 * 返回 false 可以阻止选择框的关闭
//			 * return false;
//			 */
//			/*
//			 * 释放组件资源，释放后将将不能再操作组件
//			 * 通常情况下，不需要示放组件，new DtPicker(options) 后，可以一直使用。
//			 * 当前示例，因为内容较多，如不进行资原释放，在某些设备上会较慢。
//			 * 所以每次用完便立即调用 dispose 进行释放，下次用时再创建新实例。
//			 */
////			this.picker.dispose();
//			this.picker = null;
//		});
//
//	})
	/*年份*/
	
	var licenseYearBtn = doc.getElementById('licenseYear');
	
	licenseYearBtn.addEventListener('tap', function() {
		
		var dData = new Date();
		var begin = (dData.getFullYear() - 50);
		console.log(begin);

		this.picker = new $.DtPicker({
			type: "year", //设置日历初始视图模式 ,
			beginYear: begin,
//			beginDate: new Date(dData.getFullYear() - 50),
			endDate: dData //设置开始日期 
		});
		console.log(this.picker);
		this.picker.show(function(rs) {
			licenseYearBtn.innerHTML = + rs.y.text;
			licenseYearBtn.setAttribute("data-value",rs.y.value);
//			this.picker.dispose();
			this.picker = null;
		});
		

	});
	
	//动态获取购车关注点
	var buyerPointBtnGroup = doc.body.querySelector('.buyerPoint-btn-group');
	$.each(buyPointGroup, function(i, buyPoint) {
		var buyerPointbtn = doc.createElement('button');
		buyerPointbtn.className = 'mui-btn mui-btn-outlined';
		buyerPointbtn.setAttribute("data-value", buyPoint.value);
		buyerPointbtn.setAttribute("name", "buyerPoint");
		buyerPointbtn.innerText = buyPoint.text;
		buyerPointBtnGroup.appendChild(buyerPointbtn);
	})
	
	//动态获取服务需求
	var servicesTypesBtnGroup = doc.body.querySelector('.servicesTypes-btn-group');
	$.each(servicesTypesGroup, function(i, servicesTypes) {
		var servicesTypesbtn = doc.createElement('button');
		servicesTypesbtn.className = 'mui-btn mui-btn-outlined';
		servicesTypesbtn.setAttribute("data-value", servicesTypes.value);
		servicesTypesbtn.setAttribute("name", "buyerPoint");
		servicesTypesbtn.innerText = servicesTypes.text;
		servicesTypesBtnGroup.appendChild(servicesTypesbtn);
	})
	
	//购车关注点监听事件,服务需求监听事件
	$('.buyerPoint-btn-group,.servicesTypes-btn-group').on('tap','button',function(e){
		this.classList.add('mui-btn-outlined-active');
	})
	
	
	

}(mui, document));