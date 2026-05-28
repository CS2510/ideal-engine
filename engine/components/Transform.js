// Please carefully review the rules about academic integrity found in the academicIntegrity.md file found at the root of this project.

/**
 * Transform component.
 * Each game object is required to have a transform. The transform should be added automatically at game object creation time by the engine.
 * 
 * This stores information about a game object's world space attributes and its position in the game object hierarchy.
 * 
 * See https://docs.unity3d.com/6000.2/Documentation/ScriptReference/Transform.html
 */
class Transform extends Component{
    position = new Vector2()
    scale = new Vector2()
    rotation = 0
}