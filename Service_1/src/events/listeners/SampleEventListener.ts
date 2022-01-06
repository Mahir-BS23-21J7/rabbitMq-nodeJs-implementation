import { sampleFanout } from "../../channels/rabbitmq/brokers/sampleFanout";
import {sampleBroker} from "../../channels/rabbitmq";
import { sampleRouting } from "../../channels/rabbitmq/brokers/sampleRouting";
import { sampleTopic } from "../../channels/rabbitmq/brokers/SampleTopic";
import { sampleRpc } from "../../channels/rabbitmq/brokers/SampleRpc";

export function sampleEventListener(eventName: string, data: any): void {
    console.log(eventName, data)
    // sampleBroker(data)
    // sampleBroker("->" + Math.floor(Math.random() * 10))
    // sampleFanout(data)
    // sampleRouting(data)
    // sampleTopic(data)
    sampleRpc(JSON.stringify(5))
}
