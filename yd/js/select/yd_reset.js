//页面加载完成后初始化select2控件
$(function () {
    $(".select22").select2();
});
$(".yd_reset").click(function(){
//        $("input[type='text']").val();
    $(".select2 option:first").prop('selected', 'selected');
    $('.select2').trigger('change.select2');
    //全部置空
	$("#ydstore").attr("selected",true).siblings("option").attr("selected",false);
    $("input[type='text']").val("");
    $("#creationtime,#endtime").val("");
    $("#registerstatus:first option:first,#vehicleBrand:first option:first,#vehicleSerie:first option:first,#vehicleType:first option:first").attr("selected",true).siblings("option").attr("selected",false); 
})

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
			content: '请输入数字!',
			icon: 0
		});
		td.text("");
		td.val("");
	}
}