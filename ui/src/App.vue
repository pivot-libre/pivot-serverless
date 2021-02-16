<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="WAHOO!!"/>
    <h2>WEB_SERVICE_ROOT</h2>
    <pre>{{ WEB_SERVICE_ROOT }}</pre>
    <h2>Example response</h2>
    <pre style="text-align:left;">{{ exampleResponse }}</pre>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  data: function() {
    return {
      WEB_SERVICE_ROOT: this.$config.WEB_SERVICE_ROOT,
      exampleResponse: null
    };
  },
  components: {
    HelloWorld
  },
  created: function() {
      fetch(this.WEB_SERVICE_ROOT+'election/1')
        .then((response) => response.json())
        .then((json) => this.exampleResponse = JSON.stringify(json, null, 4))
        .catch(() => alert('Error retrieving example web service'));
    }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
