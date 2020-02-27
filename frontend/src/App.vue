<template>
  <div id="app">
    <Todo/>
  </div>
</template>

<script>

import Todo from "./views/Todo";
export default {
  name: 'App',
  components: {
    Todo
  }
}
</script>

<style>
#app {
}
</style>
