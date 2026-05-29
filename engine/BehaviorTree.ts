import { Time } from "./Time.js"
import { Vector2 } from "./Vector2.js"
import type { GameObject } from "./GameObject.js"

export class BehaviorTree {
    static readonly SUCCEEDED = 0
    static readonly FAILED = 1
    static readonly RUNNING = 2
}

/** A node that runs children in sequence, advancing when each succeeds */
export class Sequence {
    children: BehaviorNode[]
    index: number = 0

    constructor(children: BehaviorNode[]) {
        this.children = children
    }

    update(gameObject: GameObject): number {
        const result = this.children[this.index].update(gameObject)
        if (result === BehaviorTree.SUCCEEDED) {
            this.children[this.index].reset()
            this.index = (this.index + 1) % this.children.length
        }
        return BehaviorTree.RUNNING
    }

    reset(): void {
        this.children[this.index].reset()
        this.index = 0
    }
}

/** A node that runs all children every frame */
export class Parallel {
    children: BehaviorNode[]

    constructor(children: BehaviorNode[]) {
        this.children = children
    }

    update(gameObject: GameObject): number {
        for (const child of this.children) {
            child.update(gameObject)
        }
        return BehaviorTree.RUNNING
    }

    reset(): void {
        for (const child of this.children) {
            child.reset()
        }
    }
}

/** Interface for all behavior tree nodes */
export interface BehaviorNode {
    update(gameObject: GameObject): number
    reset(): void
}

/** A node that moves the game object for a given duration */
export class Move implements BehaviorNode {
    interval: number
    velocity: Vector2
    private endTime: number | undefined

    constructor(interval: number, velocity: Vector2) {
        this.interval = interval
        this.velocity = velocity
    }

    update(gameObject: GameObject): number {
        if (this.endTime === undefined)
            this.endTime = Time.time + this.interval
        if (Time.time > this.endTime)
            return BehaviorTree.SUCCEEDED
        else {
            gameObject.transform.position.plusEquals(this.velocity.times(Time.deltaTime))
            return BehaviorTree.RUNNING
        }
    }

    reset(): void {
        this.endTime = undefined
    }
}

/** A node that waits for a given duration */
export class Wait implements BehaviorNode {
    interval: number
    private endTime: number | undefined

    constructor(interval: number) {
        this.interval = interval
    }

    update(_gameObject: GameObject): number {
        if (this.endTime === undefined) {
            this.endTime = Time.time + this.interval
        }
        if (Time.time > this.endTime) {
            return BehaviorTree.SUCCEEDED
        } else {
            return BehaviorTree.RUNNING
        }
    }

    reset(): void {
        this.endTime = undefined
    }
}
