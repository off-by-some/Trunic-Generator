import DrawPath from "./path";
import { Point } from "../types";

export class Circle extends DrawPath {
    draw(...points: Point[]): void {
        points.forEach(([x0, y0]: Point) => {
            this.ctx?.beginPath();
            this.ctx?.arc(x0, y0, 2, 0, 2 * Math.PI);
            this.ctx?.fill();
        });
    }
}

