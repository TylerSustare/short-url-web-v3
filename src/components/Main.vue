<template>
  <div>
    <div>
      <div v-if="!$store.getters.shortUrl" class="con">
        <UrlEntry />
      </div>
      <div v-else class="con">
        <CopyCard />
      </div>
      <div v-if="$store.getters.urls.length" class="con">
        <HistoryTable />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Main'
};
</script>

<style scoped>
.con {
  padding-top: 5vh;
  min-height: 10vh;
  display: flex;
  justify-content: center;
}
</style>
