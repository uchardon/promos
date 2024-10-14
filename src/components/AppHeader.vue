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
        <img src="@/assets/logout.svg" alt="" @click.prevent="logout()" />
      </div>
      <div
        v-if="
          $route.name != 'login' &&
          $route.name != 'useYourLink' &&
          $route.name != 'gologin'
        "
        class="header__inner-account"
      >
        <span v-if="userstate == 'customer'" class="online"></span>
        <span class="username" @click="showUserInfo()"><slot></slot></span>
        <div class="userInfo">
          <form action="#" @submit.prevent="chgPassword()">
            <div v-if="error != ''" class="mess">
              {{ error }}
            </div>
            <label for="pass1">
              neues Passwort<br />
              <input
                id="pass1"
                v-model="newPass1"
                type="text"
                required
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Muss min. eine Zahl und einen Grossbuchstaben und min. 8 Zeichen enthalten. "
              />
            </label>
            <label for="pass2">
              neues Passwort wiederholen<br />
              <input id="pass2" v-model="newPass2" type="text" required />
            </label>
            <label for="oldPass">
              alte Passwort<br />
              <input id="oldPass" v-model="oldPass" type="text" required />
            </label>
            <button type="submit" class="btn btn-primary">
              Passwort ändern
            </button>
          </form>
        </div>
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
import { mapActions, mapState } from "vuex";

export default {
  name: "AppHeader",
  data() {
    return {
      newPass1: "",
      newPass2: "",
      oldPass: "",
      error: "",
    };
  },
  methods: {
    ...mapState(["userstate"]),
    ...mapActions(["updateUserPassword"]),
    logout() {
      sessionStorage.clear();
      this.$router.push({ path: "/login" });
    },
    showUserInfo() {
      document.querySelector(".userInfo").classList.toggle("active");
    },
    chgPassword() {
      this.error = "";
      // this.oldPass = "" =check= this.$store.state.user.password
      if (this.newPass1 == this.newPass2) {
        console.log("ok");
        this.updateUserPassword({
          password: this.oldPass,
          newpassword: this.newPass1,
          email: this.$store.state.user.email,
        });
        this.oldPass = "";
        this.newPass1 = "";
        this.newPass2 = "";
        document.querySelector(".userInfo").classList.toggle("active");
      } else {
        console.error("nok");
        this.error =
          "Passwort stimmt nicht überein. Bitte versuchen Sie es erneut.";
      }
    },
  },
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
.userInfo {
  display: none;
  position: absolute;
  top: 70px;
  right: 0px;
  width: 500px;
  max-width: 90vw;
  background: #fff;
  z-index: 1000;
  padding: 1rem 1.5rem;
  box-shadow: 3px 3px 10px #00000099;
  & form {
    display: flex;
    flex-direction: column;
    color: #000;
  }
  line-height: 1.2em;
  & label {
    padding-block: 1rem;
  }
  & input {
    padding: 0.3rem;
    background: #eee;
    border-bottom: 1px solid #000;
    margin-block-start: 5px;
    font-weight: 400;
    line-height: 1.2em;
  }
}
.userInfo.active {
  display: block;
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
.logout {
  background: #fb2682;
  padding: 0 10px;
}

.logout img {
  height: 50%;
  margin-top: 33%;
}
.logout a:hover {
  opacity: 1;
}
.logout img {
  height: 65%;
  margin-top: 10%;
}
.header__inner-account {
  position: relative;
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
