import DrawPath from "./path";
import { Point } from "../types";

export class DrawLine extends DrawPath {
    draw(...points: Point[]): void {
        const [x0, y0] = points[0]; 
        const [x1, y1] = points[1];

        this.ctx?.moveTo(x0, y0);
        this.ctx?.lineTo(x1, y1);
    }
}