$(function () {
    $("#menu").load("menu.html",function(){
        getMenu();
    });
    //点击一级菜单
    $('.menu-box').on('click','.menu-item,.menu-desc',function () {
        $('.menu-box .active').removeClass('active');
        $(this).addClass('active');
        if($(this).hasClass("arrow")) {
            $('.second-menu').stop().slideUp(200);
            $(this).siblings('.second-menu').stop().slideDown(200);
        }
        var href = $(this).find("span").attr("href");
        if(href!=undefined&&href!=""){
            window.location.href = href;
        }
    });

})
function getMenu(){
    var obj = {
        "userNo":localStorage.getItem('userNo')
    };
     var _obj = JSON.stringify(obj, 'utf-8');
    $.ajax({
        headers: {
            token: localStorage.getItem('LoginToken')
        },
        type: "POST",
        contentType: "text/html; charset=UTF-8",
        url: "/api/sysMenu/queryMenuByUserId/v2",//获取菜单
        data: _obj,
        dataType: 'json',
        asycn:false,
        success: function (data) {
            if (data.rspCode === '000000') {
                var path = window.location.pathname.split("/").pop();
                var menuId = "";
                var html = '<ul class="first-menu noselect">';
                $.each(data.body,function () {
                    var arrow ="";
                    var childs = this.childs;
                    if(childs.length>0){
                        arrow = "arrow";
                    }
                    var _li = '   <li class="first-con">' +
                        '            <div class="menu-item arrow" id="'+this.id+'">' +
                        '                <i class="'+this.menuIcon+'"></i>' +
                        '                <span href="'+this.menuUrl+'">'+this.menuName+'</span>' +
                        '            </div>';
                    var _second = "";
                    $.each(childs,function(){
                         _second += '  <li class="second-con">' +
                            '                    <div class="menu-desc" id="'+this.id+'">' +
                            '                        <i class="'+this.menuIcon+'"></i>' +
                            '                        <span href="'+this.menuUrl+'">'+this.menuName+'</span>' +
                            '                    </div>' +
                            '                </li>';
                        if(path==this.menuUrl){
                            menuId = this.id;
                        }
                    });
                    if(childs.length>0){
                        _li += '<ul class="second-menu">'+_second+'</ul>';
                    }
                    _li += '</li>';
                    html += _li;
                });
                html+='</ul>';
                $("#menuContent").html(html);
                if(menuId!=""){
                    if($("#"+menuId).hasClass("menu-desc")){
                        $("#"+menuId).parents(".second-menu").show();
                    }
                    $("#"+menuId).addClass("active");
                    sessionStorage.setItem("menuId",menuId);
                }else{
                    menuId =  sessionStorage.getItem("menuId");
                    if(menuId!=""){
                        if($("#"+menuId).hasClass("menu-desc")){
                            $("#"+menuId).parents(".second-menu").show();
                        }
                        $("#"+menuId).addClass("active");
                    }else {
                        window.location.href = 'login.html';
                    }
                }
            } else if (data.rspCode === '-999999') {
                localStorage.removeItem("LoginName");
                localStorage.removeItem("LoginToken");
                localStorage.removeItem("userNo");
                localStorage.removeItem("LoginJob");
                localStorage.removeItem("LoginDepartment");
                localStorage.removeItem("LoginRoleName");
                showMsg($('.error-msg'), data.rspMsg);
                window.location.href = 'login.html';
            } else {
                showMsg('.error-msg', data.rspMsg);
            }
        }
    });
}