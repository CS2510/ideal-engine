class PlatformGameObject extends GameObject{
  constructor(){
    super("PlatformGameObject")
    this.addComponent(new Polygon(), {points: [new Vector2(-100, -10), new Vector2(100, -10), new Vector2(100, 10), new Vector2(-100, 10)], fillStyle: "gray"})
  }
}