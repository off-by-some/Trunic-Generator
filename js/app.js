const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
// set line stroke and line width
ctx.strokeStyle = 'black';
ctx.lineWidth = 3;

// const lineLength = 50

// function resizeCanvas() {
//     let dpi = window.devicePixelRatio;
//     let canvas = document.getElementById('canvas');
//     let style_height = +getComputedStyle(canvas).getPropertyValue("height").slice(0, -2);
//     let style_width = +getComputedStyle(canvas).getPropertyValue("width").slice(0, -2);
//     canvas.setAttribute('height', style_height * dpi);
//     canvas.setAttribute('width', style_width * dpi);
// }

// function fuzz(x, f){
//     return x + Math.random()*f - f/2;
// }

// estimate the movement of the arm
// x0: start
// x1: end
// t: step from 0 to 1
// function handDrawMovement(x0, x1, t){
//     return x0 + (x0-x1)*(
//             15*Math.pow(t, 4) -
//             6*Math.pow(t, 5) -
//             10*Math.pow(t,3)
//     )
// }

// simulates a hand drawn line with jitter on the canvas
// function handDrawnLine([x0, y0], [x1, y1]){
//     ctx.beginPath();
//     ctx.moveTo(x0, y0)

//     var d = Math.sqrt((x1-x0)*(x1-x0)+(y1-y0)*(y1-y0))

//     var steps = d/25;
//     if(steps < 4) {
//         steps = 4;
//     }

//     // fuzzyness
//     var f = 8.0;
//     for(var i = 1; i <= steps; i++)
//     {
//         var t1 = i/steps;
//         var t0 = t1-1/steps
//         var xt0 = handDrawMovement(x0, x1, t0)
//         var yt0 = handDrawMovement(y0, y1, t0)
//         var xt1 = handDrawMovement(x0, x1, t1)
//         var yt1 = handDrawMovement(y0, y1, t1)
//         ctx.quadraticCurveTo(fuzz(xt0, f), fuzz(yt0, f), xt1, yt1)
//         ctx.lineTo(xt1, yt1)
//     }

//     ctx.stroke()
// }




// function getCenterCoords() {
//     return {
//         centerX: canvas.width / 2,
//         centerY: canvas.height / 2,
//     }
// }

// const { centerX, centerY } = getCenterCoords()


// const runeBoundaries = {
//     left: centerX - lineLength,
//     right: centerX + lineLength,
//     top: centerY - lineLength,
//     bottom: centerY + lineLength,
//     padding: 20,
// }

// function calculateQuadPoints(topBoundary, bottomBoundary) {
//     const quadLocations = {
//         topHalf: {
//             upper: [centerX, topBoundary],
//             lower: [centerX, centerY - (lineLength / 4)],
//         },
//         bottomHalf: {
//             upper: [centerX, centerY + (lineLength / 4)],
//             lower: [centerX, bottomBoundary]
//         }
//     }

//     const centerBetweenPoints = (upper, lower) => (upper[1] + lower[1]) / 2
//     const bottomHalfQuadCenterY = centerBetweenPoints(
//         quadLocations.bottomHalf.upper, 
//         quadLocations.bottomHalf.lower
//     )
//     const topHalfQuadCenterY = centerBetweenPoints(
//         quadLocations.topHalf.upper, 
//         quadLocations.topHalf.lower
//     )

//     quadLocations.topHalf.right = [runeBoundaries.right, topHalfQuadCenterY]
//     quadLocations.topHalf.left = [runeBoundaries.left, topHalfQuadCenterY]
//     quadLocations.bottomHalf.right = [runeBoundaries.right, bottomHalfQuadCenterY]
//     quadLocations.bottomHalf.left = [runeBoundaries.left, bottomHalfQuadCenterY]

//     return quadLocations;
// }

// let initialQuadLocations = calculateQuadPoints(runeBoundaries.top, runeBoundaries.bottom)

// function rotateCanvas(degrees) {
//     // converts angle to radians
//     const angle = degrees * (Math.PI / 180);
//     // sets the origin to the center of the canvas
//     ctx.translate(centerX, centerY);
//     // rotates the canvas
//     ctx.rotate(angle);
//     // resets the origin to the top left corner of the canvas
//     ctx.translate(-centerX, -centerY);
// }


// function drawDot(x, y) {
//     ctx.fillStyle = "blue";
//     ctx.beginPath();
//     ctx.arc(x, y, 2, 0, 2 * Math.PI);
//     ctx.fill();
// }

// function draw_phonetic_divider() {
//     ctx.beginPath();
//     start = [runeBoundaries.left, centerY]
//     end = [runeBoundaries.right, centerY]
//     handDrawnLine(start, end)
// }

function draw_quad_debug_dots() {
    [initialQuadLocations.topHalf, initialQuadLocations.bottomHalf].forEach((section) => {
        drawDot(...section.upper)
        drawDot(...section.lower)
        drawDot(...section.right)
        drawDot(...section.left)
        drawDot(...section.lower)
    })
}


// resizeCanvas();
draw_phonetic_divider();
draw_quad_debug_dots()

// const q = require('./stroke_mappings')
// console.log(q)

// const vowel_stroke_mapping = {
//     "v0": () => handDrawnLine(
//         initialQuadLocations.topHalf.right, 
//         initialQuadLocations.topHalf.upper, 
//     ),
//     "v1": () => handDrawnLine(
//         initialQuadLocations.topHalf.upper, 
//         initialQuadLocations.topHalf.left, 
//     ),
//     "v2": () =>  handDrawnLine(
//         initialQuadLocations.topHalf.left, 
//         initialQuadLocations.bottomHalf.left
//     ),
//     "v3": () => handDrawnLine(
//         initialQuadLocations.bottomHalf.left, 
//         initialQuadLocations.bottomHalf.lower, 
//     ),
//     "v4": () => handDrawnLine(
//         initialQuadLocations.bottomHalf.right, 
//         initialQuadLocations.bottomHalf.lower, 
//     ),
// }

// const const_stroke_mapping = {
//     "c0": () => handDrawnLine(
//         initialQuadLocations.topHalf.lower, 
//         initialQuadLocations.topHalf.right
//     ),
//     "c1": () => handDrawnLine(
//         initialQuadLocations.topHalf.lower, 
//         initialQuadLocations.topHalf.upper
//     ),
//     "c2": () => handDrawnLine(
//         initialQuadLocations.topHalf.lower, 
//         initialQuadLocations.topHalf.left
//     ),
//     "c3": () => handDrawnLine(
//         initialQuadLocations.bottomHalf.upper, 
//         initialQuadLocations.bottomHalf.right
//     ),
//     "c4": () => handDrawnLine(
//         initialQuadLocations.bottomHalf.upper, 
//         initialQuadLocations.bottomHalf.lower
//     ),
//     "c5": () => handDrawnLine(
//         initialQuadLocations.bottomHalf.upper, 
//         initialQuadLocations.bottomHalf.left
//     ),
// }

// // 18 vowels
// const phonetic_stroke_mapping_vowels = {
//     // A as in "Glass"
//     "A": ["v1", "v0", "v2"],
//     // AR as in "Arm"
//     "AR": ["v1", "v0", "v3", "v4"],
//     // AH as in "Swan"
//     "AH": ["v2", "v1"],
//     // AW as in "Paw"
//     // "AW": ["v6", "v7"], (DOES NOT EXIST IN GAME, USES "AH" INSTEAD)
//     // AY as in "Bay"
//     "AY": ["v1"],
//     // E as in "End"
//     "E": ["v2", "v3", "v4"],
//     // EE as in "Bee"
//     "EE": ["v1", "v2", "v3", "v4"],
//     // EER as in "Beer"
//     "EER": ["v1", "v2", "v4"],
//     // EH as in "The"
//     "EH": ["v0", "v1"],
//     // ERE as in "Air"
//     "ERE": ["v2", "v4"],
//     // I as in "bit"
//     "I": ["v3", "v4"],
//     // IE as in "Guy"
//     "IE": ["v0"],
//     // IR as in "Bird"
//     "IR": ["v0", "v2", "v3", "v4"],
//     // OH as in "Toe"
//     "OH": ["v0", "v1", "v2", "v3", "v4"],
//     // OI as in "toy"
//     "OI": ["v3"],
//     // OO as in "Too"
//     "OO": ["v0", "v1", "v2", "v3"],
//     // OU as in "Wolf"
//     "OU": ["v2", "v3"],
//     // OW as in "How",
//     "OW": ["v4"],
//     // UH as in "bug" (DOES NOT EXIST IN GAME, USES "EH" INSTEAD)
//     // "UH": ["v6", "v7"],
//     // ORE as in "Your"
//     "ORE": ["v0", "v1", "v2", "v4"]
// }

// 24 consonants
// const phonetic_stroke_mapping_consonants = {
//     // B as in "Baby"
//     "B": ["c1", "c3"],
//     // CH as in "Chat"
//     "CH": ["c2", "c4"],
//     // D as in "Dog"
//     "D": ["c1", "c3", "c5"],
//     // F as in "Fox"
//     "F": ["c0", "c4", "c5"],
//     // G as in "Gun"
//     "G": ["c0", "c3", "c4"],
//     // H as in "Hop"
//     "H": ["c1", "c3", "c4"],
//     // J as in "Jam"
//     "J": ["c1", "c5"],
//     // K as in "Kart / Cat"
//     "K": ["c0", "c1", "c3"],
//     // L as in "Live"
//     "L": ["c1", "c4"],
//     // M as in "Man"
//     "M": ["c3", "c5"],
//     // N as in "Net"
//     "N": ["c2", "c3", "c5"],
//     // NG as in "Rink"
//     "NG": ["c0", "c1", "c2", "c3", "c4", "c5"],
//     // P as in "Poppy"
//     "P": ["c0", "c4"],
//     // R as in "Run"
//     "R": ["c0", "c1", "c4"],
//     // S as in "Sit"
//     "S": ["c0", "c1", "c4", "c5"],
//     // SH as in "Shut"
//     "SH": ["c0", "c2", "c3", "c4"],
//     // T as in "Tunic"
//     "T": ["c0", "c2", "c4"],
//     // TH as in "Thick"
//     "TH": ["c0", "c1", "c2", "c4"],
//     // TH as in "This"
//     "TH2": ["c1", "c3", "c4", "c5"],
//     // V as in "Vine"
//     "V": ["c1", "c2", "c3"],
//     // W as in "Wit"
//     "W": ["c0", "c2"],
//     // Y as in "You"
//     "Y": ["c1", "c2", "c4"],
//     // Z as in "Zit"
//     "Z": ["c1", "c2", "c3", "c4"],
//     // ZH as in "Azure"
//     "ZH": ["c0", "c1", "c2", "c3", "c5"],
// }





function drawStrokeMapping(phoneme) {
    const possibleStrokes = {...const_stroke_mapping, ...vowel_stroke_mapping}
    const strokeNames = phonetic_stroke_mapping_vowels[phoneme] || phonetic_stroke_mapping_consonants[phoneme]
    strokeNames.forEach(name => {
        const strokeFn = possibleStrokes[name]
        strokeFn()
    })
}

function choose(choices) {
    var index = Math.floor(Math.random() * choices.length);
    return choices[index];
  }

const vowel = choose(Object.keys(phonetic_stroke_mapping_vowels))
const consonant = choose(Object.keys(phonetic_stroke_mapping_consonants))

console.log(`Displaying ${consonant} + ${vowel}`)
drawStrokeMapping(consonant)
drawStrokeMapping(vowel)
