var tempLength;
function getoptionalListLength(){
    return tempLength;
}


$(function () {

    //获取存储数据，并且转换成对象
    var arr = [];
    var myLocalStorageOption = {
        tableList: [],
    };

    if ($("#optionalListforeachID").val()) {
        myLocalStorageOption.tableList = $("#optionalListforeachID").val();
    }

    function getDataOption() {
        if (myLocalStorageOption.tableList == undefined) {
            arr = [];
            tempLength=0;
        } else {
            if (myLocalStorageOption.tableList && myLocalStorageOption.tableList.length > 0) {
                arr = JSON.parse(myLocalStorageOption.tableList);
            }
            tempLength=arr.length;
        }
        return arr;
    }

//把数据存到本地存储，并且转换成字符串格式的JSON
    function saveDataOption(data) {
        myLocalStorageOption.tableList = JSON.stringify(data);
    }

//增加行方法

    function addOption() {
        var optionalPackageTab = $("#optionalPackageTab");
        var data = getDataOption();
        $.each(data, function (i, v) {
            var tr = $("<tr class='optionalPackage'></tr>");
            if(!v.name){
                v.name="";
            };
            if(!v.basePrice){
                v.basePrice="";
            };
            if(!v.salePrice){
                v.salePrice="";
            };
            /*if(!v.discount){
                v.discount="0";
            };*/
            // if(v.name && v.name.length>0 && v.name.split("<") && v.name.split("<").length>1){

            var name=(v.name+"");
            var canUpdate = true;
            var vehicleStatus = $("#vehicleStatus").val();
            if( vehicleStatus=='ALLOCATED' || vehicleStatus=='STAY_OUTGOING' || vehicleStatus=='OUTGOING' || vehicleStatus=='STAY_DELIVERY_CAR' || vehicleStatus=='DELIVERY_CAR'){
            	canUpdate = false;
            }
            var td1 = $("<td contenteditable='"+canUpdate+"' name='name' data-role='name' class='inputTd nameInputClass'>" + name + "</td>");
            td1.empty();
            td1.text(name);
            td1.append("<input type='hidden' class='optionalHidden' name='optionalPackageList[" + i + "].name' value='" + name + "'/>");
            var basePrice=(v.basePrice+"");
            var td2 = $("<td contenteditable='"+canUpdate+"' name='basePrice' data-role='basePrice' class='inputTd keydowns onblur' onkeydown='editEnter(event)'>" + basePrice + "</td>");
            td2.empty();
            td2.text(basePrice);
            td2.append("<input type='hidden'  class='optionalHidden' name='optionalPackageList[" + i + "].basePrice' value='" + basePrice + "'/>");
            var salePrice=(v.salePrice+"");
            var td3 = $("<td contenteditable='"+canUpdate+"' name='salePrice' data-role='salePrice' class='inputTd keydowns onblur' onkeydown='editEnter(event)'>" + salePrice + "</td>");
            td3.empty();
            td3.text(salePrice);
            td3.append("<input type='hidden'  class='optionalHidden' name='optionalPackageList[" + i + "].salePrice' value='" + salePrice + "'/>");
            var discount=(v.discount+"");
            var td4 = $("<td contenteditable='false' name='discount' data-role='discount' class='inputTd keydowns' >" + discount + "</td>");
            td4.empty();
            td4.text(discount);
            td4.append("<input type='hidden' class='optionalHidden' name='optionalPackageList[" + i + "].discount' value='" + discount + "'/>");

            td4.append("<input type='hidden' name='optionalPackageList[" + i + "].paramtype' value='O01'>");
            td4.append("<input type='hidden' name='optionalPackageList[" + i + "].paramterclass' value='O'>");
            if(v.code){
                td4.append("<input type='hidden' name='optionalPackageList[" + i + "].code' value='"+v.code+"'>");
            }
            
            var td5;
            if(canUpdate){
            	var td5 = $("<td><button class='btn btn-dangeroptional' style='color: #ffffff !important;\n" +
                        "    background-color: #428bca;\n" +
                        "    border-color: #428bca;'>删除</button></td>");
            }else{
            	td5 = $("<td></td>");
            }
            tr.attr("index", i).append(td1).append(td2).append(td3).append(td4).append(td5);
            optionalPackageTab.append(tr);

            // }else{
            //         var name=v.name;
            //         var td1 = $("<td contenteditable='true' data-role='name' class='inputTd'>" + name + "</td>");
            //         td1.empty();
            //         td1.text(name);
            //         td1.append("<input type='hidden' class='optionalHidden' name='optionalPackageList[" + i + "].name' value='" + name + "'/>");
            //         var basePrice=v.basePrice;
            //         var td2 = $("<td contenteditable='true' data-role='basePrice' class='inputTd'>" + basePrice + "</td>");
            //         td2.empty();
            //         td2.text(basePrice);
            //         td2.append("<input type='hidden' class='optionalHidden' name='optionalPackageList[" + i + "].basePrice' value='" + basePrice + "'/>");
            //         var salePrice=v.salePrice;
            //         var td3 = $("<td contenteditable='true' data-role='salePrice' class='inputTd'>" + salePrice + "</td>");
            //         td3.empty();
            //         td3.text(salePrice);
            //         td3.append("<input type='hidden' class='optionalHidden' name='optionalPackageList[" + i + "].salePrice' value='" + salePrice + "'/>");
            //         var discount=v.discount;
            //         var td4 = $("<td contenteditable='true' data-role='discount' class='inputTd'>" + discount + "</td>");
            //         td4.empty();
            //         td4.text(discount);
            //         td4.append("<input type='hidden' class='optionalHidden' name='optionalPackageList[" + i + "].discount' value='" + discount + "'/>");
            //
            //         td4.append("<input type='hidden' name='optionalPackageList[" + i + "].paramtype' value='O01'>");
            //         td4.append("<input type='hidden' name='optionalPackageList[" + i + "].paramterclass' value='O'>");
            //         if(v.code){
            //             td4.append("<input type='hidden' name='optionalPackageList[" + i + "].code' value='"+v.code+"'>");
            //         }
            //         var td5 = $("<td><button type='button' class='btn btn-danger btn-sm2'>删除</button></td>");
            //         tr.attr("index", i).append(td1).append(td2).append(td3).append(td4).append(td5);
            //         optionalPackageTab.append(tr);
            // }

        });
        saveDataOption(data);
    }
    addOption();

    $("#optionalPackageTab").on("input", ".inputTd", function (e) {
        $(this).children("input[class='optionalHidden']").val($(this).text().trim());
        if($(this).attr("name")=='basePrice'){
            try{
                cardsTrial();
            }catch (e){}
        }
    });
//点击增加按钮事件

    $("#optionalPackageAdd").click(function () {

        var data = getDataOption();
        data.push({"name": "", "basePrice": "", "salePrice": "", "discount": ""});
        saveDataOption(data);
        $("tr[class='optionalPackage']").remove();//每次增加行前删除前面的行，否则会重复增加
        addOption();
    });

//删除行方法，事件委派，根据当前点击的按钮的行的索引值
    $('#optionalPackageTab').on('click', '.btn-dangeroptional', function () {
        var data = getDataOption();
        var index = $(this).parent().parent().attr("index");
        data.splice(index, 1);
        saveDataOption(data);
        $("tr[class='optionalPackage']").remove();//每次增加行前删除前面的行，否则会重复增加
        addOption();
        try{
            cardsTrial();
        }catch (e){}
    });


//可编辑效果 contenteditable='true'
    $('#optionalPackageTab').on('blur', '[contenteditable="true"]', function () {

        var data = getDataOption();
        var index = $(this).parent().attr('index');
        var val = $(this).text();
        var attr = $(this).attr('data-role');
        data[index][attr] = val;

        var temp = $(this);
        if(temp.attr("name")!="name"){
            var txt = temp.text();
            if(isNaN(Number(txt))) {
                parent.layer.open({
                    title: '【ECM消息提示】',
                    content: '请输入数字！',
                    icon: 0
                });
                temp.text("");
            }

            if(temp.attr("name")=="basePrice"){
                var salePrice= temp.next();
                var discount=salePrice.next();
                var salePriceVal=salePrice.text();
                var discountVal=txt-salePriceVal;
                if(txt){
                    discount.text(discountVal);
                    data[index]["discount"] = discountVal;
                }else{
                    discount.text(0);
                    data[index][""] = "0";
                }
                discount.append("<input type='hidden' name='optionalPackageList[" + index + "].paramtype' value='O01'>");
                discount.append("<input type='hidden' name='optionalPackageList[" + index + "].paramterclass' value='O'>");
                discount.append("<input type='hidden' name='optionalPackageList[" + index + "].discount' value='"+discountVal+"'>");
                if(data[index].code){
                	discount.append("<input type='hidden' name='optionalPackageList[" + index + "].code' value='"+data[index].code+"'>");
                }
            }

            if(temp.attr("name")=="salePrice"){
                var basePrice= temp.prev();
                var discount=temp.next();
                var basePriceVal=basePrice.text();
                var discountVal=basePriceVal-txt;
                if(basePriceVal){
                    discount.text(discountVal);
                    data[index]["discount"] = discountVal;
                }else {
                    discount.text(0);
                    data[index][""] = "0";
                }
                discount.append("<input type='hidden' name='optionalPackageList[" + index + "].paramtype' value='O01'>");
                discount.append("<input type='hidden' name='optionalPackageList[" + index + "].paramterclass' value='O'>");
                discount.append("<input type='hidden' name='optionalPackageList[" + index + "].discount' value='"+discountVal+"'>");
                if(data[index].code){
                	discount.append("<input type='hidden' name='optionalPackageList[" + index + "].code' value='"+data[index].code+"'>");
                }
            }
        }

        saveDataOption(data);
    });


    $("#vehicleBrand").change(function () {
        myLocalStorageOption.tableList =[];
        arr = [];
        saveDataOption();
    });
    $("#vehicleSerie").change(function () {
        myLocalStorageOption.tableList =[];
        arr = [];
        saveDataOption();
    });
    $("#vehicleType").change(function () {
        myLocalStorageOption.tableList =[];
        arr = [];
        saveDataOption();
    });
    $("#vinno").change(function () {
        myLocalStorageOption.tableList =[];
        arr = [];
        saveDataOption();
    });
});


//禁止表格内填写数字时按enter不换行和只能输入数字
function editEnter(event) {
    event = event || window.event;
    if(!((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105) || (event.keyCode == 8) || (event.keyCode == 110) || (event.keyCode == 190) || (event.keyCode == 189))){
        cancelEvent(event);
    }
}
function cancelEvent(event) {
    if(event.preventDefault) {
        event.preventDefault();
    } else {
        event.returnValue = false;
    }
}

