var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(err, conn) {
	conn.createChannel(function(err, ch) {
		ch.assertQueue("stream", {durable: false})
		ch.assertQueue("stream_res", {durable: false})
		ch.prefetch(1);

		ch.consume("stream", function(msg) {
			let i = 0
			i = msg.content.readInt32BE()

			let buff = new Buffer(4)
			buff.writeInt32BE(i * i)
			console.log("Got [%d]", i)

			ch.sendToQueue("stream_res", buff)

			ch.ack(msg)
		});
	})
});
