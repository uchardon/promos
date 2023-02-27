<template>
  <header class="header">
    <div id="headerDesktop" class="header__inner">
      <div class="big click" @click="$router.push({ name: 'mybooks' })">
        <img src="@/assets/images/icons/back.svg" />
      </div>
      <div class="BookPages">
        <input
          v-model="currentPage"
          type="number"
          maxlength="3"
          placeholder="1"
          onclick="this.placeholder=''"
          onfocus="this.select()"
          onblur="this.placeholder=!this.placeholder?'1':this.placeholder;"
          @change="newPage()"
        />
        <span>/ {{ maxpages }}</span>
      </div>
      <div class="inhalt inhaltPreview pointer" @click="showIndex()">
        <img src="@/assets/images/icons/threebar.svg" />
      </div>
      <div class="BookAnsichten" :class="{ xyz: ShowDouble }">
        <div
          class="baSingle"
          :class="{ baActive: seitenAnsicht == 'single' }"
          @click="setSeitenAnsicht('single')"
        ></div>
        <div
          class="baDouble"
          :class="{ baActive: seitenAnsicht == 'double' }"
          @click="setSeitenAnsicht('double')"
        ></div>
      </div>
      <div class="inhalt inhaltLesezeichen pointer" @click="showIndex()">
        <img src="@/assets/images/icons/lesezeichen.svg" />
      </div>
    </div>
    <div id="headerMobile">
      <div class="Mob1" @click="$router.push({ name: 'mybooks' })">
        <img src="@/assets/images/icons/back.svg" />
      </div>
      <div class="BookPages">
        <input
          type="number"
          maxlength="3"
          placeholder="1"
          onclick="this.placeholder=''"
          onfocus="this.select()"
          onblur="this.placeholder=!this.placeholder?'1':this.placeholder;"
        />
        <span>/ 55</span>
      </div>
      <div class="inhalt inhaltLesezeichen pointer" @click="showIndex()">
        <img src="@/assets/images/icons/lesezeichen.svg" />
      </div>
    </div>
  </header>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "AppHeaderEbook",
  props: {
    pageInViewport: {
      type: Number,
      default: 1,
    },
    maxpages: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      ShowDouble: false,
      currentPage: 1,
    };
  },
  computed: {
    ...mapState(["curPage", "seitenAnsicht"]),
  },
  methods: {
    ...mapActions(["setModal", "setCurPage", "setSeitenAnsicht"]),
    showIndex() {
      console.log("showIndex");
      this.setModal({ state: true, content: "ShowBookIndex" });
    },
    newPage() {
      this.chgPage(this.currentPage);
    },
    chgPage(pageNo) {
      console.log("chgPage");
      let pageBox = this.getElement(pageNo);
      this.setCurPage(pageNo);
      pageBox.scrollIntoView();
    },
    getElement(no) {
      let arg = "[data-page=page-" + no + "]";
      // console.log("arg", arg);
      this.target = document.querySelector(arg);
      return this.target;
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
  position: fixed;
  top: 0px;
  z-index: 13;
  width: 100%;
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
// .header__inner-logo {
//   float: left;
//   height: 70px;
//   line-height: 70px;
//   padding: 0 25px 0 0;
//   font-size: 20px;
// }
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
.header__inner {
  width: 100%;
  max-width: 100%;
  padding: 0px;
}
.big.click {
  float: left;
  height: 70px;
  width: auto;
  display: block;
  padding: 0px 25px;
  background: #2699fb;
  &:hover {
    background: #217fcf;
  }
  img {
    width: 25x;
    height: 25px;
    display: block;
    margin-top: 22px;
  }
}
.BookPages {
  float: left;
  height: 70px;
  line-height: 70px;
  padding: 0px 25px;
  span {
    margin-left: 10px;
    color: #fff;
  }
  input {
    width: 30px;
    overflow: hidden;
    text-align: right;
    padding: 5px;
    border-radius: 5px;
    height: 20px;
    font-size: 16px;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type="number"] {
    -moz-appearance: textfield;
  }
  @media (max-width: 650px) {
    height: 50px;
    line-height: 53px;
    padding: 0px 20px;
    span {
      font-size: 14px;
    }
  }
}
.inhalt {
  float: right;
  height: 70px;
  width: auto;
  display: block;
  padding: 0px 25px;
  &:hover {
    background: #2699fb;
  }
  img {
    width: 25x;
    height: 25px;
    display: block;
    margin-top: 22px;
  }
  &.inhaltPreview img {
    width: 22px;
  }
  @media (max-width: 650px) {
    height: 50px;
    padding: 0px 20px;
    img {
      height: 22px;
      margin-top: 13px;
    }
  }
}

.BookAnsichten {
  width: 150px;
  float: left;
  height: 70px;
  position: relative;
  left: calc(50% - 70px);
  margin-left: -200px;
  div {
    cursor: pointer;
    mask-size: 22px;
    height: 70px;
    padding: 0px 37px;
    float: left;
    &:hover {
      background: #2699fb;
    }
  }
  .baSingle {
    background-color: #fff;
    -webkit-mask: url(@/assets/images/icons/baSingle.svg) no-repeat center;
    mask: url(@/assets/images/icons/baSingle.svg) no-repeat center;
  }
  .baDouble {
    background-color: #fff;
    -webkit-mask: url(@/assets/images/icons/baDouble.svg) no-repeat center;
    mask: url(@/assets/images/icons/baDouble.svg) no-repeat center;
  }
  .baFull {
    background-color: #fff;
    -webkit-mask: url(@/assets/images/icons/baFull.svg) no-repeat center;
    mask: url(@/assets/images/icons/baFull.svg) no-repeat center;
  }
  .baActive {
    background: #2699fb;
  }
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
    width: auto;
    text-align: center;
    a {
      height: 50px;
    }
  }

  .Mob1 {
    float: left;
    height: 50px;
    width: auto;
    display: block;
    padding: 0px 20px;
    background: #2699fb;
    cursor: pointer;
    &:hover {
      background: #217fcf;
    }
    img {
      width: 20x;
      height: 20px;
      display: block;
      margin-top: 15px;
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
