const amqp = require("amqplib")

function fibonacci(n) {
    if (n == 0 || n == 1)
      return n;
    else
      return fibonacci(n - 1) + fibonacci(n - 2);
}

// Initiate Connection
async function getRabbitMqConnection() {
    try {
        const connection = await amqp.connect("amqp://rabbit:rabbit@rabbitmq:5672")
        console.log('RabbitMq Channel Connection Successful')
        return connection
    } catch (err) {
        console.log(err.message);
    }
}

// Initiate Channel
async function getRabbitMqChannel() {
    try {
        const connection = await getRabbitMqConnection()
        const channel = await connection.createChannel()
        console.log('RabbitMq Channel Initiated')
        return channel
    } catch (err) {
        console.log(err.message);
    }
}

const startRpcServer = async () => {
    const channel = await getRabbitMqChannel()
    const queueName = 'RPC-fib'

    try {
        await channel.assertQueue(queueName, { durable: false })
        await channel.prefetch(1);

        console.log(' [x] Awaiting RPC requests');
        
        await channel.consume(queueName, msg => {
            let n = parseInt(msg.content.toString())
            console.log(" [.] fib(%d)", n);
            let r = fibonacci(n)
            channel.sendToQueue(msg.properties.replyTo,
                Buffer.from(r.toString()), {
                    correlationId: msg.properties.correlationId
            })
            
            channel.ack(msg)
        }, {noAck: false})

    } catch (e) {
        console.log('From Consumer: ')
        console.log(e)
    }
}

startRpcServer()
