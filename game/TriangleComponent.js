class TriangleComponent extends Component {
    speed = 60

    timeSinceLastFire = 1
    timeBetweenFire = 1

    start() {

    }
    update() {
        // console.log(Input.keysDown)
        if(Input.keysDown.includes("ArrowRight")){
            this.transform.position.x += Time.deltaTime * this.speed
        }
        if(Input.keysDown.includes("ArrowLeft")){
            this.transform.position.x += - Time.deltaTime * this.speed
        }

        this.timeSinceLastFire += Time.deltaTime
        if(this.timeSinceLastFire > this.timeBetweenFire){
            this.timeSinceLastFire = 0
            instantiate(new LaserGameObject(), this.transform.position.clone())
        }
    }
    
}