import DrawPath from "./path";
import { Point } from "../types";

export class HandDrawnLine extends DrawPath {
    draw(...points: Point[]): void {
        const [x0, y0] = points[0]; 
        const [x1, y1] = points[1];

        this.ctx?.moveTo(x0, y0)
    
        var d = Math.sqrt((x1-x0)*(x1-x0)+(y1-y0)*(y1-y0))
    
        var steps = d/25;
        if(steps < 4) {
            steps = 4;
        }
    
        // fuzzyness
        var f = 8.0;
        for(var i = 1; i <= steps; i++)
        {
            var t1 = i/steps;
            var t0 = t1-1/steps
            var xt0 = this.handDrawMovement(x0, x1, t0)
            var yt0 = this.handDrawMovement(y0, y1, t0)
            var xt1 = this.handDrawMovement(x0, x1, t1)
            var yt1 = this.handDrawMovement(y0, y1, t1)
            this.ctx?.quadraticCurveTo(this.fuzz(xt0, f), this.fuzz(yt0, f), xt1, yt1)
            this.ctx?.lineTo(xt1, yt1)
        }
    }

    // estimates the movement of the arm
    // x0: start
    // x1: end
    // t: step from 0 to 1
    private handDrawMovement(x0: number, x1: number, t: number): number {
        return x0 + (x0-x1)*(
                15*Math.pow(t, 4) -
                6*Math.pow(t, 5) -
                10*Math.pow(t,3)
        )
    }

    private fuzz(x: number, f: number): number {
        return x + Math.random()*f - f/2;
    }
}