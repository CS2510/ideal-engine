// Please carefully review the rules about academic integrity found in the academicIntegrity.md file found at the root of this project.
import { Scene } from "../../engine/Scene.js";
import { Vector2 } from "../../engine/Vector2.js";
import { PlatformGameObject } from "./PlatformGameObject.js";
import { PlatformHeroGameObject } from "./PlatformHeroGameObject.js";
export class PlatformMainScene extends Scene {
    constructor() {
        super();
        this.instantiate(new PlatformGameObject(), new Vector2(500, 500));
        this.instantiate(new PlatformGameObject(), new Vector2(800, 500));
        this.instantiate(new PlatformGameObject(), new Vector2(650, 400));
        this.instantiate(new PlatformHeroGameObject(), new Vector2(525, 450));
    }
}
