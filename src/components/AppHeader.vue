<template>
  <header class="header">
    <div class="header__inner">
      <div class="header__inner-logo">promos verlag gmbh</div>
      <div
        v-if="$route.name != 'login' && $route.name != 'useYourLink'"
        class="dashboard link"
        :class="{ active: $route.name != 'support' }"
      >
        <router-link class="" :to="{ name: 'mybooks' }">
          Dashboard
        </router-link>
      </div>
      <div
        v-if="$route.name != 'login' && $route.name != 'useYourLink'"
        class="support link"
        :class="{ active: $route.name == 'support' }"
      >
        <router-link class="" :to="{ name: 'support' }">
          Hilfe / Support
        </router-link>
      </div>
      <div class="spacer">&nbsp;</div>
      <div
        v-if="$route.name != 'login' && $route.name != 'useYourLink'"
        class="header__inner-account"
      >
        <span class="online"></span>
        <slot></slot>
      </div>
      <div
        v-if="$route.name != 'login' && $route.name != 'useYourLink'"
        class="logout link"
      >
        <router-link class="" :to="{ name: 'gologin' }">
          <img src="@/assets/logout.svg" alt="" />
        </router-link>
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
<style scoped lang="scss">
header {
  --blue: #2799fa;
  --red: #fb2682;
  div {
    box-sizing: border-box;
  }
  .logout {
    img {
      --seize: 50px;
      width: var(--seize);
      height: var(--seize);
    }
  }
  .link {
    color: #fff;
  }
  .logout.link {
    background-color: var(--red);
  }
  .link.active {
    background-color: var(--blue);
  }
  .header__inner {
    display: grid;
    // grid-template-columns:
    //   minmax(min-content, 2fr) 1fr 1fr 4fr minmax(min-content, 2fr)
    //   70px;
    grid-template-columns: auto auto auto 1fr auto 70px;
    background: transparent;
    padding: 0px;
    margin: 0;
    max-width: none;
    & > div {
      height: 70px;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 12px;
      a {
        color: #fff;
      }
    }
  }
}
</style>
