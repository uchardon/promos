<template>
  <div id="app">
    <AppHeader
      >{{ $store.state.user.vorname }}
      {{ $store.state.user.nachname }}</AppHeader
    >

    <main
      :class="{
        wrapper: $route.name != 'useYourLink' && $route.name != 'login',
      }"
    >
      <MenuSidebar
        v-if="$route.name != 'useYourLink' && $route.name != 'login'"
      ></MenuSidebar>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" :key="$route.path" />
        </transition>
      </router-view>
    </main>

    <nav>
      <router-link class="xyz" to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>

    <AppSymbols />
  </div>
</template>

<script>
// @ is an alias to /src
import AppHeader from "@/components/AppHeader.vue";
import AppSymbols from "@/components/AppSymbols.vue";
import MenuSidebar from "@/components/MenuSidebar.vue";

export default {
  name: "StdHome",
  components: {
    AppHeader,
    AppSymbols,
    MenuSidebar,
  },

  data() {
    return {
      state: {},
      user: {
        name: "Uwe",
      },
    };
  },
  computed: {
    mainMenu() {
      return this.$store.state.mainMenu;
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
