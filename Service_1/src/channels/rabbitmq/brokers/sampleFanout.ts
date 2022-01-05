import {getRabbitMqChannel} from "../conn";

export async function sampleFanout(data: string): Promise<any> {

    data = JSON.stringify({'message': data})
    const exchangeName: string = "logs"
    const channel = await getRabbitMqChannel()
    try {
        channel.assertExchange(exchangeName, 'fanout');
        channel.publish(exchangeName, '', Buffer.from(data));
        console.log(" [x] Sent %s", data);
    } catch (e) {
        console.log(e);
    }
}
