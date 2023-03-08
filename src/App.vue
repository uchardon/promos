<template>
  <div id="app">
    <Transition name="fadeUp">
      <ModalBox v-if="modal.state"></ModalBox>
    </Transition>
    <AppHeader v-if="$route.name != 'showBook' && token != ''">
      {{ $store.state.user.vorname }}
      {{ $store.state.user.nachname }}
    </AppHeader>
    <AppHeaderMin v-else />
    <main
      :class="{
        wrapper: $route.name != 'useYourLink' && $route.name != 'gologin',
      }"
    >
      <!-- MenuSidebar
        v-if="$route.name != 'useYourLink' && $route.name != 'gologin'"
      ></MenuSidebar -->
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" :key="$route.path" />
        </transition>
      </router-view>
    </main>

    <nav>
      <!-- <router-link class="xyz" to="/">Home</router-link> | -->
      <router-link to="/about">Impressum &amp; Datenschutz</router-link>
    </nav>
    <AppSymbols />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
// @ is an alias to /src
import { isOnline, isChrome } from "@/services/helper.js";
import AppHeader from "@/components/AppHeader.vue";
import AppHeaderEbook from "@/components/AppHeaderEbook.vue";
import AppHeaderMin from "@/components/AppHeaderMin.vue";
import AppSymbols from "@/components/AppSymbols.vue";
import ModalBox from "@/components/ModalBox.vue";

export default {
  name: "StdHome",
  components: {
    AppHeader,
    AppHeaderEbook,
    AppSymbols,
    ModalBox,
    AppHeaderMin,
  },

  data() {
    return {
      url: "buch.pdf",
      state: {},
      user: {
        name: "Uwe",
      },
    };
  },
  computed: {
    ...mapState(["modal", "mainMenu", "token"]),
  },
  mounted() {
    let tmp = isOnline();
    this.SET_ONLINE(tmp);
    let is_chrome = isChrome();
    this.SET_ISCHROME(is_chrome);
  },
  methods: {
    ...mapActions(["SET_ONLINE", "SET_ISCHROME"]),
  },
};
</script>

<style lang="scss">
#app {
  font-family: roboto;
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

.fadeUp-enter-active,
.fadeUp-leave-active {
  opacity: 1;
  transform: translateY(0);
  transition: all 0.5s ease;
}

.fadeUp-enter-from,
.fadeUp-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
