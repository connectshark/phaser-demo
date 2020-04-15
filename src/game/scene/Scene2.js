import Phaser from 'phaser'
import config from '../config'
import Beam from './Beam'
import Explosion from './Explosion'

const gameSettings = {
  playerSpeed: 200,
  maxPowerUp: 4
}
export default class Scene2 extends Phaser.Scene {
  constructor () {
    super('playGame')
  }

  create () {
    // 背景
    this.background = this.add.tileSprite(0, 0, config.scale.width, config.scale.height, 'background').setOrigin(0, 0)
    // 文字
    this.text1 = this.add.text(20, 20, 'Playing game', {
      font: '25px Arial',
      fill: 'yellow'
    })
    this.time.addEvent({
      delay: 1000,
      callback: function (text) {
        this.text1.destroy()
      },
      callbackScope: this,
      loop: false
    })

    // 敵人
    this.ship1 = this.physics.add.sprite(config.scale.width / 2 - 50, config.scale.height / 2, 'ship')
    this.ship2 = this.physics.add.sprite(config.scale.width / 2, config.scale.height / 2, 'ship2')
    this.ship3 = this.physics.add.sprite(config.scale.width / 2 + 50, config.scale.height / 2, 'ship3')

    this.ship1.play('ship1_anims')
    this.ship2.play('ship2_anims')
    this.ship3.play('ship3_anims')

    this.ship1.setInteractive()
    this.ship2.setInteractive()
    this.ship3.setInteractive()

    this.enemies = this.physics.add.group()
    this.enemies.add(this.ship1)
    this.enemies.add(this.ship2)
    this.enemies.add(this.ship3)

    // 強化
    this.powerUps = this.physics.add.group()
    for (let i = 0; i < gameSettings.maxPowerUp; i++) {
      const powerUp = this.physics.add.sprite(16, 16, 'power-up')
      this.powerUps.add(powerUp)
      powerUp.setRandomPosition(0, 0, config.scale.width, config.scale.height)

      if (Math.random() > 0.5) {
        powerUp.play('red')
      } else {
        powerUp.play('gray')
      }

      powerUp.setVelocity(100, 100)
      powerUp.setCollideWorldBounds(true)
      powerUp.setBounce(1)
    }
    // player
    this.player = this.physics.add.sprite(config.scale.width / 2 - 8, config.scale.height - 64, 'player')
    this.player.play('thrust')
    this.player.setCollideWorldBounds(true)
    this.cursorKeys = this.input.keyboard.createCursorKeys()
    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

    // beam
    this.projectiles = this.add.group()

    // 碰撞
    this.physics.add.collider(this.projectiles, this.powerUps, function (projectile, powerUp) {
      projectile.destroy()
    })
    this.physics.add.overlap(this.player, this.powerUps, this.pickPowerUp, null, this)
    this.physics.add.overlap(this.player, this.enemies, this.hurtPlayer, null, this)
    this.physics.add.overlap(this.projectiles, this.enemies, this.hitEnemy, null, this)

    // score
    const graphics = this.add.graphics()
    graphics.fillStyle(0x000000, 1)
    graphics.beginPath()
    graphics.moveTo(0, 0)
    graphics.lineTo(config.scale.width, 0)
    graphics.lineTo(config.scale.width, 20)
    graphics.lineTo(0, 20)
    graphics.lineTo(0, 0)
    graphics.closePath()
    graphics.fillPath()
    this.scoreLabel = this.add.bitmapText(10, 5, 'pixelFont', 'SCORE', 16)
    this.score = 0
    const scoreFormated = this.zeroPad(this.score, 6)
    this.scoreLabel.text = 'SCORE' + scoreFormated

    // life
    this.life = 3
    this.lifes = this.add.group()
    for (let i = 0; i < this.life; i++) {
      const life = this.add.sprite(config.scale.width - (i * 10) - 10, 10, 'player').setScale(0.5)
      this.lifes.add(life)
    }
  }

  controlLife (life) {
    this.lifes.getChildren()[life].destroy()
  }

  zeroPad (number, size) {
    let stringNumber = String(number)
    while (stringNumber.length < (size || 2)) {
      stringNumber = '0' + stringNumber
    }
    return stringNumber
  }

  pickPowerUp (player, powerUp) {
    if (this.player.alpha < 1) {
      return
    }
    this.score += 100
    const scoreFormated = this.zeroPad(this.score, 6)
    this.scoreLabel.text = 'SCORE' + scoreFormated
    powerUp.disableBody(true, true)
  }

  hurtPlayer (player, enemy) {
    this.resetShipPos(enemy)
    if (this.player.alpha < 1) {
      return
    }
    const explosion = new Explosion(this, player.x, player.y)
    console.log(explosion)

    player.disableBody(true, true)
    this.life -= 1
    if (this.life < 0) {
      this.scene.start('endGame')
    } else {
      this.controlLife(this.life)
      this.time.addEvent({
        delay: 1000,
        callback: this.resetPlayer,
        callbackScope: this,
        loop: false
      })
    }
  }

  hitEnemy (projectile, enemy) {
    const explosion = new Explosion(this, enemy.x, enemy.y)
    console.log(explosion)

    projectile.destroy()
    this.resetShipPos(enemy)

    this.score += 15
    const scoreFormated = this.zeroPad(this.score, 6)
    this.scoreLabel.text = 'SCORE' + scoreFormated
  }

  update () {
    this.moveShip(this.ship1, 1)
    this.moveShip(this.ship2, 2)
    this.moveShip(this.ship3, 3)

    this.background.tilePositionY -= 0.5

    this.movePlayerManager()

    if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
      if (this.player.active) {
        this.shootBeam()
      }
    }
    for (let i = 0; i < this.projectiles.getChildren().length; i++) {
      const beam = this.projectiles.getChildren()[i]
      beam.update()
    }
  }

  moveShip (ship, speed) {
    ship.y += speed
    if (ship.y > config.scale.height) {
      this.resetShipPos(ship)
    }
  }

  resetShipPos (ship) {
    ship.y = 0
    const randomX = Phaser.Math.Between(0, config.scale.width)
    ship.x = randomX
  }

  destroyShip (pointer, gameObject) {
    gameObject.setTexture('explosion')
    gameObject.play('explode')
  }

  movePlayerManager () {
    if (this.cursorKeys.left.isDown) {
      this.player.setVelocityX(-gameSettings.playerSpeed)
    } else if (this.cursorKeys.right.isDown) {
      this.player.setVelocityX(gameSettings.playerSpeed)
    } else {
      this.player.setVelocityX(0)
    }
    if (this.cursorKeys.up.isDown) {
      this.player.setVelocityY(-gameSettings.playerSpeed)
    } else if (this.cursorKeys.down.isDown) {
      this.player.setVelocityY(gameSettings.playerSpeed)
    } else {
      this.player.setVelocityY(0)
    }
  }

  shootBeam () {
    const beam = new Beam(this)
    console.log(beam)
  }

  resetPlayer () {
    const x = config.scale.width / 2 - 8
    const y = config.scale.height - 10
    this.player.enableBody(true, x, y, true, true)
    this.player.alpha = 0.5

    const tween = this.tweens.add({
      targets: this.player, // 誰
      y: config.scale.height - 64,
      ease: 'Power1',
      duration: 1500,
      onComplete: function () {
        this.player.alpha = 1
      },
      callbackScope: this
    })
    console.log(tween)
  }
}
