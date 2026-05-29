// Please carefully review the rules about academic integrity found in the academicIntegrity.md file found at the root of this project.
import { Scene } from "../../engine/Scene.js";
import { Vector2 } from "../../engine/Vector2.js";
import { GameObject } from "../../engine/GameObject.js";
import { TextLabel } from "../../engine/components/TextLabel.js";
import { BatSymbolGameObject } from "./BatSymbolGameObject.js";
import { TriangleGameObject } from "./TriangleGameObject.js";
import { PointsGameObject } from "./PointsGameObject.js";
export class MainScene extends Scene {
    constructor() {
        super();
        this.instantiate(new BatSymbolGameObject(), new Vector2(0, 0));
        this.instantiate(new BatSymbolGameObject(), new Vector2(100, 100));
        this.instantiate(new TriangleGameObject(), new Vector2(300, 300));
        const title = this.instantiate(new GameObject("Title Text Game Object"), new Vector2(500, 500));
        title.addComponent(new TextLabel(), { text: "BAT ATTACK" });
        this.instantiate(new PointsGameObject(), new Vector2(20, 20));
    }
}
