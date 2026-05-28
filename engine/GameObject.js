// Please carefully review the rules about academic integrity found in the academicIntegrity.md file found at the root of this project.


/**
 * Base class for all objects ín a scene.
 * 
 * See: https://docs.unity3d.com/ScriptReference/GameObject.html
 */
class GameObject {
    
    /**
     * The components inside this game object
     * See https://docs.unity3d.com/ScriptReference/GameObject.GetComponents.html
     * @type {Component[]}
     */
    components = []

    /**
     * Flag that tracks of this game object has started
     * @type {boolean}
     */
    hasStarted = false

    /**
     * Flag that tracks if this game object has been marked for deletion
     * Game objects that have been marked for delete are removed before the next update
     * You should not edit this directly. Instead call destroy()
     */
    markForDestroy = false

     /**
     * The name of the game object
     * See https://docs.unity3d.com/ScriptReference/Object-name.html
     * @type {string}
     */
    name


    physicsStatic = false


    id


    static nextID = 0

    constructor(name) {
        this.addComponent(new Transform())
        this.name = name
        this.id = GameObject.nextID
        GameObject.nextID++
    }

    /**
     * Add a component to this game object and set any parameters
     * Note: Parameter type includes `|*` to allow Text component despite naming conflict with DOM Text interface
     * @param {Component|*} component The component to add to the game object
     * @param {object} options Any values to assign to this component
     */
    addComponent(component, options) {
        Object.assign(component, options)
        this.components.push(component)
        component.gameObject = this
        // component.start?.()
        return component
    }

    broadcastMessage(message, args = []) {
        if (!this.hasStarted) {
            this.hasStarted = true
            this.broadcastMessage("start")
        }
        for (const component of this.components) {
            component[message]?.(...args)
        }
    }

     /**
     * Update the game object.
     * You should not call this function. It is only used by the engine.
     */
    update() {

        this.broadcastMessage("update")
    }

    /**
     * Draw the game object.
     * You should not call this function. It is only used by the engine.
     * @param {CanvasRenderingContext2D} ctx The context to which we are rendering
     */
    draw(ctx) {
        // for (const component of this.components) {
        //     component.draw?.(ctx)
        // }
        this.broadcastMessage("draw", [ctx])
    }

    /**
     * Destroy this game object.
     * Unlike Unity, this is not a state function
     * See https://docs.unity3d.com/ScriptReference/Object.Destroy.html
     */
    destroy() {
        this.markForDestroy = true
    }

    /**
     * Get a component of a certain type
     * See https://docs.unity3d.com/ScriptReference/GameObject.GetComponent.html
     * Note: Parameter and return types use `*` to allow Text component despite naming conflict with DOM Text interface
     * @template  {Component} T
     * @param {(new()=>T)|*} type 
     * @returns {*} The first component found on the game object that matches the given type
     */
    getComponent(type) {
        return this.components.find(c => c instanceof type)
    }

    /**
     * The transform of the game object
     * See https://docs.unity3d.com/ScriptReference/GameObject-transform.html
     * @type {Transform}
     */
    get transform() {
        //@ts-ignore The first component is always a transform
        return this.components[0]
    }

    /**
     * Find a game object of a certain name
     * @param {string} name 
     * @returns {GameObject} The first game object with a given name found in the current scene. 
     */
    static find(name) {
        return Engine.currentScene.gameObjects.find(go => go.name == name)
    }
}