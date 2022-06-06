class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // load audio
        this.load.audio('sfx_select', './assets/select_s1.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_rocket', './assets/rck_s1.wav');
        this.load.audio('sfx_ex1', './assets/ex_s1.wav');
        this.load.audio('sfx_ex2', './assets/ex_s2.wav');
        this.load.audio('sfx_ex3', './assets/ex_s3.wav');
        this.load.audio('sfx_ex4', './assets/ex_s4.wav');
    }

    create() {
        // menu text configuration
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        
        // show menu text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'ROCKET PATROL MOD', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'Player 1: Use (A/D) to move & (W) to fire', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Player 2: Use (J/L) to move & (I) to fire', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize*2 + borderPadding*2, 'Press ← for 1 Player or → for 2 Players', menuConfig).setOrigin(0.5);

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          // single player mode
          game.settings = {
            spaceshipSpeed: 3,
            gameTimer: 10000,
            multiplayer: false    
          }
          this.sound.play('sfx_select');
          this.scene.start("playScene");    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          // multiplayer mode
          game.settings = {
            spaceshipSpeed: 3,
            gameTimer: 10000,
            multiplayer: true    
          }
          this.sound.play('sfx_select');
          this.scene.start("playScene");    
        }
      }
}