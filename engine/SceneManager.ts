import type { Scene } from "./Scene.js"

export class SceneManager {
    static currentScene: Scene
    static nextScene: (new () => Scene) | undefined

    static update(): void {
        if (SceneManager.nextScene) {
            for (const gameObject of SceneManager.currentScene.gameObjects) {
                gameObject.sendMessage("OnDestroy")
            }
            SceneManager.currentScene = new SceneManager.nextScene()
            SceneManager.nextScene = undefined
        }
    }

    static loadScene(newScene: new () => Scene, additive: boolean = false): void {
        if (!additive) {
            SceneManager.nextScene = newScene
        } else {
            const scene = new newScene()
            for (const gameObject of scene.gameObjects) {
                gameObject.scene = SceneManager.currentScene
                SceneManager.currentScene.gameObjects.push(gameObject)
            }
        }
    }

    static getActiveScene(): Scene {
        return SceneManager.currentScene
    }
}
