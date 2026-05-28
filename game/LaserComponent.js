class LaserComponent extends Component{
    start(){
        console.log("Start")
    }
    update(){
        console.log("Update")
        this.transform.position.y -= Time.deltaTime * 40

        if(this.transform.position.y < 50){
            this.gameObject.destroy()
            Globals.points++
        }
    }
    onDestroy(){
        console.log("Destroy")
    }
}