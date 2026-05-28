class Collider extends Component{
    isTrigger = false
    customPoints
    get points(){
        if(this.customPoints)
          return this.customPoints
        return this.gameObject.getComponent(Polygon).points
    }
}