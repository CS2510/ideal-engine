// Please carefully review the rules about academic integrity found in the academicIntegrity.md file found at the root of this project.
import { Component } from "../Component.js";
/**
 * Text component.
 * The main drawing component other than Polygon.
 *
 * To be drawn, this component needs to have a fillStyle color, a string text, and a font in CSS font format.
 */
export class TextLabel extends Component {
    font = "20px Times";
    fillStyle = "black";
    text = "[No Text]";
    draw(ctx) {
        ctx.save();
        ctx.font = this.font;
        ctx.fillStyle = this.fillStyle;
        ctx.fillText(this.text, 0, 0);
        ctx.restore();
    }
}
