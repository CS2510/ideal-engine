import { Component } from "../Component.js"
import { Vector2 } from "../Vector2.js"
import { Polygon } from "./Polygon.js"

/**
 * Class that indicates that a game object should be included in the collision
 * detection/resolution system.
 *
 * Make sure every game object that needs collision detection/resolution has a collider attached.
 */
export class Collider extends Component {
    /**
     * Whether the collider is a trigger.
     *
     * If a collider is a trigger it:
     * - does not do any collision resolution
     * - only calls onTriggerXXX events
     */
    isTrigger: boolean = false

    /**
     * List of custom points used for collision detection/resolution.
     *
     * If not set, the points from the attached Polygon are used.
     */
    customPoints: Vector2[] | undefined

    /**
     * Get the points associated with this collider.
     *
     * Returns customPoints if set, otherwise returns points from the attached Polygon.
     */
    get points(): Vector2[] {
        if (this.customPoints)
            return this.customPoints
        return this.gameObject.getComponent(Polygon)!.points
    }
}
