import { Component } from "../Component.js";
import { GameObject } from "../GameObject.js";
/**
 * Camera component.
 * When this is attached to a game object, that game object becomes the camera.
 * Note that our Scene class automatically creates a game object with this component.
 */
export class Camera extends Component {
    /**
     * Get the main camera game object.
     * In this engine, there can only ever be one camera at a time.
     *
     * @returns The main camera game object
     */
    static get main() {
        return GameObject.find("Camera");
    }
    /**
     * The background color of the scene.
     *
     * Set this when you create a scene by passing a color to the Scene super constructor.
     */
    backgroundColor = "white";
}
