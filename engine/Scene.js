class Scene {
    gameObjects = []

    instantiate(gameObject, position) {
        this.gameObjects.push(gameObject)
        gameObject.components[0].position = position
        return gameObject
    }

    update() {
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
    Engine.currentScene.instantiate(gameObject, position)
}