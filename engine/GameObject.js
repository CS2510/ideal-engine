/* Please carefully review the rules about academic integrity found in the academicIntegrity.md file found at the root of this project */

/**
 * Base class for all objects ín a scene.
 * 
 * See: https://docs.unity3d.com/ScriptReference/GameObject.html
 */
class GameObject{
    components = []

    constructor(){
        this.addComponent(new Transform())
    }

    addComponent(component, options){
        Object.assign(component, options)
        this.components.push(component)
        component.gameObject = this
        return component
    }

    update(){
        for(const component of this.components){
            component.update?.()
        }
    }

    draw(ctx){
        for(const component of this.components){
            component.draw?.(ctx)
        }
    }

    get transform(){
        return this.components[0]
    }
}