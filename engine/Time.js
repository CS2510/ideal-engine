// Please carefully review the rules about academic integrity found in the academicIntegrity.md file found at the root of this project.

/**
 * Class that manages time in our engine.
 * 
 * See https://docs.unity3d.com/ScriptReference/Time.html
 */
class Time{
    static deltaTime = 1/60

    static time // How much time has passed since the game started

    static frameCount // How many frames since the game started

    static update(){
        Time.time += Time.deltaTime
        Time.frameCount++
    }
}