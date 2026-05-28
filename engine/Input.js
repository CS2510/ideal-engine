// Please carefully review the rules about academic integrity found in the academicIntegrity.md file found at the root of this project.

/**
 * Static class that manages keyboard and mouse input in our engine.
 * 
 * See https://docs.unity3d.com/ScriptReference/Input.html
 */
class Input {

    /**
     * The keys that are currently down
     * @type {string[]}
     */
    static keysDown = []

    /**
     * The keys that went down this frame
     * @type {string[]}
     */
    static keysDownThisFrame = []

    /**
     * The keys that went up this frame
     * @type {string[]}
     */
    static keysUpThisFrame = []


    /**
     * The position of the mouse in screen space
     * @type {Vector2}
     */
    static mousePosition

    /**
     * The position of the mouse in screen space last frame
     * @type {Vector2}
     */
    static mousePositionLastFrame

    /**
     * The change of the mouse position in screen space between frames
     * @type {Vector2}
     */
    static mousePositionDelta

    /**
     * The mouse buttons that are currently down
     * @type {number[]}
     */
    static mouseButtonsDown = []

    /**
     * The mouse buttons that went down this frame
     * @type {number[]}
     */
    static mouseButtonsDownThisFrame = []

    /**
     * The mouse buttons that went up this frame
     * @type {number[]}
     */
    static mouseButtonsUpThisFrame = []


    /**
     * Event called when a keyboard key goes down
     * @param {KeyboardEvent} event 
     */
    static keyDown(event) {
        if (!Input.keysDown.includes(event.code)) {
            Input.keysDown.push(event.code)
            Input.keysDownThisFrame.push(event.code)
        }
    }

     /**
     * Event called when a keyboard key goes up
     * @param {KeyboardEvent} event 
     */
    static keyUp(event) {
        Input.keysDown = Input.keysDown.filter(key => key != event.code)
        Input.keysUpThisFrame.push(event.code)
    }

     /**
     * Event called when a mouse button goes down
     * @param {MouseEvent} event 
     */
    static mouseDown(event) {
        Input.mouseButtonsDown.push(event.button)
        Input.mouseButtonsDownThisFrame.push(event.button)
    }

    /**
     * Event called when a mouse button goes up
     * @param {MouseEvent} event 
     */
    static mouseUp(event) {
        Input.mouseButtonsDown = Input.mouseButtonsDown.filter(button => button != event.button)
        Input.mouseButtonsUpThisFrame.push(event.button)
    }

     /**
     * Event called when the mouse position changes
     * @param {MouseEvent} event 
     */
    static mouseMove(event) {
        Input.mousePosition = new Vector2(event.clientX, event.clientY)
    }

    /**
     * Updates the state of the input class
     * Used to clear the state of this-frame lists
     */
    static update() {
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