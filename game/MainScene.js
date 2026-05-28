class MainScene extends Scene{
    constructor(){
        super()
        this.instantiate(new BatSymbolGameObject(), new Vector2(0, 0))
        this.instantiate(new BatSymbolGameObject(), new Vector2(100, 100))

        this.instantiate(new TriangleGameObject(), new Vector2(300, 300))

        //Example of an anonymous game object
        const title = this.instantiate(new GameObject("Title Text Game Object"), new Vector2( 500, 500))
        title.addComponent(new TextLabel(), {text: "BAT ATTACK"})

        this.instantiate(new PointsGameObject(), new Vector2(20, 20))
    }
}