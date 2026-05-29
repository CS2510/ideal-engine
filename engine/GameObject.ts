// Please carefully review the rules about academic integrity found in the academicIntegrity.md file found at the root of this project.

import type { Component } from "./Component.js"
import { Transform } from "./components/Transform.js"
import { SceneManager } from "./SceneManager.js"
import type { Scene } from "./Scene.js"

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
    components: Component[] = []

    /**
     * Flag that tracks if this game object has started
     */
    hasStarted: boolean = false

    /**
     * Flag that tracks if this game object has been marked for deletion.
     * You should not edit this directly. Instead call destroy().
     */
    markForDestroy: boolean = false

    /**
     * The name of the game object
     * See https://docs.unity3d.com/ScriptReference/Object-name.html
     */
    name: string

    physicsStatic: boolean = false

    id: number

    scene!: Scene

    layer: string = "default"

    static nextID: number = 0

    constructor(name: string, options: Partial<GameObject> = {}) {
        this.addComponent(new Transform())
        this.name = name
        this.id = GameObject.nextID
        GameObject.nextID++
        Object.assign(this, options)
    }

    /**
     * Add a component to this game object and set any parameters
     * @param component The component to add
     * @param options Any values to assign to this component
     */
    addComponent<T extends Component>(component: T, options: Partial<T> = {}): T {
        Object.assign(component, options)
        this.components.push(component)
        component.gameObject = this
        return component
    }

    /** Only tell this game object's components */
    sendMessage(message: string, args: unknown[] = []): void {
        if (!this.hasStarted) {
            this.hasStarted = true
            this.broadcastMessage("start")
        }
        for (const component of this.components) {
            const fn = (component as unknown as Record<string, unknown>)[message]
            if (typeof fn === 'function') (fn as (...a: unknown[]) => unknown).apply(component, args)
        }
    }

    /** Tell this game object's components and all children */
    broadcastMessage(message: string, args: unknown[] = []): void {
        if (!this.hasStarted) {
            this.hasStarted = true
            this.broadcastMessage("start")
        }
        for (const component of this.components) {
            const fn = (component as unknown as Record<string, unknown>)[message]
            if (typeof fn === 'function') (fn as (...a: unknown[]) => unknown).apply(component, args)
        }
        for (const child of SceneManager.getActiveScene().gameObjects.filter(go => go.transform.parent === this.transform)) {
            child.broadcastMessage(message, args)
        }
    }

    /**
     * Update the game object.
     * You should not call this function. It is only used by the engine.
     */
    update(): void {
        this.sendMessage("update")
    }

    /**
     * Draw the game object.
     * You should not call this function. It is only used by the engine.
     */
    draw(ctx: CanvasRenderingContext2D): void {
        ctx.save()
        ctx.setTransform(ctx.getTransform().multiply(this.transform.getWorldMatrix()))
        this.sendMessage("draw", [ctx])
        ctx.restore()
    }

    /**
     * Destroy this game object.
     * See https://docs.unity3d.com/ScriptReference/Object.Destroy.html
     */
    destroy(): void {
        this.markForDestroy = true
    }

    /**
     * Get a component of a certain type
     * See https://docs.unity3d.com/ScriptReference/GameObject.GetComponent.html
     */
    getComponent<T extends Component>(type: new (...args: never[]) => T): T | undefined {
        return this.components.find(c => c instanceof type) as T | undefined
    }

    /**
     * The transform of the game object
     * See https://docs.unity3d.com/ScriptReference/GameObject-transform.html
     */
    get transform(): Transform {
        // The first component is always a transform
        return this.components[0] as Transform
    }

    /**
     * Find a game object by name in the current scene
     */
    static find(name: string): GameObject | undefined {
        return SceneManager.getActiveScene().gameObjects.find(go => go.name === name)
    }
}
