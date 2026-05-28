// Please carefully review the rules about academic integrity found in the academicIntegrity.md file found at the root of this project.
class TriangleComponent extends Component {
    speed = 60

    timeSinceLastFire = 1
    timeBetweenFire = 1

    start() {

    }
    update() {
        // console.log(Input.keysDown)
        // console.log(Input.mousePosition)
        if(Input.mousePosition){
            console.log(Collisions.isCollision(Input.mousePosition, this.gameObject))
        }


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