<template>
  <div class="main">
    <div class="main__header">
      <div v-if="state.subPage == 'licenses'" class="main__header-content">
        <h1>Lizenzen</h1>
        <p>
          Nach Erwerb im Onlineshop werden die Lizenzen Ihrem Account
          zugeordnet. Bitte beachten Sie, dass die Zuordnung 1-2 Werktage in
          Anspruch nehmen kann.
        </p>
      </div>

      <div v-if="state.subPage == 'users'" class="main__header-content">
        <h1>Benutzer</h1>
        <p>
          Bitte beachten Sie, dass die Zuteilung der Lizenzen permanent an den
          jeweiligen Benutzer verknüpft ist. Die zugeteilte Lizenz ist
          anschließend nicht auf andere Benutzer übertragbar.
        </p>
      </div>

      <div class="main__header-btns" data-bl="all">
        <a
          href="#"
          class="main__header-btn"
          :class="{ active: state.subPage == 'licenses' }"
          @click="chgSubPage('licenses')"
        >
          Lizenzen
        </a>
        <a
          href="#"
          class="main__header-btn"
          :class="{ active: state.subPage == 'users' }"
          @click="chgSubPage('users')"
        >
          Benutzer
        </a>
      </div>
    </div>

    <div
      v-if="state.offline"
      id="info-offline-lizenzen-benutzer"
      class="info active"
      data-bl="all"
    >
      <div class="info__icon">
        <img src="images/icons/attentRed.svg" alt="" />
      </div>
      <div class="info__content">
        <h6>Sie sind offline.</h6>
        <p>
          Im Offlinemodus können Lizenzen und Benutzer nicht verwaltet werden.
          Bitte stellen Sie eine Internetverbindung her.
        </p>
      </div>
    </div>

    <Transition mode="out-in">
      <div v-if="state.subPage == 'users'" class="main__body">
        <form action="#" class="search">
          <div class="search__input">
            <input
              type="text"
              onclick="this.placeholder=''"
              onfocus="this.select()"
              onblur="this.placeholder=!this.placeholder?'Benutzer suchen...':this.placeholder;"
              placeholder="Benutzer suchen..."
            />
            <button type="submit">
              <img src="images/icons/search.svg" alt="" />
            </button>
          </div>
          <button
            type="button"
            class="button pdfBtn modBtn"
            data-tab="#addBenutzer"
          >
            + Benutzer erstellen
          </button>
        </form>
        <div class="benutzer">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Kunde</th>
                <th>Lizenzen</th>
                <th>Ebooks</th>
                <th>Bearbeiten</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="benutzer__number">1</td>
                <td>
                  <button
                    type="button"
                    class="benutzer__btn uniq modBtn"
                    data-tab="#client-1"
                  >
                    Max Mustermann
                  </button>
                </td>
                <td class="benutzer__detail">
                  <button
                    type="button"
                    class="benutzer__btn modBtn"
                    data-tab="#adminLicense-1"
                  >
                    2 <span>Lizenzen</span>
                  </button>
                </td>
                <td class="benutzer__product">
                  <p>
                    Karl Friedmann: Fit sein durch Ausdauer und Kraft,
                    Präsentation 2017
                  </p>
                  <p>
                    Karl Friedmann: Fit sein durch Ausdauer und Kraft,
                    Präsentation 2017
                  </p>
                </td>
                <td>
                  <div class="benutzer__md-row">
                    <button
                      type="button"
                      class="benutzer__md modBtn"
                      data-tab="#client-1"
                    >
                      <svg>
                        <use xlink:href="#account"></use>
                      </svg>
                    </button>
                    <button
                      type="button"
                      class="benutzer__md modBtn"
                      data-tab="#adminBook-1"
                    >
                      <svg>
                        <use xlink:href="#book"></use>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td class="benutzer__number">1</td>
                <td>
                  <button
                    type="button"
                    class="benutzer__btn uniq modBtn"
                    data-tab="#client-1"
                  >
                    Max Mustermann
                  </button>
                </td>
                <td class="benutzer__detail">
                  <button
                    type="button"
                    class="benutzer__btn modBtn"
                    data-tab="#adminLicense-1"
                  >
                    2 <span>Lizenzen</span>
                  </button>
                </td>
                <td class="benutzer__product">
                  <p>
                    Karl Friedmann: Fit sein durch Ausdauer und Kraft,
                    Präsentation 2017
                  </p>
                  <p>
                    Karl Friedmann: Fit sein durch Ausdauer und Kraft,
                    Präsentation 2017
                  </p>
                  <p>
                    Karl Friedmann: Fit sein durch Ausdauer und Kraft,
                    Präsentation 2017
                  </p>
                </td>
                <td>
                  <div class="benutzer__md-row">
                    <button
                      type="button"
                      class="benutzer__md modBtn"
                      data-tab="#client-1"
                    >
                      <svg>
                        <use xlink:href="#account"></use>
                      </svg>
                    </button>
                    <button
                      type="button"
                      class="benutzer__md modBtn"
                      data-tab="#adminBook-1"
                    >
                      <svg>
                        <use xlink:href="#book"></use>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td class="benutzer__number">1</td>
                <td>
                  <button
                    type="button"
                    class="benutzer__btn uniq modBtn"
                    data-tab="#client-1"
                  >
                    Max Mustermann
                  </button>
                </td>
                <td class="benutzer__detail">
                  <button
                    type="button"
                    class="benutzer__btn modBtn"
                    data-tab="#adminLicense-1"
                  >
                    2 <span>Lizenzen</span>
                  </button>
                </td>
                <td class="benutzer__product">
                  <p>
                    Karl Friedmann: Fit sein durch Ausdauer und Kraft,
                    Präsentation 2017
                  </p>
                </td>
                <td>
                  <div class="benutzer__md-row">
                    <button
                      type="button"
                      class="benutzer__md modBtn"
                      data-tab="#client-1"
                    >
                      <svg>
                        <use xlink:href="#account"></use>
                      </svg>
                    </button>
                    <button
                      type="button"
                      class="benutzer__md modBtn"
                      data-tab="#adminBook-1"
                    >
                      <svg>
                        <use xlink:href="#book"></use>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div v-else-if="state.subPage == 'licenses'" class="main__body">
        <div class="bookLic">
          <div class="bookLic__image">
            <img src="@/assets/images/book.png" alt="" />
          </div>
          <div class="bookLic__content">
            <div class="bookLic__content-text">
              <h6 class="sm">
                Karl Friedmann: Fit sein durch Ausdauer und Kraft, Präsentation
                2017
              </h6>
              <p class="sm modBtn" data-tab="#tableLicense-1">
                Lizenzverlauf ansehen
              </p>
            </div>
            <div class="license__row">
              <div class="license user">
                <div class="license__number">
                  <p class="sm">
                    Verfügbare
                    <br />
                    Lizenzen
                  </p>
                  <input type="text" value="6" />
                </div>
              </div>
              <div class="license">
                <div class="license__number">
                  <p class="sm">
                    Lizenzen bereits
                    <br />
                    in Verwendung
                  </p>
                  <input type="text" value="6/12" />
                </div>
              </div>
            </div>
            <div class="license uniq">
              <div class="license__number">
                <input type="text" value="6" />
                / 12
              </div>
              <p class="sm">Verfügbare Lizenzen</p>
            </div>
          </div>
        </div>
        <div class="bookLic">
          <div class="bookLic__image">
            <img src="@/assets/images/book.png" alt="" />
          </div>
          <div class="bookLic__content">
            <div class="bookLic__content-text">
              <h6 class="sm">
                Karl Friedmann: Fit sein durch Ausdauer und Kraft, Präsentation
                2017
              </h6>
              <p class="sm modBtn" data-tab="#tableLicense-1">
                Lizenzverlauf ansehen
              </p>
            </div>
            <div class="license__row">
              <div class="license user">
                <div class="license__number">
                  <p class="sm">
                    Verfügbare
                    <br />
                    Lizenzen
                  </p>
                  <input type="text" value="6" />
                </div>
              </div>
              <div class="license">
                <div class="license__number">
                  <p class="sm">
                    Lizenzen bereits
                    <br />
                    in Verwendung
                  </p>
                  <input type="text" value="6/12" />
                </div>
              </div>
            </div>
            <div class="license uniq">
              <div class="license__number">
                <input type="text" value="6" />
                / 12
              </div>
              <p class="sm">Verfügbare Lizenzen</p>
            </div>
          </div>
        </div>
        <div id="info-lizenzen" class="info active">
          <div class="info__icon">
            <img src="@/assets/images/icons/attentBlue.svg" alt="" />
          </div>
          <div class="info__content">
            <h6>Lizenzen werden permanent an Benutzer vergeben.</h6>
            <p>
              Bitte beachten Sie, dass die Zuteilung der Lizenzen permanent an
              den jeweiligen Benutzer verknüpft ist. Die zugeteilte Lizenz ist
              anschließend nicht auf andere Benutzer übertragbar.
            </p>
            <a href="#" class="link"> Benutzer verwalten </a>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script>
export default {
  props: [],
  emits: [],
  data() {
    return {
      state: {
        subPage: "licenses",
        offline: false,
      },
    };
  },
  mounted() {
    this.$store.commit("setMainMenu", "license");
  },
  methods: {
    chgSubPage(page) {
      this.state.subPage = page;
    },
  },
  template: "#licenses-users",
};
</script>
