(function($, doc) {
	
	//品牌
	var vehicleTypeCodePicker = new $.PopPicker();
	//车系
	var vehicleCategoryCodePicker = new $.PopPicker();

	
	mui(".brand").on('tap','.selBrand .brands',function(){
		vehicleTypeCodePicker.setData(categoryList);
		vehicleTypeCodePicker.show(function(SelectedItem) {
			document.getElementsByClassName("brands")[0].innerHTML = SelectedItem[0].text;
			document.getElementsByClassName("brands")[0].setAttribute('data-value',SelectedItem[0].value);
			vehicleCategoryCodePicker.setData(SelectedItem[0].children);
		});
	},false)
	//车系
	mui(".brand").on('tap','.selseries .series',function(){				
		vehicleCategoryCodePicker.show(function(SelectedItem) {
			document.getElementsByClassName("series")[0].innerHTML = SelectedItem[0].text;
			document.getElementsByClassName("series")[0].setAttribute("data-value", SelectedItem[0].value);
		});
	});
	
	//车型
	var vehicleCodePicker = new $.PopPicker();
	var outsideColorPicker = new $.PopPicker();
	var insideColorPicker = new $.PopPicker();
	
	mui(".brand").on('tap','.selCarType .carType',function(){		
		var categoryCode = document.getElementsByClassName("series")[0].getAttribute("data-value");
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
			document.getElementsByClassName("carType")[0].setAttribute("data-value", SelectedItem[0].value);
			outsideColorPicker.setData(SelectedItem[0].children);
			insideColorPicker.setData(SelectedItem[0].children);
		});
	});
	mui(".brand").on('tap','.selOutColors .outColors',function(){				
		outsideColorPicker.show(function(SelectedItem) {
			document.getElementsByClassName("outColors")[0].innerHTML = SelectedItem[0].text;
			document.getElementsByClassName("outColors")[0].setAttribute("data-value", SelectedItem[0].value);
		});
	});
	mui(".brand").on('tap','.selInnerColors .innerColors',function(){				
		insideColorPicker.show(function(SelectedItem) {
			document.getElementsByClassName("innerColors")[0].innerHTML = SelectedItem[0].text;
			document.getElementsByClassName("innerColors")[0].setAttribute("data-value", SelectedItem[0].value);
		});
	});

}(mui, document));