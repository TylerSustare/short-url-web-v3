<template>
  <div>
    <div>
      <div>
        <form id="form" method="POST" @submit.prevent="processForm">
          <md-card md-with-hover class="one-third">
            <md-ripple>
              <md-card-header>
                <div class="md-title">
                  <h3>
                    Shorter URLs
                  </h3>
                </div>
                <div class="md-subhead">
                  Give URL, get short link
                </div>
              </md-card-header>
              <md-card-content>
                <md-field>
                  <label for="link">Link</label>
                  <md-input
                    id="link"
                    v-model="longUrl"
                    type="text"
                    name="link"
                  />
                </md-field>
              </md-card-content>
              <md-card-actions>
                <md-button class="md-raised md-primary" type="submit">
                  SHORTEN IT
                </md-button>
              </md-card-actions>
            </md-ripple>
          </md-card>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import alertify from 'alertifyjs';

export default {
  name: 'MaterialUrlEntry',
  computed: {
    // https://vuex.vuejs.org/guide/forms.html
    longUrl: {
      get() {
        return this.$store.state.longUrl;
      },
      set(value) {
        this.$store.commit('longUrl', value);
      }
    }
  },
  mounted() {
    setTimeout(() => {
      document.getElementById('link').focus();
    }, 1000);
    // don't trust localStorage
    try {
      if (
        this.$store.getters.urls.length &&
        !(this.$store.getters.urls[0].long && this.$store.getters.urls[0].short)
      ) {
        localStorage.removeItem('urls');
      }
    } catch (e) {
      localStorage.removeItem('urls');
      location.reload();
    }
  },
  methods: {
    isHttp() {
      return new Promise((res, rej) => {
        const longUrl = this.$store.getters.longUrl;
        const isHttp = longUrl.toLowerCase().startsWith('http://');
        const isHttps = longUrl.toLowerCase().startsWith('https://');
        if (!(isHttp || isHttps)) {
          // https://www.npmjs.com/package/sweetalert
          alertify.alert(
            'Error Creating Short URL',
            'URL Must Start With </br> <strong>http://</strong> or <strong>https://</strong>',
            () => {
              alertify.error('Try Again');
              return rej(new Error('INVALID_LONG_URL'));
            }
          );
        } else {
          return res();
        }
      });
    },

    async send() {
      await this.isHttp();
      return this.axios.post(
        // 'https://us-central1-urls-503a3.cloudfunctions.net/app/url',
        'https://url-api.sustare.dev/url',
        { long_url: this.$store.getters.longUrl }
      );
    },
    async processForm() {
      const self = this;
      try {
        await this.isHttp();
        const result = await this.send();
        self.$store.dispatch(
          'shortUrl',
          `https://url.sustare.dev/${result.data.short}`
        );
      } catch (e) {
        if (e.message !== 'INVALID_LONG_URL') {
          console.error(e.message);
          alertify.error(e.message);
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.md-card {
  width: 320px;
  margin: 4px;
  display: inline-block;
  vertical-align: top;
}
h3 {
  margin: 40px 0 0;
  color: rgba($color: #000000, $alpha: 0.54);
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-weight: 400;
  font-size: 34px;
  line-height: 40px;
}
.one-third {
  min-width: 33vw;
}
</style>
