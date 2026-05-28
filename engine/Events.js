class Events{
    static listeners = []

    static registerListener(message, listeningClass){
        Events.listeners.push({message, listeningClass})
    }

    static handleEvent(message, args){
        for(const listener of Events.listeners){
            if(listener.message == message){
                listener.listeningClass.handleEvent(message, args)
            }
        }
    }
}