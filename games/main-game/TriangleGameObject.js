class TriangleGameObject extends GameObject {
    constructor() {
        super("Triangle Game Object")
        this.addComponent(new TriangleComponent())
        this.addComponent(new Polygon(), {
            points: [
                new Vector2(0, 0),
                new Vector2(50, 50),
                new Vector2(-50, 50)
            ],
            strokeStyle: "green"
        })
    }
}