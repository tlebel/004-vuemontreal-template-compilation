<template>
  <!--
    For more context, see Cypress.io best practices: Selecting Elements
    https://docs.cypress.io/guides/references/best-practices.html#Selecting-Elements
  -->
  <div data-test="myMessassgeWrapper" class="hello">
    <h1 data-test="myMessage">{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" data-test="myLink" rel="noopener">vue-cli documentation</a>.
    </p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
