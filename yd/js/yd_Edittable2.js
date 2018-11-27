$(function(){
    //获取存储数据，并且转换成对象
    var arr = [];
    var myLocalStorage={
        tableList:$("#secondlistforeach").val()
    };
    function getData(){
      if(myLocalStorage.tableList == undefined){
        arr = [];
      }else{
        if(myLocalStorage.tableList && myLocalStorage.tableList.length>0){
          arr = JSON.parse(myLocalStorage.tableList);
        }
        
      }
      return arr;


    }
    add();

    //把数据存到本地存储，并且转换成字符串格式的JSON
    function saveData(data){
        //  var data = getData();
        //  JSON.stringify(localStorage.tableList);
        myLocalStorage.tableList = JSON.stringify(data);
    }

    //增加行方法

    function add(){
        var ydtable2=$("#seconhHandTable");
        var data = getData();
      $.each(data,function(i, v){
    	  var estimatedPurchasePrice ='';
    	  if(v.estimatedPurchasePrice){
              estimatedPurchasePrice = Number(v.estimatedPurchasePrice).toFixed(2);
          }
          var selected='';
    	  if(!v.buyMethod){
              selected='selected="selected"';
          }
    	  var tr=$("<tr class='seconhHandTable'></tr>");
    	  var td1=$("<td disabled='false' data-role='buyMethod'>" +
              "<select class='form-control hell'  name='secondHandOrderList["+i+"].buyMethod'>" +
              "<option value ='Cash'"+(v.buyMethod && v.buyMethod.code=='Cash'?"selected='selected'":"")+">现金</option>" +
              "<option value ='CartMoney'"+(v.buyMethod && v.buyMethod.code=='CartMoney'?"selected='selected'":""+selected+"")+">抵车款</option>" +
              "</select></td>");
    	  var td2=$("<td contenteditable='true' data-role='replaceInfo' class='inputTd'>"+v.replaceInfo+"</td>");
          td2.empty();
          td2.text(v.replaceInfo);
          td2.append("<input type='hidden' name='secondHandOrderList["+i+"].replaceInfo' value='"+v.replaceInfo+"'>");
          var td3=$("<td contenteditable='true' data-role='estimatedPurchasePrice' class='inputTd'>"+v.estimatedPurchasePrice+"</td>");
          td3.empty();
          td3.text(estimatedPurchasePrice);
    	  td3.append("<input type='hidden' name='secondHandOrderList["+i+"].estimatedPurchasePrice' value='"+v.estimatedPurchasePrice+"'>");
    	  var td4=$("<td destatus='delete'><button class='btn btn-danger btn-sm2' >删除</button></td>");
          var td5=$("<td class='secondStatus'>"+v.secondHandOrderStatus+"</td>");
          var td6=$("<td style='display: none;'><input type='hidden' name='secondHandOrderList["+i+"].code' value='"+v.code+"'></td>");
          tr.attr("index",i).append(td1).append(td2).append(td3).append(td4).append(td5).append(td6);
          ydtable2.append(tr);
          secondStatus()
      });
      saveData(data);
    }
    $("#seconhHandTable").on("input",".inputTd",function (e) {
        var hidden=$(this).children("input[type='hidden']");
        if(hidden.length==0){
            var tr=$(this).parent("tr");
            hidden=$("<input type='hidden' name='secondHandOrderList["+tr.attr("index")+"]."+$(this).attr("data-role")+"'>");
            $(this).append(hidden);
        }
        hidden.val($(this).text().trim());
    });
    //点击增加按钮事件
    $('#seconhHandBtn').click(function(){
        var data = getData();
        data.push({"buyMethod": "", "replaceInfo": "", "estimatedPurchasePrice": "","secondHandOrderStatus":"","code":""});
        saveData(data);
        $("tr[class='seconhHandTable']").remove();//每次增加行前删除前面的行，否则会重复增加
        add();
    });

    //删除行方法，事件委派，根据当前点击的按钮的行的索引值
    $('#seconhHandTable').on('click','.btn-danger',function(){
      var data = getData();
      var index = $(this).parent().parent().attr("index");
      data.splice(index,1);
      saveData(data);
      $("tr[class='seconhHandTable']").remove();//每次增加行前删除前面的行，否则会重复增加
      add();
    });



    //可编辑效果 contenteditable='true'
    $('#seconhHandTable').on('blur','[contenteditable="true"]',function(){
      var data = getData();
      var index = $(this).parent().attr('index');
      var attr = $(this).attr('data-role');
      var val = $(this).text();
      data[index][attr] = val;
      saveData(data);
    });
    //可编辑效果 contenteditable='true'
    $('#seconhHandTable').on('change','select',function(){
      var data = getData();
      var index = $(this).parents("tr").attr('index');
      var val = $(this).val();
      data[index]["buyMethod"]={};
      data[index]["buyMethod"].code=val;
      saveData(data);
    });
});
