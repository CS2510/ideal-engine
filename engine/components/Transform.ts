// Please carefully review the rules about academic integrity found in the academicIntegrity.md file found at the root of this project.

import { Component } from "../Component.js"
import { Vector2 } from "../Vector2.js"

/**
 * Transform component.
 * Each game object is required to have a transform. The transform should be added automatically at game object creation time by the engine.
 *
 * See https://docs.unity3d.com/6000.2/Documentation/ScriptReference/Transform.html
 */
export class Transform extends Component {
    position: Vector2 = new Vector2(0, 0)
    scale: Vector2 = new Vector2(1, 1)
    rotation: number = 0

    parent: Transform | undefined

    setParent(parentTransform: Transform): void {
        this.parent = parentTransform
    }

    getLocalMatrix(): DOMMatrix {
        const matrix = new DOMMatrix()
        matrix.translateSelf(this.position.x, this.position.y)
        matrix.scaleSelf(this.scale.x, this.scale.y)
        matrix.rotateSelf(this.rotation * 180 / Math.PI)
        return matrix
    }

    getWorldMatrix(): DOMMatrix {
        if (!this.parent)
            return this.getLocalMatrix()
        return this.parent.getWorldMatrix().multiply(this.getLocalMatrix())
    }
}
