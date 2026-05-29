// Please carefully review the rules about academic integrity found in the academicIntegrity.md file found at the root of this project.

import { Vector2 } from "./Vector2.js"

/**
 * Static class that manages keyboard and mouse input in our engine.
 *
 * See https://docs.unity3d.com/ScriptReference/Input.html
 */
export class Input {
    /**
     * The keys that are currently down
     */
    static keysDown: string[] = []

    /**
     * The keys that went down this frame
     */
    static keysDownThisFrame: string[] = []

    /**
     * The keys that went up this frame
     */
    static keysUpThisFrame: string[] = []

    /**
     * The position of the mouse in screen space
     */
    static mousePosition: Vector2 | undefined

    /**
     * The position of the mouse in screen space last frame
     */
    static mousePositionLastFrame: Vector2 | undefined

    /**
     * The change of the mouse position in screen space between frames
     */
    static mousePositionDelta: Vector2 | undefined

    /**
     * The mouse buttons that are currently down
     */
    static mouseButtonsDown: number[] = []

    /**
     * The mouse buttons that went down this frame
     */
    static mouseButtonsDownThisFrame: number[] = []

    /**
     * The mouse buttons that went up this frame
     */
    static mouseButtonsUpThisFrame: number[] = []

    /**
     * Event called when a keyboard key goes down
     */
    static keyDown(event: KeyboardEvent): void {
        if (!Input.keysDown.includes(event.code)) {
            Input.keysDown.push(event.code)
            Input.keysDownThisFrame.push(event.code)
        }
    }

    /**
     * Event called when a keyboard key goes up
     */
    static keyUp(event: KeyboardEvent): void {
        Input.keysDown = Input.keysDown.filter(key => key !== event.code)
        Input.keysUpThisFrame.push(event.code)
    }

    /**
     * Event called when a mouse button goes down
     */
    static mouseDown(event: MouseEvent): void {
        Input.mouseButtonsDown.push(event.button)
        Input.mouseButtonsDownThisFrame.push(event.button)
    }

    /**
     * Event called when a mouse button goes up
     */
    static mouseUp(event: MouseEvent): void {
        Input.mouseButtonsDown = Input.mouseButtonsDown.filter(button => button !== event.button)
        Input.mouseButtonsUpThisFrame.push(event.button)
    }

    /**
     * Event called when the mouse position changes
     */
    static mouseMove(event: MouseEvent): void {
        Input.mousePosition = new Vector2(event.clientX, event.clientY)
    }

    /**
     * Updates the state of the input class.
     * Used to clear the state of this-frame lists.
     */
    static update(): void {
        Input.keysDownThisFrame = []
        Input.keysUpThisFrame = []
        Input.mouseButtonsDownThisFrame = []
        Input.mouseButtonsUpThisFrame = []

        if (Input.mousePosition && Input.mousePositionLastFrame)
            Input.mousePositionDelta = Input.mousePosition.minus(Input.mousePositionLastFrame)
        if (Input.mousePosition)
            Input.mousePositionLastFrame = Input.mousePosition.clone()
    }
}
