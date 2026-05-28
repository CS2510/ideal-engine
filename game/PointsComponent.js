class PointsComponent extends Component{
    update(){
        this.gameObject.getComponent(TextLabel).text = "Points " + Globals.points
    }
}