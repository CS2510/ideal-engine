class PointsComponent extends Component{
    points = 0
    update(){
        this.gameObject.getComponent(TextLabel).text = "Points " + this.points
    }
}