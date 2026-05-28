// Please carefully review the rules about academic integrity found in the academicIntegrity.md file found at the root of this project.

/**
 * Static class that manages keyboard and mouse input in our engine.
 * 
 * See https://docs.unity3d.com/ScriptReference/Input.html
 */
class Input {
    static keysDown = []
    static keysDownThisFrame = []
    static keysUpThisFrame = []

    static mousePosition
    static mousePositionLastFrame
    static mousePositionDelta

    static mouseButtonsDown = []
    static mouseButtonsDownThisFrame = []
    static mouseButtonsUpThisFrame = []


    static keyDown(event) {
        if (!Input.keysDown.includes(event.code)) {
            Input.keysDown.push(event.code)
            Input.keysDownThisFrame.push(event.code)
        }
    }

    static keyUp(event) {
        Input.keysDown = Input.keysDown.filter(key => key != event.code)
        Input.keysUpThisFrame.push(event.code)
    }

    static mouseDown(event) {
        Input.mouseButtonsDown.push(event.button)
        Input.mouseButtonsDownThisFrame.push(event.button)
    }

    static mouseUp(event) {
        Input.mouseButtonsDown = Input.mouseButtonsDown.filter(button => button != event.button)
        Input.mouseButtonsUpThisFrame.push(event.button)
    }

    static mouseMove(event) {
        Input.mousePosition = new Vector2(event.clientX, event.clientY)
    }

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