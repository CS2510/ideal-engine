class TriangleComponent extends Component {
    start() {

    }
    update() {
        // console.log(Input.keysDown)
        if(Input.keysDown.includes("ArrowRight")){
            this.transform.position.x++
        }
        if(Input.keysDown.includes("ArrowLeft")){
            this.transform.position.x--
        }
    }
    draw(ctx) {
        ctx.save()
        ctx.translate(this.transform.position.x, this.transform.position.y)

        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.lineTo(50, 50)
        ctx.lineTo(-50, 50)
        ctx.closePath()


        ctx.lineWidth = 5
        ctx.strokeStyle = "green"
        ctx.stroke()

        ctx.fillStyle = "tangerine"
        ctx.fill()

        ctx.restore()
    }
}