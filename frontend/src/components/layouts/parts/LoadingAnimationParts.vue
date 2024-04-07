<script lang="ts">
export default defineComponent({
  name: "LoadingAnimationParts",
});
</script>
<template>
  <div class="text-center">
    <v-progress-circular :size="70" :width="7" indeterminate color="purple"></v-progress-circular>
  </div>
</template>
<style scoped></style>
