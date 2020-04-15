import Phaser from 'phaser'
import config from '../config'
export default class Scene3 extends Phaser.Scene {
  constructor () {
    super('endGame')
  }

  create () {
    this.add.text(config.scale.width / 2, config.scale.height / 2 - 20, 'GAME OVER', {
      font: '25px Arial',
      fill: 'yellow'
    }).setOrigin(0.5, 0.5)
    const restart = this.add.text(config.scale.width / 2, config.scale.height / 2 + 20, 'RESTART', {
      font: '16px Tahoma',
      fill: 'yellow'
    }).setOrigin(0.5, 0.5)
    const support = this.add.text(config.scale.width / 2, config.scale.height / 2 + 40, 'SUPPORT ME', {
      font: '16px Tahoma',
      fill: 'red'
    }).setOrigin(0.5, 0.5)
    support.setInteractive({
      useHandCursor: true
    })
    restart.setInteractive({
      useHandCursor: true
    })
    restart.on('pointerover', function () {
      this.alpha = 0.5
    })
    restart.on('pointerout', function () {
      this.alpha = 1
    })
    restart.on('pointerup', function () {
      this.scene.start('playGame')
    }, this)
  }

  update () {
  }
}
