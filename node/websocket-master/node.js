// 加载node上websocket模块 ws;  手机端根据roomid区分。不在服务器区分
var ws = require("ws");

//启动基于websocket的服务器,监听我们的客户端接入进来。
var server = new ws.Server({
	//host: "192.168.3.10",
	host: "39.96.18.249",
	port: 2334,
});

//广播                       
server.broadcast = function broadcast(ws) {
	 console.log(ws);
	server.clients.forEach(function each(client) {
		client.send(ws);
	 });
  };
 
// 监听接入进来的客户端事件
function websocket_add_listener(client_sock) {
	
	// close事件
	client_sock.on("close", function() {
		//server.broadcast(0,client_sock.nick + "退出聊天室");
	});
 
	// error事件
	client_sock.on("error", function(err) {
		console.log("client error", err);
	});
	// end 
	client_sock.on("message", function(data) {
		var message = JSON.parse(data);
		console.log("message : " + data);	
		if(message.messageType == "6"){
			server.broadcast(message.nick + "退出直播间");
		}else if(message.messageType == "5"){
			server.broadcast(message.nick + "加入直播间");
		}else if(message.messageType == "3"){
			server.broadcast(data);
		}else if(message.messageType == "1"){
			//server.broadcast(data); // 这里只是后台打印连接
		}else{
			server.broadcast(message.nick + "退出直播间");
		}
	});
	// end 
}
 
server.on("connection", on_server_client_comming);
// connection 事件, 有客户端接入进来;
function on_server_client_comming (client_sock) {
	console.log("client comming");
	websocket_add_listener(client_sock);
}
 
server.on("error", on_server_listen_error);
// error事件,表示的我们监听错误;
function on_server_listen_error(err) {
 
}
 
server.on("headers", on_server_headers);
// headers事件, 回给客户端的字符。
function on_server_headers(data) {
	 //console.log(data);
}

 
 
