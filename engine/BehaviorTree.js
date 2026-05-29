import { Time } from "./Time.js";
export class BehaviorTree {
    static SUCCEEDED = 0;
    static FAILED = 1;
    static RUNNING = 2;
}
/** A node that runs children in sequence, advancing when each succeeds */
export class Sequence {
    children;
    index = 0;
    constructor(children) {
        this.children = children;
    }
    update(gameObject) {
        const result = this.children[this.index].update(gameObject);
        if (result === BehaviorTree.SUCCEEDED) {
            this.children[this.index].reset();
            this.index = (this.index + 1) % this.children.length;
        }
        return BehaviorTree.RUNNING;
    }
    reset() {
        this.children[this.index].reset();
        this.index = 0;
    }
}
/** A node that runs all children every frame */
export class Parallel {
    children;
    constructor(children) {
        this.children = children;
    }
    update(gameObject) {
        for (const child of this.children) {
            child.update(gameObject);
        }
        return BehaviorTree.RUNNING;
    }
    reset() {
        for (const child of this.children) {
            child.reset();
        }
    }
}
/** A node that moves the game object for a given duration */
export class Move {
    interval;
    velocity;
    endTime;
    constructor(interval, velocity) {
        this.interval = interval;
        this.velocity = velocity;
    }
    update(gameObject) {
        if (this.endTime === undefined)
            this.endTime = Time.time + this.interval;
        if (Time.time > this.endTime)
            return BehaviorTree.SUCCEEDED;
        else {
            gameObject.transform.position.plusEquals(this.velocity.times(Time.deltaTime));
            return BehaviorTree.RUNNING;
        }
    }
    reset() {
        this.endTime = undefined;
    }
}
/** A node that waits for a given duration */
export class Wait {
    interval;
    endTime;
    constructor(interval) {
        this.interval = interval;
    }
    update(_gameObject) {
        if (this.endTime === undefined) {
            this.endTime = Time.time + this.interval;
        }
        if (Time.time > this.endTime) {
            return BehaviorTree.SUCCEEDED;
        }
        else {
            return BehaviorTree.RUNNING;
        }
    }
    reset() {
        this.endTime = undefined;
    }
}
