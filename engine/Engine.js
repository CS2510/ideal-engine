// Please carefully review the rules about academic integrity found in the academicIntegrity.md file found at the root of this project.

/**
 * The main engine class of our engine. It starts the game and runs the game loop.
 */
class Engine {
    /**
     * @type{Scene} The scene that is currently being updated and drawn
     */
    static currentScene

     /**
     * @type{HTMLCanvasElement} The canvas element we are drawing to
     */
    static canvas 

    /**
     * @type{CanvasRenderingContext2D} The 2D context we are drawing to
     */
    static ctx 

    /**
     * @type{Number} The number of milliseconds since the page loaded. 
     * 
     * Used to calculated deltaTime in gameLoop
     */
    static lastTimestamp

    /**
     * Start the game engine
     */
    static start() {
         // Grab the canvas element
        Engine.canvas = document.querySelector("#canv")
        
        //Get the context we will draw to
        Engine.ctx = Engine.canvas.getContext("2d")

         //Initialize the keyboard event listeners
        addEventListener("keydown", Input.keyDown)
        addEventListener("keyup", Input.keyUp)
        addEventListener("mousemove", Input.mouseMove)
        addEventListener("mousedown", Input.mouseDown)
        addEventListener("mouseup", Input.mouseUp)
        addEventListener("contextmenu", e=>e.preventDefault())

        //Start the game loop
        //By passing undefined, we signal to the gameLoop function that this is the first call of the game
        //Alternatively, we could call `requestAnimationFrame(gameLoop)` here instead
        Engine.gameLoop(undefined)
    }

     /**
     * Run the game loop. Updates and draws the game.
     * 
     * @param {Number} time The number of milliseconds since the page loaded. Used to calculated deltaTime 
     */
    static gameLoop(time){
        // Update deltaTime if this is at least the second frame of the game
       if(Engine.lastTimestamp){
            //Find the time since we last called gameLoop in milliseconds
            const diff = time - Engine.lastTimestamp
            //Convert from milliseconds to seconds (hopefully a small fraction of a second)
            const diffInSeconds = diff / 1000
            //Update deltaTime based on the time difference
            Time.deltaTime = diffInSeconds
            //Prepare for the next frame
            Engine.lastTimestamp = time
        }
        else{
            //If we didn't get a value for time (first frame of the game), don't change deltaTime, but prepare for the next frame
            Engine.lastTimestamp = time
        }

        //The actual game loop
        Engine.update()
        Engine.draw()

        Input.update()

        //Request to call the game loop again
        requestAnimationFrame(Engine.gameLoop)
    }

     /**
     * Update the current scene
     */
    static update(){
        Engine.currentScene.update()
    }

    /**
     * Draw the current scene
     */
    static draw(){
        Engine.canvas.width = window.innerWidth
        Engine.canvas.height = window.innerHeight
        
        Engine.currentScene.draw(Engine.ctx)
    }
}