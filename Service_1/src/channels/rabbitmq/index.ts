import { sampleConsumer } from "./consumers/sampleConsumer";
export { sampleBroker } from "./brokers/SampleBroker"

export function initiateRabbitMqConsumers(): void{
    sampleConsumer()
}
