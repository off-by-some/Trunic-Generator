import { Point } from '../types';

export interface IDrawPath {
    stroke(...points: Point[]): void;
}

abstract class DrawPath implements IDrawPath {
    canvas: HTMLCanvasElement;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
    }

    get ctx(): CanvasRenderingContext2D | null {
        return this.canvas.getContext('2d');
    }

    setCtxProps() {
        if (this.ctx == null) return;

        this.ctx.lineWidth = 2;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        this.ctx.fillStyle = "blue";
    }

    stroke(...points: Point[]): void {
        this.setCtxProps();
        this.ctx?.beginPath();
        this.draw(...points);
        this.ctx?.stroke()
    }
    
    draw(...points: Point[]): void {
        throw new Error('Method not implemented.');
    }
}

export default DrawPath;