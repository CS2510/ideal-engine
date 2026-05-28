
/**
 * Camera component
 * When this is attached to a game object, that game object becomes the camera.
 * Note that our Scene class automatically creates a game object with this component, 
 * So you never need to instantiate this yourself manually.
 */
class Camera extends Component {
  /**
   * Get the main game object that is the main camera.
   * In this engine, there can only ever be one camera at a time.
   * Since the Scene class creates a game object named "Camera" in its constructor,
   * we know this will be the camera game object.
   * 
   * You can use this function to position the camera. For example, if you 
   * want the camera to be pointing at a game object, you could write the following:
   * Camera.main.transform.position = [game object reference].transform.position.clone()
   * 
   * You can see an example in testCamera.html
   * 
   *  @returns {GameObject} The main camera game object
   */
  static get main() {
    return GameObject.find("Camera")
  }

  /**
   * @type {String} The background color of the scene.
   * 
   * This variable is used to draw the background color of a scene.
   * You can set this when you create a scene by passing a color to the
   * Scene super constructor. 
   * 
   * For example:
   * class MyScene extends Scene{
   *  constructor(){
   *    super("blue")
   *  }
   * } 
   * 
   * This creates a new Scene MyScene whose background color is blue.
   * Internally, this happens because the Scene constructor creates a camera 
   * and then sets this backgroundColor variable.
   */
  backgroundColor = "white"
}