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
   * @type {GameObject[]}
   */
  gameObjects = []

  lastFrameMouseCollisions = []
  lastFrameCollisions = [] // Two polygons overlapping
  previousMouseDowns = []

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
   * @param {Vector2} [position] The position of the game object to instantiate
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

    for (const gameObject of this.gameObjects) {
      gameObject.sendMessage("fixedUpdate", [])
    }

    let thisFrameMouseCollisions = []
    let collidables = this.gameObjects.filter(go => go.getComponent(Collider))

    //Get all the rigid bodies in the scene
    let rigidBodies = this.gameObjects.filter(go => go.getComponent(RigidBody))

    if (Input.mousePosition) {
      const matrix = new DOMMatrix()
      let mouse = Input.mousePosition

      if (typeof Camera != "undefined") {
        matrix.translateSelf(Engine.canvas.width / 2, Engine.canvas.height / 2)
        const scalar = (Engine.canvas.width - Engine.letterBoxWidth) / Engine.cameraWidth
        matrix.scaleSelf(scalar, scalar)
        matrix.multiplySelf(Camera.main.transform.getWorldMatrix().inverse())
        mouse = Vector2.fromDOMPoint(matrix.inverse().transformPoint(Input.mousePosition.toDOMPoint()))
      }
      for (const collidable of collidables) {
        if (Collisions.isCollisionPointGameObject(collidable.layer == "UI" ? Input.mousePosition.minus(new Vector2(Engine.letterBoxWidth / 2, Engine.letterBoxHeight / 2)) : mouse, collidable))
          thisFrameMouseCollisions.push(collidable)
      }
    }
    for (const collidable of thisFrameMouseCollisions) {
      if (this.lastFrameMouseCollisions.includes(collidable))
        collidable.sendMessage("onMouseOver")
      else
        collidable.sendMessage("onMouseEnter")
    }
    for (const collidable of this.lastFrameMouseCollisions) {
      if (!thisFrameMouseCollisions.includes(collidable)) {
        collidable.sendMessage("onMouseExit")
        this.previousMouseDowns = this.previousMouseDowns.filter(go => go != collidable)
      }
    }

    if (Input.mouseButtonsDownThisFrame.includes(0)) {
      for (const collidable of thisFrameMouseCollisions) {
        collidable.sendMessage("onMouseDown")
        if (!this.previousMouseDowns.includes(collidable)) {
          this.previousMouseDowns.push(collidable)
        }
      }
    }

    if (Input.mouseButtonsUpThisFrame.includes(0)) {
      for (const collidable of thisFrameMouseCollisions) {
        collidable.sendMessage("onMouseUp")
        if (this.previousMouseDowns.includes(collidable)) {
          collidable.sendMessage("onMouseUpAsButton")
        }
      }
      this.previousMouseDowns = []
    }

    if (Input.mouseButtonsDown.includes(0) && Input.mousePositionDelta?.magnitude != 0) {
      const union = [...new Set([...thisFrameMouseCollisions, ...this.lastFrameMouseCollisions])]
      for (const collidable of union) {
        collidable.sendMessage("onMouseDrag")
        if (this.lastFrameMouseCollisions.includes(collidable) && !thisFrameMouseCollisions.includes(collidable)) {
          thisFrameMouseCollisions.push(collidable)
        }
      }
    }



    this.lastFrameMouseCollisions = thisFrameMouseCollisions

    //Collision Resolution and events
    //Loop over every pair of colliders
    //Check for collision
    //Check if at least 1 is a rigidbody

    const activeCollisions = []

    //All the collisions involving rigid bodies
    const rigidBodyCollisions = []


    for (let i = 0; i < collidables.length; i++) {
      for (let j = i + 1; j < collidables.length; j++) {
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


    for (const collision of activeCollisions) {
      let type = "onTrigger"
      if (!collision.one.getComponent(Collider).isTrigger && !collision.two.getComponent(Collider).isTrigger)
        type = "onCollision"
      if (this.lastFrameCollisions.some(pair => pair.one == collision.one && pair.two == collision.two)) {
        collision.one.sendMessage(type + "Stay", [collision.two, collision.result])
        collision.two.sendMessage(type + "Stay", [collision.one, collision.result.times(-1)])
      }
      else {
        collision.one.sendMessage(type + "Enter", [collision.two, collision.result])
        collision.two.sendMessage(type + "Enter", [collision.one, collision.result.times(-1)])
      }
      if (type == "onCollision") {
        rigidBodyCollisions.push(collision)
        // if(collision.one.getComponent(RigidBody) && collision.two.getComponent(RigidBody)){
        //     collision.one.transform.position = collision.one.transform.position.add(collision.result.times(.5))
        //     collision.two.transform.position = collision.two.transform.position.add(collision.result.times(-.5))
        // }
        // else{
        //     if(collision.one.getComponent(RigidBody)){
        //         collision.one.transform.position = collision.one.transform.position.add(collision.result.times(1))
        //     }
        //     else{
        //          collision.two.transform.position = collision.two.transform.position.add(collision.result.times(-1))
        //     }
        // }
      }
    }

    for (const collision of this.lastFrameCollisions) {
      let type = "onTrigger"
      if (!collision.one.getComponent(Collider).isTrigger && !collision.two.getComponent(Collider).isTrigger)
        type = "onCollision"
      if (!activeCollisions.some(pair => pair.one == collision.one && pair.two == collision.two)) {
        collision.one.sendMessage(type + "Exit", [collision.two, collision.result])
        collision.two.sendMessage(type + "Exit", [collision.one, collision.result.times(-1)])
      }
    }

    //Move objects based on collisions
    for (const rigidBody of rigidBodies) {
      const myCollisions = rigidBodyCollisions.filter(c => c.one == rigidBody || c.two == rigidBody)
      myCollisions.sort((a, b) => b.result.magnitude - a.result.magnitude)
      for (const collision of myCollisions) {
        const result = Collisions.isCollisionGameObjectGameObject(collision.one, collision.two)
        if (!result) break
        if (collision.one.getComponent(RigidBody)) {
          collision.one.transform.position = collision.one.transform.position.add(collision.result.times(1))
        }
        else {
          collision.two.transform.position = collision.two.transform.position.add(collision.result.times(-1))
        }

      }

    }

    this.lastFrameCollisions = activeCollisions





    for (const gameObject of this.gameObjects) {
      gameObject.update()
    }


    //Call destroy on game objects marked for destroy
    this.gameObjects.filter(go => go.markForDestroy).forEach(go => go.broadcastMessage("onDestroy"))
    //Destroy game objects
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
