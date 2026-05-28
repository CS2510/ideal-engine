class Engine {
    static currentScene

    static canvas 
    static ctx 

    static start() {
        Engine.canvas = document.querySelector("#canv")
        Engine.ctx = Engine.canvas.getContext("2d")

        addEventListener("keydown", Input.keyDown)
        addEventListener("keyup", Input.keyUp)

        Engine.gameLoop()
    }

    static gameLoop(){
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