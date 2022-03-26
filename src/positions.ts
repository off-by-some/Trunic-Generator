import { Point } from "./types";

type QuadLocations = {
    topHalf: {
        upper: Point,
        lower: Point,
        right: Point,
        left: Point,
    },
    bottomHalf: {
        upper: Point,
        lower: Point,
        right: Point,
        left: Point,
    },
}

export class RuneCoordinates {
    static lineLength: number = 50

    constructor(private canvas: HTMLCanvasElement) { 
        this.canvas = canvas;
    }

    get center(): { x: number, y: number } {
        return {
            x: this.canvas.width / 2,
            y: this.canvas.height / 2,
        }
    }

    get lineLength(): number {
        return RuneCoordinates.lineLength;
    }

    get phoneticDividerLocation(): { start: Point, end: Point } {
        return {
            start: [this.runeBoundaries.left, this.center.y],
            end: [this.runeBoundaries.right, this.center.y],
        }
    }

    get runeBoundaries() {
        return {
            left: this.center.x - this.lineLength,
            right: this.center.x + this.lineLength,
            top: this.center.y - this.lineLength,
            bottom: this.center.y + this.lineLength,
        }
    }

    get phonetic_divider(): { start: Point, end: Point } {
        return {
            start: [this.runeBoundaries.left, this.center.y],
            end: [this.runeBoundaries.right, this.center.y],
        }
    }

    get quadLocations(): QuadLocations {
        const centerBetweenPoints = (upper: Point, lower: Point) => (upper[1] + lower[1]) / 2
        const quadLocations: QuadLocations = {
            topHalf: {
                upper: [this.center.x, this.runeBoundaries.top],
                lower: [this.center.x, this.center.y - (this.lineLength / 4)],
            },
            bottomHalf: {
                upper: [this.center.x, this.center.y + (this.lineLength / 4)],
                lower: [this.center.x, this.runeBoundaries.bottom]
            }
        } as QuadLocations
    
        const bottomHalfQuadCenterY = centerBetweenPoints(
            quadLocations.bottomHalf.upper, 
            quadLocations.bottomHalf.lower
        )
        const topHalfQuadCenterY = centerBetweenPoints(
            quadLocations.topHalf.upper, 
            quadLocations.topHalf.lower
        )

        quadLocations.topHalf.right = [this.runeBoundaries.right, topHalfQuadCenterY]
        quadLocations.topHalf.left = [this.runeBoundaries.left, topHalfQuadCenterY]
        quadLocations.bottomHalf.right = [this.runeBoundaries.right, bottomHalfQuadCenterY]
        quadLocations.bottomHalf.left = [this.runeBoundaries.left, bottomHalfQuadCenterY]
    
        return quadLocations;
    }
}