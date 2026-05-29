// Please carefully review the rules about academic integrity found in the academicIntegrity.md file found at the root of this project.

import { GameObject } from "../../engine/GameObject.js"
import { Polygon } from "../../engine/components/Polygon.js"
import { Vector2 } from "../../engine/Vector2.js"
import { Collider } from "../../engine/components/Collider.js"
import { RigidBody } from "../../engine/components/RigidBody.js"
import { Component } from "../../engine/Component.js"
import { Input } from "../../engine/Input.js"
import { Time } from "../../engine/Time.js"

export class PlatformHeroGameObject extends GameObject {
    constructor() {
        super("PlatformHeroGameObject")
        this.addComponent(new Polygon(), {
            points: [
                new Vector2(-10, -20),
                new Vector2(10, -20),
                new Vector2(10, 20),
                new Vector2(-10, 20)
            ],
            fillStyle: "blue"
        })
        this.addComponent(new Collider())
        this.addComponent(new RigidBody(), { gravity: new Vector2(0, 32) })
        this.addComponent(new HeroController())
    }
}

class HeroController extends Component {
    jumpTimer: number = 1000
    isGrounded: boolean = false
    private rigidBody!: RigidBody
    private doubleJump: boolean = false
    private lastJump: number = -1000

    start(): void {
        this.rigidBody = this.gameObject.getComponent(RigidBody)!
        this.isGrounded = false
        this.doubleJump = false
        this.lastJump = -1000
    }

    handleCollision(_other: GameObject, mtv: Vector2): void {
        if (this.rigidBody.velocity.y > 0 && mtv.y < 0) {
            this.rigidBody.velocity.y = 0
            this.isGrounded = true
        }
        if (this.rigidBody.velocity.y < 0 && mtv.y > 0) {
            this.rigidBody.velocity.y = 0
        }
    }

    onCollisionEnter(other: GameObject, mtv: Vector2): void {
        this.handleCollision(other, mtv)
    }

    onCollisionStay(other: GameObject, mtv: Vector2): void {
        this.handleCollision(other, mtv)
    }

    fixedUpdate(): void {
        let direction = new Vector2(0, 0)
        const speed = 100

        if (Input.keysDown.includes("ArrowLeft")) direction = direction.add(new Vector2(-speed * Time.deltaTime, 0))
        if (Input.keysDown.includes("ArrowRight")) direction = direction.add(new Vector2(speed * Time.deltaTime, 0))
        this.transform.position = this.transform.position.add(direction)
        this.isGrounded = false
    }

    update(): void {
        const jumpStrength = -75
        const minJumpTime = 0.1
        const maxJumpTime = 0.3

        if (Input.keysDownThisFrame.includes("Space") && (this.isGrounded || this.doubleJump)) {
            this.rigidBody.velocity.y = jumpStrength
            this.doubleJump = !this.doubleJump
            this.lastJump = Time.time
        } else if (Time.time - this.lastJump < minJumpTime) {
            this.rigidBody.velocity.y = jumpStrength
        } else if (Input.keysDown.includes("Space") && Time.time - this.lastJump < maxJumpTime) {
            this.rigidBody.velocity.y = jumpStrength
        }
    }
}
