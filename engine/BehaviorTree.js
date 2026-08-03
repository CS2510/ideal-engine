class BehaviorTree{
    static SUCCEEDED = 0
    static FAILED = 1
    static RUNNING = 2
}

//Composite nodes
class Sequence{
    constructor(children){
        this.children = children
        this.index = 0
    }
    update(gameObject){
        const result = this.children[this.index].update(gameObject)
        if(result == BehaviorTree.SUCCEEDED){
            this.children[this.index].reset()
            this.index = (this.index+1) % this.children.length
        }
        return BehaviorTree.RUNNING
    }
    reset(){
        this.children[this.index].reset()
        this.index = 0
    }
}

class Parallel{
    constructor(children){
        this.children = children
    }
    update(gameObject){
        for(const child of this.children){
            child.update(gameObject)
        }
        return BehaviorTree.RUNNING
    }
    reset(){
        for(const child of this.children){
            child.reset()
        }
    }
}

//Common nodes

class Move{
    constructor(interval, velocity){
        this.interval = interval
        this.velocity = velocity
    }
    update(gameObject){
        if(!this.endTime)
            this.endTime = Time.time + this.interval
        if(Time.time > this.endTime)
            return BehaviorTree.SUCCEEDED
        else{
            gameObject.transform.position.plusEquals(this.velocity.times(Time.deltaTime))
            return BehaviorTree.RUNNING
        }
    }
    reset(){
        delete this.endTime
    }
}

class Wait{
    constructor(interval){
        this.interval = interval
    }
    update(gameObject){
        if(!this.endTime){
            this.endTime = Time.time + this.interval
        }
        if(Time.time > this.endTime){
           return BehaviorTree.SUCCEEDED
        }
        else{
            return BehaviorTree.RUNNING
        }

    }
    reset(){
        // this.endTime = undefined
        delete this.endTime
    }
}