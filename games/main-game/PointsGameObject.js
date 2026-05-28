// Please carefully review the rules about academic integrity found in the academicIntegrity.md file found at the root of this project.
class PointsGameObject extends GameObject{
    constructor(){
        super("Points Game Object")
        this.addComponent(new TextLabel())
        this.addComponent(new PointsComponent())
    }
}