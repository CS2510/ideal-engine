class PointsGameObject extends GameObject{
    constructor(){
        super("Points Game Object")
        this.addComponent(new TextLabel())
        this.addComponent(new PointsComponent())
    }
}