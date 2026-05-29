export class Events {
    static listeners: Array<{ message: string; listeningClass: { handleEvent(message: string, args: unknown[]): void } }> = []

    static registerListener(
        message: string,
        listeningClass: { handleEvent(message: string, args: unknown[]): void }
    ): void {
        Events.listeners.push({ message, listeningClass })
    }

    static handleEvent(message: string, args: unknown[]): void {
        for (const listener of Events.listeners) {
            if (listener.message === message) {
                listener.listeningClass.handleEvent(message, args)
            }
        }
    }
}
