class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
        this.launcherSpeed = 4;
        // var that stops player from moving during "lightF" animations
        this.p1Firing = false;
        this.p2Firing = false;
    }

    preload() {
        // load images/tile sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.image('p1Firework', './assets/p1Firework.png');
        this.load.image('p2Firework', './assets/p2Firework.png');
        this.load.image('p1Launcher', './assets/p1Launcher.png');
        this.load.image('p2Launcher', './assets/p2Launcher.png');
        this.load.image('kite1', './assets/kite_01.png');
        this.load.image('kite2', './assets/kite_02.png');
        this.load.image('kite3', './assets/kite_03.png');
        this.load.image('crowd1', './assets/crowd_01.png');
        this.load.image('crowd2', './assets/crowd_02.png');
        this.load.image('crowd3', './assets/crowd_03.png');
        this.load.image('skyBack', './assets/firework_sky.png');
        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
        this.load.spritesheet('p1Light', './assets/p1Launcher_light_sheet.png', {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 8});
        this.load.spritesheet('p2Light', './assets/p2Launcher_light_sheet.png', {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 8});
        this.load.spritesheet('angry3', './assets/crowd_angry_01_sheet.png', {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 4});
        this.load.spritesheet('angry2', './assets/crowd_angry_02_sheet.png', {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 4});
        this.load.spritesheet('angry1', './assets/crowd_angry_03_sheet.png', {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 4});
        this.load.spritesheet('explo1', './assets/explosion_01_sheet.png', {frameWidth: 96, frameHeight: 96, startFrame: 0, endFrame: 8});
        this.load.spritesheet('explo2', './assets/explosion_02_sheet.png', {frameWidth: 96, frameHeight: 96, startFrame: 0, endFrame: 8});
        this.load.spritesheet('explo3', './assets/explosion_03_sheet.png', {frameWidth: 96, frameHeight: 96, startFrame: 0, endFrame: 8});
        this.load.spritesheet('explo4', './assets/explosion_04_sheet.png', {frameWidth: 96, frameHeight: 96, startFrame: 0, endFrame: 8});
        this.load.spritesheet('sky', './assets/firework_sky_sheet.png', {frameWidth: 800, frameHeight: 640, startFrame: 0, endFrame: 8});
    }

    create() {
        
        this.anims.create({
            key: 'back',
            repeat: 100,
            frames: this.anims.generateFrameNumbers('sky', { start: 0, end: 8, first: 0}),
            frameRate: 10
        });
        // place tile sprite
        this.back = this.add.sprite(0, 0, 'skyBack').setOrigin(0, 0);
        this.skyBackground = this.add.sprite(0, 0, 'sky').setOrigin(0, 0);
        this.skyBackground.anims.play('back');

        // add Spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'kite3', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'kite2', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'kite1', 0, 10).setOrigin(0,0);

        this.crowd01 = new Spaceship(this, game.config.width + borderUISize*6, game.config.height - 105, 'crowd3', 0, 0).setOrigin(0, 0);
        this.crowd02 = new Spaceship(this, game.config.width + borderUISize*3, game.config.height - 95, 'crowd2', 0, 0).setOrigin(0,0);
        this.crowd03 = new Spaceship(this, game.config.width, game.config.height - 85, 'crowd1', 0, 0).setOrigin(0,0);
        
        // green UI background
        //this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);
        // white borders
        //this.add.rectangle(0, 0, game.config.width, borderUISize, 0xAAFFFF).setOrigin(0 ,0);
        //this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFAA).setOrigin(0 ,0);
        //this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFAAFF).setOrigin(0 ,0);
        //this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);

        
        
        // add player rockets and p1 launcher
        this.launcher1 = this.add.sprite(game.config.width/2, game.config.height - borderUISize - borderPadding - 25, 'p1Launcher').setOrigin(0.5, 0);
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'p1Firework').setOrigin(0.5, 0);
        this.p1Rocket.alpha = 0;
        this.p2Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'p2Firework').setOrigin(0.5, 0);
        this.p2Rocket.alpha = 0;

        // add p2 launcher if necessary
        if(game.settings.multiplayer){
            this.launcher2 = this.add.sprite(game.config.width/2, game.config.height - borderUISize - borderPadding - 25, 'p2Launcher').setOrigin(0.5, 0);
        }

        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyI = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);
        keyJ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
        keyL = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });
        this.anims.create({
            key: 'light1',
            frames: this.anims.generateFrameNumbers('p1Light', { start: 0, end: 8, first: 0}),
            frameRate: 15
        });
        this.anims.create({
            key: 'light2',
            frames: this.anims.generateFrameNumbers('p2Light', { start: 0, end: 8, first: 0}),
            frameRate: 15
        });
        this.anims.create({
            key: 'angryC1',
            frames: this.anims.generateFrameNumbers('angry1', { start: 0, end: 4, first: 0}),
            frameRate: 15
        });
        this.anims.create({
            key: 'angryC2',
            frames: this.anims.generateFrameNumbers('angry2', { start: 0, end: 4, first: 0}),
            frameRate: 15
        });
        this.anims.create({
            key: 'angryC3',
            frames: this.anims.generateFrameNumbers('angry3', { start: 0, end: 4, first: 0}),
            frameRate: 15
        });
        this.anims.create({
            key: 'ex1',
            frames: this.anims.generateFrameNumbers('explo1', { start: 0, end: 8, first: 0}),
            frameRate: 30
        });
        this.anims.create({
            key: 'ex2',
            frames: this.anims.generateFrameNumbers('explo2', { start: 0, end: 8, first: 0}),
            frameRate: 30
        });
        this.anims.create({
            key: 'ex3',
            frames: this.anims.generateFrameNumbers('explo3', { start: 0, end: 8, first: 0}),
            frameRate: 30
        });
        this.anims.create({
            key: 'ex4',
            frames: this.anims.generateFrameNumbers('explo4', { start: 0, end: 8, first: 0}),
            frameRate: 30
        });

        // initialize score
        this.p1Score = 0;
        this.p2Score = 0;

        // p1 score config
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#EB5234',
            color: '#2E2522',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }

        //p2 score config
        let scoreConfig2 = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#3471EB',
            color: '#2E2522',
            align: 'left',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }

        // player scores
        this.scoreLeft = this.add.text(borderUISize, borderUISize, this.p1Score, scoreConfig);
        if(game.settings.multiplayer){
            this.scoreRight = this.add.text((700 - borderUISize), borderUISize, this.p2Score, scoreConfig2);
        }
        // GAME OVER flag
        this.gameOver = false;

        // sets gameTimer clock with player victories when necessary
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            if(game.settings.multiplayer && (this.p2Score > this.p1Score)){
                this.add.text(game.config.width/2, game.config.height/2, 'Player 2 Wins!', scoreConfig).setOrigin(0.5);
            }else if(game.settings.multiplayer && (this.p2Score < this.p1Score)){
                this.add.text(game.config.width/2, game.config.height/2, 'Player 1 Wins!', scoreConfig).setOrigin(0.5);
            }else{
                this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            }

            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← to Menu', scoreConfig).setOrigin(0.5);
            this.game.sound.stopAll();
            this.gameOver = true;
        }, null, this);
    }

    update() {
        // check key input for restart / menu
        if(this.gameOver){
            this.sound.get('background').stop();
        }
        
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.sound.play('sfx_select');
            this.sound.play('background');
            this.scene.restart();
        }

        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }

        // p1 launch firework
        if(!this.gameOver && Phaser.Input.Keyboard.JustDown(keyW) && !this.p1Rocket.isFiring){
            this.p1LaunchFirework();
        }
        
        // p2 launch firework
        if(!this.gameOver && Phaser.Input.Keyboard.JustDown(keyI) && !this.p2Rocket.isFiring && game.settings.multiplayer){
            this.p2LaunchFirework();
        }

        // p1 firework launcher movement
        if(!this.p1Rocket.isFiring && !this.gameOver && !this.p1Firing) {
            if(keyA.isDown && this.launcher1.x >= borderUISize + this.launcher1.width) {
                this.launcher1.x -= this.launcherSpeed;
            } else if (keyD.isDown && this.launcher1.x <= game.config.width - borderUISize - this.launcher1.width) {
                this.launcher1.x += this.launcherSpeed;
            }
        }

        // p2 firework launcher movement
        if(!this.p2Rocket.isFiring && !this.gameOver && !this.p2Firing && game.settings.multiplayer) {
            if(keyJ.isDown && this.launcher2.x >= borderUISize + this.launcher2.width) {
                this.launcher2.x -= this.launcherSpeed;
            } else if (keyL.isDown && this.launcher2.x <= game.config.width - borderUISize - this.launcher2.width) {
                this.launcher2.x += this.launcherSpeed;
            }
        }

        if(this.p1Rocket.y <= borderUISize * 3 + borderPadding) {
            this.explode(this.p1Rocket);
        }

        if(this.p2Rocket.y <= borderUISize * 3 + borderPadding) {
            this.explode(this.p2Rocket);
        }

        if(!this.gameOver) {
            this.p1Rocket.update();             // update p1
            this.p2Rocket.update();             // update p2
            this.ship01.update();               // update spaceship (x3)
            this.ship02.update();
            this.ship03.update();
            this.crowd01.update();              // update crowds (x3)
            this.crowd02.update();
            this.crowd03.update();
        }

        // check collisions player 1
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.shipExplode(this.ship03, this.p1Rocket);
            this.anger3(this.crowd03);
            this.p1Score += this.ship03.points;
            this.scoreLeft.text = this.p1Score;
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.shipExplode(this.ship02, this.p1Rocket);
            this.anger2(this.crowd02);
            this.p1Score += this.ship02.points;
            this.scoreLeft.text = this.p1Score;
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.shipExplode(this.ship01, this.p1Rocket);
            this.anger1(this.crowd01);
            this.p1Score += this.ship01.points;
            this.scoreLeft.text = this.p1Score;
        }

        //check collisions player 2
        if(this.checkCollision(this.p2Rocket, this.ship03)) {
            this.shipExplode(this.ship03, this.p2Rocket);
            this.anger3(this.crowd03);
            this.p2Score += this.ship03.points;
            this.scoreRight.text = this.p2Score;
        }
        if (this.checkCollision(this.p2Rocket, this.ship02)) {
            this.shipExplode(this.ship02, this.p2Rocket);
            this.anger2(this.crowd02);
            this.p2Score += this.ship02.points;
            this.scoreRight.text = this.p2Score;
        }
        if (this.checkCollision(this.p2Rocket, this.ship01)) {
            this.shipExplode(this.ship01, this.p2Rocket);
            this.anger1(this.crowd01);
            this.p2Score += this.ship01.points;
            this.scoreRight.text = this.p2Score;
        }
    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship. y) {
                return true;
        } else {
            return false;
        }
    }

    shipExplode(ship, rocket) {
        // temporarily hide ship
        ship.alpha = 0;                         
        // create explosion sprite at ship's position
        ship.reset();
        this.explode(rocket);
        ship.alpha = 1;
      }

      explode(rocket){
        // randomly create a firework explosion
        let explo = Math.floor(Math.random()*4);
        //console.log(explo);
        if(explo <= 0){
            let boom = this.add.sprite(rocket.x, rocket.y, 'explo1').setOrigin(0.5, 0.5);
            rocket.reset();                           // reset ship position
            boom.anims.play('ex1');             // play explode animation
            boom.on('animationcomplete', () => {    // callback after anim completes
                boom.destroy();                       // remove explosion sprite
            });
            this.sound.play('sfx_ex1');
        }else if(explo <= 1){
            let boom = this.add.sprite(rocket.x, rocket.y, 'explo2').setOrigin(0.5, 0.5);
            rocket.reset();                           // reset ship position
            boom.anims.play('ex2');             // play explode animation
            boom.on('animationcomplete', () => {    // callback after anim completes
                boom.destroy();                       // remove explosion sprite
            });
            this.sound.play('sfx_ex2');
        }else if(explo <= 2){
            let boom = this.add.sprite(rocket.x, rocket.y, 'explo3').setOrigin(0.5, 0.5);
            rocket.reset();                           // reset ship position
            boom.anims.play('ex3');             // play explode animation
            boom.on('animationcomplete', () => {    // callback after anim completes
                boom.destroy();                       // remove explosion sprite
            });
            this.sound.play('sfx_ex3');
        }else{
            let boom = this.add.sprite(rocket.x, rocket.y, 'explo4').setOrigin(0.5, 0.5);
            rocket.reset();                           // reset ship position
            boom.anims.play('ex4');             // play explode animation
            boom.on('animationcomplete', () => {    // callback after anim completes
                boom.destroy();                       // remove explosion sprite
            });
            this.sound.play('sfx_ex4');
        }
      }

    anger1(crowd) {
        // temporarily hide ship
        crowd.alpha = 0;                         
        // create explosion sprite at ship's position
        let angry = this.add.sprite(crowd.x, crowd.y, 'angry1').setOrigin(0, 0.5);
        crowd.reset();                           // reset ship position
        angry.anims.play('angryC1');             // play explode animation
        angry.on('animationcomplete', () => {    // callback after anim completes
            crowd.alpha = 1;                       // make ship visible again
            angry.destroy();                       // remove explosion sprite
        });
    }
    
    anger2(crowd) {
        // temporarily hide ship
        crowd.alpha = 0;                         
        // create explosion sprite at ship's position
        let angry = this.add.sprite(crowd.x, crowd.y, 'angry2').setOrigin(0, 0.5);
        crowd.reset();                           // reset ship position
        angry.anims.play('angryC2');             // play explode animation
        angry.on('animationcomplete', () => {    // callback after anim completes
            crowd.alpha = 1;                       // make ship visible again
            angry.destroy();                       // remove explosion sprite
        });
    }

    anger3(crowd) {
        // temporarily hide ship
        crowd.alpha = 0;                         
        // create explosion sprite at ship's position
        let angry = this.add.sprite(crowd.x, crowd.y, 'angry3').setOrigin(0, 0.5);
        crowd.reset();                           // reset ship position
        angry.anims.play('angryC3');             // play explode animation
        angry.on('animationcomplete', () => {    // callback after anim completes
            crowd.alpha = 1;                       // make ship visible again
            angry.destroy();                       // remove explosion sprite
        });
    }

      p1LaunchFirework() {
        // temporarily hide rocket   
        this.p1Rocket.alpha = 0;
        this.launcher1.alpha = 0;
        this.p1Firing = true;
        this.p1Rocket.x = this.launcher1.x;
        this.p1Rocket.y = this.launcher1.y;                
        // create launch sprite
        let launch = this.add.sprite(this.launcher1.x, this.launcher1.y, 'p1Light').setOrigin(0.5, 0);
        launch.anims.play('light1');             // play light animation
        launch.on('animationcomplete', () => {    // callback after anim completes
            this.p1Rocket.alpha = 1;  
            this.launcher1.alpha = 1;
            this.p1Rocket.isFiring = true;
            this.p1Firing = false;
            this.p1Rocket.sfxRocket.play();
        });
        }

        p2LaunchFirework() {
            // temporarily hide rocket   
            this.p2Rocket.alpha = 0;
            this.launcher2.alpha = 0;
            this.p2Firing = true;
            this.p2Rocket.x = this.launcher2.x;
            this.p2Rocket.y = this.launcher2.y;                
            // create launch sprite
            let launch = this.add.sprite(this.launcher2.x, this.launcher2.y, 'p2Light').setOrigin(0.5, 0);
            launch.anims.play('light2');             // play light animation
            launch.on('animationcomplete', () => {    // callback after anim completes
                this.p2Rocket.alpha = 1;  
                this.launcher2.alpha = 1;
                this.p2Rocket.isFiring = true;
                this.p2Firing = false;
                this.p2Rocket.sfxRocket.play();
            });
          }
}