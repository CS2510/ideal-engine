// Please carefully review the rules about academic integrity found in the academicIntegrity.md file found at the root of this project.


/**
 * Polygon component.
 * This is main class for drawing in our engine (other that TextLabel).
 * 
 * This class is meant to be a represent a simplified composition of the Renderer and Mesh classes
 * 
 * In order for a polygon to be drawn, it needs a fillStyle color and/or strokeStyle and a list of Vector2 point.
 * 
 * If you don't want a fill color, set fillStyle to "transparent"
 * 
 * If you don't want a stroke color, set the strokeStyle to "transparent"
 */
class Polygon extends Component {

  /**
   * @type {[Vector2]|[]} The points that define this polygon. 
   * 
   * Note that you do not need to "close" the polygon, i.e., you don't need to 
   * repeat the first point as the last point in your list.
   * 
   * If you attach a Collider to this game object, these points will be used for
   * collision detection/resolution unless you set customPoints on that Collider.
   * 
   */
  points = []

  /**
   * @type {String} The fill style of the polygon.
   * 
   * If you don't want the polygon to have a fill style, set this value to:
   * "transparent".
   * 
   * Defaults to "black" if not set.
   */
  fillStyle = "black"

  /**
   * @type {String} The storke style of the polygon.
   * 
   * If you don't want the polygon to have a stroke, set this value to "transparent"
   * or do not set it at all since "transparent" is the default value.
   * 
   * Defaults to "transparent" if not set.
   */
  strokeStyle = "transparent"

  /**
   * @type {Number} The line width of the stroke.
   * 
   * If strokeStyle is not set or is set to "transparent", changing this value 
   * will not make a difference since it will not be visible.
   * 
   * Defaults to 5 if not set.
   */
  lineWidth = 5

  /**
   * 
   * @param {CanvasRenderingContext2D} ctx 
   */
  draw(ctx) {
    ctx.save()
    // ctx.translate(this.transform.position.x, this.transform.position.y)


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