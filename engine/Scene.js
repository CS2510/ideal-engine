/* Please carefully review the rules about academic integrity found in the academicIntegrity.md file found at the root of this project */

/**
 * Base class for all scenes
 * 
 * See https://docs.unity3d.com/ScriptReference/SceneManagement.Scene.html
 */
class Scene{
    gameObjects = []

    instantiate(gameObject, position){
        this.gameObjects.push(gameObject)
        gameObject.components[0].position = position
        return gameObject
    }

    update(){
        for(const gameObject of this.gameObjects){
            gameObject.update()
        }
    }

    draw(ctx){
        for(const gameObject of this.gameObjects){
            gameObject.draw(ctx)
        }
    }
}