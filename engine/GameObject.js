// Please carefully review the rules about academic integrity found in the academicIntegrity.md file found at the root of this project.
import { Transform } from "./components/Transform.js";
import { SceneManager } from "./SceneManager.js";
/**
 * Base class for all objects in a scene.
 *
 * See: https://docs.unity3d.com/ScriptReference/GameObject.html
 */
export class GameObject {
    /**
     * The components inside this game object
     * See https://docs.unity3d.com/ScriptReference/GameObject.GetComponents.html
     */
    components = [];
    /**
     * Flag that tracks if this game object has started
     */
    hasStarted = false;
    /**
     * Flag that tracks if this game object has been marked for deletion.
     * You should not edit this directly. Instead call destroy().
     */
    markForDestroy = false;
    /**
     * The name of the game object
     * See https://docs.unity3d.com/ScriptReference/Object-name.html
     */
    name;
    physicsStatic = false;
    id;
    scene;
    layer = "default";
    static nextID = 0;
    constructor(name, options = {}) {
        this.addComponent(new Transform());
        this.name = name;
        this.id = GameObject.nextID;
        GameObject.nextID++;
        Object.assign(this, options);
    }
    /**
     * Add a component to this game object and set any parameters
     * @param component The component to add
     * @param options Any values to assign to this component
     */
    addComponent(component, options = {}) {
        Object.assign(component, options);
        this.components.push(component);
        component.gameObject = this;
        return component;
    }
    /** Only tell this game object's components */
    sendMessage(message, args = []) {
        if (!this.hasStarted) {
            this.hasStarted = true;
            this.broadcastMessage("start");
        }
        for (const component of this.components) {
            const fn = component[message];
            if (typeof fn === 'function')
                fn.apply(component, args);
        }
    }
    /** Tell this game object's components and all children */
    broadcastMessage(message, args = []) {
        if (!this.hasStarted) {
            this.hasStarted = true;
            this.broadcastMessage("start");
        }
        for (const component of this.components) {
            const fn = component[message];
            if (typeof fn === 'function')
                fn.apply(component, args);
        }
        for (const child of SceneManager.getActiveScene().gameObjects.filter(go => go.transform.parent === this.transform)) {
            child.broadcastMessage(message, args);
        }
    }
    /**
     * Update the game object.
     * You should not call this function. It is only used by the engine.
     */
    update() {
        this.sendMessage("update");
    }
    /**
     * Draw the game object.
     * You should not call this function. It is only used by the engine.
     */
    draw(ctx) {
        ctx.save();
        ctx.setTransform(ctx.getTransform().multiply(this.transform.getWorldMatrix()));
        this.sendMessage("draw", [ctx]);
        ctx.restore();
    }
    /**
     * Destroy this game object.
     * See https://docs.unity3d.com/ScriptReference/Object.Destroy.html
     */
    destroy() {
        this.markForDestroy = true;
    }
    /**
     * Get a component of a certain type
     * See https://docs.unity3d.com/ScriptReference/GameObject.GetComponent.html
     */
    getComponent(type) {
        return this.components.find(c => c instanceof type);
    }
    /**
     * The transform of the game object
     * See https://docs.unity3d.com/ScriptReference/GameObject-transform.html
     */
    get transform() {
        // The first component is always a transform
        return this.components[0];
    }
    /**
     * Find a game object by name in the current scene
     */
    static find(name) {
        return SceneManager.getActiveScene().gameObjects.find(go => go.name === name);
    }
}
