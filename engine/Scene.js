class Scene{
    gameObjects = []

    instantiate(gameObject, position){
        this.gameObjects.push(gameObject)
        gameObject.components[0].position = position
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