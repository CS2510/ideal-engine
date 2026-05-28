class PlatformMainScene extends Scene{
  constructor(){
    super()
    this.instantiate(new PlatformGameObject(), new Vector2(500, 500))
    this.instantiate(new PlatformGameObject(), new Vector2(800, 500))
    this.instantiate(new PlatformGameObject(), new Vector2(650, 400))

    this.instantiate(new PlatformHeroGameObject(), new Vector2(525, 450))

  }
}