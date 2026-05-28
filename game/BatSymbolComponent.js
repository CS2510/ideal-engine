class BatSymbolComponent extends Component {
    start() {

    }
    update() {

    }
    draw(ctx) {
        ctx.beginPath()
        ctx.moveTo(110, 90)
        ctx.lineTo(145, 100)
        ctx.lineTo(145, 90)
        ctx.lineTo(155, 90)
        ctx.lineTo(155, 100)
        ctx.lineTo(190, 90)
        ctx.lineTo(200, 140)
        ctx.lineTo(175, 150)
        ctx.lineTo(150, 140)
        ctx.lineTo(125, 150)
        ctx.lineTo(100, 140)
        ctx.lineTo(110, 90)


        ctx.lineWidth = 5
        ctx.strokeStyle = "purple"
        ctx.stroke()

        ctx.fillStyle = "red"
        ctx.fill()
    }

}