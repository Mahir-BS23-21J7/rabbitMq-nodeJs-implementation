import {getRabbitMqChannel} from "../conn";

export async function sampleRouting(data: string): Promise<any> {

    data = JSON.stringify({'message': data})
    const exchangeName: string = "direct_logs"
    const channel = await getRabbitMqChannel()
    const severityArr = ['info', 'warning','error']
    
    let severity = severityArr[Math.floor(Math.random()*severityArr.length)]
    
    try {
        await channel.assertExchange(exchangeName, 'direct', { durable: false });
        await channel.publish(exchangeName, severity, Buffer.from(data));
        console.log(`[x] Sent in ||${severity}|| data: ${data}`);
    } catch (e) {
        console.log(e);
    }
}
