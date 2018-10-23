/**
 * +++++++++++++++++++++
 * 微信工具类
 * +++++++++++++++++++++
 */
(function(owner) {
    /**
         * 
         * 更新分享服务
         */
//      var shares;
//		owner.updateSerivces = function() {
//			console.log("updateSerivces");
//			plus.share.getServices(function(ss){
//			 	console.log(ss);
//	            shares={};
//	            for(var i in ss){
//	            //		s = ss[0];sinaweibo
//				//		s = ss[1];tencentweibo
//				//		s = ss[2];qq
//				//		s = ss[3];weixin
//	                var s=ss[i];
//	                console.log("updateSerivces="+s);
//	                shares[s.id]=s;//s.id=='weixin',
//	            }
//	            share.shareHref();
//	        }, function(e){
//	            alert("获取分享服务列表失败："+e.message );
//	        } );
//	        console.log(JSON.stringify(shares));
//		}

		var shares=null;
		var msg =null;
		/**
         * 
         * 更新分享服务
         */
        owner.updateSerivces = function() {
            plus.share.getServices( function(s){
                shares={};
                for(var i in s){
                    var t=s[i];
                    shares[t.id]=t;
                }
            }, function(e){
                alert("获取分享服务列表失败："+e.message );
            } );
        }
		/**
           * 分享操作
           * @param {JSON} sb 分享操作对象s.s为分享通道对象(plus.share.ShareService)
           * @param {Boolean} bh 是否分享链接
           */
        owner.shareAction = function(sb,bh) {
        	console.log("shareAction");
            if(!sb||!sb.s){
                alert("无效的分享服务！");
                return;
            }
            
//          var msg={content:sharehrefDes.value,extra:{scene:sb.x}};
            if(bh){
//          	if(sharehrefTitle&&sharehrefTitle.value!=""){
//                  msg.title=sharehrefTitle.value;
//              }
//              if(sharehrefDes&&sharehrefDes.value!=""){
//                  msg.content=sharehrefDes.value;
//              }
				msg.extra={scene:sb.x};
//              msg.thumbs=["_www/logo.png"];
//              msg.pictures=["_www/logo.png"];
            }else{
                if(pic&&pic.realUrl){
                    msg.pictures=[pic.realUrl];
                }
            }
            // 发送分享
            if ( sb.s.authenticated ) {
//              alert("---已授权---");
                share.shareMessage(msg,sb.s);
            } else {
//              alert("---未授权---");
                sb.s.authorize( function(){
                       share.shareMessage(msg,sb.s);
                    },function(e){
                        alert("认证授权失败："+e.code+" - "+e.message );
                    
                });
            }
        }
        /**
           * 发送分享消息
           * @param {JSON} msg
           * @param {plus.share.ShareService} s
           */
        owner.shareMessage = function(msg,s){
            
            console.log(JSON.stringify(msg));
            s.send(msg, function(){
                console.log("分享到\""+s.description+"\"成功！ " );
            }, function(e){
                console.log( "分享到\""+s.description+"\"失败: "+JSON.stringify(e) );
            
            } );
        }
        // 分享链接
        owner.shareHref = function(msgcontent){
        	console.log(msg);
        	msg = msgcontent;
        	console.log(msg);
            var shareBts=[];
            // 更新分享列表
            var ss=shares['weixin'];
            ss&&ss.nativeClient&&(
            	shareBts.push({title:'微信好友',s:ss,x:'WXSceneSession'}),
            	shareBts.push({title:'微信朋友圈',s:ss,x:'WXSceneTimeline'})
            );
//          ss=shares['qq'];
//          ss&&ss.nativeClient&&shareBts.push({title:'QQ',s:ss});
            // 弹出分享列表
            shareBts.length>0?plus.nativeUI.actionSheet({title:'分享',cancel:'取消',buttons:shareBts},function(e){
                (e.index>0)&&share.shareAction(shareBts[e.index-1],true);
            }):plus.nativeUI.alert('当前环境无法支持分享链接操作!');
        }
        

}(window.share = {}));