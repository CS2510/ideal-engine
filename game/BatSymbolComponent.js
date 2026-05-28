class BatSymbolComponent extends Component {
    start() {

    }
    update() {
        this.transform.position.x += Time.deltaTime * 30
        this.transform.position.y += Time.deltaTime * 30
    }

}