// Please carefully review the rules about academic integrity found in the academicIntegrity.md file found at the root of this project.
class PointsComponent extends Component{
    points = 0
    update(){
        this.gameObject.getComponent(TextLabel).text = "Points " + this.points
    }
}