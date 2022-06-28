import { RuneCoordinates } from "./positions";
import { Circle } from "./draw";
import { HandDrawnLine } from "./draw";
import { DrawLine } from './draw/line'
import { Point } from "./types";
import { TrunicConsonant, ValidConsonantPhonemes } from "./phonemes/consonants";
import { TrunicVowel, ValidVowelPhonemes } from "./phonemes/vowels";
import DrawPath from "./draw/path";

const canvas = document.querySelector('#canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
ctx.strokeStyle = 'black';
ctx.lineWidth = 3;

class DrawRune {
  consonantLocations: TrunicConsonant;
  vowelLocations: TrunicVowel;
  canvas: HTMLCanvasElement;
  drawKls: DrawPath;

  constructor(canvas: HTMLCanvasElement, drawKls = DrawLine) {
    const runeCoordinates = new RuneCoordinates(canvas);

    this.consonantLocations = new TrunicConsonant(runeCoordinates);
    this.vowelLocations = new TrunicVowel(runeCoordinates);
    this.canvas = canvas;
    this.drawKls = new drawKls(canvas);
  }

  get validPhonemes(): (ValidConsonantPhonemes | ValidVowelPhonemes)[] {
    return [...TrunicConsonant.valid, ...TrunicVowel.valid];
  }

  stroke(phoneme: ValidConsonantPhonemes | ValidVowelPhonemes) {
    const coordinates = this._getPheonemeStrokeCoordinates(phoneme);
    coordinates.forEach((points) => {
      this.drawKls.stroke(...points);
    });
  }

  private _getPheonemeStrokeCoordinates(phoneme: ValidConsonantPhonemes | ValidVowelPhonemes ) {
    const consonant = this.consonantLocations.getStrokeCoordinates(phoneme as ValidConsonantPhonemes);
    const vowel = this.vowelLocations.getStrokeCoordinates(phoneme as ValidVowelPhonemes);

    if (consonant.length > 0) {
      return consonant;
    } else if (vowel.length > 0) {
      return vowel;
    }

    console.warn(`Invalid phoneme: '${phoneme}'; could not find stroke coordinates.`);

    return [];
  }
}

function choice(l: any[]) {
  return l[Math.floor((Math.random()*l.length))];
}

const vowel = choice(TrunicVowel.valid);
const consonant = choice(TrunicConsonant.valid);

new DrawRune(canvas).stroke(consonant);
new DrawRune(canvas).stroke(vowel);

console.log(`Consonant: ${consonant}`);
console.log(`Vowel: ${vowel}`);


