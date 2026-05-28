// Please carefully review the rules about academic integrity found in the academicIntegrity.md file found at the root of this project.

/**
 * Represents a 2D vector (direction) or 2D position
 * 
 * See https://docs.unity3d.com/6000.1/Documentation/ScriptReference/Vector2.html
 */
class Vector2 {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    x
    y

    add(other){
        return new Vector2(this.x+other.x, this.y+other.y)
    }

    minus(other){
        return new Vector2(this.x - other.x, this.y - other.y)
    }

    orthogonal(){
        return new Vector2(-this.y, this.x)
    }

    dot(other){
        return this.x*other.x+this.y*other.y
    }

    times(scalar){
        return new Vector2(this.x * scalar, this.y*scalar)
    }

    get magnitude(){
        return Math.sqrt(this.x**2+this.y**2)
    }

    normalized(){
        if(this.magnitude == 0) return new Vector2(0,0)
        return new Vector2(this.x/this.magnitude, this.y/this.magnitude)
    }

    clone(){
        return new Vector2(this.x, this.y)
    }
}