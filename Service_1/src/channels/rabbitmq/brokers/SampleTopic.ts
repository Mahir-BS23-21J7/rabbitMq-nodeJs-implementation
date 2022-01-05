import {getRabbitMqChannel} from "../conn";

export async function sampleTopic(data: string): Promise<any> {

    data = JSON.stringify({'message': data})
    const exchangeName: string = "topic_logs"
    const channel = await getRabbitMqChannel()
    const severityArr = ['cricket', 'football','tennis']
    
    let severity = severityArr[Math.floor(Math.random()*severityArr.length)]
    
    try {
        await channel.assertExchange(exchangeName, 'topic', { durable: false });
        await channel.publish(exchangeName, severity, Buffer.from(data));
        console.log(`[x] Sent in ||${severity}|| data: ${data}`);
    } catch (e) {
        console.log(e);
    }
}
