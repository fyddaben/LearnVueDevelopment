<template>
  <div class="example">{{ msg }}</div>
</template>

<script>
require('../scss/index.scss');
export default {
  data () {
    return {
      msg: 'Hello world!'
    }
  }
}
</script>

<style>
.example {
  color: white;
}
</style>
