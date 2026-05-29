// Please carefully review the rules about academic integrity found in the academicIntegrity.md file found at the root of this project.
/**
 * Represents a 2D vector (direction) or 2D position
 *
 * See https://docs.unity3d.com/6000.1/Documentation/ScriptReference/Vector2.html
 */
export class Vector2 {
    /**
     * The x component of the vector
     * See https://docs.unity3d.com/6000.1/Documentation/ScriptReference/Vector2-x.html
     */
    x;
    /**
     * The y component of the vector
     * See https://docs.unity3d.com/6000.1/Documentation/ScriptReference/Vector2-y.html
     */
    y;
    /**
     * Create a new vector
     * See https://docs.unity3d.com/6000.1/Documentation/ScriptReference/Vector2-ctor.html
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    /**
     * Create a new vector that is the sum of this and the other vector
     */
    add(other) {
        return new Vector2(this.x + other.x, this.y + other.y);
    }
    /**
     * Mutate ourself by adding another Vector2
     */
    plusEquals(other) {
        this.x += other.x;
        this.y += other.y;
    }
    /**
     * Create a new vector that is the subtraction of this and the other vector
     */
    minus(other) {
        return new Vector2(this.x - other.x, this.y - other.y);
    }
    /**
     * Create a new Vector2 that is orthogonal to this.
     * Note that if this is (0,0), then the returned value is (0,0)
     */
    orthogonal() {
        return new Vector2(-this.y, this.x);
    }
    /**
     * Do the dot product between this and the other vector
     */
    dot(other) {
        return this.x * other.x + this.y * other.y;
    }
    /**
     * Create a new vector that is the result of multiplying each component by the scalar
     */
    times(scalar) {
        return new Vector2(this.x * scalar, this.y * scalar);
    }
    /**
     * Get the magnitude of the current vector
     */
    get magnitude() {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }
    /**
     * Create a new vector of length 1 in the same direction as this vector.
     * Note that if the vector has 0 length, a zero vector is returned.
     */
    normalized() {
        if (this.magnitude === 0)
            return new Vector2(0, 0);
        return new Vector2(this.x / this.magnitude, this.y / this.magnitude);
    }
    /**
     * Create a new Vector2 that has the same x and y as this
     */
    clone() {
        return new Vector2(this.x, this.y);
    }
    toDOMPoint() {
        return new DOMPoint(this.x, this.y);
    }
    static fromDOMPoint(domPoint) {
        return new Vector2(domPoint.x, domPoint.y);
    }
}
