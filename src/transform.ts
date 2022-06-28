import { RuneCoordinates } from "./positions";

export class CanvasTransforms {
    private coordinates: RuneCoordinates

    constructor(private canvas: HTMLCanvasElement, runeCoordinates: RuneCoordinates) { 
        this.canvas = canvas;
        this.coordinates = runeCoordinates;
    }

    get ctx(): CanvasRenderingContext2D | null{
        return this.canvas.getContext("2d");
    }

    rotate(degrees: number): void {
        // converts angle to radians
        const angle = degrees * (Math.PI / 180);
        // sets the origin to the center of the canvas
        this.ctx?.translate(this.coordinates.center.x, this.coordinates.center.y);
        // rotates the canvas
        this.ctx?.rotate(angle);
        // resets the origin to the top left corner of the canvas
        this.ctx?.translate(-this.coordinates.center.x, -this.coordinates.center.y);
    }

    resize() {
        let dpi = window.devicePixelRatio;
        let style_height = getComputedStyle(this.canvas).getPropertyValue("height").slice(0, -2);
        let style_width = getComputedStyle(this.canvas).getPropertyValue("width").slice(0, -2);
        this.canvas.setAttribute('height', `${Number(style_height) * dpi}`);
        this.canvas.setAttribute('width', `${Number(style_width) * dpi}`);
    }
}