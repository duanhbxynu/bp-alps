(function($, doc) {
	/*-----客户信息start------*/
	var customerPicker = new $.PopPicker();
	mui(".brand").on('tap', '.selIdType .idType', function() {
		var idtype = this;
		customerPicker.setData(idType);
		customerPicker.show(function(SelectedItem) {
			idtype.innerHTML = SelectedItem[0].text;
			idtype.setAttribute("data-value", SelectedItem[0].value);
		});
	});
	mui(".brand").on('tap','.selPayWay .payWay',function(){				
		customerPicker.setData(paymentMethodData);
		customerPicker.show(function(SelectedItem) {
			document.getElementsByClassName("payWay")[0].setAttribute("data-value",SelectedItem[0].text);
			document.getElementsByClassName("payWay")[0].innerHTML = SelectedItem[0].text;
		});
	});
	
	//选择订单类型
	document.getElementById('lineItemName').addEventListener('tap',function(){
		customerPicker.setData(orderType);
		customerPicker.show(function(SelectedItem) {
			document.getElementById('lineItemName').innerHTML = SelectedItem[0].text;
			document.getElementById('lineItemName').setAttribute("data-value",SelectedItem[0].text);
		});
	})
				
	
	var addressPicker = new $.PopPicker({
		layer: 3
	});
	mui(".brand").on('tap','.selAddress .address',function(){
		var addressElement = this;
		addressPicker.setData(provinceDataList3);
		addressPicker.show(function(items) {
			addressElement.innerHTML =(items[0] || {}).text + " "+(items[1] || {}).text + " "+(items[2] || {}).text;
			addressElement.setAttribute("data-provinceCode",(items[0] || {}).text);
			addressElement.setAttribute("data-cityCode",(items[1] || {}).value);
			addressElement.setAttribute("data-districtCode",(items[2] || {}).value);
//		    document.getElementsByClassName("address")[0].innerHTML =(items[0] || {}).text + " "+(items[1] || {}).text + " "+(items[2] || {}).text;
//			document.getElementsByClassName("address")[0].setAttribute("data-value",(items[0] || {}).value+(items[1] || {}).value+(items[2] || {}).value);
//			document.getElementsByClassName("address")[0].setAttribute("data-provinceCode",(items[0] || {}).text);
//			document.getElementsByClassName("address")[0].setAttribute("data-cityCode",(items[1] || {}).value);		
//			document.getElementsByClassName("address")[0].setAttribute("data-districtCode",(items[2] || {}).value);	
		});
	});
	
	
	/*-----客户信息end------*/
	//品牌
	var vehicleTypeCodePicker = new $.PopPicker();
	//车系
	var vehicleCategoryCodePicker = new $.PopPicker();

	mui(".brand").on('tap', '.selBrand .brands', function() {
		vehicleTypeCodePicker.setData(categoryList);
		vehicleTypeCodePicker.show(function(SelectedItem) {
			document.getElementsByClassName("brands")[0].innerHTML = SelectedItem[0].text;
			document.getElementsByClassName("brands")[0].setAttribute('data-vehicleBrand', SelectedItem[0].text);
			document.getElementsByClassName("brands")[0].setAttribute('data-vehicleBrandCode', SelectedItem[0].value);
			vehicleCategoryCodePicker.setData(SelectedItem[0].children);
		});
	}, false)
	//车系
	mui(".brand").on('tap', '.selseries .series', function() {
		vehicleCategoryCodePicker.show(function(SelectedItem) {
			document.getElementsByClassName("series")[0].innerHTML = SelectedItem[0].text;
			document.getElementsByClassName("series")[0].setAttribute("data-vehicleCategoryCode", SelectedItem[0].value);
			document.getElementsByClassName("series")[0].setAttribute("data-vehicleCategory", SelectedItem[0].text);
		});
	});

	//车型
	var vehicleCodePicker = new $.PopPicker();
	var outsideColorPicker = new $.PopPicker();
	var insideColorPicker = new $.PopPicker();

	mui(".brand").on('tap', '.selCarType .carType', function() {
		var categoryCode = document.getElementsByClassName("series")[0].getAttribute("data-vehicleCategoryCode");
		if(!categoryCode) {
			//TODO
			plus.nativeUI.toast("请选择车系");
			return;
		}
		var productData = [];
		mui.each(productList, function(i, product) {
			if(categoryCode == product.id) {
				console.log(product);
				productData.push(product);
				console.log(productData);
				vehicleCodePicker.setData(productData);
				return;
			}
		})

		vehicleCodePicker.show(function(SelectedItem) {
			document.getElementsByClassName("carType")[0].innerHTML = SelectedItem[0].text;
			document.getElementsByClassName("carType")[0].setAttribute("data-vehicleCode", SelectedItem[0].text);
			document.getElementsByClassName("carType")[0].setAttribute("data-vehicle", SelectedItem[0].value);
			outsideColorPicker.setData(SelectedItem[0].children);
			insideColorPicker.setData(SelectedItem[0].children);
		});
	});
	mui(".brand").on('tap', '.selOutColors .outColors', function() {
		outsideColorPicker.show(function(SelectedItem) {
			document.getElementsByClassName("outColors")[0].innerHTML = SelectedItem[0].text;
			document.getElementsByClassName("outColors")[0].setAttribute("data-value", SelectedItem[0].value);
		});
	});
	mui(".brand").on('tap', '.selInnerColors .innerColors', function() {
		insideColorPicker.show(function(SelectedItem) {
			document.getElementsByClassName("innerColors")[0].innerHTML = SelectedItem[0].text;
			document.getElementsByClassName("innerColors")[0].setAttribute("data-value", SelectedItem[0].value);
			document.getElementById("carPrice").value = SelectedItem[0].price;
		});
	});

	//选择预计交车时间
	mui(".predictTime").on('tap', '.selPreTime .preTime', function() {
		var dDate = new Date();
		this.picker = new $.DtPicker({
			type: "date", //设置日历初始视图模式 
			beginDate: new Date() //设置开始日期 
		});
		this.picker.show(function(rs) {
			document.getElementsByClassName("preTime")[0].value = rs.text;
			document.getElementsByClassName("preTime")[0].setAttribute("data-value", rs.value);
			this.picker = null;
		});
	});
	
	//金融类型
	var financePicker = new mui.PopPicker();
	mui(".brand").on('tap','.selFinanceType .financeType',function(){				
		financePicker.setData(financeType);
		financePicker.show(function(SelectedItem) {
			document.getElementsByClassName("financeType")[0].setAttribute("data-value",SelectedItem[0].text);
			document.getElementsByClassName("financeType")[0].innerHTML = SelectedItem[0].text;
		});
	});
	//金融期限
	mui(".brand").on('tap','.selFinanceCycle .financeCycle',function(){				
		financePicker.setData(financeCycle);
		financePicker.show(function(SelectedItem) {
			document.getElementsByClassName("financeCycle")[0].setAttribute("data-value",SelectedItem[0].text);
			document.getElementsByClassName("financeCycle")[0].innerHTML = SelectedItem[0].text;
		});
	});
	//金融机构
	mui(".brand").on('tap','.selFinanceCompany .financeCompany',function(){				
		financePicker.setData(financeCompany);
		financePicker.show(function(SelectedItem) {
			document.getElementsByClassName("financeCompany")[0].setAttribute("data-value",SelectedItem[0].text);
			document.getElementsByClassName("financeCompany")[0].innerHTML = SelectedItem[0].text;
		});
	});
	//起租日期
	mui(".guideMoney").on('tap', '.selFinanceStartTime .financeStartTime', function() {
		var dDate = new Date();
		this.picker = new $.DtPicker({
			type: "date", //设置日历初始视图模式 
			beginDate: new Date() //设置开始日期 
		});
		this.picker.show(function(rs) {
			document.getElementsByClassName("financeStartTime")[0].value = rs.text;
			document.getElementsByClassName("financeStartTime")[0].setAttribute("data-value", rs.value);
			this.picker = null;
		});
	});

}(mui, document));