// Please carefully review the rules about academic integrity found in the academicIntegrity.md file found at the root of this project.

import { GameObject } from "../../engine/GameObject.js"
import { Polygon } from "../../engine/components/Polygon.js"
import { Vector2 } from "../../engine/Vector2.js"
import { TriangleComponent } from "./TriangleComponent.js"

export class TriangleGameObject extends GameObject {
    constructor() {
        super("Triangle Game Object")
        this.addComponent(new TriangleComponent())
        this.addComponent(new Polygon(), {
            points: [
                new Vector2(0, 0),
                new Vector2(50, 50),
                new Vector2(-50, 50)
            ],
            strokeStyle: "green"
        })
    }
}
