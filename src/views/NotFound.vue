<template>
  <div class="center">
    <h1>Seite nicht gefunden!</h1>
    <p>
      <router-link to="/login">Zum Login</router-link>
    </p>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.center {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
