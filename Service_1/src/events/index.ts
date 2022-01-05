import events from "events"
import { sampleEventListener } from "./listeners/SampleEventListener";

export const eventEmitter = new events.EventEmitter()

export async function initiateEventListeners(): Promise<void> {
    eventEmitter.on('SystemAdminLogInAttempt', (data: any) => {
        sampleEventListener('SystemAdminLogInAttempt', data)
    })
}

