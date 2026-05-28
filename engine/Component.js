/* Please carefully review the rules about academic integrity found in the academicIntegrity.md file found at the root of this project */

/**
 * A component class. All the custom code for a game is contained in components.
 * Unlike Unity, we inherit directly from Component. When working in Unity, all game-specific code will inherit from MonoBehavior.
 * 
 * See: https://docs.unity3d.com/ScriptReference/Component.html
 */
class Component{
    gameObject

    get transform(){
        return this.gameObject.transform
    }
}