	if(!localStorage.getItem('$state')) {
		plus.nativeUI.toast('登陆过期，请重新登陆！');
		common.baseOption.goToLogin();
	}
	var token = JSON.parse(localStorage.getItem('$state')).token;
	var searchAResultPicker = new mui.PopPicker();
	var mask = mui.createMask(); //callback为用户点击蒙版时自动执行的回调；
	var count = 0;
	mui('.mui-search').on('tap', '.mui-icon-plus-filled', function() {
		var searchText = this.parentNode.getElementsByTagName('input')[0].value;
		var categoryCode = this.parentNode.getElementsByTagName('input')[0].getAttribute('data-categoryCode');
		var productType = this.parentNode.getElementsByTagName('input')[0].getAttribute('data-productType');
		var values = {
			currentPage: 0,
			pagesize: 2000,
			categoryCode: categoryCode,
			searchText: searchText
		};
		console.log("product list request:" + JSON.stringify(values));
		mui.ajax({
			url: serviceBaseUrl + "alpssalewebservices/product/list",
			type: "POST",
			dataType: "json",
			contentType: 'application/json',
			data: JSON.stringify(values),
			beforeSend: function(xhr) {
				xhr.setRequestHeader("Authorization", "Bearer " + token);
			},
			success: function(data) {
				console.log("product list result:" + JSON.stringify(data));
				console.log("--------------------------------------------------------------");
				//							var box = $("#"+productType+"SearchA").parent();
				if(data.success == true) {
					console.log("product list result:" + data.productList);
					
					var productView = template(productType+'-template', {
							"productList": data.productList
						});
					document.getElementById(productType+'-comment').innerHTML = productView;
//					var pickerData = [];
//					mui.each(data.productList, function(i, product) {
//						console.log(product);
//						var pickerObject = {};
//						pickerObject.value = product.code;
//						pickerObject.text = product.name + "&nbsp;&nbsp;" + product.price;
//						pickerObject.productName = product.name;
//						pickerObject.productPrice = product.price;
//						pickerData.push(pickerObject);
//					})
//					console.log(pickerData);
//					searchAResultPicker.setData(pickerData);
//					searchAResultPicker.show(function(items) {
//						console.log(items[0]);
//						
//						if(produceType == 'optionalProduct' || produceType == 'upholsteryProduct' || produceType == "extendedWarrantyProduct"){
//							//原厂选装  装潢
//							document.getElementById("produce_code").innerHTML = "产品编号&nbsp;&nbsp;" + items[0].value;
//							document.getElementById("produce_code").setAttribute('value',items[0].value);
//							document.getElementById("produce_name").innerHTML = items[0].productName;
//							document.getElementById("produce_price").innerHTML = items[0].productPrice + '元';
//							document.getElementById("modal").classList.add('mui-active');
//							document.getElementById("modal").setAttribute('style', 'min-height: auto;');
//							document.getElementById("modal").setAttribute('data-productType', produceType);
//							mask.show(); //显示遮罩
//						}else if(produceType == 'insuranceProduct'){
//							//保险
//							
//						}else if(produceType == 'coupon'){
//							
//						}
						
	
						
						//									$('#modal').popover('show');
						//									userResult.innerText = JSON.stringify(items[0]);
						//返回 false 可以阻止选择框的关闭
						//return false;
//					});
					//								$(".content",box).html("");
					//								var num = 0;
					//								$.each(data.productList,function(i,product){
					//									addEntryOptionBox(productType, product, num, false);
					//									num++;
					//								})
					//								$("input[name='"+productType+"[].code']").change(function(){
					//									$("input[name='"+productType+"[].price']").val($(this).attr("priceData"));
					//								})
				}
			},
			error: function(jqXHR, textStatus, errorThrown) {
				location.href = baseConfig.baseUrl + baseConfig.login_page;
			}
		})
	
	})
	document.getElementById('btn_modal_save').addEventListener('tap', function() {
		document.getElementById("modal").classList.remove('mui-active');
		document.getElementById("modal").setAttribute('style', '');
		mask.close();
		var produceCode = document.getElementById("produce_code").getAttribute('value');
		var produceType = document.getElementById("modal").getAttribute('data-productType');
		console.log(produceType);
		var collapseCardList = document.getElementById(produceType+'ResultList');
		console.log(collapseCardList);
		var collapseCard = document.createElement('div');
		collapseCard.classList = 'mui-card mui-clearfix original-list-card';
		collapseCard.setAttribute('id',produceCode+"collapseCard");
		collapseCard.innerHTML ='<div class="mui-card-header">'+
								 	'<label id="produce_code">产品编号  '+produceCode+'</label>'+
									'<i data-iconCode='+produceCode+' class="mui-icon mui-icon-trash mui-pull-right"></i>'+
								'</div>'+
								'<div class="mui-card-content">'+
									'<ul class="mui-table-view mui-clearfix">'+
										'<li class="mui-table-view-cell">'+
											'<label>产品描述</label>'+
											'<var id="card_produce_name">产品描述</var>'+
										'</li>'+
										'<li class="mui-table-view-cell">'+
											'<label>参考价格</label>'+
											'<var id="card_produce_price">参考价格</var>'+
										'</li>'+
										'<li class="mui-table-view-cell">'+
											'<label>销售价格</label>'+
											'<var id="card_sale_price">参考价格</var>'+
										'</li>'+
										'<li class="mui-table-view-cell">'+
											'<label>数量</label>'+
											'<var id="card_sale_price">参考价格</var>'+
										'</li>'+
										'<li class="mui-table-view-cell">'+
											'<label>备注</label>'+
											'<textarea id="card_produce_textarea" ></textarea>'+
										'</li>'+
									'</ul>'+
								'</div>';
		collapseCardList.appendChild(collapseCard);		
		deleCard();
	//	document.getElementById("produce_code").innerHTML;
	//	document.getElementById("produce_name").innerHTML;
	//	document.getElementById("produce_price").innerHTML;
	})
	function deleCard(){
		mui('.original-list-card').on('tap','.mui-icon-trash',function(){
		
		var produceCode = this.getAttribute('data-iconCode');
		console.log(produceCode);
		var collapseCard = document.getElementById(produceCode+'collapseCard');
		var parent=collapseCard.parentNode;
		console.log(parent);
		parent.removeChild(collapseCard);
	})
	
	}
	
