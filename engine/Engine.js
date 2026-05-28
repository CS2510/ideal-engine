class Engine {
    static currentScene

    static canvas 
    static ctx 

    static lastTimestamp

    static start() {
        Engine.canvas = document.querySelector("#canv")
        Engine.ctx = Engine.canvas.getContext("2d")

        addEventListener("keydown", Input.keyDown)
        addEventListener("keyup", Input.keyUp)

        Engine.gameLoop(undefined)
    }

    /**
     * 
     * @param {Number} time 
     */
    static gameLoop(time){
        // console.log(time)
        if(Engine.lastTimestamp){
            const diff = time - Engine.lastTimestamp
            const diffInSeconds = diff / 1000
            Time.deltaTime = diffInSeconds
            Engine.lastTimestamp = time
        }
        else{
            Engine.lastTimestamp = time
        }
        Engine.update()
        Engine.draw()
        requestAnimationFrame(Engine.gameLoop)
    }

    static update(){
        Engine.currentScene.update()
    }

    static draw(){
        Engine.canvas.width = window.innerWidth
        Engine.canvas.height = window.innerHeight
        
        Engine.currentScene.draw(Engine.ctx)
    }
}