// Please carefully review the rules about academic integrity found in the academicIntegrity.md file found at the root of this project.

/**
 * Base class for all scenes
 * 
 * See https://docs.unity3d.com/ScriptReference/SceneManagement.Scene.html
 */
class Scene {
    gameObjects = []

    lastFrameMouseCollisions = []
    lastFrameCollisions = [] // Two polygons overlapping
    previousMouseDowns = []

    instantiate(gameObject, position) {
        this.gameObjects.push(gameObject)
        gameObject.components[0].position = position
        return gameObject
    }

    update() {

        for(const gameObject of this.gameObjects){
            gameObject.broadcastMessage("fixedUpdate", [])
        }

        let thisFrameMouseCollisions = []
        let collidables = this.gameObjects.filter(go=>go.getComponent(Collider))
        if(Input.mousePosition){
            for(const collidable of collidables){
                if(Collisions.isCollisionPointGameObject(Input.mousePosition, collidable))
                    thisFrameMouseCollisions.push(collidable)
            }
        }
        for(const collidable of thisFrameMouseCollisions){
            if(this.lastFrameMouseCollisions.includes(collidable))
                collidable.broadcastMessage("onMouseOver")
            else
                collidable.broadcastMessage("onMouseEnter")
        }
        for(const collidable of this.lastFrameMouseCollisions){
            if(!thisFrameMouseCollisions.includes(collidable)){
                collidable.broadcastMessage("onMouseExit")
                this.previousMouseDowns = this.previousMouseDowns.filter(go=>go!=collidable)
            }
        }

        if(Input.mouseButtonsDownThisFrame.includes(0)){
            for(const collidable of thisFrameMouseCollisions){
                collidable.broadcastMessage("onMouseDown")
                if(!this.previousMouseDowns.includes(collidable)){
                    this.previousMouseDowns.push(collidable)
                }
            }
        }

        if(Input.mouseButtonsUpThisFrame.includes(0)){
            for(const collidable of thisFrameMouseCollisions){
                collidable.broadcastMessage("onMouseUp")
                if(this.previousMouseDowns.includes(collidable)){
                    collidable.broadcastMessage("onMouseUpAsButton")
                }
            }
            this.previousMouseDowns = []
        }

        if(Input.mouseButtonsDown.includes(0) && Input.mousePositionDelta?.magnitude != 0){
            const union = [...new Set([...thisFrameMouseCollisions, ...this.lastFrameMouseCollisions])]
            for(const collidable of union){
                collidable.broadcastMessage("onMouseDrag")
                if(this.lastFrameMouseCollisions.includes(collidable)
                     && !thisFrameMouseCollisions.includes(collidable)){
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

        for(let i = 0; i < collidables.length; i++){
            for(let j = i + 1; j < collidables.length; j++){
                const one = collidables[i]
                const two = collidables[j]
                if(!one.getComponent(RigidBody) && !two.getComponent(RigidBody))
                    continue
                const result = Collisions.isCollisionGameObjectGameObject(one, two)
                if(!result)
                    continue
                const collision = one.id < two.id ? {one: one, two: two, result: result} : {one:two, two: one, result: result.times(-1)}
                activeCollisions.push(collision)
            }
        }

        for(const collision of activeCollisions){
            let type = "onTrigger"
            if(!collision.one.getComponent(Collider).isTrigger && !collision.two.getComponent(Collider).isTrigger)
                type = "onCollision"
            if(this.lastFrameCollisions.some(pair=>pair.one == collision.one && pair.two == collision.two))
            {
                collision.one.broadcastMessage(type + "Stay", [collision.two])
                collision.two.broadcastMessage(type + "Stay", [collision.one])
            }
            else{
                collision.one.broadcastMessage(type + "Enter", [collision.two])
                collision.two.broadcastMessage(type + "Enter", [collision.one])
            }
            if(type == "onCollision"){
                if(collision.one.getComponent(RigidBody) && collision.two.getComponent(RigidBody)){
                    collision.one.transform.position = collision.one.transform.position.add(collision.result.times(.5))
                    collision.two.transform.position = collision.two.transform.position.add(collision.result.times(-.5))
                }
                else{
                    if(collision.one.getComponent(RigidBody)){
                        collision.one.transform.position = collision.one.transform.position.add(collision.result.times(1))
                    }
                    else{
                         collision.two.transform.position = collision.two.transform.position.add(collision.result.times(-1))
                    }
                }
            }
        }

        for(const collision of this.lastFrameCollisions){
            let type = "onTrigger"
            if(!collision.one.getComponent(Collider).isTrigger && !collision.two.getComponent(Collider).isTrigger)
                type = "onCollision"
            if(!activeCollisions.some(pair=>pair.one == collision.one && pair.two == collision.two))
            {
                collision.one.broadcastMessage(type + "Exit", [collision.two])
                collision.two.broadcastMessage(type + "Exit", [collision.one])
            }
        }

        this.lastFrameCollisions = activeCollisions





        for (const gameObject of this.gameObjects) {
            gameObject.update()
        }


        //Call destroy on game objects marked for destroy
        this.gameObjects.filter(go=>go.markForDestroy).forEach(go=>go.broadcastMessage("onDestroy"))
        //Destroy game objects
        this.gameObjects = this.gameObjects.filter(go=>!go.markForDestroy)
    }

    draw(ctx) {
        for (const gameObject of this.gameObjects) {
            gameObject.draw(ctx)
        }
    }
}

function instantiate(gameObject, position) {
    return Engine.currentScene.instantiate(gameObject, position)
}