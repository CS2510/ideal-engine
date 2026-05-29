// Please carefully review the rules about academic integrity found in the academicIntegrity.md file found at the root of this project.

import { Component } from "../Component.js"
import { Vector2 } from "../Vector2.js"

/**
 * Polygon component.
 * This is the main class for drawing in our engine (other than TextLabel).
 *
 * In order for a polygon to be drawn, it needs a fillStyle color and/or strokeStyle and a list of Vector2 points.
 */
export class Polygon extends Component {
    /**
     * The points that define this polygon.
     * Note that you do not need to "close" the polygon.
     */
    points: Vector2[] = []

    /**
     * The fill style of the polygon. Set to "transparent" for no fill.
     */
    fillStyle: string = "black"

    /**
     * The stroke style of the polygon. Set to "transparent" for no stroke.
     */
    strokeStyle: string = "transparent"

    /**
     * The line width of the stroke.
     */
    lineWidth: number = 5

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.save()

        ctx.beginPath()
        for (const point of this.points) {
            ctx.lineTo(point.x, point.y)
        }
        ctx.closePath()

        ctx.fillStyle = this.fillStyle
        ctx.strokeStyle = this.strokeStyle
        ctx.lineWidth = this.lineWidth

        ctx.stroke()
        ctx.fill()

        ctx.restore()
    }
}
