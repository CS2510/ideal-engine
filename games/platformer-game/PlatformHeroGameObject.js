// Please carefully review the rules about academic integrity found in the academicIntegrity.md file found at the root of this project.
class PlatformHeroGameObject extends GameObject{
  constructor(){
    super("PlatformHeroGameObject")
    this.addComponent(new Polygon(), {points: [new Vector2(-10, -10), new Vector2(10, -10), new Vector2(10, 10), new Vector2(-10, 10)], fillStyle:"blue"})
  }
}