// Please carefully review the rules about academic integrity found in the academicIntegrity.md file found at the root of this project.

import { Component } from "../../engine/Component.js"
import { TextLabel } from "../../engine/components/TextLabel.js"

export class PointsComponent extends Component {
    points: number = 0

    update(): void {
        this.gameObject.getComponent(TextLabel)!.text = "Points " + this.points
    }
}
