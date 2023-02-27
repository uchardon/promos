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
          <h6>1. Wie kann ich meine Zugangsdaten ändern?</h6>
          <img src="@/assets/images/icons/chevron-bottom.svg" alt="" />
        </div>
        <div
          id="faq-1"
          class="faqItem__body tabEvent"
          :class="{ active: state.currentTab == 1 }"
        >
          <p>
            Ihre Zugangsdaten sind vom System fest vergeben. Die Mailadresse
            wird aus dem Onlineshop verwendet um die Bücher und Zahlungen
            fehlerfrei zuzuordnen.<br /><br />
            Das Passwort wird vom System generiert. Wenn Sie Ihr Passwort
            verloren haben, können Sie sich dieses per Mail erneut zusenden
            lassen. Für ein komplett neues Passwort, schreiben Sie uns bitte
            eine Mail an
            <a href="mailto:support@promosverlag">support@promosverlag.de</a>.
          </p>
        </div>
      </div>
      <div class="faqItem wow fadeInLeft">
        <div class="faqItem__header tabBtn" @click="chgCurrentTab(2)">
          <h6>2. Ich habe mein Passwort verloren.</h6>
          <img src="@/assets/images/icons/chevron-bottom.svg" alt="" />
        </div>
        <div
          id="faq-2"
          class="faqItem__body tabEvent"
          :class="{ active: state.currentTab == 2 }"
        >
          <p>
            Um Ihr Passwort zusenden zu lassen, verwenden Sie die Funktion
            „Passwort vergessen“ auf der Loginseite. Anschließend wird Ihnen auf
            die hinterlegte Mailadresse Ihr Passwort erneut zugesendet.
          </p>
          <br />
          <img
            src="@/assets/images/faq/faq-pw-vergessen1.png"
            style="max-width: 100%"
          />
        </div>
      </div>
      <div class="faqItem wow fadeInLeft">
        <div class="faqItem__header tabBtn" @click="chgCurrentTab(3)">
          <h6>3. Ich möchte mein Konto löschen.</h6>

          <img src="@/assets/images/icons/chevron-bottom.svg" alt="" />
        </div>
        <div
          id="faq-3"
          class="faqItem__body tabEvent"
          :class="{ active: state.currentTab == 3 }"
        >
          <p>
            Sie können jederzeit die Löschung Ihres Kontos beantragen. Bitte
            beachten Sie aber, dass dadurch ebenfalls Ihre Bücher und Lizenzen
            gelöscht werden. Wir empfehlen daher das Konto zu parken und die
            Löschung nur in Sonderfällen zu beantragen. Den Antrag können Sie
            per Mail an die
            <a href="mailto:support@promosverlag">support@promosverlag.de</a>
            richten.
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
          <h6>
            1. Muss ich als Einzelanwender ebenfalls Nutzerlizenzen kaufen?
          </h6>

          <img src="@/assets/images/icons/chevron-bottom.svg" alt="" />
        </div>
        <div
          id="faq-5"
          class="faqItem__body tabEvent"
          :class="{ active: state.currentTab == 5 }"
        >
          <p>
            Nein. Als Einzelanwender haben Sie bereits die Printversion der
            Buchausgabe erworben. Somit steht Ihnen weiterhin kostenfrei die
            digitale Version in der Promos Online Bibliothek zur Verfügung.<br /><br />Nur
            wenn Sie vorhaben das Buch mit anderen Benutzern zu teilen oder
            bspw. Schülern zur Verfügung stellen sind weitere Nutzungslizenzen
            erforderlich.
          </p>
        </div>
      </div>
      <div class="faqItem wow fadeInLeft">
        <div class="faqItem__header tabBtn" @click="chgCurrentTab(6)">
          <h6>2. Wie lange ist die Laufzeit einer Nutzungslizenz.</h6>

          <img src="@/assets/images/icons/chevron-bottom.svg" alt="" />
        </div>
        <div
          id="faq-6"
          class="faqItem__body tabEvent"
          :class="{ active: state.currentTab == 6 }"
        >
          <p>
            Die Laufzeit beträgt 25 Monate ab dem erstem Login Ihres angelegeten
            Benutzers. D.h. Solange Ihr angelegter Benutzer sich nicht aktiv in
            den Account eingelogt hat, können Sie die Lizenzzuweisung jederzeit
            aufheben und neu vergeben.<br /><br />
            Ab Login Ihres angelegten Benutzers beginnt die Laufzeit und
            erlischt automatisch nach 25 Monaten. Dabei werden die Laufzeiten
            monatlich zum 1. des kommenden Monats beginnend kalkuliert.<br /><br />
            <strong>Beispiel:</strong>
            Wenn sich Benutzer X am 12. Januar 2023 eingelogt hat und Benutzer Y
            am 25. Januar 2023, beginnen beide Lizenzlaufzeiten ab dem 1.
            Februar und enden am 31. März 2025.
          </p>
        </div>
      </div>
      <div class="faqItem wow fadeInLeft">
        <div class="faqItem__header tabBtn" @click="chgCurrentTab(7)">
          <h6>3. Wie kann ich Nutzungslizenzen erwerben?</h6>

          <img src="@/assets/images/icons/chevron-bottom.svg" alt="" />
        </div>
        <div
          id="faq-7"
          class="faqItem__body tabEvent"
          :class="{ active: state.currentTab == 7 }"
        >
          <p>
            Sie können zusätzlich zu Ihrer erworbenen Ebook Version auch
            Nutzungslizenzen für weitere Nutzer (z.B. Schüler) im
            <a href="https://shop.strato.de/epages/244823.sf/" target="_blank"
              >Onlineshop</a
            >
            erwerben.
          </p>
        </div>
      </div>
      <div class="faqItem wow fadeInLeft">
        <div class="faqItem__header tabBtn" @click="chgCurrentTab(8)">
          <h6>
            4. Ich habe Nutzungslizenzen gekauft, die ich in meinem Account
            nicht sehen kann.
          </h6>

          <img src="@/assets/images/icons/chevron-bottom.svg" alt="" />
        </div>
        <div
          id="faq-8"
          class="faqItem__body tabEvent"
          :class="{ active: state.currentTab == 8 }"
        >
          <p>
            Bitte beachten Sie, das die Aktivierung nach Erwerb der Lizenzen 1-2
            Werktage in Anspruch nehmen könnte, da jede Bestellung aus
            sicherheitsgründen manuell geprüft und aktiviert wird.<br /><br />

            Prüfen Sie außerdem ob Sie gerade im Offlinemodus auf die Bibliothek
            zugreifen. Für den Datenabgleich ist eine Internetverbindung
            zwingend erforderlich.<br /><br />

            Falls beide Kriterien erfüllt sein sollen und Sie weiterhin keine
            Lizenzen freigeschalten bekommen haben, wenden Sie sich bitte an den
            Support (<a href="mailto:support@promosverlag"
              >support@promosverlag.de</a
            >), damit wir Ihr Konto manuell prüfen und ggfs. erweitern.
          </p>
        </div>
      </div>
      <div class="faqItem wow fadeInLeft">
        <div class="faqItem__header tabBtn" @click="chgCurrentTab(9)">
          <h6>5. Wie kann ich Nutzerlizenzen zuweisen?</h6>

          <img src="@/assets/images/icons/chevron-bottom.svg" alt="" />
        </div>
        <div
          id="faq-9"
          class="faqItem__body tabEvent"
          :class="{ active: state.currentTab == 9 }"
        >
          <p>
            Auf der Startseite (Meine Bücher) finden Sie unter jedem Ebook mit
            erworbenen Lizenzen den Button „Lizenzen verwalten“. Durch anklicken
            gelangen Sie zur Lizenzverwaltung.<br /><br />
            (1) Übersicht zum Ebook und Lizenzmengen<br />
            (2) Liste über Ihre zugeordneten Lizenzen an Benutzer
            (Mailadressen)<br />
            (3) Hier weisen Sie Lizenzen neuen Benutzern zu.<br /><br />
            Tragen Sie hier die E-Mail Adresse des gewünschten Benutzers ein.
            Anschließend erhält dieser eine E-Mail mit seinen Zugangsdaten. Wenn
            dieser sich weiterhin eingelogt hat, gilt die Lizenz als aktiviert
            (blaue Schrift) und kann nicht mehr gelöscht werden.
            <br /><br />
            Falls Sie bei der Vergabe versehentlich eine falsche Mailadresse
            eingetragen haben, können Sie in der Liste durch Klicken auf das "X"
            die Zuordnung wieder löschen.
          </p>
        </div>
      </div>
      <div class="main__header">
        <div class="main__header-content long">
          <h2>Weitere Fragen</h2>
          <p>
            Sie haben weitere Fragen und Ihre Frage ist nicht aufgeführt? Dann
            schreiben Sie uns gerne eine Mail an
            <a href="mailto:support@promsoverlag.de">support@promsoverlag.de</a
            >. Wir werden Ihnen schnellstmöglich weiterhelfen und ggfs. Ihre
            Frage in unseren Katalog aufnehmen.
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
.main {
  max-width: 1024px;
  margin: 0px auto;
}
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
  margin-top: 60px;
}
.faqItem__header {
  padding: 20px 25px;
}
.main__header:first-child h2 {
  margin-top: 0px;
}
h6 {
  text-align: left;
}
</style>
