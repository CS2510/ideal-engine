// Please carefully review the rules about academic integrity found in the academicIntegrity.md file found at the root of this project.

import { Input } from "./Input.js"
import { SceneManager } from "./SceneManager.js"
import { Time } from "./Time.js"

interface EngineOptions {
    layers?: string[]
    collisionLayers?: [string, string][]
    aspectRatio?: number
    cameraWidth?: number
}

/**
 * The main engine class. It starts the game and runs the game loop.
 */
export class Engine {
    /**
     * The canvas element we are drawing to
     */
    static canvas: HTMLCanvasElement

    /**
     * The 2D context we are drawing to
     */
    static ctx: CanvasRenderingContext2D

    /**
     * The number of milliseconds since the page loaded.
     * Used to calculate deltaTime in gameLoop.
     */
    static lastTimestamp: number | undefined

    static layers: string[] = ["default", "UI"]

    static collisionLayers: [string, string][] = []

    static aspectRatio: number | undefined

    static letterBoxWidth: number = 0

    static letterBoxHeight: number = 0

    static cameraWidth: number = 2000

    /**
     * Start the game engine
     */
    static start(options?: EngineOptions): void {
        if (options) {
            if (options.layers) {
                Engine.layers.push(...options.layers)
            }
            if (options.collisionLayers) {
                Engine.collisionLayers.push(...options.collisionLayers)
            }
            Engine.aspectRatio = options.aspectRatio
            Engine.cameraWidth = options.cameraWidth ?? 2000
        }
        console.log(Engine.layers)

        Engine.canvas = document.querySelector("#canv") as HTMLCanvasElement
        Engine.ctx = Engine.canvas.getContext("2d") as CanvasRenderingContext2D

        addEventListener("keydown", Input.keyDown)
        addEventListener("keyup", Input.keyUp)
        addEventListener("mousemove", Input.mouseMove)
        addEventListener("mousedown", Input.mouseDown)
        addEventListener("mouseup", Input.mouseUp)
        addEventListener("contextmenu", e => e.preventDefault())

        Engine.gameLoop(undefined)
    }

    /**
     * Run the game loop. Updates and draws the game.
     */
    static gameLoop(time: number | undefined): void {
        if (Engine.lastTimestamp !== undefined && time !== undefined) {
            const diff = time - Engine.lastTimestamp
            const diffInSeconds = diff / 1000
            Time.deltaTime = Math.min(1 / 60, diffInSeconds)
            Engine.lastTimestamp = time
        } else {
            Engine.lastTimestamp = time
        }

        Engine.update()
        Engine.draw()

        Input.update()
        Time.update()
        SceneManager.update()

        requestAnimationFrame(Engine.gameLoop)
    }

    /**
     * Update the current scene
     */
    static update(): void {
        SceneManager.getActiveScene().update()
    }

    /**
     * Draw the current scene
     */
    static draw(): void {
        Engine.canvas.width = window.innerWidth
        Engine.canvas.height = window.innerHeight

        SceneManager.getActiveScene().draw(Engine.ctx)
    }
}
