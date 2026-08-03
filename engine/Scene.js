// Please carefully review the rules about academic integrity found in the academicIntegrity.md file found at the root of this project.

/**
 * Base class for all scenes
 * 
 * See https://docs.unity3d.com/ScriptReference/SceneManagement.Scene.html
 */
class Scene {
  /**
   * List of game objects in the scene
   * See https://docs.unity3d.com/ScriptReference/SceneManagement.Scene.GetRootGameObjects.html
   * 
   * @type {GameObject[]}
   */
  gameObjects = []

  /**
   * List of game object the mouse was in collision with last frame
   * This is an internal variable
   * 
   * @type {GameObject[]}
   */
  lastFrameMouseCollisions = []

  /**
   * List of game object that overlapped during the last frame.
   * This in an internal variable.
   * 
   * @type {Array<{one: GameObject, two: GameObject, result: Vector2}>}
   */
  lastFrameCollisions = [] 


  //This may be deprecated
  previousMouseDowns = []

  /**
   * Create a new scene with an optional background color.
   * This creates a new scene with a camera.
   * 
   * @param {string} backgroundColor 
   */
  constructor(backgroundColor) {
    if (typeof Camera != "undefined") {
      const camera = this.instantiate(new GameObject("Camera"), new Vector2(0, 0))
      camera.addComponent(new Camera())
      camera.getComponent(Camera).backgroundColor = backgroundColor
    }
  }

  /**
   * Instantiate a new game object in the scene.
   * This function should only be called in the constructor of classes that descend from the Scene class.
   * When creating new game objects in components, call the static version
   * 
   * @param {GameObject} gameObject The game object to instantiate
   * @param {Vector2} position The position of the game object to instantiate
   * @returns {GameObject} The created game object
   */
  instantiate(gameObject, position = new Vector2(0, 0)) {
    this.gameObjects.push(gameObject)
    gameObject.transform.position = position
    gameObject.scene = this
    return gameObject
  }

  /**
   * Update the game objects in the scene
   * This includes handling physics and removing game objects
   */
  update() {

    //Steps:
    //- FixedUpdate
    //- Mouse events
    //- Collisions
    //- Collision Resolution
    //- Update
    //- Destroy


    
    // █▀ █ ▀▄▀ ██▀ █▀▄ █ █ █▀▄ █▀▄ ▄▀▄ ▀█▀ ██▀ 
    // █▀ █ █ █ █▄▄ █▄▀ ▀▄█ █▀  █▄▀ █▀█  █  █▄▄ 


    //Send fixed update before all physics is handled
    for (const gameObject of this.gameObjects) {
      gameObject.sendMessage("fixedUpdate", [])
    }


   
   // █▄ ▄█ ▄▀▄ █ █ ▄▀▀ ██▀    ██▀ █ █ ██▀ █▄ █ ▀█▀ ▄▀▀ 
   // █ ▀ █ ▀▄▀ ▀▄█ ▄█▀ █▄▄    █▄▄ ▀▄▀ █▄▄ █ ▀█  █  ▄█▀ 

    /**
     * List of game objects the mouse is in collision with this frame
     * @type {GameObject[]}
     */
    let thisFrameMouseCollisions = []

    /**
     * @type {GameObject[]}
     */
    let collidables = this.gameObjects.filter(go => go.getComponent(Collider))

    //Get all the rigid bodies in the scene
    let rigidBodies = this.gameObjects.filter(go => go.getComponent(RigidBody))

    //Only check for mouse collisions of the position of the mouse is defined
    if (Input.mousePosition) {
      const matrix = new DOMMatrix()
      let mouse = Input.mousePosition

      //Update the mouse position to reflect the camera if a camera is present
      if (typeof Camera != "undefined") {
        matrix.translateSelf(Engine.canvas.width / 2, Engine.canvas.height / 2)
        const scalar = (Engine.canvas.width - Engine.letterBoxWidth) / Engine.cameraWidth
        matrix.scaleSelf(scalar, scalar)
        matrix.multiplySelf(Camera.main.transform.getWorldMatrix().inverse())
        mouse = Vector2.fromDOMPoint(matrix.inverse().transformPoint(Input.mousePosition.toDOMPoint()))
      }

      //Check if the mouse is in collision with all the game objects that are collidable
      for (const collidable of collidables) {
        //The inline if here makes it so that we ignore the camera for object that are in the UI layer
        if (Collisions.isCollisionPointGameObject(collidable.layer == "UI" ? Input.mousePosition.minus(new Vector2(Engine.letterBoxWidth / 2, Engine.letterBoxHeight / 2)) : mouse, collidable))
          thisFrameMouseCollisions.push(collidable)
      }
    }

    //Send events to the game objects that the mouse is over
    for (const collidable of thisFrameMouseCollisions) {
      //Check if we already have been over the game object
      if (this.lastFrameMouseCollisions.includes(collidable))
        //If we have been over this game object before, send the onMouseOver event
        //https://docs.unity3d.com/6000.0/Documentation/ScriptReference/MonoBehaviour.OnMouseOver.html
        collidable.sendMessage("onMouseOver")
      else
        //If this is the first time we have been over this game object, send the onMouseEnter event
        // See https://docs.unity3d.com/6000.0/Documentation/ScriptReference/MonoBehaviour.OnMouseEnter.html
        collidable.sendMessage("onMouseEnter")
    }

    //New check to see if there are game objects that we were over last frame
    //but we are not over now
    for (const collidable of this.lastFrameMouseCollisions) {
      if (!thisFrameMouseCollisions.includes(collidable)) {
        //If we are no longer over a game object, send onMouseExit
        //https://docs.unity3d.com/ScriptReference/MonoBehaviour.OnMouseExit.html
        collidable.sendMessage("onMouseExit")
        this.previousMouseDowns = this.previousMouseDowns.filter(go => go != collidable)
      }
    }

    //Check to see if the left mouse button went down this frame
    if (Input.mouseButtonsDownThisFrame.includes(0)) {
      //Since the mouse went down this frame, send onMouseDown
      //https://docs.unity3d.com/6000.0/Documentation/ScriptReference/MonoBehaviour.OnMouseDown.html
      for (const collidable of thisFrameMouseCollisions) {
        collidable.sendMessage("onMouseDown")
        if (!this.previousMouseDowns.includes(collidable)) {
          this.previousMouseDowns.push(collidable)
        }
      }
    }

    // Check to see if the left mouse button went up this frame
    if (Input.mouseButtonsUpThisFrame.includes(0)) {
      //Since the mouse went up this frame, send onMouseUp
      //https://docs.unity3d.com/ScriptReference/MonoBehaviour.OnMouseUp.html
      for (const collidable of thisFrameMouseCollisions) {
        collidable.sendMessage("onMouseUp")
        if (this.previousMouseDowns.includes(collidable)) {
          collidable.sendMessage("onMouseUpAsButton")
        }
      }
      this.previousMouseDowns = []
    }

    // Check to see if the left mouse button is down and if the mouse moved this frame
    if (Input.mouseButtonsDown.includes(0) && Input.mousePositionDelta?.magnitude != 0) {
      //Since that happened, update the list of game objects we are over with onMouseDrag
      //https://docs.unity3d.com/6000.0/Documentation/ScriptReference/MonoBehaviour.OnMouseDrag.html
      const union = [...new Set([...thisFrameMouseCollisions, ...this.lastFrameMouseCollisions])]
      for (const collidable of union) {
        collidable.sendMessage("onMouseDrag")
        if (this.lastFrameMouseCollisions.includes(collidable) && !thisFrameMouseCollisions.includes(collidable)) {
          thisFrameMouseCollisions.push(collidable)
        }
      }
    }



    this.lastFrameMouseCollisions = thisFrameMouseCollisions


    
    // ▄▀▀ ▄▀▄ █   █   █ ▄▀▀ █ ▄▀▄ █▄ █ ▄▀▀ 
    // ▀▄▄ ▀▄▀ █▄▄ █▄▄ █ ▄█▀ █ ▀▄▀ █ ▀█ ▄█▀ 

    //Collision Resolution and events
    //Loop over every pair of colliders
    //Check for collision
    //Check if at least 1 is a rigidbody

    /**
     * List of collisions in the scene
     * @type {Array<{one: any, two: any, result: Vector2}>}
     */
    const activeCollisions = []

    //All the collisions involving rigid bodies
    /**
     * List of rigid body collisions
     * @type {Array<{one: any, two: any, result: Vector2}>}
     */
    const rigidBodyCollisions = []


    //Loop over all the collidables
    for (let i = 0; i < collidables.length; i++) {
      //Loop over all other collidables
      //Note that the starting condition of this loop makes sure that we don't check the commutitive version of each collision (i.e. a collision b and b collision a)
      //and we don't check the associative version (i.e. a collision a)
      for (let j = i + 1; j < collidables.length; j++) {
        //Check to make sure that the game objects can be in collision based on custom collisions layers (if they exist)
        if (Engine.collisionLayers.length == 0 || Engine.collisionLayers.find(c => (c[0] == collidables[i].layer && c[1] == collidables[j].layer) || (c[0] == collidables[j].layer && c[1] == collidables[i].layer))) {
          const one = collidables[i]
          const two = collidables[j]

          //Don't look for collisions if neither has a rigid body
          if (!one.getComponent(RigidBody) && !two.getComponent(RigidBody)) continue

          //Get collision information
          const result = Collisions.isCollisionGameObjectGameObject(one, two)

          //If there was no collision, then we're done
          if (!result) continue

          //Generate a collision information object with the game object with a lower id in position one
          const collision = one.id < two.id ? { one: one, two: two, result: result } : { one: two, two: one, result: result.times(-1) }

          //Add the collision information to the list of collisions for this frame
          activeCollisions.push(collision)
        }
      }
    }


    //Loop over all the collision and send the appropriate events
    for (const collision of activeCollisions) {
      //Assume it is a trigger event until proven otherwise
      let type = "onTrigger"

      //If neither game object is labeled as a trigger, then change to a collision event
      if (!collision.one.getComponent(Collider).isTrigger && !collision.two.getComponent(Collider).isTrigger)
        type = "onCollision"

      //If this is not the first time these game objects are overlapping, send onTriggerStay or onCollisionStay
      //https://docs.unity3d.com/6000.4/Documentation/ScriptReference/Collider.OnTriggerStay.html
      //https://docs.unity3d.com/6000.4/Documentation/ScriptReference/Collider.OnCollisionStay.html
      if (this.lastFrameCollisions.some(pair => pair.one == collision.one && pair.two == collision.two)) {
        collision.one.sendMessage(type + "Stay", [collision.two, collision.result])
        collision.two.sendMessage(type + "Stay", [collision.one, collision.result.times(-1)])
      }
      //Otherwise, send onTriggerEnter or onCollisionStay
      //https://docs.unity3d.com/6000.1/Documentation/ScriptReference/Collider.OnTriggerEnter.html
      //https://docs.unity3d.com/6000.0/Documentation/ScriptReference/Collider.OnCollisionEnter.html
      else {
        collision.one.sendMessage(type + "Enter", [collision.two, collision.result])
        collision.two.sendMessage(type + "Enter", [collision.one, collision.result.times(-1)])
      }

      //If neither game object is a trigger, then we put it on our list of rigid body collisions
      //so we can resolve this overlay later
      if (type == "onCollision") {
        rigidBodyCollisions.push(collision)
      }
    }

    //Check to see if an overlap has ended to send onTriggerExit and onCollisionExit
    //https://docs.unity3d.com/6000.5/Documentation/ScriptReference/Collider.OnTriggerExit.html
    //https://docs.unity3d.com/ScriptReference/MonoBehaviour.OnCollisionExit.html
    for (const collision of this.lastFrameCollisions) {
      //Assume it is a trigger until proven otherwise
      let type = "onTrigger"

       //If neither game object is labeled as a trigger, then change to a collision event
      if (!collision.one.getComponent(Collider).isTrigger && !collision.two.getComponent(Collider).isTrigger)
        type = "onCollision"

      //Now send the approriate events
      if (!activeCollisions.some(pair => pair.one == collision.one && pair.two == collision.two)) {
        collision.one.sendMessage(type + "Exit", [collision.two, collision.result])
        collision.two.sendMessage(type + "Exit", [collision.one, collision.result.times(-1)])
      }
    }


    
    // ▄▀▀ ▄▀▄ █   █   █ ▄▀▀ █ ▄▀▄ █▄ █    █▀▄ ██▀ ▄▀▀ ▄▀▄ █   █ █ ▀█▀ █ ▄▀▄ █▄ █ 
    // ▀▄▄ ▀▄▀ █▄▄ █▄▄ █ ▄█▀ █ ▀▄▀ █ ▀█    █▀▄ █▄▄ ▄█▀ ▀▄▀ █▄▄ ▀▄█  █  █ ▀▄▀ █ ▀█ 

    //Resolve collisions for game objects with rigid bodies
    //We have to structure this correctly to remove ghost collisions
    //Instead of resolving collision in the order they occur in our game object list
    //we resolve them starting with the biggest overlap to the smallest overlap
    for (const rigidBody of rigidBodies) {
      //Find all collision that involve this rigid body
      const myCollisions = rigidBodyCollisions.filter(c => c.one == rigidBody || c.two == rigidBody)

      //Sort all the collisions so that the ones with the largest magnitude come first
      myCollisions.sort((a, b) => b.result.magnitude - a.result.magnitude)

      //Loop through all the collisions
      for (const collision of myCollisions) {
        //Check to see if the objects are still in collisions
        //Since we are moving objects to resolve collisions,
        //it is possible that game objects that were in collision at the beginning of the frame
        //are no longer in collision
        const result = Collisions.isCollisionGameObjectGameObject(collision.one, collision.two)
        if (!result) break

        //If we get here, we are still in collision
        //Resolve the collision by moving in the direction of result.
        //We only move the game objects that are rigid bodies
        //and we have to invert the offset for those in the "two" key
        if (collision.one.getComponent(RigidBody)) {
          collision.one.transform.position = collision.one.transform.position.add(collision.result.times(1))
        }
        else {
          collision.two.transform.position = collision.two.transform.position.add(collision.result.times(-1))
        }

      }

    }

    //Update the list of last frame collision to the be list of active collisions
    this.lastFrameCollisions = activeCollisions



    
    // █ █ █▀▄ █▀▄ ▄▀▄ ▀█▀ ██▀ 
    // ▀▄█ █▀  █▄▀ █▀█  █  █▄▄ 

    //Call update on all game objects

    for (const gameObject of this.gameObjects) {
      gameObject.update()
    }

        
    // █▀▄ ██▀ ▄▀▀ ▀█▀ █▀▄ ▄▀▄ ▀▄▀ 
    // █▄▀ █▄▄ ▄█▀  █  █▀▄ ▀▄▀  █  


    //Call destroy on game objects marked for destroy
    //https://docs.unity3d.com/2021.1/Documentation/ScriptReference/MonoBehaviour.OnDestroy.html
    this.gameObjects.filter(go => go.markForDestroy).forEach(go => go.broadcastMessage("onDestroy"))

    //Actually remove game objects from the game object list if they have been marked for delete
    this.gameObjects = this.gameObjects.filter(go => !go.markForDestroy)
  }

  /**
   * Draw all the game objects to the screen
   * @param {CanvasRenderingContext2D} ctx The context to which we are drawing
   */
  draw(ctx) {

    Engine.letterBoxWidth = 0
    Engine.letterBoxHeight = 0

    const width = Engine.canvas.width
    const height = Engine.canvas.height

    const screenAspectRatio = width / height

    if (Engine.aspectRatio) {
      if (screenAspectRatio > Engine.aspectRatio) {
        const maxWidth = Engine.canvas.height * Engine.aspectRatio
        Engine.letterBoxWidth = width - maxWidth
      }
      else {
        const maxHeight = Engine.canvas.width / Engine.aspectRatio
        Engine.letterBoxHeight = height - maxHeight
      }
    }

    if (typeof Camera != "undefined") {
      ctx.fillStyle = Camera.main.getComponent(Camera).backgroundColor
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    }
    ctx.save()
    if (typeof Camera != "undefined") {
      ctx.translate(Engine.canvas.width / 2, Engine.canvas.height / 2)
      const scalar = (width - Engine.letterBoxWidth) / Engine.cameraWidth
      ctx.scale(scalar, scalar)
      ctx.setTransform(ctx.getTransform().multiply(Camera.main.transform.getWorldMatrix().inverse()))
    }
    for (const layer of Engine.layers.filter(l => l != "UI")) {
      for (const gameObject of this.gameObjects.filter(go => go.layer == layer)) {
        gameObject.draw(ctx)
      }
    }

    ctx.restore()

    ctx.save()
    ctx.translate(Engine.letterBoxWidth / 2, Engine.letterBoxHeight / 2)

    for (const gameObject of this.gameObjects.filter(go => go.layer == "UI")) {
      gameObject.draw(ctx)
    }

    ctx.restore()

    //Draw letter boxing

    if (Engine.aspectRatio) {
      ctx.fillStyle = "black"


      ctx.fillRect(0, 0, Engine.letterBoxWidth / 2, height)
      ctx.fillRect(width - Engine.letterBoxWidth / 2, 0, Engine.letterBoxWidth / 2, height)

      ctx.fillRect(0, 0, width, Engine.letterBoxHeight / 2)
      ctx.fillRect(0, height - Engine.letterBoxHeight / 2, width, Engine.letterBoxHeight / 2)

    }
  }
}

/**
 * Instantiate a new game object in the current scene.
 * 
 * See https://docs.unity3d.com/6000.2/Documentation/ScriptReference/Object.Instantiate.html
 * 
 * @param {GameObject} gameObject The game object to add to the current scene
 * @param {Vector2} position The position of the game object
 * @returns {GameObject} The created game object
 */
function instantiate(gameObject, position) {
  return SceneManager.getActiveScene().instantiate(gameObject, position)
}
