import DrawPath from "../draw/path";
import { RuneCoordinates } from "../positions";

type VowelEdgeNames = keyof TrunicVowel["edge_stroke_coordinates"]
export type ValidVowelPhonemes = 
      "A" 
    | "AR" 
    | "AH" 
    | "AY" 
    | "E" 
    | "EE" 
    | "EER" 
    | "EH" 
    | "ERE" 
    | "I" 
    | "IE" 
    | "IR" 
    | "OH" 
    | "OI" 
    | "OO" 
    | "OU" 
    | "OW" 
    | "ORE";

export class TrunicVowel {
    static get stroke_paths(): Record<ValidVowelPhonemes, VowelEdgeNames[]> {
        return {
            // A as in "Glass"
            "A": ["v1", "v0", "v2"],
            // AR as in "Arm"
            "AR": ["v1", "v0", "v3", "v4"],
            // AH as in "Swan"
            "AH": ["v2", "v1"],
            // AW as in "Paw"
            // "AW": [], (DOES NOT EXIST IN GAME, USES "AH" INSTEAD)
            // AY as in "Bay"
            "AY": ["v1"],
            // E as in "End"
            "E": ["v2", "v3", "v4"],
            // EE as in "Bee"
            "EE": ["v1", "v2", "v3", "v4"],
            // EER as in "Beer"
            "EER": ["v1", "v2", "v4"],
            // EH as in "The"
            "EH": ["v0", "v1"],
            // ERE as in "Air"
            "ERE": ["v2", "v4"],
            // I as in "bit"
            "I": ["v3", "v4"],
            // IE as in "Guy"
            "IE": ["v0"],
            // IR as in "Bird"
            "IR": ["v0", "v2", "v3", "v4"],
            // OH as in "Toe"
            "OH": ["v0", "v1", "v2", "v3", "v4"],
            // OI as in "toy"
            "OI": ["v3"],
            // OO as in "Too"
            "OO": ["v0", "v1", "v2", "v3"],
            // OU as in "Wolf"
            "OU": ["v2", "v3"],
            // OW as in "How",
            "OW": ["v4"],
            // UH as in "bug" (DOES NOT EXIST IN GAME, USES "EH" INSTEAD)
            // "UH": [],
            // ORE as in "Your"
            "ORE": ["v0", "v1", "v2", "v4"]
        }
    }

    static get valid() {
        return Object.keys(TrunicVowel.stroke_paths) as ValidVowelPhonemes[];
    }

    constructor(private coordinates: RuneCoordinates) {
        this.coordinates = coordinates;
    }

    // Vowels only consume the outer-most edges of the rune.
    // with the farthest right edge being reserved for the next vowel. 
    // Returns the [start, stop] coordinates of valid vowel strokes 
    // starting from the top right-most edge and going counter clockwise. 
    // e.g:
    //                o
    //               / \
    //     v1 Edge  /   \   v0 Edge
    //             /     \
    //            o       o
    //            |   o   
    // v2 Edge ---|-----------       
    //            |   o   
    //            o       o
    //             \     /
    //    v3 Edge   \   /   v4 Edge
    //               \ /
    //                o
    private get edge_stroke_coordinates() {
        return {
            "v0": [
                this.coordinates.quadLocations.topHalf.right, 
                this.coordinates.quadLocations.topHalf.upper, 
            ],
            "v1": [
                this.coordinates.quadLocations.topHalf.upper, 
                this.coordinates.quadLocations.topHalf.left, 
            ],
            "v2": [
                this.coordinates.quadLocations.topHalf.left, 
                this.coordinates.quadLocations.bottomHalf.left
            ],
            "v3": [
                this.coordinates.quadLocations.bottomHalf.left, 
                this.coordinates.quadLocations.bottomHalf.lower, 
            ],
            "v4": [
                this.coordinates.quadLocations.bottomHalf.right, 
                this.coordinates.quadLocations.bottomHalf.lower, 
            ],
        }
    }

    getStrokeCoordinates(phoneme: ValidVowelPhonemes) {
        const strokePath = TrunicVowel.stroke_paths[phoneme] ?? [];
        return strokePath.map(
            edgeName => this.edge_stroke_coordinates[edgeName as VowelEdgeNames]
        );
    }
}