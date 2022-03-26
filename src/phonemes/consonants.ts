import DrawPath from "../draw/path";
import { RuneCoordinates } from "../positions";

type ConsonantEdgeNames = keyof TrunicConsonant["edge_stroke_coordinates"]
type ValidConsonantPhonemes = 
      "B"
    | "CH"
    | "D"
    | "F"
    | "G"
    | "H"
    | "J"
    | "K"
    | "L"
    | "M"
    | "N"
    | "NG"
    | "P"
    | "R"
    | "S"
    | "SH"
    | "T"
    | "TH"
    | "TH2"
    | "V"
    | "W"
    | "Y"
    | "Z"
    | "ZH";

export class TrunicConsonant {
    constructor(private coordinates: RuneCoordinates) {
        this.coordinates = coordinates;
    }

    // Consonants, inversely from vowels, only occupy the inner edges of the rune.
    // Returns the [start, stop] coordinates of valid consonants strokes 
    // starting from the top right-most edge and going counter clockwise. 
    // e.g:
    //                o
    //                |
    //                |  c1 Edge
    //                |
    //                |
    //         o      |      o
    //          \     |     /
    //   c2 Edge \    |    /  c0 Edge
    //            \   |   /
    //             \  |  /
    //                o
    //      ---------------------
    //                o    
    //             /  |  \  
    //            /   |   \     
    //   c5 Edge /    |    \   c3 Edge
    //          /     |     \
    //         o      |      o
    //                |
    //                |
    //                |  c4 Edge
    //                |
    //                o
    private get edge_stroke_coordinates() {
        return {
            "c0": [
                this.coordinates.quadLocations.topHalf.lower,
                this.coordinates.quadLocations.topHalf.right,
            ],
            "c1": [
                this.coordinates.quadLocations.topHalf.lower,
                this.coordinates.quadLocations.topHalf.upper,
            ],
            "c2": [
                this.coordinates.quadLocations.topHalf.lower,
                this.coordinates.quadLocations.topHalf.left,
            ],
            "c3": [
                this.coordinates.quadLocations.bottomHalf.upper,
                this.coordinates.quadLocations.bottomHalf.right,
            ],
            "c4": [
                this.coordinates.quadLocations.bottomHalf.upper,
                this.coordinates.quadLocations.bottomHalf.lower,
            ],
            "c5": [
                this.coordinates.quadLocations.bottomHalf.upper,
                this.coordinates.quadLocations.bottomHalf.left,
            ],
        }
    }

    private get stroke_paths(): Record<ValidConsonantPhonemes, ConsonantEdgeNames[]> {
        return {
            "B": ["c1", "c3"],                             // B as in "Baby"
            "CH": ["c2", "c4"],                            // CH as in "Chocolate"
            "D": ["c1", "c3", "c5"],                       // D as in "Dog"
            "F": ["c0", "c4", "c5"],                       // F as in "Fox"
            "G": ["c0", "c3", "c4"],                       // G as in "Gun"
            "H": ["c1", "c3", "c4"],                       // H as in "Hop"
            "J": ["c1", "c5"],                             // J as in "Jam"
            "K": ["c0", "c1", "c3"],                       // K as in "Kart / Cat"
            "L": ["c1", "c4"],                             // L as in "Live"
            "M": ["c3", "c5"],                             // M as in "Man"
            "N": ["c2", "c3", "c5"],                       // N as in "Net"
            "NG": ["c0", "c1", "c2", "c3", "c4", "c5"],    // NG as in "Rink"
            "P": ["c0", "c4"],                             // P as in "Puppy"
            "R": ["c0", "c1", "c4"],                       // R as in "Rabbit"
            "S": ["c0", "c1", "c4", "c5"],                 // S as in "Sit"
            "SH": ["c0", "c2", "c3", "c4"],                // SH as in "Sheep"
            "T": ["c0", "c2", "c4"],                       // T as in "Tunic"
            "TH": ["c0", "c1", "c2", "c4"],                // TH as in "Thick"
            "TH2": ["c1", "c3", "c4", "c5"],               // TH as in "This"
            "V": ["c1", "c2", "c3"],                       // V as in "Vine"
            "W": ["c0", "c2"],                             // W as in "Wit"
            "Y": ["c1", "c2", "c4"],                       // Y as in "You" 
            "Z": ["c1", "c2", "c3", "c4"],                 // Z as in "Zit"
            "ZH": ["c0", "c1", "c2", "c3", "c5"],          // ZH as in "Azure"
        }
    }

    getStrokeCoordinates(phoneme: ValidConsonantPhonemes) {
        const stroke_path = this.stroke_paths[phoneme];
        return stroke_path.map(
            edgeName => this.edge_stroke_coordinates[edgeName]
        );
    }
}