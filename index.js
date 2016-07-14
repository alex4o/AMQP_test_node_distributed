var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(err, conn) {
	conn.createChannel(function(err, ch) {
		ch.assertQueue("stream", {durable: false})
		ch.assertQueue("stream_res", {durable: false})

		//ch.sendToQueue("stream", new Buffer('Hello World!'))
		ch.prefetch(1);

		let i = 0;
		setInterval(() => {
			i += 1;
			let buff = new Buffer(4)
			buff.writeInt32BE(i)
			ch.sendToQueue("stream", buff)

		}, 0)
	})
});
