import {getRabbitMqChannel} from "../conn";

async function generateUuid() {
    return Math.random().toString() +
           Math.random().toString() +
           Math.random().toString();
}

export async function sampleRpc(data: string): Promise<any> {

    const num = parseInt(data)
    const channel = await getRabbitMqChannel()
    
    try {
        const correlationId = await generateUuid()
        let Q = await channel.assertQueue('', { exclusive: true })

        console.log(' [x] Requesting fib(%d)', num)

        channel.sendToQueue('RPC-fib', Buffer.from(num.toString()),{
            correlationId: correlationId,
            replyTo: Q.queue
        })

        channel.consume(channel.queue, (msg: any) => {
            if (msg.properties.correlationId == correlationId) {
                console.log(' [.] Got %s', msg.content.toString());
            }            
        }, { noAck: true })

    } catch (e) {
        console.log(e);
    }
}
