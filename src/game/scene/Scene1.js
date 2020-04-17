import Phaser from 'phaser'
import requireFile from '../../lib/requireFile'
export default class Scene1 extends Phaser.Scene {
  constructor () {
    super('bootGame')
  }

  preload () {
    this.load.image('background', requireFile('images/background.png'))

    this.load.spritesheet('ship', requireFile('spritesheets/ship.png'), {
      frameWidth: 16,
      frameHeight: 16
    })
    this.load.spritesheet('ship2', requireFile('spritesheets/ship2.png'), {
      frameWidth: 32,
      frameHeight: 16
    })
    this.load.spritesheet('ship3', requireFile('spritesheets/ship3.png'), {
      frameWidth: 32,
      frameHeight: 32
    })
    this.load.spritesheet('explosion', requireFile('spritesheets/explosion.png'), {
      frameWidth: 16,
      frameHeight: 16
    })
    this.load.spritesheet('power-up', requireFile('spritesheets/power-up.png'), {
      frameWidth: 16,
      frameHeight: 16
    })

    this.load.spritesheet('player', requireFile('spritesheets/player.png'), {
      frameWidth: 16,
      frameHeight: 24
    })

    this.load.spritesheet('beam', requireFile('spritesheets/beam.png'), {
      frameWidth: 16,
      frameHeight: 16
    })

    this.load.bitmapFont('pixelFont', requireFile('font/font.png'), requireFile('font/font.xml'))

    // progress bar
    const progressBar = this.add.graphics()
    const progressBox = this.add.graphics()
    progressBox.fillStyle(0x222222, 0.8)
    progressBox.fillRect(10, 100, 236, 20)

    const width = this.cameras.main.width
    const height = this.cameras.main.height
    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 120,
      text: 'Loading...',
      style: {
        font: '16px monospace',
        fill: '#ffffff'
      }
    })
    loadingText.setOrigin(0.5, 0.5)

    const percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 65,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    })
    percentText.setOrigin(0.5, 0.5)

    const assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 20,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    })
    assetText.setOrigin(0.5, 0.5)

    this.load.on('progress', function (value) {
      progressBar.clear()
      progressBar.fillStyle(0xffffff, 1)
      progressBar.fillRect(15, 105, 216 * value, 10)

      percentText.setText(parseInt(value * 100) + '%')
    })
    this.load.on('fileprogress', function (file) {
      assetText.setText('Loading asset: ' + file.key)
    })
    this.load.on('complete', function () {
      progressBar.destroy()
      progressBox.destroy()
      loadingText.destroy()
      percentText.destroy()
      assetText.destroy()
    })
  }

  create () {
    this.add.text(20, 20, 'Loading game...')
    // loading start
    this.anims.create({
      key: 'ship1_anims',
      frames: this.anims.generateFrameNumbers('ship'),
      frameRate: 20,
      repeat: -1
    })
    this.anims.create({
      key: 'ship2_anims',
      frames: this.anims.generateFrameNumbers('ship2'),
      frameRate: 20,
      repeat: -1
    })
    this.anims.create({
      key: 'ship3_anims',
      frames: this.anims.generateFrameNumbers('ship3'),
      frameRate: 20,
      repeat: -1
    })
    this.anims.create({
      key: 'explode',
      frames: this.anims.generateFrameNumbers('explosion'),
      frameRate: 20,
      repeat: 0,
      hideOnComplete: true
    })
    this.anims.create({
      key: 'red',
      frames: this.anims.generateFrameNumbers('power-up', {
        start: 0,
        end: 1
      }),
      frameRate: 20,
      repeat: -1
    })
    this.anims.create({
      key: 'gray',
      frames: this.anims.generateFrameNumbers('power-up', {
        start: 2,
        end: 3
      }),
      frameRate: 20,
      repeat: -1
    })

    this.anims.create({
      key: 'thrust',
      frames: this.anims.generateFrameNumbers('player'),
      frameRate: 20,
      repeat: -1
    })

    this.anims.create({
      key: 'beam_anim',
      frames: this.anims.generateFrameNumbers('beam'),
      frameRate: 20,
      repeat: -1
    })
    // loading end
    this.scene.start('playGame')
    // this.scene.start('endGame')
  }
}
