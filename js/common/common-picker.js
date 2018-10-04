(function($,doc) {
	//品牌
	var vehicleTypeCodePicker = new $.PopPicker();
	//车系
	var vehicleCategoryCodePicker = new $.PopPicker();
	//品牌
	mui('.car').on('tap','.vehicleBrand',function(){
		var vehicleBrand = this;
		vehicleTypeCodePicker.setData(categoryList);
		vehicleTypeCodePicker.show(function(SelectedItem) {
			vehicleBrand.innerHTML = SelectedItem[0].text;
			vehicleBrand.setAttribute('data-text', SelectedItem[0].text);
			vehicleBrand.setAttribute('data-value', SelectedItem[0].value);
			vehicleCategoryCodePicker.setData(SelectedItem[0].children);
		});
	}, false)
	//车系
	mui('.car').on('tap','.vehicleCategory', function() {
		var vehicleCategory = this;
		vehicleCategoryCodePicker.show(function(SelectedItem) {
			vehicleCategory.innerHTML = SelectedItem[0].text;
			vehicleCategory.setAttribute("data-text", SelectedItem[0].text);
			vehicleCategory.setAttribute("data-value", SelectedItem[0].value);
		});
	});

	//车型
	var vehicleCodePicker = new $.PopPicker();
	var outsideColorPicker = new $.PopPicker();
	var insideColorPicker = new $.PopPicker();

	mui('.car').on('tap','.vehicle', function() {
		var vehicle = this;
		var categoryCode = document.getElementById('vehicleCategoryCode').getAttribute("data-value");
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
			vehicle.innerHTML = SelectedItem[0].text;
			vehicle.setAttribute("data-text", SelectedItem[0].text);
			vehicle.setAttribute("data-value", SelectedItem[0].value);
			outsideColorPicker.setData(SelectedItem[0].children);
			insideColorPicker.setData(SelectedItem[0].children);
		});
	});
	
	mui(".car").on('tap', '.outColors', function() {
		var outColors = this;
		var vehicleCode = document.getElementById('vehicleCode').getAttribute("data-value");
		if(!vehicleCode) {
			//TODO
			plus.nativeUI.toast("请选择车型");
			return;
		}
		outsideColorPicker.show(function(SelectedItem) {
			outColors.innerHTML = SelectedItem[0].text;
			outColors.setAttribute("data-text", SelectedItem[0].text);
			outColors.setAttribute("data-value", SelectedItem[0].value);
		});
	});
	mui(".car").on('tap', '.innerColors', function() {
		var innerColors = this;
		insideColorPicker.show(function(SelectedItem) {
			innerColors.innerHTML = SelectedItem[0].text;
			innerColors.setAttribute("data-text", SelectedItem[0].text);
			innerColors.setAttribute("data-value", SelectedItem[0].value);
			document.getElementById("carPrice").value = SelectedItem[0].price;
		});
	});
	
	//联系地址
	var addressPicker = new $.PopPicker({
		layer: 3
	});
	mui(".mui-select-row").on('tap', '.address', function() {	
		var showAddressPicker = this;	
		addressPicker.setData(provinceDataList3);
		addressPicker.show(function(items) {
			showAddressPicker.innerHTML =(items[0] || {}).text + " "+(items[1] || {}).text + " "+(items[2] || {}).text;
			showAddressPicker.setAttribute("data-value",(items[0] || {}).text+(items[1] || {}).value+(items[2] || {}).value);
			showAddressPicker.setAttribute("data-provinceCode",(items[0] || {}).text);
			showAddressPicker.setAttribute("data-cityCode",(items[1] || {}).value);
			showAddressPicker.setAttribute("data-districtCode",(items[1] || {}).value);
		});
	}, false);
			
	var idTypePick = new $.PopPicker();
	mui(".mui-select-row").on('tap', '.idType', function() {				
	
		var showIdTypePicker = this;
		idTypePick.setData(idType);
		idTypePick.show(function(items) {
			showIdTypePicker.innerHTML =(items[0] || {}).text ;
			showIdTypePicker.setAttribute("data-text",(items[0] || {}).text);
			showIdTypePicker.setAttribute("data-value",(items[0] || {}).value);
		});
	}, false);
	
	var pickers = new $.PopPicker();
	/*购车类型*/
	mui(".mui-select-row").on('tap', '.purchaseType', function() {				
	
		var picker = this;
		pickers.setData(purchaseTypeCodeData);
		pickers.show(function(items) {
			picker.innerHTML =(items[0] || {}).text ;
			picker.setAttribute("data-text",(items[0] || {}).text);
			picker.setAttribute("data-value",(items[0] || {}).value);
		});
	}, false);
	
	/*预购日期*/
	mui(".mui-select-row").on('tap', '.purchaseTime', function() {				
		
		var picker = this;
		pickers.setData(purchaseTimeTypeCodeData);
		pickers.show(function(items) {
			picker.innerHTML =(items[0] || {}).text ;
			picker.setAttribute("data-text",(items[0] || {}).text);
			picker.setAttribute("data-value",(items[0] || {}).value);
			mui.each(levelCodeData, function(i, levelCode) {
				
				if(items[0].value == levelCode.purchaseValue) {
					doc.getElementById('levelCode').innerHTML = levelCode.text;
					doc.getElementById('levelCode').setAttribute("data-text", levelCode.text);
					doc.getElementById('levelCode').setAttribute("data-value", levelCode.value);
					return;
				}
			})
		});
	}, false);
	
	/*意向级别*/
	mui(".mui-select-row").on('tap', '.level', function() {				
	
		var picker = this;
		pickers.setData(levelCodeData);
		pickers.show(function(items) {
			picker.innerHTML =(items[0] || {}).text ;
			picker.setAttribute("data-text",(items[0] || {}).text);
			picker.setAttribute("data-value",(items[0] || {}).value);
		});
	}, false);

	/*购车预算*/
	mui(".mui-select-row").on('tap', '.budget', function() {				
		
		var picker = this;
		pickers.setData(budgetData);
		pickers.show(function(items) {
			picker.innerHTML =(items[0] || {}).text ;
			picker.setAttribute("data-text",(items[0] || {}).text);
			picker.setAttribute("data-value",(items[0] || {}).value);
		});
	}, false);

	/*付款方式*/
	mui(".mui-select-row").on('tap', '.paymentMethod', function() {				
		
		var picker = this;
		pickers.setData(paymentMethodData);
		pickers.show(function(items) {
			picker.innerHTML =(items[0] || {}).text ;
			picker.setAttribute("data-text",(items[0] || {}).text);
			picker.setAttribute("data-value",(items[0] || {}).value);
		});
	}, false);

	/*购车用途*/
	mui(".mui-select-row").on('tap', '.purpose', function() {				
		
		var picker = this;
		pickers.setData(purposeData);
		pickers.show(function(items) {
			picker.innerHTML =(items[0] || {}).text ;
			picker.setAttribute("data-text",(items[0] || {}).text);
			picker.setAttribute("data-value",(items[0] || {}).value);
		});
	}, false);
	
	
	//所属行业
	mui(".mui-select-row").on('tap', '.industry', function() {	
		
		var picker = this;
		pickers.setData(industryData);
		pickers.show(function(items) {
			picker.innerHTML = items[0].text;
			picker.setAttribute('data-value',items[0].text);
			picker.setAttribute('data-value',items[0].value);

			//返回 false 可以阻止选择框的关闭
			//return false;
		});
	})
	/*学历*/
	mui(".mui-select-row").on('tap', '.education', function() {	
		var picker = this;
		pickers.setData(educationData);
		pickers.show(function(items) {
			picker.innerHTML = items[0].text;
			picker.setAttribute('data-value',items[0].text);
			picker.setAttribute('data-value',items[0].value);

			//返回 false 可以阻止选择框的关闭
			//return false;
		});
	})
	/*工作类型*/
	mui(".mui-select-row").on('tap', '.workType', function() {	
		var picker = this;
		pickers.setData(workTypeData);
		pickers.show(function(items) {
			picker.innerHTML = items[0].text;
			picker.setAttribute('data-value',items[0].text);
			picker.setAttribute('data-value',items[0].value);

			//返回 false 可以阻止选择框的关闭
			//return false;
		});
	})
		
	/*婚姻状况*/
	mui(".mui-select-row").on('tap', '.maritalStatus', function() {	
		var picker = this;
		pickers.setData(maritalStatusData);
		pickers.show(function(items) {
			picker.innerHTML = items[0].text;
			picker.setAttribute('data-value',items[0].text);
			picker.setAttribute('data-value',items[0].value);

			//返回 false 可以阻止选择框的关闭
			//return false;
		});
	})
	/*子女数量*/
	mui(".mui-select-row").on('tap', '.numberOfChildren', function() {	
		var picker = this;
		pickers.setData(numberOfChildrenData);
		pickers.show(function(items) {
			picker.innerHTML = items[0].text;
			picker.setAttribute('data-value',items[0].text);
			picker.setAttribute('data-value',items[0].value);

			//返回 false 可以阻止选择框的关闭
			//return false;
		});
	})
	/*家庭成员数量*/
	mui(".mui-select-row").on('tap', '.numberOfFamily', function() {	
		var picker = this;
		pickers.setData(numberOfFamilyData);
		pickers.show(function(items) {
			picker.innerHTML = items[0].text;
			picker.setAttribute('data-value',items[0].text);
			picker.setAttribute('data-value',items[0].value);

			//返回 false 可以阻止选择框的关闭
			//return false;
		});
	})
	/*个人年收入*/
	/*家庭年收入*/
	var incomePicker = new $.PopPicker();
	$('.income').on('tap','.mui-select',function(){
		console.log(this);
		var income = this;
		incomePicker.setData(incomeData);
		incomePicker.show(function(items) {
			income.innerHTML = items[0].text;
			income.setAttribute('data-value',items[0].value);
			income.setAttribute('data-text',items[0].text);
			//返回 false 可以阻止选择框的关闭
			//return false;
		});
	})
	
	
	/*年份*/
	mui(".mui-select-row").on('tap', '.year', function() {
		var yearPick = this;
		var dData = new Date();
		var begin = (dData.getFullYear() - 50);
		console.log(begin);

		this.picker = new $.DtPicker({
			type: "year", //设置日历初始视图模式 ,
			beginYear: begin,
			endDate: dData //设置开始日期 
		});
		console.log(this.picker);
		this.picker.show(function(rs) {
			yearPick.innerHTML = + rs.y.text;
			yearPick.setAttribute("data-text",rs.y.text);
			yearPick.setAttribute("data-value",rs.y.value);
//			this.picker.dispose();
			this.picker = null;
		});
		

	});
	
	//date 年月日
	
	mui(".mui-select-row").on('tap', '.date', function() {
		var datePick = this;
		var dData = new Date();

		this.picker = new $.DtPicker({
			type: "date", //设置日历初始视图模式 ,
			beginDate: new Date()
		});
		this.picker.show(function(rs) {
			datePick.setAttribute("data-text",rs.text);
			datePick.setAttribute("data-value",rs.value);
			datePick.value = rs.text;
				
//			this.picker.dispose();
			this.picker = null;
		});
		

	});
	
	

}(mui,document));