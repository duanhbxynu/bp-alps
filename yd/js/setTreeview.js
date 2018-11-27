
/**上下左右居中**/
function autoCenter(obj) {
    var topHeight = '-' + obj.outerHeight() / 2 + 'px';
    var leftWidth = '-' + obj.outerWidth() / 2 + 'px';
    obj.css({'margin-left': leftWidth, 'margin-top': topHeight});
}
function loadDataOpenAuth(uid){
	loadData(uid);
	$(".setRole").removeClass("hide");
	$('.setRole .logs').show(100);
	$(".setRole .boxshaow").fadeIn(100);
	autoCenter($('.setRole .logs'));
};
$('.setRole .detailsClose,.setRole .boxshaow').click(function(){
	$('.setRole .logs').slideUp(100);
	$(".setRole .boxshaow").fadeOut(100);
});	
$(window).resize(function() {
  autoCenter($('.setRole .logs'));
});

var showMenuID=function (menuData,data) {
    if(menuData && menuData.length>0){
        $.each(menuData,function (index,value) {
            if(value.id) {
                getMinChildren(value,data);
            }else{
                showMenuID(value.children,data);
            }
        });
       // $("#treeview-checkable").tree("loadData",menuData);
    }
};
var getMinChildren=function (value,data) {
    var node=$("#treeview-checkable").treeview('getNode',value.id);
    
    var nodes=$("#treeview-checkable").treeview("getChildren",node.target);
    
    
    if(nodes.length>0){
        for(var i in nodes){
            getMinChildren(nodes[i],data);
        }
    }else{
        $.each(data,function (i,o) {
            if(o.uid==value.id){
                value.checked=true;
            }
        });
    }
};
$("#saveRoleBtn").click(function () {
    var that=this;
    var rootNode=$("#treeview-checkable").tree("getRoot");
    var children=$("#treeview-checkable").tree("getChildren",rootNode);
    var delCuids=getMenuID(children,"",true);
    var checkedNode=$("#treeview-checkable").tree("getChecked");
    var addCuids=unique(getMenuID(checkedNode,"").split("=")).join("=");
    var btnCuids=unique(getMenuID(checkedNode,"","btnCuids").split("=")).join("=");
    $.ajax({
        url:'/permission/savePermissions',
        type:"post",
        data:{
            guid:$("#userGroupId2").val(),
            delCuids:delCuids,
            addCuids:addCuids,
            btnCuids:btnCuids.charAt(btnCuids.length-1)=="-"?btnCuids.substring(0,btnCuids.length-1):btnCuids
        },
        beforeSend: function () {
           // loading.load2($("#authorityPage"),"正在保存，请稍候。。。",18);
        },
        complete: function () {
            //loading.disLoad();
        }
    }).done(function (data) {
//        infoMes(data.mes,getTop(that)-350,function () {
//            if(!data.result){
//                //$("#authorityPage").dialog("close");
//            }else{
//                console.log(data.result);
//            }
//        });
    });
});



function loadData(uid){
	$("#userGroupId2").val(uid);
	 $.ajax({
	        url:'/permission/getUserGroupMenu',
	        type:"get",
	        data:{
	            uid:uid
	        },
	        contentType:'json',
	        beforeSend: function () {
	        	  layer.msg("正在加载，请稍后。。");
	        }
	    }).done(function (data) {
	    	console.log(data);
	    	//return ;
	    	
	        $.ajax({
	            url:'/permission/getYdMenu',
	            type:"get",
	            data:{},
	            contentType:'json',
	            complete: function () {
	            }
	        }).done(function (menuData) {
	        	layer.msg("加载成功");
	        	console.log(menuData);
	        	
	            var $checkableTree = $('#treeview-checkable').treeview({
	        		data: menuData,
	        		highlightSelected : false,// 选中项不高亮，避免和上述制定的颜色变化规则冲突
	        		multiSelect : false,// 不允许多选，因为我们要通过check框来控制
	        		showIcon: false,
	        		showCheckbox: true,
	        		onNodeChecked: function(event, node) {
	        			
	        		},
	        		onNodeUnchecked: function(event, node) {
	        			
	        		}
	        	});
	            
	          //勾选已有
	            showMenuID(menuData,data[0].allowedLink);

	        	// 全选和全不选
//	        	$('#btn-check-all').on('click', function(e) {
//	        		$checkableTree.treeview('checkAll', {
//	        			silent: $('#chk-check-silent').is(':checked')
//	        		});
//	        	});
//	        	$('#btn-uncheck-all').on('click', function(e) {
//	        		$checkableTree.treeview('uncheckAll', {
//	        			silent: $('#chk-check-silent').is(':checked')
//	        		});
//	        	});
	        });
	    });
}


$(function() {

});
var getMenuID=function (menuData,ids,b) {
    if(menuData && menuData[0] && menuData.length>0){
        $.each(menuData,function (index,value) {
            if(value && value.id){
                if(ids.indexOf("="+value.id)==-1){
                    if(!value.isBtn && b!="btnCuids"){
                        if(ids.length>0 && ids.charAt(ids.length-1)!="=" && ids.charAt(ids.length-1)!="-"){
                            ids+="="+value.id+"=";
                        }else{
                            if(ids.indexOf("-")==-1){
                                ids+=value.id+"=";
                            }
                        }
                    }else if(b=="btnCuids"){
                        var parentNode=$("#authorityList").tree("getParent",value.target);
                        if(parentNode.id && value.isBtn){
                            ids+=parentNode.id+"="+value.id+"-";
                        }
                    }
                }
                if(!b){
                    if(value.target){
                        var parentNode=$("#authorityList").tree("getParent",value.target);
                        var tempArray=[parentNode];
                        ids=getMenuID(tempArray,ids);
                    }
                }
            }
        });
    }
    if(ids.charAt(ids.length-1)=="="){
        ids=ids.substring(0,ids.length-1);
    }
    return ids;
};









