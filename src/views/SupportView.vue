<template>
  <div class="main support">
    <div class="main__header">
      <div class="main__header-content long">
        <h2>Allgemeine Fragen</h2>
        <p>Fragen zum Kundenkonto, Registrierung und Zugangsdaten.</p>
      </div>
    </div>
    <div class="main__body">
      <div class="faqItem wow fadeInLeft">
        <div class="faqItem__header tabBtn" @click="chgCurrentTab(1)">
          <h6>1. Kann ich meine E-Mail Adresse ändern?</h6>
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
          <h6>2. Enstehen zusätzliche Kosten für mein Kundenkonto?</h6>

          <img src="@/assets/images/icons/chevron-bottom.svg" alt="" />
        </div>
        <div
          id="faq-2"
          class="faqItem__body tabEvent"
          :class="{ active: state.currentTab == 2 }"
        >
          <p>
            Sobald Sie ein Exemplar eines Ebooks erworben haben, stehen Ihnen
            alle damit verbundenen Funktionen in der Ebook Bibliothek zur
            Verfügung. Weitere Ebooks sind kostenpflichtig in unserem Shop zu
            erwerben (<a
              href="https://shop.strato.de/epages/244823.sf/"
              target="_blank"
              >promosverlag onlineshop</a
            >).
          </p>
          <br />
          <p>
            Weiterhin können Sie im Shop ebenfalls auch Nutzerlizenzen für ein
            bestimmtes Buch erwerben. Weitere Informationen dazu erhalten Sie im
            Supportbereich <strong>Nutzerlizenzen und Laufzeiten</strong>
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
      <div class="main__header">
        <div class="main__header-content long">
          <h2>Nutzerlizenzen und Laufzeiten</h2>
          <p>Fragen zum Kundenkonto, Registrierung und Zugangsdaten.</p>
        </div>
      </div>
      <div class="faqItem wow fadeInLeft">
        <div class="faqItem__header tabBtn" @click="chgCurrentTab(5)">
          <h6>1. Wie vergebe ich mehrere Buchlizenzen an einen Nutzer?</h6>

          <img src="@/assets/images/icons/chevron-bottom.svg" alt="" />
        </div>
        <div
          id="faq-3"
          class="faqItem__body tabEvent"
          :class="{ active: state.currentTab == 5 }"
        >
          <p>
            Sie gehen wie gewohnt über die Lizenzverwaltung des jeweiligen
            Buches und vergeben eine Lizenz an die gleiche Mailadresse wie bei
            den anderen Büchern. Das System erkennt, dass es sich nicht um einen
            neuen Benutzer handelt, sondern um einen bestehenden Benutzer, der
            bereits ein oder mehrere Bücher zugeteilt bekommen hat.
          </p>
        </div>
      </div>
      <div class="faqItem wow fadeInLeft">
        <div class="faqItem__header tabBtn" @click="chgCurrentTab(5)">
          <h6>
            2. Einer meiner Lizenznutzer hat sein Passwort verloren und kann
            sich nicht mehr einlogen.
          </h6>

          <img src="@/assets/images/icons/chevron-bottom.svg" alt="" />
        </div>
        <div
          id="faq-3"
          class="faqItem__body tabEvent"
          :class="{ active: state.currentTab == 5 }"
        >
          <p>
            Sie gehen wie gewohnt über die Lizenzverwaltung des jeweiligen
            Buches und vergeben eine Lizenz an die gleiche Mailadresse wie bei
            den anderen Büchern. Das System erkennt, dass es sich nicht um einen
            neuen Benutzer handelt, sondern um einen bestehenden Benutzer, der
            bereits ein oder mehrere Bücher zugeteilt bekommen hat.
          </p>
        </div>
      </div>
      <div class="main__header">
        <div class="main__header-content long">
          <h2>Weitere Fragen</h2>
          <p>
            Sie haben weitere Fragen und Ihre Frage ist nicht aufgeführt? Dann
            schreiben Sie uns gerne eine Mail an
            <a href="mailto:support@promsoverlag.de">info@promsoverlag.de</a>.
            Wir werden Ihnen schnellstmöglich weiterhelfen und ggfs. Ihre Frage
            in unseren Katalog aufnehmen.
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
  width: 100%;
  max-width: 100%;
  font-size: 16px;
  line-height: 28px;
}
.main__header-content {
  width: 100%;
  text-align: left;
}
h2 {
  margin-bottom: 5px;
  margin-top: 35px;
}
.main__header:first-child h2 {
  margin-top: 0px;
}
h6 {
  text-align: left;
}
</style>
