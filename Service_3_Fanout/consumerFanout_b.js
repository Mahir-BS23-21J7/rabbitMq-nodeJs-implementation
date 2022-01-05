const amqp = require("amqplib")

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

const fanoutConsumer = async () => {
    const channel = await getRabbitMqChannel()
    const exchangeName = 'logs'

    try {
        await channel.assertExchange(exchangeName, 'fanout')
        await channel.assertQueue('', { exclusive: true })
        await channel.bindQueue(channel.queue, exchangeName, '')
        
        channel.consume(channel.queue, msg => {
            console.log("Received: (B) [x] %s", msg.content.toString() || "No Message")
        }, { noAck: true })
        

    } catch (e) {

        console.log('From Consumer: ')
        console.log(e)

    }
}

fanoutConsumer()
