var net = require('net');
var timeout = 20000;//超时
var listenPort = 7777;//监听端口
var sd = require('silly-datetime');
var ipContainer = '';
var nameComtainer = '';
var server = net.createServer(function (socket) {
  // 我们获得一个连接 - 该连接自动关联一个socket对象
  socket.ip = socket.remoteAddress.replace(/^.*:/, '');
  socket.setEncoding('utf8');
  //超时事件
  //socket.setTimeout(timeout, function () {
  //  console.log('connect timeout');
  //  socket.end();
  //});
  //接收到数据
  socket.on('data', function (data) {
    if (ipContainer!=socket.ip) {
      console.log(data+'加入了聊天');
      socket.write(data + '加入了聊天\n');
      ipContainer = socket.ip;
      nameComtainer = data;
    } else {
      console.log(nameComtainer +':'+ data);
      socket.write(nameComtainer + ':' + data+'\n');
    }
  });
  //数据错误事件
  socket.on('error', function (exception) {
    console.log('socket error:' + exception);
    socket.end();
  });
  //客户端关闭事件
  socket.on('close', function (data) {
    console.log('close: ' + socket.remoteAddress.replace(/^.*:/, '') + ':' + socket.remotePort + " Time:" + sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss'));
  });
}).listen(listenPort);
//服务器监听事件
server.on('listening', function () {
  console.log("server listening:" + server.address().port + " Time:" + sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss'));
});
//服务器错误事件
server.on("error", function (exception) {
  console.log("server error:" + exception);
});