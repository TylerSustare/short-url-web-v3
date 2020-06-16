<template>
  <div />
</template>

<script>
export default {
  name: 'Redirect',
  mounted() {
    const { slug } = this.$route.params;
    if (slug) {
      location.assign(`https://url-api.sustare.dev/url/${slug}`);
    }
  }
};
</script>

<style scoped></style>
