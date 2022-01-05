import {getRabbitMqChannel} from "../conn";

export async function sampleConsumer(): Promise<void> {
    const queueName: string = "node-rabbitmq-sample"
    const channel = await getRabbitMqChannel()

    try {
        await channel.assertQueue(queueName)
        await channel.consume(queueName, (data: any): void => {
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
