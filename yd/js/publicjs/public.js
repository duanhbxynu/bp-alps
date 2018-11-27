//1.登录超时JS,
$(document).ajaxComplete(function(event, xhr, settings) {
    if(xhr.getResponseHeader("sessionstatus")=="timeOut"){
        /* alert("登陆超时，请重新登陆!");*/
        window.parent.window.location.href="/login";
    }
});
var Mtils={
    validation:{
        /**
         * @author Rui.Zhang
         * @description 判断是否为身份证号码
         * @param {String} str_idCard 待校验的数据
         * @param {String} [sex] 可选参数,传入时同时校验性别,不传则不校验性别,此值只可能 constant.WOMAN(0) 或者 constant.MAN(1)
         * @returns {Boolean}, true:是身份证
         **/
        isIdCard : function (str_idCard, sex) {
            str_idCard = str_idCard || String(this);
            var check = function() {
                var factorArr = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1);
                var parityBit = new Array("1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2");
                var varArray = new Array();
                var lngProduct = 0;
                var intCheckDigit;
                var intStrLen = str_idCard.length;
                var idNumber = str_idCard;
                // initialize
                if ((intStrLen != 15) && (intStrLen != 18)) {
                    return false;
                }
                // check and set value
                for (i = 0; i < intStrLen; i++) {
                    varArray[i] = idNumber.charAt(i);
                    if ((varArray[i] < '0' || varArray[i] > '9') && (i != 17)) {
                        return false;
                    } else if (i < 17) {
                        varArray[i] = varArray[i] * factorArr[i];
                    }
                }

                if (intStrLen == 18) {
                    //check date
                    var date8 = idNumber.substring(6, 14);

                    if (!/^[0-9]{8}$/.test(date8)) {
                        return false;
                    }
                    var year, month, day;
                    year = date8.substring(0, 4);
                    month = date8.substring(4, 6);
                    day = date8.substring(6, 8);
                    var iaMonthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
                    if (year < 1700 || year > 2500) return false;
                    if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) iaMonthDays[1] = 29;
                    if (month < 1 || month > 12) return false;
                    if (day < 1 || day > iaMonthDays[month - 1]) return false;

                    // calculate the sum of the products
                    for (i = 0; i < 17; i++) {
                        lngProduct = lngProduct + varArray[i];
                    }
                    // calculate the check digit
                    intCheckDigit = parityBit[lngProduct % 11];
                    // check last digit
                    if (varArray[17] != intCheckDigit) {
                        return false;
                    }
                }
                //length is 15
                else {
                    //check date
                    var date6 = idNumber.substring(6, 12);

                    if (!/^[0-9]{6}$/.test(date6)) {
                        return false;
                    }
                    var  month, day, year;
                    year = date6.substring(0, 2);
                    month = date6.substring(2, 4);
                    day = date6.substring(4, 6);
                    if (!/^\d{2}$/.test(year)) return false;
                    if (month < 1 || month > 12) return false;
                    if (day < 1 || day > 31) return false;
                }
                return true;
            }
            if(str_idCard && check(str_idCard)) {
                if(undefined != sex) {
                    var sexStr = undefined, tmp = 0;
                    if (15 == str_idCard.length) {
                        tmp = str_idCard.substring(str_idCard.length - 1, str_idCard.length);
                    } else if (18 == str_idCard.length) {
                        tmp = str_idCard.substr(str_idCard.length - 2, 1);
                    }
                    if (0 == tmp % 2) {
                        sexStr = 0;
                    } else {
                        sexStr = 1;
                    }

                    if (sex != sexStr) return false;
                }
                return true;
            }
            return false;
        },
        /**
         * @author Rui.Zhang
         * @description 判断是否为统一社会信用代码
         * @param {String} str_data 待校验的数据
         * @returns {Boolean}, true:社会信用代码正确
         **/
        isCreditCode : function (str_data) {
            var patrn = /^[0-9A-Z]+$/;
            //18位校验及大写校验
            if ((str_data.length != 18) || (patrn.test(str_data) == false)) {
                return false;
            } else {
                var Ancode;//统一社会信用代码的每一个值
                var Ancodevalue;//统一社会信用代码每一个值的权重
                var total = 0;
                var weightedfactors = [1, 3, 9, 27, 19, 26, 16, 17, 20, 29, 25, 13, 8, 24, 10, 30, 28];//加权因子
                var str = '0123456789ABCDEFGHJKLMNPQRTUWXY';
                //不用I、O、S、V、Z
                for (var i = 0; i < str_data.length - 1; i++)
                {
                    Ancode = str_data.substring(i, i + 1);
                    Ancodevalue = str.indexOf(Ancode);
                    total = total + Ancodevalue * weightedfactors[i];
                    //权重与加权因子相乘之和
                }
                var logiccheckcode = 31 - total % 31;
                if (logiccheckcode == 31) {
                    logiccheckcode = 0;
                }
                var Str = "0,1,2,3,4,5,6,7,8,9,A,B,C,D,E,F,G,H,J,K,L,M,N,P,Q,R,T,U,W,X,Y";
                var Array_Str = Str.split(',');
                logiccheckcode = Array_Str[logiccheckcode];


                var checkcode = str_data.substring(17, 18);
                if (logiccheckcode != checkcode) {
                    return false;
                }
                return true;
            }
        },
        /**
         * @author Rui.Zhang
         * @description 判断数据是否为手机号
         * @param {String} str_data 待校验的数据
         * @returns {Boolean}, true:是手机号
         **/
        isMobile : function (str_data) {
            str_data = str_data || String(this);
            var length = str_data.length;
            return length == 11 && /^1\d{10}$/.test(str_data);
        },
        /**
         * @author Rui.Zhang
         * @description 判断数据是否为座机号(固定电话)
         * @param {String} str_data 待校验的数据
         * @returns {Boolean}, true:是座机号
         **/
        isTelephone : function (str_data) {
            str_data = str_data || String(this);
            if (str_data.match(/^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/) == null) {
                return false;
            } else {
                return true;
            }
        }
    }
}
var commonFn={
  initAddress:function (regionId,cityId,citydistrictId) {
      $.ajax({
          url:"/formalOrder/getRegionList",
          type:"get"
      }).done(function (regionList) {
          var oldValue=$(regionId).attr("oldValue");
         $.each(regionList,function (index,value) {
             $(regionId).append("<option value='"+value.isocode+"' "+(oldValue==value.isocode?"selected='selected'":"")+">"+value.name+"</option>")
         });
         commonFn.initCity(cityId,citydistrictId,$(regionId).val());
      });
      $(regionId).change(function () {
          var region=$(this).val();
          commonFn.initCity(cityId,citydistrictId,region);
      });
      $(cityId).change(function () {
          var city=$(this).val();
          commonFn.initDistrict(citydistrictId,city);
      });
  },
  initCity:function (cityId,citydistrictId,region) {
      $.ajax({
          type: "get",
          contentType: "application/json",
          url: "/normalCustomer/selectCity",
          data: {regionIso:region},
          dataType: "json",
          async:false
      }).done(function (cityList) {
          $(cityId).empty();
          $(citydistrictId).empty();
          var oldValue=$(cityId).attr("oldValue");
          $.each(cityList,function (index,value) {
              $(cityId).append("<option value='"+value.code+"' "+(oldValue==value.code?"selected='selected'":"")+">"+value.name+"</option>");
          });
          commonFn.initDistrict(citydistrictId,$(cityId).val());
      });
  },
  initDistrict:function (citydistrictId,city) {
      if(citydistrictId){
          $.ajax({
              type: "get",
              contentType: "application/json",
              url: "/normalCustomer/selectDistrict",
              data: {cityCode:city},
              dataType: "json",
              async:false
          }).done(function (citydistrictList) {
              $(citydistrictId).empty();
              $.each(citydistrictList,function (index,value) {
                  $(citydistrictId).append("<option value='"+value.code+"'>"+value.name+"</option>");
              });
          });
      }
  }
};

//询问框
    function layerConfirm(text, confirmFn) {
        parent.layer.confirm(text, {
            btn: ['确定', '取消'], icon: 0 //按钮
        }, function () {
            confirmFn();
            parent.layer.closeAll();
        });

    }

//默认成功提示框
    function layerSuccess(text) {
        parent.layer.open({
            title: '【ECM消息提示】',
            content: text,
            icon: 0
        });
    }

    /**
     * 自定义成功提示框
     * @param text 文本
     * @param fn  确定后运行函数
     */
    function layerSuccessFn(text, fn) {
        parent.layer.open({
            title: '【ECM消息提示】',
            content: text,
            icon:3,
            end:function(){
                fn();
            }
        });
    }


//默认失败提示框
    function layerError(text) {
        parent.layer.open({
            title: '【ECM异常提示】',
            content: text,
            icon: 0
        });
    }

    /**
     * 自定义失败提示框
     * @param text 文本
     * @param fn  确定后运行函数
     */
    function layerErrorFn(text, fn) {
        parent.layer.open({
            title: '【ECM异常提示】',
            content: text,
            icon:3,
            end:function(){
                fn();
            }
        });
    }

    /**
     * 提示框
     * @param text
     */
    function layerInfo(text) {
        parent.layer.open({
            title: '【ECM消息提示】',
            content: text,
            icon: 0
        });
    }

/**
 * 提示框
 * @param text
 */
function layerInfoFn(text,fn) {
    parent.layer.open({
        title: '【ECM消息提示】',
        content: text,
        icon:3,
        end:function(){
            fn();
        }
    });
}

function num(obj) {
    var value=obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');
    obj.value = value;
}
var isArray=function(o){
    return Object.prototype.toString.call(o)=='[object Array]';
}

//禁止所有type=number的input框的鼠标滚轮事件改变值
for(var i = 0; i < $("input[type=number]").length; i++) {
	$("input[type=number]").attr("onmousewheel","return false")
	$("input[type=number]")[i].addEventListener('DOMMouseScroll', MouseWheel, false);
}
function MouseWheel(event) {
	event = event || window.event;
	event.preventDefault();
}
//校验input框只能输入数字
function notEnter(event) {
    event = event || window.event;
	if(!((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105) || (event.keyCode == 8) || (event.keyCode == 110) || (event.keyCode == 190) || (event.keyCode == 189))){
		if(event.preventDefault) {
			event.preventDefault();
		} else {
			event.returnValue = false;
		}
	}
}
function cleanSpelChar(content) {
	var td = $(content);
	var txt1 = td.val();
	var txt2 = td.text();
	if(isNaN(Number(txt1))||isNaN(Number(txt2))) {
        parent.layer.open({
            title: '【ECM消息提示】',
            content: '请输入数字！',
            icon: 0
        });
		td.text("");
		td.val("");
	}
}
function disabled(id,isInterval) {
    $(id).attr("disabled","disabled");

    //if(isInterval){
    var count=3,interval,btnText=$(id).text();
    var interval=setInterval(function () {
        if(count==0){
            $(id).removeAttr("disabled");
            window.clearInterval(interval);
            $(id).text(btnText);
        }else{
            $(id).text(btnText+"("+count+")");
            count--;
        }
    },1000);
    //}
}
/*layer.confirm('您是如何看待前端开发？', {
    btn: ['重要','奇葩'],icon:3,title:'提示' //按钮
}, function(){
    layer.msg('的确很重要', {icon: 1});
}, function(){
    layer.msg('也可以这样', {
        time: 20000, //20s后自动关闭
        btn: ['明白了', '知道了']
    });
    layer.close(index);
    parent.layer.closeAll();
});*/



