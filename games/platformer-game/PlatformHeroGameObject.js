class PlatformHeroGameObject extends GameObject{
  constructor(){
    super("PlatformHeroGameObject")
    this.addComponent(new Polygon(), {points: [new Vector2(-10, -10), new Vector2(10, -10), new Vector2(10, 10), new Vector2(-10, 10)], fillStyle:"blue"})
  }
}