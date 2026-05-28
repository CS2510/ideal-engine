// Please carefully review the rules about academic integrity found in the academicIntegrity.md file found at the root of this project.
class BatSymbolComponent extends Component {
    start() {

    }
    update() {
        this.transform.position.x += Time.deltaTime * 30
        this.transform.position.y += Time.deltaTime * 30
    }

}