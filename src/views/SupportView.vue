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
            <a href="mailto:info@promosverlag">info@promosverlag.de</a>.
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
          <h2>Smartphone und WebApp</h2>
          <p>App Download und Fragen zur Funktion</p>
        </div>
      </div>
      <div class="faqItem wow fadeInLeft">
        <div class="faqItem__header tabBtn" @click="chgCurrentTab(10)">
          <h6>
            1. Was ist der Unterschied zwischen der App zum Download und der
            Webversion?
          </h6>

          <img src="@/assets/images/icons/chevron-bottom.svg" alt="" />
        </div>
        <div
          id="faq-10"
          class="faqItem__body tabEvent"
          :class="{ active: state.currentTab == 10 }"
        >
          <p>
            Es gibt von den Funktionen her keinen Unterschied. Die App
            ermöglicht Ihnen lediglich einen schnellen Zugriff zur Bibliothek,
            da Sie auf Ihrem Smartphone auf dem Homebildschirm abgespeichert
            wird. So können Sie ohne die Eingabe im Browser direkt zur
            Bibliothek reinklicken – so wie Sie es auch von Ihren anderes Apps
            gewohnt sind.
          </p>
        </div>
      </div>
      <div class="faqItem wow fadeInLeft">
        <div class="faqItem__header tabBtn" @click="chgCurrentTab(11)">
          <h6>
            2. Kann ich die Online Bilbiothek auch ohne App Download verwenden?
          </h6>

          <img src="@/assets/images/icons/chevron-bottom.svg" alt="" />
        </div>
        <div
          id="faq-11"
          class="faqItem__body tabEvent"
          :class="{ active: state.currentTab == 11 }"
        >
          <p>
            Ja, Sie können die Bibliothek auch weiterhin ganz normal über Ihren
            Browser auf dem Smartphone verwenden. Dazu nutzen Sie die bekannte
            Webadresse: bib.promosverlag.de
          </p>
        </div>
      </div>
      <div class="faqItem wow fadeInLeft">
        <div class="faqItem__header tabBtn" @click="chgCurrentTab(12)">
          <h6>3. WebApp Installation mit Windows Chrome</h6>
          <img src="@/assets/images/icons/chevron-bottom.svg" alt="" />
        </div>
        <div
          id="faq-12"
          class="faqItem__body tabEvent"
          :class="{ active: state.currentTab == 12 }"
        >
          <div class="ios-tut">
            <div class="tut-wrapper">
              <p>
                Im <span>Dashboard</span> zum Banner runterscrollen und auf
                <span>WebApp Download</span> klicken.
              </p>
              <img src="@/assets/chrome-appdownload.png" style="width: 100%" />
              <div style="clear: both"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="faqItem wow fadeInLeft">
        <div class="faqItem__header tabBtn" @click="chgCurrentTab(20)">
          <h6>4. WebApp Installation mit Android Smartphone</h6>
          <img src="@/assets/images/icons/chevron-bottom.svg" alt="" />
        </div>
        <div
          id="faq-20"
          class="faqItem__body tabEvent"
          :class="{ active: state.currentTab == 20 }"
        >
          <div class="ios-tut">
            <div class="tut-wrapper">
              <p>
                Im <span>Dashboard</span> zum Banner runterscrollen und auf
                <span>WebApp Download</span> klicken.
              </p>
              <img src="@/assets/android-appdownload.png" style="width: 50%" />
              <div style="clear: both"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="faqItem wow fadeInLeft">
        <div class="faqItem__header tabBtn" @click="chgCurrentTab(21)">
          <h6>5. WebApp Installation mit IPhone / IPad</h6>
          <img src="@/assets/images/icons/chevron-bottom.svg" alt="" />
        </div>
        <div
          id="faq-21"
          class="faqItem__body tabEvent"
          :class="{ active: state.currentTab == 21 }"
        >
          <div class="ios-tut">
            <div class="tut-wrapper">
              <p>
                In der Safari Navigation auf &nbsp;
                <img
                  src="@/assets/ios-a2hs.svg"
                  style="width: 15px; display: inline-block"
                />
                &nbsp; klicken,<br />runterscrollen,
                <span>Zum Home-Bildschirm</span> auswählen und
                <span>hinzufügen</span>.
              </p>
              <img src="@/assets/1.png" class="ios-tut-img" />
              <img src="@/assets/3.png" class="ios-tut-img" />
              <img src="@/assets/4.png" class="ios-tut-img" />
              <img src="@/assets/5.jpg" class="ios-tut-img" />
              <div style="clear: both"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="main__header">
        <div class="main__header-content long">
          <h2>Offline-Nutzung</h2>
          <p>Lokal abgespeicherte Daten und Offline-Nutzung</p>
        </div>
      </div>
      <div class="faqItem wow fadeInLeft">
        <div class="faqItem__header tabBtn" @click="chgCurrentTab(13)">
          <h6>
            1. Werden meine Bücher auch ohne App lokal für die Offline-Nutzung
            gespeichert?
          </h6>
          <img src="@/assets/images/icons/chevron-bottom.svg" alt="" />
        </div>
        <div
          id="faq-13"
          class="faqItem__body tabEvent"
          :class="{ active: state.currentTab == 13 }"
        >
          <p>
            Ja, sofern Sie den Browsercache nicht leeren sind alle
            heruntergeladenen Bücher lokal auf Ihrem Gerät zur Offline-Nutzung
            verfügbar.
          </p>
        </div>
      </div>
      <!-- <div class="faqItem wow fadeInLeft">
        <div class="faqItem__header tabBtn" @click="chgCurrentTab(14)">
          <h6>2. Wie kann ich die Bücher wieder von meinem Gerät löschen?</h6>
          <img src="@/assets/images/icons/chevron-bottom.svg" alt="" />
        </div>
        <div
          id="faq-14"
          class="faqItem__body tabEvent"
          :class="{ active: state.currentTab == 14 }"
        >
          <p>
            Sie können alle heruntergeladenen Bücher von Ihrem Smartphone oder
            Ihrem Desktop löschen, indem Sie alle Browserdaten und den
            Browsercache leeren. Je nach genutzten Gerät und Browser sind hier
            die genauen Wege unterschiedlich.
            <br /><br />
            <a
              href="https://support.google.com/chrome/answer/2392709?hl=de&co=GENIE.Platform%3DDesktop"
              target="_blank"
              >&rarr; &nbsp; Chrome</a
            ><br />
            <a
              href="https://support.mozilla.org/de/kb/cookies-und-website-daten-in-firefox-loschen"
              target="_blank"
              >&rarr; &nbsp; Firefox</a
            ><br />
            <a
              href="https://support.apple.com/de-de/guide/safari/sfri47acf5d6/mac"
              target="_blank"
              >&rarr; &nbsp; Safari</a
            ><br />
            <a
              href="https://support.google.com/chrome/answer/2392709?hl=de&co=GENIE.Platform%3DAndroid"
              target="_blank"
              >&rarr; &nbsp; Android</a
            ><br />
            <a href="https://support.apple.com/de-de/HT201265" target="_blank"
              >&rarr; &nbsp; Iphone, Ipad</a
            >
          </p>
        </div>
      </div> -->
      <div class="faqItem wow fadeInLeft">
        <div class="faqItem__header tabBtn" @click="chgCurrentTab(15)">
          <h6>2. Heruntergeladene Bücher werden nicht angezeigt.</h6>
          <img src="@/assets/images/icons/chevron-bottom.svg" alt="" />
        </div>
        <div
          id="faq-15"
          class="faqItem__body tabEvent"
          :class="{ active: state.currentTab == 15 }"
        >
          <p>
            Stellen Sie sicher, dass Sie die Bücher auch auf dem entsprechenden
            Gerät heruntergeladen haben. So können z.B. Bücher offline nicht
            angezeigt werden, wenn Sie den Download auf Ihrem Laptop vorgenommen
            haben und die Bücher auf dem Handy aufrufen. <br /><br />
            Weiterhin muss für den Download eine Internetverbindung vorhanden
            sein, damit die Daten für die spätere Offline-Nutzung überhaupt
            heruntergeladen werden können.
            <br /><br />
            Wenn diese Kriterien erfüllt sind, können Sie das Buch auch ohne
            Internetverbindung jederzeit wie gewohnt über den Button „Buch
            öffnen“ offline nutzen.
            <br /><br />
            Falls Sie weiterhin Probleme mit der Offline-Nutzung haben,
            schildern Sie uns bitte Ihre Problematik via Mail an die
            <a href="mailto:support@promosverlag.de">support@promosverlag.de</a
            >.<br /><br />Hinweis: Mit dem Download werden keine offenen
            PDF-Daten o.ä. bereitgestellt. Der Download dient alleinig dazu das
            System für die Offline-Nutzung bereitzustellen. Die
            heruntergeladenen Bücher werden dabei lokal auf Ihrem Gerät für Ihre
            persönliche Nutzung bereitgestellt.
          </p>
        </div>
      </div>
      <div class="faqItem wow fadeInLeft">
        <div class="faqItem__header tabBtn" @click="chgCurrentTab(16)">
          <h6>3. Kann ich offline die Notiz-Kommentare weiterhin verweden?</h6>
          <img src="@/assets/images/icons/chevron-bottom.svg" alt="" />
        </div>
        <div
          id="faq-16"
          class="faqItem__body tabEvent"
          :class="{ active: state.currentTab == 16 }"
        >
          <p>
            Die Notizfunktion im Offlinemodus lässt sich weiterhin nutzen.
            Jedoch müssen Sie beachten, dass das Hochladen und die weitere
            Übertragung auf ein anderes Gerät aus sicherheitstechnischen Gründen
            nicht möglich ist.<br /><br />
            Daher wird empfohlen entweder dauerhaft nur ein Gerät im
            Offlinemodus zu verwenden oder die Notizfunktion weiterhin online zu
            verwenden.
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
import { mapState } from "vuex";
export default {
  name: "SupportView",
  data() {
    return {
      state: {
        currentTab: 0,
      },
    };
  },
  computed: {
    ...mapState(["token"]),
  },
  mounted() {
    this.$store.commit("setMainMenu", "support");
    if (this.token != "202cb963ac59075b964b07152d234b70") {
      this.$router.push("/login");
    }
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
<style lang="scss" scoped>
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

p {
  max-width: 100%;
}

.ios-tut {
  .tut-wrapper {
    background: #fff;
    padding: 5%;
    display: block;
    border-radius: 10px;
    border: 1px solid #ccc;
    margin-top: 35px;
  }
  .ios-tut-img {
    width: 45%;
    float: left;
    margin: 2.5%;
    border-radius: 10px;
  }
  span {
    color: #2799fa;
  }
  p {
    margin-bottom: 25px;
    margin-top: 5px;
    width: 100%;
    max-width: 100%;
    text-align: center;
  }
}
</style>
