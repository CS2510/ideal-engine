// Please carefully review the rules about academic integrity found in the academicIntegrity.md file found at the root of this project.
class PlatformHeroGameObject extends GameObject {
  constructor() {
    super("PlatformHeroGameObject")
    this.addComponent(new Polygon(), { points: [new Vector2(-10, -20), new Vector2(10, -20), new Vector2(10, 20), new Vector2(-10, 20)], fillStyle: "blue" })
    this.addComponent(new Collider())
    this.addComponent(new RigidBody(), { gravity: new Vector2(0, 32) })
    this.addComponent(new HeroController())
  }
}

class HeroController extends Component {
  jumpTimer = 1000
  isGrounded = false
  start() {
    this.rigidBody = this.gameObject.getComponent(RigidBody)
    this.isGrounded = false
    this.doubleJump = false
    this.lastJump = -1000
  }
  handleCollision(other, mtv) {
    if (this.rigidBody.velocity.y > 0 && mtv.y < 0) {
      this.rigidBody.velocity.y = 0
      this.isGrounded = true
    }
    if (this.rigidBody.velocity.y < 0 && mtv.y > 0) {
      this.rigidBody.velocity.y = 0
    }
  }
  onCollisionEnter(other, mtv) {
    this.handleCollision(other, mtv)
  }
  onCollisionStay(other, mtv) {
    this.handleCollision(other, mtv)
  }
  fixedUpdate() {
    let direction = new Vector2(0, 0)
    const speed = 100


    if (Input.keysDown.includes("ArrowLeft")) direction = direction.add(new Vector2(-speed * Time.deltaTime, 0))
    if (Input.keysDown.includes("ArrowRight")) direction = direction.add(new Vector2(speed * Time.deltaTime, 0))
    this.transform.position = this.transform.position.add(direction)
    this.isGrounded = false
  }
  update() {
    const jumpStrength = -75  
    const minJumpTime = .1
    const maxJumpTime = .3

    if (Input.keysDownThisFrame.includes("Space") && (this.isGrounded || this.doubleJump)) {
      this.rigidBody.velocity.y = jumpStrength
      this.doubleJump = !this.doubleJump
      this.lastJump = Time.time
    }
    else if (Time.time - this.lastJump < minJumpTime) {
      this.rigidBody.velocity.y = jumpStrength
    }
    else if (Input.keysDown.includes("Space") && Time.time - this.lastJump < maxJumpTime) {
      this.rigidBody.velocity.y = jumpStrength
    }
  }

}