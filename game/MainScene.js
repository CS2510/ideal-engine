class MainScene extends Scene{
    constructor(){
        super()
        this.instantiate(new BatSymbolGameObject(), new Vector2(0, 0))
        this.instantiate(new BatSymbolGameObject(), new Vector2(100, 100))

        this.instantiate(new TriangleGameObject(), new Vector2(300, 300))
    }
}