<template>
  <md-card md-with-hover>
    <md-table>
      <thead>
        <md-table-row>
          <md-table-head>
            Destination/Name
          </md-table-head>
          <md-table-head>
            <div class="copy-button-head">
              Copy
            </div>
          </md-table-head>
        </md-table-row>
      </thead>
      <tbody>
        <md-table-row
          v-for="url in $store.getters.urls"
          :key="`${url.short}-${url.long}`"
        >
          <md-table-cell>
            <span
              v-tooltip="{content: 'Click to edit name'}"
              class="destination-title"
              @click="changeTitle(url)"
            >
              {{ hasTitle(url) ? url.title.substring(0, 80) : url.long.substring(0, 80) }}
            </span>
          </md-table-cell>
          <md-table-cell>
            <md-button
              type="button"
              class="md-raised md-primary"
              @click="copyFromHistory(url.short)"
            >
              COPY
            </md-button>
          </md-table-cell>
        </md-table-row>
      </tbody>
    </md-table>
  </md-card>
</template>

<script>
import alertify from 'alertifyjs';
import has from 'lodash/has';

export default {
  name: 'MaterialHistory',
  methods:{
    hasTitle(url) {
      return has(url, 'title');
    },

    async copyFromHistory(url) {
      try {
        await this.$copyText(url);
        alertify.success('Copied to Clipboard');
      } catch (e) {
        alertify.error('Error Copying to Clipboard');
      }
    },

    changeTitle(url) {
      const title = prompt('Change the name of this link to use later');
      if(title){
        this.$store.dispatch('updateTitle', {...url, title});
        localStorage.setItem('urls', JSON.stringify(this.$store.getters.urls));
      }
    }
  }
}
</script>

<style>
  .copy-button-head {
    padding-left: 2rem
  }
  .destination-title {
    cursor: pointer;
  }
  .tooltip {
  display: block !important;
  z-index: 10000;
}

.tooltip .tooltip-inner {
  background: tomato;
  color: #ffffffde;
  border-radius: 16px;
  padding: 5px 10px 4px;
}

.tooltip .tooltip-arrow {
  width: 0;
  height: 0;
  border-style: solid;
  position: absolute;
  margin: 5px;
  border-color: tomato;
  z-index: 1;
}

.tooltip[x-placement^="top"] {
  margin-bottom: 5px;
}

.tooltip[x-placement^="top"] .tooltip-arrow {
  border-width: 5px 5px 0 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  bottom: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}

.tooltip[x-placement^="bottom"] {
  margin-top: 5px;
}

.tooltip[x-placement^="bottom"] .tooltip-arrow {
  border-width: 0 5px 5px 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-top-color: transparent !important;
  top: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}

.tooltip[x-placement^="right"] {
  margin-left: 5px;
}

.tooltip[x-placement^="right"] .tooltip-arrow {
  border-width: 5px 5px 5px 0;
  border-left-color: transparent !important;
  border-top-color: transparent !important;
  border-bottom-color: transparent !important;
  left: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}

.tooltip[x-placement^="left"] {
  margin-right: 5px;
}

.tooltip[x-placement^="left"] .tooltip-arrow {
  border-width: 5px 0 5px 5px;
  border-top-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  right: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}

.tooltip.popover .popover-inner {
  background: #f9f9f9;
  color: black;
  padding: 24px;
  border-radius: 5px;
  box-shadow: 0 5px 30px rgba(black, .1);
}

.tooltip.popover .popover-arrow {
  border-color: #f9f9f9;
}

.tooltip[aria-hidden='true'] {
  visibility: hidden;
  opacity: 0;
  transition: opacity .15s, visibility .15s;
}

.tooltip[aria-hidden='false'] {
  visibility: visible;
  opacity: 1;
  transition: opacity .15s;
}
</style>