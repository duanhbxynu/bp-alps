/*客流类型*/
var streamTypeData = [{
	value: 'firstTime',
	text: '首次到店'
}, {
	value: 'secondTime',
	text: '二次到店'
}, {
	value: 'invalid',
	text: '无效'
}, {
	value: 'noStay',
	text: '未留档'
}];
/*线索来源*/
var leadsData = [{
	value: '01',
	text: '汽车之家'
}, {
	value: '02',
	text: '易车网'
}, {
	value: '03',
	text: '百度'
}, {
	value: '04',
	text: '新浪'
}, {
	value: '05',
	text: '到店客户'
}, {
	value: '06',
	text: '来电客户'
}, {
	value: '07',
	text: '朋友介绍'
}, {
	value: '08',
	text: '其他'
}];
/*购车类型*/
var purchaseTypeCodeData = [{
	value: '1',
	text: '首次购买'
}, {
	value: '2',
	text: '再次购买'
}]

/*预购日期*/

//1周内
//1月内
//1-3个月
//3个月后
var purchaseTimeTypeCodeData = [{
	value: '1',
	text: '1周内'
}, {
	value: '2',
	text: '1月内'
}, {
	value: '3',
	text: '1-3个月'
}, {
	value: '4',
	text: '3个月后'
}]

/*意向级别*/
var levelCodeData = [{
	purchaseValue:'1',
	value: 'H',
	text: 'H'
}, {
	purchaseValue:'2',
	value: 'A',
	text: 'A'
}, {
	purchaseValue:'3',
	value: 'B',
	text: 'B'
}, {
	purchaseValue:'4',
	value: 'C',
	text: 'C'
}]

/*购车预算*/
var budgetData = [{
	value: '01',
	text: '10万以内'
}, {
	value: '02',
	text: '10-20万'
}, {
	value: '03',
	text: '20-30万'
}, {
	value: '04',
	text: '30-50万'
}, {
	value: '05',
	text: '50-70万'
}, {
	value: '06',
	text: '70-100万'
}, {
	value: '07',
	text: '100-150万'
},{
	value: '08',
	text: '150万-200万'
}, {
	value: '09',
	text: '200万以上'
}]

/*付款方式*/
/*请选择付款方式
全款
贷款
融资租赁
其他*/
var paymentMethodData = [{
	value: '',
	text: '请选择付款方式'
}, {
	value: '1',
	text: '全款'
}, {
	value: '2',
	text: '贷款'
}, {
	value: '3',
	text: '融资租赁'
}, {
	value: '4',
	text: '其他'
}]

/*购车用途*/
/*请选择购车用途
家用
商用
家商兼用
出租/运营
驾校
接待用车
领导用车
业务用车
其他*/
var purposeData = [{
	value: '',
	text: '请选择购车用途'
}, {
	value: '家用',
	text: '家用'
}, {
	value: '商用',
	text: '商用'
}, {
	value: '家商兼用',
	text: '家商兼用'
}, {
	value: '出租/运营',
	text: '出租/运营'
},{
	value: '驾校',
	text: '驾校'
}, {
	value: '接待用车',
	text: '接待用车'
}, {
	value: '领导用车',
	text: '领导用车'
}, {
	value: '业务用车',
	text: '业务用车'
}]

/*购车关注点*/
var buyPointGroup = [{
	value: 'brand',
	text: '品牌'
}, {
	value: 'surface',
	text: '外形'
}, {
	value: '1',
	text: '动力'
}, {
	value: '2',
	text: '操控'
}, {
	value: '舒适',
	text: '舒适'
},{
	value: 'safe',
	text: '安全'
}, {
	value: 'price',
	text: '价格'
}, {
	value: 'discount',
	text: '优惠'
}]

/*服务需求*/
var servicesTypesGroup = [{
	value: 'brand',
	text: '品牌'
}, {
	value: 'surface',
	text: '外形'
}, {
	value: '1',
	text: '动力'
}, {
	value: '2',
	text: '操控'
}, {
	value: '舒适',
	text: '舒适'
},{
	value: 'safe',
	text: '安全'
}, {
	value: 'price',
	text: '价格'
}, {
	value: 'discount',
	text: '优惠'
}]

/*所属行业*/

//农、林、牧、渔业	01
//制造业	02
//电力、热力、燃气及水生产和供应业	03
//信息传输、软件和信息技术服务业	04
//金融业	05
//房地产业	06
//租赁和商务服务业	07
//科学研究和技术服务业	08
//文化、体育和娱乐业	09
//住宿和餐饮业	10
//批发和零售业	11
//交通运输、仓储和邮政业	12
//其他行业	13

var industryData = [{
	value: '01',
	text: '农、林、牧、渔业'
}, {
	value: '02',
	text: '制造业'
}, {
	value: '03',
	text: '电力、热力、燃气及水生产和供应业'
}, {
	value: '04',
	text: '信息传输、软件和信息技术服务业'
}, {
	value: '05',
	text: '金融业'
},{
	value: '06',
	text: '房地产业'
}, {
	value: '07',
	text: '租赁和商务服务业'
}, {
	value: '13',
	text: '其他'
}]
/*工作类型*/
/*总监及以上高级管理层	01
主管经理等中级管理层	02
普通白领	03
普通蓝领	04
工人	05
教师	06
医生	07
政府公职人员	08
学生	09
其他	10
*/
var workTypeData = [{
	value: '01',
	text: '总监及以上高级管理层'
}, {
	value: '02',
	text: '主管经理等中级管理层'
}, {
	value: '03',
	text: '普通白领'
}, {
	value: '04',
	text: '普通蓝领'
}, {
	value: '05',
	text: '工人'
},{
	value: '06',
	text: '教师'
}, {
	value: '07',
	text: '医生'
}, {
	value: '10',
	text: '其他'
}]

/*学历*/
//
//初中及以下
//高中/中专/技校/高职
//大专
//本科
//硕士及以上

var educationData = [{
	value: '1',
	text: '初中及以下'
}, {
	value: '2',
	text: '高中/中专/技校/高职'
}, {
	value: '3',
	text: '大专'
}, {
	value: '4',
	text: '本科'
}, {
	value: '5',
	text: '硕士及以上'
}]

/*婚姻状况*/
var maritalStatusData = [{
	value: '1',
	text: '未婚'
}, {
	value: '2',
	text: '已婚'
}, {
	value: '3',
	text: '离婚'
}, {
	value: '4',
	text: '丧偶'
}]

/*家庭成员数量*/
var numberOfFamilyData = [{
	value: '1',
	text: '1人'
}, {
	value: '2',
	text: '2人'
}, {
	value: '3',
	text: '3-5人'
}, {
	value: '4',
	text: '5人以上'
}]
/*子女数量numberOfChildren*/
var numberOfChildrenData = [{
	value: '1',
	text: '0人'
}, {
	value: '2',
	text: '1人'
}, {
	value: '3',
	text: '2人'
}, {
	value: '4',
	text: '3人及以上'
}]



/*家庭年收入，个人年收入*/
var incomeData = [{
	value: '01',
	text: '10万以内'
}, {
	value: '02',
	text: '10-20万'
}, {
	value: '03',
	text: '20-30万'
}, {
	value: '04',
	text: '30-50万'
}, {
	value: '05',
	text: '50-70万'
}, {
	value: '06',
	text: '70-100万'
}, {
	value: '07',
	text: '100-150万'
},{
	value: '08',
	text: '150万-200万'
}, {
	value: '09',
	text: '200万以上'
}]