class RigidBody extends Component{
    velocity = new Vector2(0,0)
    gravity = new Vector2(0,0)
    acceleration = new Vector2(0,0) //Only instantaneous acceleration
    fixedUpdate(){
        this.velocity.plusEquals(this.gravity.add(this.acceleration).times(Time.deltaTime))
        this.transform.position.plusEquals(this.velocity.times(Time.deltaTime))
        this.acceleration = new Vector2(0,0)
    }
}