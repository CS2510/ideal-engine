// Please carefully review the rules about academic integrity found in the academicIntegrity.md file found at the root of this project.


/**
 * Base class for all objects ín a scene.
 * 
 * See: https://docs.unity3d.com/ScriptReference/GameObject.html
 */
class GameObject{
    components = []
    hasStarted = false
    markForDestroy = false
    name
    physicsStatic = false

    constructor(name){
        this.addComponent(new Transform())
        this.name = name
    }

    addComponent(component, options){
        Object.assign(component, options)
        this.components.push(component)
        component.gameObject = this
        // component.start?.()
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

    static find(name){
        return Engine.currentScene.gameObjects.find(go=>go.name == name)
    }
}