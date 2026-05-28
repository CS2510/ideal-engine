// Please carefully review the rules about academic integrity found in the academicIntegrity.md file found at the root of this project.
class PlatformGameObject extends GameObject{
  constructor(){
    super("PlatformGameObject")
    this.addComponent(new Polygon(), {points: [new Vector2(-100, -10), new Vector2(100, -10), new Vector2(100, 10), new Vector2(-100, 10)], fillStyle: "gray"})
    this.addComponent(new Collider())
  }
}

