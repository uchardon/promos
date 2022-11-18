<template>
  <div class="main support">
    <div class="main__header">
      <div class="main__header-content long">
        <h2>Hilfe / Support</h2>
        <p>
          Nach Erwerb im Onlineshop werden die Lizenzen Ihrem Account
          zugeordnet. Bitte beachten Sie, dass die Zuordnung 1-2 Werktage in
          Anspruch nehmen kann.
        </p>
      </div>
    </div>
    <div class="main__body">
      <div class="faqItem wow fadeInLeft">
        <div class="faqItem__header tabBtn" @click="chgCurrentTab(1)">
          <h6>1. Hilfe / Support</h6>
          <img src="@/assets/images/icons/chevron-bottom.svg" alt="" />
        </div>
        <div
          id="faq-1"
          class="faqItem__body tabEvent"
          :class="{ active: state.currentTab == 1 }"
        >
          <p>
            Nach Erwerb im Onlineshop werden die Lizenzen Ihrem Account
            zugeordnet. Bitte beachten Sie, dass die Zuordnung 1-2 Werktage in
            Anspruch nehmen kann.
          </p>
        </div>
      </div>
      <div class="faqItem wow fadeInLeft">
        <div class="faqItem__header tabBtn" @click="chgCurrentTab(2)">
          <h6>2. Hilfe / Support</h6>

          <img src="@/assets/images/icons/chevron-bottom.svg" alt="" />
        </div>
        <div
          id="faq-2"
          class="faqItem__body tabEvent"
          :class="{ active: state.currentTab == 2 }"
        >
          <p>
            Nach Erwerb im Onlineshop werden die Lizenzen Ihrem Account
            zugeordnet. Bitte beachten Sie, dass die Zuordnung 1-2 Werktage in
            Anspruch nehmen kann.
          </p>
        </div>
      </div>
      <div class="faqItem wow fadeInLeft">
        <div class="faqItem__header tabBtn" @click="chgCurrentTab(3)">
          <h6>3. Hilfe / Support</h6>

          <img src="@/assets/images/icons/chevron-bottom.svg" alt="" />
        </div>
        <div
          id="faq-3"
          class="faqItem__body tabEvent"
          :class="{ active: state.currentTab == 3 }"
        >
          <p>
            Nach Erwerb im Onlineshop werden die Lizenzen Ihrem Account
            zugeordnet. Bitte beachten Sie, dass die Zuordnung 1-2 Werktage in
            Anspruch nehmen kann.
          </p>
        </div>
      </div>
      <div class="faqItem wow fadeInLeft">
        <div class="faqItem__header tabBtn" @click="chgCurrentTab(4)">
          <h6>4. Hilfe / Support</h6>

          <img src="@/assets/images/icons/chevron-bottom.svg" alt="" />
        </div>
        <div
          id="faq-4"
          class="faqItem__body tabEvent"
          :class="{ active: state.currentTab == 4 }"
        >
          <p>
            Nach Erwerb im Onlineshop werden die Lizenzen Ihrem Account
            zugeordnet. Bitte beachten Sie, dass die Zuordnung 1-2 Werktage in
            Anspruch nehmen kann.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SupportView",
  data() {
    return {
      state: {
        currentTab: 0,
      },
    };
  },
  mounted() {
    this.$store.commit("setMainMenu", "support");
  },
  methods: {
    chgCurrentTab(p) {
      console.log("==chgCurrentTab=", p, this.state.currentTab);
      if (this.state.currentTab == p) {
        this.state.currentTab = 0;
      } else {
        this.state.currentTab = p;
      }
    },
  },
};
</script>
<style scoped>
p {
  text-align: left;
}
</style>
