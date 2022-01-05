import {eventEmitter} from "../index";

export function emitEvent(eventName: string, data: object): void {
    eventEmitter.emit(eventName, data)
}
