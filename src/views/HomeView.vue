<template>
  <div id="game"></div>
</template>

<script setup>
import { onMounted } from 'vue'
import Game from '../game'


onMounted(() => {
  new Game()
})

</script>

<style>
#game {
  height: 100vh;
}
</style>