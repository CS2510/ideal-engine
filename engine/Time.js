// Please carefully review the rules about academic integrity found in the academicIntegrity.md file found at the root of this project.

/**
 * Class that manages time in our engine.
 * 
 * See https://docs.unity3d.com/ScriptReference/Time.html
 */
class Time{
    /**
     * The time that has elapsed since our last frame started
     * See https://docs.unity3d.com/ScriptReference/Time-deltaTime.html
     * @type {number}
     */
    static deltaTime = 1/60

    /**
     * The time that has elapsed since our game started
     * See https://docs.unity3d.com/ScriptReference/Time-time.html
     * @type {number}
     */
    static time = 0 // How much time has passed since the game started

    /**
     * The number of frames since the game started
     * See https://docs.unity3d.com/ScriptReference/Time-frameCount.html
     * @type {number}
     */
    static frameCount = 0 // How many frames since the game started

    static update(){
        Time.time += Time.deltaTime
        Time.frameCount++
    }
}