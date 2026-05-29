// Please carefully review the rules about academic integrity found in the academicIntegrity.md file found at the root of this project.
import { Component } from "../Component.js";
import { Vector2 } from "../Vector2.js";
/**
 * Transform component.
 * Each game object is required to have a transform. The transform should be added automatically at game object creation time by the engine.
 *
 * See https://docs.unity3d.com/6000.2/Documentation/ScriptReference/Transform.html
 */
export class Transform extends Component {
    position = new Vector2(0, 0);
    scale = new Vector2(1, 1);
    rotation = 0;
    parent;
    setParent(parentTransform) {
        this.parent = parentTransform;
    }
    getLocalMatrix() {
        const matrix = new DOMMatrix();
        matrix.translateSelf(this.position.x, this.position.y);
        matrix.scaleSelf(this.scale.x, this.scale.y);
        matrix.rotateSelf(this.rotation * 180 / Math.PI);
        return matrix;
    }
    getWorldMatrix() {
        if (!this.parent)
            return this.getLocalMatrix();
        return this.parent.getWorldMatrix().multiply(this.getLocalMatrix());
    }
}
