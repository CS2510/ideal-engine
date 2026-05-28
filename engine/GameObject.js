class GameObject{
    components = []
    hasStarted = false
    markForDestroy = false

    constructor(){
        this.addComponent(new Transform())
    }

    addComponent(component, options){
        Object.assign(component, options)
        this.components.push(component)
        component.gameObject = this
        component.start?.()
        return component
    }

    broadcastMessage(message){
        for(const component of this.components){
            component[message]?.()
        }
    }

    update(){
        if(!this.hasStarted){
            this.hasStarted = true
            this.broadcastMessage("start")
        }
        this.broadcastMessage("update")
    }

    draw(ctx){
        for(const component of this.components){
            component.draw?.(ctx)
        }
    }

    destroy(){
        this.markForDestroy = true
    }

    getComponent(type){
        return this.components.find(c=> c instanceof type)
    }

    get transform(){
        return this.components[0]
    }
}