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
class Polygon extends Component{
    points = []
    fillStyle = "black"
    strokeStyle = "transparent"
    lineWidth = 5
    draw(ctx){
        ctx.save()
        ctx.translate(this.transform.position.x, this.transform.position.y)
        
        ctx.beginPath()
        for(const point of this.points){
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