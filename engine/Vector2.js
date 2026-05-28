// Please carefully review the rules about academic integrity found in the academicIntegrity.md file found at the root of this project.

/**
 * Represents a 2D vector (direction) or 2D position
 * 
 * See https://docs.unity3d.com/6000.1/Documentation/ScriptReference/Vector2.html
 */
class Vector2 {
    /**
     * Create a new vector
     * 
     * See https://docs.unity3d.com/6000.1/Documentation/ScriptReference/Vector2-ctor.html
     * 
     * @param {number} x The x coordinate of the vector
     * @param {number} y The y coordinate of the vector
     */
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    /**
     * The x component of the Vector
     * 
     * See https://docs.unity3d.com/6000.1/Documentation/ScriptReference/Vector2-x.html
     *
     * @type {number}
     */
    x

    /**
     * The y component of the Vector
     * 
     * See https://docs.unity3d.com/6000.1/Documentation/ScriptReference/Vector2-y.html
     *
     * @type {number}
     */
    y

    /**
     * Create a new vector that is the sum of this and the other vector
     * @param {Vector2} other The vector to which we are being added
     * @returns {Vector2} The result of the addition
     */
    add(other) {
        return new Vector2(this.x + other.x, this.y + other.y)
    }

    /**
     * Mutate ourself by adding another Vector2
     * @param {Vector2} other The Vector2 that we are adding to ourself
     */
    plusEquals(other) {
        this.x += other.x
        this.y += other.y
    }

    /**
     * Create a new vector that is the subtraction of this and the other vector
     * @param {Vector2} other The other vector
     * @returns {Vector2} The result of the subtraction
     */
    minus(other) {
        return new Vector2(this.x - other.x, this.y - other.y)
    }

    /**
     * Create a new Vector2 that is orthogonal to this.
     * Note that if this is (0,0), then the returned value is (0,0)
     * @returns {Vector2} An orthogonal vector
     */
    orthogonal() {
        return new Vector2(-this.y, this.x)
    }

    /**
     * Do the dot product between this and the other vector
     * @param {Vector2} other The other vector
     * @returns {number} The dot product
     */
    dot(other) {
        return this.x * other.x + this.y * other.y
    }

    /**
     * Create a new vector that is the result of multiplying each component of this by the scalar
     * @param {number} scalar The scalar
     * @returns {Vector2} The new vector
     */
    times(scalar) {
        return new Vector2(this.x * scalar, this.y * scalar)
    }

    /**
     * Get the magnitude of the current vector
     * @type {number}
     */
    get magnitude() {
        return Math.sqrt(this.x ** 2 + this.y ** 2)
    }

    /**
     * Create a new vector of length 1 in the same direction as this vector.
     * Note that if the vector has 0 length, this vector is cloned and returned.
     * @returns {Vector2} The normalized vector
     */
    normalized() {
        if (this.magnitude == 0) return new Vector2(0, 0)
        return new Vector2(this.x / this.magnitude, this.y / this.magnitude)
    }

    /**
     * Create a new Vector2 that has the same x and y as this
     * @returns {Vector2} The new vector
     */
    clone() {
        return new Vector2(this.x, this.y)
    }
}