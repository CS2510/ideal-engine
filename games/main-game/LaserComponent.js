// Please carefully review the rules about academic integrity found in the academicIntegrity.md file found at the root of this project.
class LaserComponent extends Component{
    start(){
        // console.log("Start")
    }
    update(){
        // console.log("Update")
        this.transform.position.y -= Time.deltaTime * 40

        if(this.transform.position.y < 50){
            this.gameObject.destroy()
            //Globals.points++
            GameObject.find("Points Game Object").getComponent(PointsComponent).points++
        }
    }
    onDestroy(){
        // console.log("Destroy")
    }
}