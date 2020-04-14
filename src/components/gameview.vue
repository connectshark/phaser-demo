<template>
  <div id="game"></div>
</template>

<script>
import Game from '../game'
export default {
  name: 'gameview',
  data () {
    return {
    }
  },

  created () {
    window.game = new Game()
  },

  destroyed () {
    window.game.destroy()
  }
}
</script>

<style lang="scss" scoped>
</style>
