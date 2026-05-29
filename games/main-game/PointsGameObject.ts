// Please carefully review the rules about academic integrity found in the academicIntegrity.md file found at the root of this project.

import { GameObject } from "../../engine/GameObject.js"
import { TextLabel } from "../../engine/components/TextLabel.js"
import { PointsComponent } from "./PointsComponent.js"

export class PointsGameObject extends GameObject {
    constructor() {
        super("Points Game Object")
        this.addComponent(new TextLabel())
        this.addComponent(new PointsComponent())
    }
}
