// Please carefully review the rules about academic integrity found in the academicIntegrity.md file found at the root of this project.
/**
 * Class that manages time in our engine.
 *
 * See https://docs.unity3d.com/ScriptReference/Time.html
 */
export class Time {
    /**
     * The time that has elapsed since our last frame started
     * See https://docs.unity3d.com/ScriptReference/Time-deltaTime.html
     */
    static deltaTime = 1 / 60;
    /**
     * The time that has elapsed since our game started
     * See https://docs.unity3d.com/ScriptReference/Time-time.html
     */
    static time = 0;
    /**
     * The number of frames since the game started
     * See https://docs.unity3d.com/ScriptReference/Time-frameCount.html
     */
    static frameCount = 0;
    static update() {
        Time.time += Time.deltaTime;
        Time.frameCount++;
    }
}
