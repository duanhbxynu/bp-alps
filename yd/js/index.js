$(function(){
    //菜单点击
    $(".J_menuItem").on('click',function(){
        var url = $(this).attr('href');
        $("#iframepage").attr('src',url);
        return false;
    });
});