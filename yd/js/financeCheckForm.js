

//表单必填项控制
var eles = {
    form: $('#newCarFinanceCheckForm'),//form
    checkDate:$('#checkDate'),//1
    arrivalAmount:$('[name="arrivalAmount"]'),//2
    arrivalDate : $('[name="arrivalDate"]'),//3
    companyTakes : $('[name="companyTakes"]'),//4
    commissionActual : $('[name="commissionActual"]'),//5
    submit:$("#financesave"),
    err1 : $('.err1'),
    err2 : $('.err2'),
    err3 : $('.err3'),
    err4 : $('.err4'),
    err5 : $('.err5'),
    errTxt1 : '请选择核对日期',
    errTxt2 : '请输入到账金额',
    errTxt3 : '请选择到账日期',
    errTxt4 : '请输入公司承担相关费用',
    errTxt5 : '请输入佣金金额(实际)',
    norm_checkDate :/\S+/,
    norm_arrivalAmount :/\S+/,
    norm_arrivalDate :/\S+/,
    norm_companyTakes :/\S+/,
    norm_commissionActual :/\S+/

}
eles.submit.click(function () {
    disabled(this,true);
});
//核对日期
eles.checkDate.on('change',function(){
    eles.checkDate.validator( eles.norm_checkDate, eles.err1, eles.errTxt1 );
})
//核对日期
eles.arrivalAmount.on('change',function(){
    eles.arrivalAmount.validator( eles.norm_arrivalAmount, eles.err2, eles.errTxt2 );
})
//核对日期
eles.arrivalDate.on('change',function(){
    eles.arrivalDate.validator( eles.norm_arrivalDate, eles.err3, eles.errTxt3 );
})
//核对日期
eles.companyTakes.on('change',function(){
    eles.companyTakes.validator( eles.norm_companyTakes, eles.err4, eles.errTxt4 );
})
//核对日期
eles.commissionActual.on('change',function(){
    eles.commissionActual.validator( eles.norm_commissionActual, eles.err5, eles.errTxt5 );
})
//提交
$("#financesave").click(function(ev){
    if(
        eles.checkDate.validator(eles.norm_checkDate, eles.err1, eles.errTxt1 ) &&
        eles.arrivalAmount.validator( eles.norm_arrivalAmount, eles.err2, eles.errTxt2 )&&
        eles.arrivalDate.validator( eles.norm_arrivalDate, eles.err3, eles.errTxt3 )&&
        eles.companyTakes.validator( eles.norm_companyTakes, eles.err4, eles.errTxt4 ) &&
        eles.commissionActual.validator( eles.norm_commissionActual, eles.err5, eles.errTxt5 )
    ){
        //alert("123");
       eles.form.submit();
    }
    ev.preventDefault();
});
/*$(document).ready(function () {
    $("#arrivalAmount").blur(function () {
        if($("#loanAmountEstimate").val() && $(this).val()){
            $("#companyTakes").val(accSub($("#loanAmountEstimate").val(),$(this).val()));
        }
    });
});*/

