var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
 
app.post('/chat', function(req, res){
    res.send('chat ok');
});
 
//在线用户
var onlineUsers = {};
//当前在线人数
var onlineCount = 0;
var numUsers = 0;
 
io.on('connection', function(socket){
    console.log('a user connected');
    var addedUser = false;

    //监听新用户加入
    socket.on('login', function(obj){
        console.log(obj.username+'加入了聊天室');
        //将新加入用户的唯一标识当作socket的名称，后面退出的时候会用到
        socket.name = obj.userid;
         
        //检查在线列表，如果不在里面就加入
        if(!onlineUsers.hasOwnProperty(obj.userid)) {
            onlineUsers[obj.userid] = obj.username;
            //在线人数+1
            onlineCount++;
        }
         
        //向所有客户端广播用户加入
        io.emit('login', {onlineUsers:onlineUsers, onlineCount:onlineCount, user:obj});
        console.log(obj.username+'加入了聊天室');
    });
    
    socket.on('add user', (username) => {
        if (addedUser) return;
        // we store the username in the socket session for this client
        socket.username = username;
        ++numUsers;
        addedUser = true;
        socket.emit('login', {
          numUsers: numUsers
        });    
        socket.broadcast.emit('user joined', {
        username: socket.username,
        numUsers: numUsers
    });
  }); 

    //监听用户退出
    socket.on('disconnect', function(){
        //将退出的用户从在线列表中删除
        if(onlineUsers.hasOwnProperty(socket.name)) {
            //退出用户的信息
            var obj = {userid:socket.name, username:onlineUsers[socket.name]};
             
            //删除
            delete onlineUsers[socket.name];
            //在线人数-1
            onlineCount--;
             
            //向所有客户端广播用户退出
            io.emit('logout', {onlineUsers:onlineUsers, onlineCount:onlineCount, user:obj});
            console.log(obj.username+'退出了聊天室');
        }
    });
     
    //监听用户发布聊天内容
    // socket.on('message', function(obj){
    //     //向所有客户端广播发布的消息
    //     io.emit('message', obj);
    //     console.log(obj.username+'说：'+obj.content);
    // });

    socket.on('new message', (data) => {
        // we tell the client to execute 'new message'
        socket.broadcast.emit('new message', {
          username: socket.username,
          message: data
        });
      });
   
});
 
http.listen(2334, function(){
    console.log('listening on *:2334');
});
