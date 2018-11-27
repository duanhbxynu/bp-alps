var myLocalStorage={
    tableList:[]
};

function getData(){
    var arr = [];
    if(myLocalStorage.tableList == undefined){
        arr = [];
    }else{
        if(myLocalStorage.tableList && myLocalStorage.tableList.length>0){
            arr = JSON.parse(myLocalStorage.tableList);
        }

    }
    return arr;
}

    yd_deee = $(function(){
    //获取本地存储数据，并且转换成对象

    add()

    //把数据存到本地存储，并且转换成字符串格式的JSON
    function saveData(data){
    //  var data = getData();
    //  JSON.stringify(localStorage.tableList);
      myLocalStorage.tableList = JSON.stringify(data);
    }



    //增加行方法
    function add(){
      $("tr:not(tr:first,tr:first(1))").remove();//每次增加行前删除前面的行，否则会重复增加
      var data = getData();
      $.each(data,function(i, v){
        $("#optionalPackageTab").append("<tr index='"+i+"'><td contenteditable='true' data-role='name'>"
         + v.name + "</td>" + 
         "<td contenteditable='true' data-role='guideprice'>"
         + v.guideprice + "</td>" + "<td contenteditable='true' data-role='salePrice'>"
         + v.salePrice + "</td>" + "<td contenteditable='true' data-role='discount'>"
          + v.discount + "</td>" + "<td><button class='btn btn-danger btn-sm'>删除</button></td>" +
            "</tr>");
      });
      saveData(data);
    }


    //点击增加按钮事件
    $('.btn-sm').click(function(){
        var data = getData();
        data.push({"name": "", "guideprice": "", "salePrice": "", "discount": ""});
        saveData(data);
        add();

    })


    //删除行方法，事件委派，根据当前点击的按钮的行的索引值
    $('#optionalPackageTab').on('click','.btn-danger',function(){
      var data = getData();
      var index = $(this).parent().parent().attr("index");
      data.splice(index,1);
      saveData(data);
      add();
    })



    //可编辑效果 contenteditable='true'
    $('#optionalPackageTab').on('blur','[contenteditable="true"]',function(){
      var data = getData();
      var index = $(this).parent().attr('index');
      var val = $(this).html();
      var attr = $(this).attr('data-role');
      data[index][attr] = val;
      saveData(data);

    })




})
