class BatSymbolGameObject extends GameObject{
    constructor(){
        super("Bat Symbol Game Object")
        this.addComponent(new BatSymbolComponent())
        this.addComponent(new Polygon(), {points: [
            new Vector2(110, 90),
            new Vector2(145, 100),
            new Vector2(145, 90),
            new Vector2(155, 90),
            new Vector2(155, 100),
            new Vector2(190, 90),
            new Vector2(200, 140),
            new Vector2(175, 150),
            new Vector2(150, 140),
            new Vector2(125, 150),
            new Vector2(100, 140),
            new Vector2(110, 90)
        ]})
    }
    
}