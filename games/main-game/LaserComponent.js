// Please carefully review the rules about academic integrity found in the academicIntegrity.md file found at the root of this project.
import { Component } from "../../engine/Component.js";
import { Time } from "../../engine/Time.js";
import { GameObject } from "../../engine/GameObject.js";
import { PointsComponent } from "./PointsComponent.js";
export class LaserComponent extends Component {
    start() {
        // intentionally empty
    }
    update() {
        this.transform.position.y -= Time.deltaTime * 40;
        if (this.transform.position.y < 50) {
            this.gameObject.destroy();
            const pointsComp = GameObject.find("Points Game Object")?.getComponent(PointsComponent);
            if (pointsComp)
                pointsComp.points++;
        }
    }
    onDestroy() {
        // intentionally empty
    }
}
