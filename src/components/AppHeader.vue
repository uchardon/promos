<template>
  <header class="header">
    <div id="headerDesktop" class="header__inner">
      <div class="header__inner-logo">
        <img src="@/assets/images/promos-logo-header.svg" />
      </div>
      <div
        v-if="
          $route.name != 'login' &&
          $route.name != 'useYourLink' &&
          $route.name != 'gologin'
        "
        class="dashboard link"
        :class="{ active: $route.name != 'support' }"
      >
        <router-link class="" :to="{ name: 'mybooks' }">
          Dashboard
        </router-link>
      </div>
      <div
        v-if="
          $route.name != 'login' &&
          $route.name != 'useYourLink' &&
          $route.name != 'gologin'
        "
        class="support link"
        :class="{ active: $route.name == 'support' }"
      >
        <router-link class="" :to="{ name: 'support' }">
          Hilfe / Support
        </router-link>
      </div>
      <div
        v-if="
          $route.name != 'login' &&
          $route.name != 'useYourLink' &&
          $route.name != 'gologin'
        "
        class="logout"
      >
        <router-link class="" :to="{ name: 'gologin' }">
          <img src="@/assets/logout.svg" alt="" />
        </router-link>
      </div>
      <div
        v-if="
          $route.name != 'login' &&
          $route.name != 'useYourLink' &&
          $route.name != 'gologin'
        "
        class="header__inner-account"
      >
        <span class="online"></span>
        <slot></slot>
      </div>
    </div>
    <div id="headerMobile">
      <div class="Mob1 mobIcons"></div>
      <div
        v-if="$route.name != 'login' && $route.name != 'useYourLink'"
        class="Mob2 mobIcons active dashboard link"
        :class="{ active: $route.name != 'support' }"
      >
        <router-link class="" :to="{ name: 'mybooks' }"> </router-link>
      </div>
      <div
        v-if="$route.name != 'login' && $route.name != 'useYourLink'"
        class="Mob3 mobIcons support link"
        :class="{ active: $route.name == 'support' }"
      >
        <router-link class="" :to="{ name: 'support' }"> </router-link>
      </div>
      <div
        v-if="$route.name != 'login' && $route.name != 'useYourLink'"
        class="Mob4 mobIcons logout"
      >
        <router-link class="" :to="{ name: 'gologin' }">
          <!-- <img src="@/assets/logout.svg" alt="" /> -->
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
main {
  overflow-x: hidden;
}
header {
  height: 70px;
  background: #101820 !important;
  padding: 0px;
  margin: 0px;
}
.header__inner {
  display: block;
  height: 70px;
  padding: 0px;
  margin: 0px;
  background: #101820;
  width: 95%;
  max-width: 95%;
  padding: 0 2.5%;
}
.header__inner-logo {
  float: left;
  height: 70px;
  line-height: 70px;
  padding: 0 25px 0 0;
  font-size: 20px;
  img {
    height: 27px;
    margin-top: 22px;
  }
}
.header__inner .link {
  float: left;
  height: 70px;
}
.link a {
  display: block;
  height: 70px;
  line-height: 70px;
  padding: 0 25px;
  color: #fff;
  font-weight: bold;
  font-size: 14px;
  border-left: 1px solid #333;
}
.link a:hover {
  color: #2699fb;
}
.link a.active {
  color: #fff;
  background: #2699fb;
}
.header__inner .logout {
  float: right;
  height: 70px;
  width: 50px;
  overflow: hidden;
}
.logout a {
  height: 35px;
  width: 50px;
  display: block;
  background: #fb2682;
  border-radius: 50px;
  margin-top: 17px;
  opacity: 0.8;
}
.logout a:hover {
  opacity: 1;
}
.logout img {
  height: 65%;
  margin-top: 10%;
}
.header__inner-account {
  float: right;
  font-size: 16px;
  line-height: 70px;
  padding: 0 25px 0 0;
}

#headerDesktop {
  display: block;
}
#headerMobile {
  display: none;
  color: #fff;
}
@media (max-width: 650px) {
  main {
    overflow-y: hidden;
  }
  .header {
    display: block;
    position: fixed;
    width: 100%;
    bottom: 0px;
    z-index: 10;
    height: 50px;
  }
  #headerDesktop {
    display: none;
  }
  #headerMobile {
    display: block;
    color: #fff;
    padding: 0px 0px;
  }
  .mobIcons {
    float: left;
    height: 50px;
    width: 25%;
    text-align: center;
    a {
      height: 50px;
    }
  }

  .Mob1 {
    background: #2699fb;
    display: none;
  }
  .Mob2 {
    background-color: #fff;
    -webkit-mask: url(@/assets/images/icons/home.svg) no-repeat center;
    mask: url(@/assets/images/icons/home.svg) no-repeat center;
    cursor: pointer;
    mask-size: 23px;
    &:hover {
      background-color: #2699fb;
    }
    a {
      background: none;
    }
  }
  .Mob3 {
    background-color: #fff;
    -webkit-mask: url(@/assets/images/icons/faq.svg) no-repeat center;
    mask: url(@/assets/images/icons/faq.svg) no-repeat center;
    cursor: pointer;
    mask-size: 25px;
    &:hover {
      background-color: #2699fb;
    }
    a {
      background: none;
    }
  }
  .Mob4 {
    background-color: #fb2682;
    -webkit-mask: url(@/assets/logout.svg) no-repeat center;
    mask: url(@/assets/logout.svg) no-repeat center;
    mask-size: 23px;
    float: right;
    &:hover {
      background-color: #fb2682;
    }
    a {
      background: none;
      margin-top: 0px;
      width: 110px;
      float: right;
    }
  }
}

/*header {
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
    // display: grid;
    // grid-template-columns:
    //   minmax(min-content, 2fr) 1fr 1fr 4fr minmax(min-content, 2fr)
    //   70px;
    // grid-template-columns: auto auto auto 1fr auto 70px;
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
}*/
</style>
