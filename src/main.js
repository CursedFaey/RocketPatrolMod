let config = {
    type: Phaser.CANVAS,
    width: 800,
    height: 640,
    scene: [ Menu, Play ]
}

let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// reserve keyboard variables
let keyF, keyR, keyLEFT, keyRIGHT, keyA, keyD, keyJ, keyL, keyW, keyI;

// Project Comments
//  Point Breakdown:
//  + (60) Redesign the Game's artwork, UI, and sound to change it's theme/aesthetic
//  + (30) implement a simutaneous two-player mode
//  + (10) Create 4 new explosion SFX and randomize which one plays on impact
// total: (100)