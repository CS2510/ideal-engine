class PointsGameObject extends GameObject{
    constructor(){
        super()
        this.addComponent(new TextLabel())
        this.addComponent(new PointsComponent())
    }
}