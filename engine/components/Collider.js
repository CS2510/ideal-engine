
/**
 * Class that indicates that a game object should be included in the collision
 * detection/resolution system.  
 * 
 * Make sure *every* game object that needs to have collision detection/resolution 
 * has a collider attached.
 */
class Collider extends Component{

  /**
   * @type {boolean} Whether the collider is a trigger.
   * 
   * If a collider is a trigger it:
   * - does not do any collision resolution
   * - it only called onTriggerXXX events
   * 
   * Use a trigger for game objects that are like coins--objects that need 
   * collision resolution but don't "push" other game objects around.
   * 
   * *Important:* If a game object has a collider that is marked as a trigger, 
   * it will only do collision detection with game objects that are not triggers.
   * If two game objects that are triggers overlap, the collision detection system
   * ignores the overlap.
   */
    isTrigger = false

    /**
     * @type {[Vector2] | undefined} List of custom pointss used for collision
     * detection/resolution.
     * 
     * If the polygon attached to a game object has more points than is feasible
     * for quick collision detection/resolution, then set custom points to a shorter
     * list of points that approximates the shape.
     * 
     * If you don't need custom points, do not set this variable. It is ignored 
     * if it is falsey.
     */
    customPoints

    /**
     * Get the points associate with this collider.
     * 
     * If customPoints is set, then those values are returned.
     * 
     * If customPoints is not set, this searchers for a Polygon attached to 
     * the collider. If a Polygon is found, then it returns the points in the
     * Polygon.
     * 
     * If customPoints is not set and there is not a Polygon attached to this
     * game object, then you will have an error when the return value of this 
     * function is read.
     * 
     * @returns {[Vector2]}
     */
    get points(){
        if(this.customPoints)
          return this.customPoints
        return this.gameObject.getComponent(Polygon).points
    }
}