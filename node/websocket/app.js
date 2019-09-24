var ws = require('nodejs-websocket');

//客户端连接进来的连接 conn
var server = ws.createServer(function(conn){

    console.log('New connection');

    conn.on('text', function(str){
        console.log(str)
        //conn.sendText(str);
        //boardcast(str);
        
        var data = JSON.parse(str);
        
        switch(data.type){
            case 'nick':
                conn.nick = data.nick;
                boardcast(data.nick + "加入房间");
                break;
            case 'chat':
                boardcast(data.nick + " : " + data.chat);
                break;
            default:

            break;
        }

    });

    conn.on('close', function(){
        boardcast(conn.nickname + '离开了房间');
    })

    //处理错误
    conn.on('error', function(err){
        console.log(err);
    });

    //主动给客户端推消息
    // setTimeout(function(){
    //     conn.sendText('server message');
    // }, 5000);

    //广播 一个人发送消息所以人都知道
    function boardcast(str){
        //先拿到所有的链接（用户）然后循环遍历出来在发送消息给各个用户
        server.connections.forEach(function(conn){
            conn.sendText(str);
        })
    }


}).listen(2333);