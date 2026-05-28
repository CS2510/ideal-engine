// Please carefully review the rules about academic integrity found in the academicIntegrity.md file found at the root of this project.
class LaserGameObject extends GameObject {
    constructor() {
        super("Laser Game Object")
        this.addComponent(new Polygon(), {
            points: [
                new Vector2(0, -10), 
                new Vector2(10, 10), 
                new Vector2(-10, 10)]
        })
        this.addComponent(new LaserComponent())
    }
}