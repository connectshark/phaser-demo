import Phaser from 'phaser'
import Scene1 from './scene/Scene1'
import Scene2 from './scene/Scene2'
export default {
  type: Phaser.AUTO,
  backgroundColor: 0x0000,
  scale: {
    parent: 'app',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 256,
    height: 272
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  },
  pixelArt: true,
  gameTitle: 'sedie',
  gameVersion: '0.0.1',
  debug: {
    showBody: true
  },
  scene: [Scene1, Scene2]
}
