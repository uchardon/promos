<template>
  <div class="sidebar user">
    <div class="sidebar__inner">
      <div class="sidebar__image">
        <img src="@/assets/images/sample.png" alt="" />
      </div>
      <div class="sidebar__nav">
        <router-link class="sidebar__nav-link" :to="{ name: 'mybooks' }">
          <svg>
            <use xlink:href="#book"></use>
          </svg>
          <span>Meine Bücher</span>
        </router-link>

        <router-link class="sidebar__nav-link" :to="{ name: 'support' }">
          <svg>
            <use xlink:href="#group"></use>
          </svg>
          <span>Hilfe / Support</span>
        </router-link>

        <a href="login.html" class="sidebar__nav-link logout">
          <svg>
            <use xlink:href="#logout"></use>
          </svg>
          <span>Logout</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MenuSidebar",
  data() {
    return {
      state: {},
    };
  },
  computed: {
    mainMenu() {
      return this.$store.state.mainMenu;
    },
  },
  mounted() {
    // console.log("MenuSidebar");
  },
  methods: {
    chgMenu(p) {
      console.log("click");
      this.$store.commit("setMainMenu", p);
    },
  },
};
</script>
