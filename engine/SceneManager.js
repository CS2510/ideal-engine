class SceneManager {
    static currentScene
    static nextScene

    static update() {
        if (SceneManager.nextScene) {
            for (const gameObject of SceneManager.currentScene.gameObjects) {
                gameObject.broadcastMessage("OnDestroy")
            }
            SceneManager.currentScene = new SceneManager.nextScene()
            SceneManager.nextScene = undefined
        }

    }

    static loadScene(newScene, additive = false) {
        if (!additive)
            SceneManager.nextScene = newScene
        else{
            const scene = new newScene()
            for(const gameObject of scene.gameObjects){
                SceneManager.currentScene.gameObjects.push(gameObject)
            }
        }
    }

    static getActiveScene() {
        return SceneManager.currentScene
    }
}