//
//
// //表单必填项控制
// var eles = {
//     form: $('#financeFollowForm'),//form
//     discountMoney:$("#discountMoney"),//1
//     loanAmount:$("#loanAmount"),//2
//     submit:$("#save_f"),
//     err1 : $('.err1'),
//     err2 : $('.err2'),
//     // err3 : $('.err3'),
//     // err4 : $('.err4'),
//     // err5 : $('.err5'),
//     // err6 : $('.err6'),
//     // err7 : $('.err8'),
//     errTxt1:  '请输入享受贴息金额',
//     errTxt2 : '请输入预估贷款金额',
//     // errTxt3 : '请输入佣金金额（含税）',
//     // errTxt4 : '请输入公司承担相关费用',
//     // errTxt5 : '请预付费卡佣金',
//     // errTxt6 : '请输入理财类金融产品佣金',
//     // errTxt7 : '请输入其他佣金',
//     norm_actualLoan :/\S+/,//1
//     norm_loanAmount :/\S+/,//2
//     // norm_commission :/\S+/,//3
//     // norm_companyTakes : /\S+/,//4
//     // norm_drawingAccount :/\S+/,//5
//     // norm_financialAccount :/\S+/,//6
//     // norm_otherAccount :/\S+/,//7
//
// }
//
// //享受贴息金额校验
// eles.discountMoney.on('change',function(){
//     eles.discountMoney.validator( eles.norm_discountMoney, eles.err1, eles.errTxt1 );
// })
// //预估贷款金额校验
// eles.loanAmount.on('change',function(){
//     eles.loanAmount.validator( eles.norm_loanAmount, eles.err2, eles.errTxt2 );
// })
// // //佣金金额（含税）校验
// // eles.commission.on('change',function(){
// //     eles.commission.validator( eles.norm_commission, eles.err3, eles.errTxt3 );
// // })
// // //公司承担相关费用校验
// // eles.companyTakes.on('change',function(){
// //     eles.companyTakes.validator( eles.norm_companyTakes, eles.err4, eles.errTxt4 );
// // })
// // //付费卡佣金校验
// // eles.drawingAccount.on('change',function(){
// //     eles.drawingAccount.validator( eles.norm_drawingAccount, eles.err5, eles.errTxt5 );
// // })
// // //理财类金融产品佣金校验
// // eles.financialAccount.on('change',function(){
// //     eles.financialAccount.validator( eles.norm_financialAccount, eles.err6, eles.errTxt6 );
// // })
// // //其他佣金校验
// // eles.otherAccount.on('change',function(){
// //     eles.otherAccount.validator( eles.norm_otherAccount, eles.err7, eles.errTxt7 );
// // })
// //提交
// $("#save_f").click(function(ev){
//     if(
//         eles.discountMoney.validator( eles.norm_discountMoney, eles.err1, eles.errTxt1 ) &&
//         eles.loanAmount.validator( eles.norm_loanAmount, eles.err2, eles.errTxt2 )
//     ){
//         eles.form.submit();
//     }
//     ev.preventDefault();
// });
//
