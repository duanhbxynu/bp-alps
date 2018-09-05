(function($, doc) {
	//所属行业
	
	var industryPicker = new $.PopPicker();
	industryPicker.setData(industryData);
	doc.getElementById('industry').addEventListener('tap',function(){
		industryPicker.show(function(items) {
			doc.getElementById('industry').innerHTML = items[0].text;
			doc.getElementById('industry').setAttribute('data-value',items[0].value);

			//返回 false 可以阻止选择框的关闭
			//return false;
		});
	})
	/*学历*/
	var educationPicker = new $.PopPicker();
	educationPicker.setData(educationData);
	doc.getElementById('education').addEventListener('tap',function(){
		educationPicker.show(function(items) {
			doc.getElementById('education').innerHTML = items[0].text;
			doc.getElementById('education').setAttribute('data-value',items[0].value);

			//返回 false 可以阻止选择框的关闭
			//return false;
		});
	})
	/*工作类型*/
	var workTypePicker = new $.PopPicker();
	workTypePicker.setData(workTypeData);
	doc.getElementById('workType').addEventListener('tap',function(){
		workTypePicker.show(function(items) {
			doc.getElementById('workType').innerHTML = items[0].text;
			doc.getElementById('workType').setAttribute('data-value',items[0].value);

			//返回 false 可以阻止选择框的关闭
			//return false;
		});
	})
	/*婚姻状况*/
	var maritalStatusPicker = new $.PopPicker();
	maritalStatusPicker.setData(maritalStatusData);
	doc.getElementById('maritalStatus').addEventListener('tap',function(){
		maritalStatusPicker.show(function(items) {
			doc.getElementById('maritalStatus').innerHTML = items[0].text;
			doc.getElementById('maritalStatus').setAttribute('data-value',items[0].value);

			//返回 false 可以阻止选择框的关闭
			//return false;
		});
	})
	/*子女数量*/
	var numberOfChildrenPicker = new $.PopPicker();
	numberOfChildrenPicker.setData(numberOfChildrenData);
	doc.getElementById('numberOfChildren').addEventListener('tap',function(){
		numberOfChildrenPicker.show(function(items) {
			doc.getElementById('numberOfChildren').innerHTML = items[0].text;
			doc.getElementById('numberOfChildren').setAttribute('data-value',items[0].value);

			//返回 false 可以阻止选择框的关闭
			//return false;
		});
	})
	/*家庭成员数量*/
	var numberOfFamilyPicker = new $.PopPicker();
	numberOfFamilyPicker.setData(numberOfFamilyData);
	doc.getElementById('numberOfFamily').addEventListener('tap',function(){
		numberOfFamilyPicker.show(function(items) {
			doc.getElementById('numberOfFamily').innerHTML = items[0].text;
			doc.getElementById('numberOfFamily').setAttribute('data-value',items[0].value);

			//返回 false 可以阻止选择框的关闭
			//return false;
		});
	})
	/*个人年收入*/
	/*家庭年收入*/
	var incomePicker = new $.PopPicker();
	incomePicker.setData(incomeData);
	$('.income').on('tap','.mui-select',function(){
		console.log(this);
		var income = this;
		incomePicker.show(function(items) {
			income.innerHTML = items[0].text;
			income.setAttribute('data-value',items[0].value);

			//返回 false 可以阻止选择框的关闭
			//return false;
		});
	})
	
//	//动态获取婚姻状况
//	var maritalStatusBtnGroup = doc.body.querySelector('.maritalStatus-btn-group');
//	$.each(maritalStatusData, function(i, maritalStatus) {
//		var maritalStatusBtn = doc.createElement('button');
//		maritalStatusBtn.className = 'mui-btn mui-btn-outlined';
//		maritalStatusBtn.setAttribute("data-value", maritalStatus.value);
//		maritalStatusBtn.setAttribute("name", "maritalStatus");
//		maritalStatusBtn.innerText = maritalStatus.text;
//		maritalStatusBtnGroup.appendChild(maritalStatusBtn);
//	})
//	//动态获取家庭成员数量
//	var numberOfFamilyBtnGroup = doc.body.querySelector('.numberOfFamily-btn-group');
//	$.each(numberOfFamilyData, function(i, numberOfFamily) {
//		var numberOfFamilyBtn = doc.createElement('button');
//		numberOfFamilyBtn.className = 'mui-btn mui-btn-outlined';
//		numberOfFamilyBtn.setAttribute("data-value", numberOfFamily.value);
//		numberOfFamilyBtn.setAttribute("name", "numberOfFamily");
//		numberOfFamilyBtn.innerText = numberOfFamily.text;
//		numberOfFamilyBtnGroup.appendChild(numberOfFamilyBtn);
//	})
//	//动态获取子女数量
//	var numberOfChildrenBtnGroup = doc.body.querySelector('.numberOfChildren-btn-group');
//	$.each(numberOfChildrenData, function(i, numberOfChildren) {
//		var numberOfChildrenBtn = doc.createElement('button');
//		numberOfChildrenBtn.className = 'mui-btn mui-btn-outlined';
//		numberOfChildrenBtn.setAttribute("data-value", numberOfChildren.value);
//		numberOfChildrenBtn.setAttribute("name", "numberOfChildren");
//		numberOfChildrenBtn.innerText = numberOfChildren.text;
//		numberOfChildrenBtnGroup.appendChild(numberOfChildrenBtn);
//	})
//	
	
	
	

}(mui, document));