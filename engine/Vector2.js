class Vector2 {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    x
    y

    clone(){
        return new Vector2(this.x, this.y)
    }
}