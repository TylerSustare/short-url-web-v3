<template>
  <md-card
    md-with-hover
    class="one-third"
  >
    <md-ripple>
      <md-card-header>
        <a
          :a="$store.getters.shortUrl"
          :href="$store.getters.shortUrl"
        >{{ $store.getters.shortUrl }}</a>
      </md-card-header>
      <md-card-content>
        <p>
          Link was shortened!
          <br>Click the
          <strong>Copy</strong> button to copy the new link to the
          clipboard.
        </p>
      </md-card-content>
      <md-card-actions>
        <md-button
          id="copy-new-url"
          class="md-raised md-accent"
          @click="copy"
        >
          Copy
        </md-button>
      </md-card-actions>
    </md-ripple>
  </md-card>
</template>

<script>
import alertify from 'alertifyjs';

export default {
    name: 'MaterialCopyCard',
    mounted(){
      document.getElementById('copy-new-url').focus();
    },
    methods: {
      copy: async function() {
        try {
          await this.$copyText(this.$store.getters.shortUrl);
          alertify.success('Copied to Clipboard');
        } catch (e) {
          alertify.error('Error Copying to Clipboard');
          return;
        }
        try {
          const data = {
            long: this.$store.getters.longUrl,
            title: this.$store.getters.longUrl,
            short: this.$store.getters.shortUrl
          };
          this.$store.dispatch('addUrl', data);
          localStorage.setItem('urls', JSON.stringify(this.$store.getters.urls));
  
          this.$store.dispatch('longUrl', '');
          this.$store.dispatch('shortUrl', '');
        } catch (e) {
          console.error(e.message);
        }
      }
    }
}
</script>

<style scoped>
  .one-third{
    min-width: 33vw;
  }
</style>
