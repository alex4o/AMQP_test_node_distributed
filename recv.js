var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(err, conn) {
	conn.createChannel(function(err, ch) {
		ch.assertQueue("stream", {durable: false})
		ch.assertQueue("stream_res", {durable: false})

		//ch.sendToQueue("stream", new Buffer('Hello World!'))
		ch.prefetch(1);
		

		ch.consume("stream_res", function(msg) {
			let res = msg.content.readInt32BE()
			console.log("Received %d", res);
			ch.ack(msg)
		})
	})
});
