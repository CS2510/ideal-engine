// Please carefully review the rules about academic integrity found in the academicIntegrity.md file found at the root of this project.

/**
 * Base class for all scenes
 * 
 * See https://docs.unity3d.com/ScriptReference/SceneManagement.Scene.html
 */
class Scene {
    gameObjects = []

    lastFrameMouseCollisions = []
    previousMouseDowns = []

    instantiate(gameObject, position) {
        this.gameObjects.push(gameObject)
        gameObject.components[0].position = position
        return gameObject
    }

    update() {

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