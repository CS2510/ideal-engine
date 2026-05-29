// Please carefully review the rules about academic integrity found in the academicIntegrity.md file found at the root of this project.
import { GameObject } from "../../engine/GameObject.js";
import { Polygon } from "../../engine/components/Polygon.js";
import { Vector2 } from "../../engine/Vector2.js";
import { Collider } from "../../engine/components/Collider.js";
export class PlatformGameObject extends GameObject {
    constructor() {
        super("PlatformGameObject");
        this.addComponent(new Polygon(), {
            points: [
                new Vector2(-100, -10),
                new Vector2(100, -10),
                new Vector2(100, 10),
                new Vector2(-100, 10)
            ],
            fillStyle: "gray"
        });
        this.addComponent(new Collider());
    }
}
