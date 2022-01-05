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

const sampleConsumer = async () => {
    const queueName = "node-rabbitmq-sample"
    const channel = await getRabbitMqChannel()
    await channel.assertQueue(queueName)
    try {
        await channel.consume(queueName, function (data) {
            console.log(`Received: ${Buffer.from(data.content)}`)
            channel.ack(data)
        })
    } catch (e) {
        console.log('From Consumer: ')
        console.log(e)
    }

    // await channel.close()
    // console.log('channel close: Consumer')
    // await connection.close()
    // console.log('connection close: Consumer')
}

sampleConsumer()
