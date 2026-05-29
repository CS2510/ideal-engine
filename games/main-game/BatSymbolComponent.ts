// Please carefully review the rules about academic integrity found in the academicIntegrity.md file found at the root of this project.

import { Component } from "../../engine/Component.js"
import { Time } from "../../engine/Time.js"

export class BatSymbolComponent extends Component {
    start(): void {
        // intentionally empty
    }

    update(): void {
        this.transform.position.x += Time.deltaTime * 30
        this.transform.position.y += Time.deltaTime * 30
    }
}
