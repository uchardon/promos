<template>
  <header class="header">
    <div class="header__inner">
      <div class="header__inner-logo">promos verlag gmbh</div>
      <div class="header__inner-account">
        <span class="online"></span>
        <slot></slot>
      </div>
    </div>
  </header>
</template>
<script>
export default {
  name: "AppHeader",
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
