//普通聊天的服务
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
    // socket.on('login', function(obj){
    //     console.log(obj.user_id+'加入了聊天室');
    //     //将新加入用户的唯一标识当作socket的名称，后面退出的时候会用到
    //     socket.name = obj.user_id;
         
    //     //检查在线列表，如果不在里面就加入
    //     if(!onlineUsers.hasOwnProperty(obj.user_id)) {
    //         onlineUsers[obj.user_id] = obj.user_id;
    //         //在线人数+1
    //         onlineCount++;

    //     }
         
    //     //向所有客户端广播用户加入
    //     io.emit('login', {onlineUsers:onlineUsers, onlineCount:onlineCount, user:obj});
    //     console.log(obj.username+'加入了聊天室');
    // });
    
    socket.on('add user', function(data) {
        if (addedUser) return;
        // we store the username in the socket session for this client
            var user = JSON.parse(data)
            console.log("adduser : " + user.user_name );
            socket.username = user.user_name;
            socket.user_id = user.user_id;
            socket.room_id = user.room_id;
            ++onlineCount;
            user.onlineCount = onlineCount;
            console.log("user_id : " + user.user_id );
            addedUser = true;
            socket.emit('login', {
                onlineCount: onlineCount
            });    

            socket.broadcast.emit('user joined', {
                message : user 
            });
  }); 


    socket.on('disconnect', () => {
        if (addedUser) {
          --onlineCount;
          console.log(socket.username+'退出了聊天室');
          // echo globally that this client has left
          socket.broadcast.emit('user left', {
            user_id: socket.user_id,
            username: socket.username,
            room_id : socket.room_id,
            onlineCount: onlineCount
          });
        }
      });
     

    socket.on('typing', (data) => {
      socket.broadcast.emit('typing', {
        username: socket.username,
        room_id : socket.room_id,
        onlineCount: onlineCount
      });
    });

    
    socket.on('stop typing', (data) => {
      socket.broadcast.emit('stop typing', {
        username: socket.username,
        room_id : socket.room_id,
        onlineCount: onlineCount
      });
    });


    socket.on('new message', (data) => {
      var user = JSON.parse(data)
      console.log("adduser : " + user.room_id );
      socket.room_id = user.room_id;
        socket.broadcast.emit('new message', {
          //username: socket.username,
          message: data
        });
      });
   
});
 
http.listen(4001, function(){
    console.log('listening on *4001:');
});
