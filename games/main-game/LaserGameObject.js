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