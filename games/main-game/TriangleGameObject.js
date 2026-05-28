// Please carefully review the rules about academic integrity found in the academicIntegrity.md file found at the root of this project.
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