/* Please carefully review the rules about academic integrity found in the academicIntegrity.md file found at the root of this project */

/**
 * Static class that manages keyboard and mouse input in our engine.
 * 
 * See https://docs.unity3d.com/ScriptReference/Input.html
 */
class Input{
    static keysDown = []

    static keyDown(event){
        Input.keysDown.push(event.code)
    }

    static keyUp(event){
        Input.keysDown = Input.keysDown.filter(
            function(element){
                if(element!=event.code) 
                    return true
                else
                    return false
            })
    }

}