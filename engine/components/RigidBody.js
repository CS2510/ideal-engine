import { Component } from "../Component.js";
import { Vector2 } from "../Vector2.js";
import { Time } from "../Time.js";
export class RigidBody extends Component {
    velocity = new Vector2(0, 0);
    gravity = new Vector2(0, 0);
    /** Only instantaneous acceleration */
    acceleration = new Vector2(0, 0);
    fixedUpdate() {
        this.velocity.plusEquals(this.gravity.add(this.acceleration).times(Time.deltaTime));
        this.transform.position.plusEquals(this.velocity.times(Time.deltaTime));
        this.acceleration = new Vector2(0, 0);
    }
}
