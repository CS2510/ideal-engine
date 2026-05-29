// Please carefully review the rules about academic integrity found in the academicIntegrity.md file found at the root of this project.
// Entry point extracted from index.html inline script
import { Scene } from "../../engine/Scene.js";
import { GameObject } from "../../engine/GameObject.js";
import { Component } from "../../engine/Component.js";
import { Vector2 } from "../../engine/Vector2.js";
import { Input } from "../../engine/Input.js";
import { Time } from "../../engine/Time.js";
import { Mathf } from "../../engine/Mathf.js";
import { SceneManager } from "../../engine/SceneManager.js";
import { Engine } from "../../engine/Engine.js";
import { Polygon } from "../../engine/components/Polygon.js";
import { Collider } from "../../engine/components/Collider.js";
import { RigidBody } from "../../engine/components/RigidBody.js";
import { TextLabel } from "../../engine/components/TextLabel.js";
import { Camera } from "../../engine/components/Camera.js";
const square = [
    new Vector2(-10, -10),
    new Vector2(10, -10),
    new Vector2(10, 10),
    new Vector2(-10, 10)
];
class WallsMainScene extends Scene {
    constructor() {
        super("gray");
        this.instantiate(new HorizontalWallGameObject(), new Vector2(200, 200));
        this.instantiate(new HorizontalWallGameObject(), new Vector2(400, 200));
        this.instantiate(new HorizontalWallGameObject(), new Vector2(200, 600));
        this.instantiate(new VerticalWallGameObject(), new Vector2(100, 300));
        this.instantiate(new VerticalWallGameObject(), new Vector2(100, 500));
        this.instantiate(new VerticalWallGameObject(), new Vector2(500, 300));
        this.instantiate(new VerticalWallGameObject(), new Vector2(500, 500));
        this.instantiate(new HeroGameObject(), new Vector2(400, 300));
        const text = this.instantiate(new GameObject("Text Game Object", { layer: "UI" }), new Vector2(50, 50));
        text.addComponent(new TextLabel(), { text: "Points" });
        const label = this.instantiate(new GameObject("Label Game Object", { layer: "UI" }), new Vector2(50, 10));
        label.addComponent(new TextLabel(), { text: "Hero" });
        const button = this.instantiate(new GameObject("Button Game Object", { layer: "UI" }), new Vector2(100, 100));
        button.addComponent(new Polygon(), { points: square, fillStyle: "blue" });
        button.addComponent(new Collider());
        button.addComponent(new ButtonComponent());
    }
}
class HorizontalWallGameObject extends GameObject {
    constructor() {
        super("HorizontalWallGameObject");
        this.addComponent(new Polygon(), {
            points: [new Vector2(-100, -10), new Vector2(100, -10), new Vector2(100, 10), new Vector2(-100, 10)]
        });
        this.addComponent(new Collider());
    }
}
class VerticalWallGameObject extends GameObject {
    constructor() {
        super("VerticalWallGameObject");
        this.addComponent(new Polygon(), {
            points: [new Vector2(-10, -100), new Vector2(10, -100), new Vector2(10, 100), new Vector2(-10, 100)]
        });
        this.addComponent(new Collider());
    }
}
class HeroGameObject extends GameObject {
    constructor() {
        super("HeroGameObject");
        this.addComponent(new Polygon(), { points: square, fillStyle: "red" });
        this.addComponent(new Collider());
        this.addComponent(new RigidBody());
        this.addComponent(new HeroController());
    }
}
class ButtonComponent extends Component {
    onMouseOver() {
        console.log("Over Button");
    }
}
class HeroController extends Component {
    speed = 100;
    onMouseOver() {
        console.log("Mouse Over");
    }
    fixedUpdate() {
        let offset = new Vector2(0, 0);
        if (Input.keysDown.includes("ArrowRight"))
            offset = offset.add(new Vector2(1, 0));
        if (Input.keysDown.includes("ArrowLeft"))
            offset = offset.add(new Vector2(-1, 0));
        if (Input.keysDown.includes("ArrowUp"))
            offset = offset.add(new Vector2(0, -1));
        if (Input.keysDown.includes("ArrowDown"))
            offset = offset.add(new Vector2(0, 1));
        const b = offset.normalized().times(Time.deltaTime * this.speed);
        this.transform.position = this.transform.position.add(b);
        const cameraGO = Camera.main;
        if (cameraGO) {
            if (cameraGO.transform.position.x - this.transform.position.x > 25) {
                cameraGO.transform.position.x = this.transform.position.x + 25;
            }
            if (cameraGO.transform.position.x - this.transform.position.x < -25) {
                cameraGO.transform.position.x = this.transform.position.x - 25;
            }
            cameraGO.transform.position.y = this.transform.position.y;
            cameraGO.transform.scale = new Vector2(1, 1);
            cameraGO.transform.position.x = Mathf.clamp(cameraGO.transform.position.x, 0, 600);
        }
    }
}
SceneManager.currentScene = new WallsMainScene();
Engine.start({ aspectRatio: 2, cameraWidth: 1000 });
