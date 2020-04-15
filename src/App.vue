<template>
  <div id="app">
    <gameview/>
  </div>
</template>

<script>
import gameview from './components/gameview'
export default {
  name: 'App',
  components: {
    gameview
  },
  created () {
  }
}
</script>

<style lang="scss">
#app{
  width: 100%;
  height: 100vh;
}
</style>
