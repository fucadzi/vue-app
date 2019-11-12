<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/list">Employee list</router-link> |
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

  <style>
#app {
  padding: 40px;
}

.small-container {
  max-width: 680px;
}
button {
  background: #009435;
  border: 1px solid #009435;
}
</style>
