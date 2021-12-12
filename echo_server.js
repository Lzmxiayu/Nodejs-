// 1
// const net = require('net');
// const server = net.createServer(socket => {
// socket.on('data', data => {
// socket.write(data);
// console.log(data)
// });
// });
// server.listen(8888);

// 2
// 监听事件，发射事件
// const EventEmitter = require('events').EventEmitter;
// const channel = new EventEmitter();
// channel.on('join', () => {
// console.log('Welcome!');
// });
// channel.emit('join');

// 3
// 用事件发射器实现的简单的发布/预订系统
const events = require('events');
const net = require('net');
const channel = new events.EventEmitter();
channel.clients = {};
channel.subscriptions = {};

channel.on('join', function(id, client) {
	const welcome = `
		Welcome!
		Guests online: ${this.listeners('broadcast').length}
		`;
	client.write(`${welcome}\n`);
	this.clients[id] = client;
	this.subscriptions[id] = (senderId, message) => {
		if (id != senderId) {
			this.clients[id].write(message); //向其他客户端显示输出的代码
		}
	};
	this.on('broadcast', this.subscriptions[id]);
});
channel.on('leave', function(id) {
	channel.removeListener(
		'broadcast', this.subscriptions[id]
		);
	channel.emit('broadcast', id, `${id} has left the chatroom.\n`);
});
channel.on('shutdown', () => {
	channel.emit('broadcast', '', 'The server has shut down.\n');
	channel.removeAllListeners('broadcast');
});
const server = net.createServer(client => {
	const id = `${client.remoteAddress}:${client.remotePort}`;
	channel.emit('join', id, client);

	client.on('data', data => {
		data = data.toString();
		// client.write(data)
		console.log(data)
		//这里目前有bug，每输入单个字符就会触发on,
		if (data == 'q\r\n') {
			console.log('1')
			channel.emit('shutdown');
		}
		channel.emit('broadcast', id, data);
	});
	client.on('close', () => {
		channel.emit('leave', id);
	});
});

server.listen(8888);

