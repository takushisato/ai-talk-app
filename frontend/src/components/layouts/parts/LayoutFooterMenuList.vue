<template>
  <v-footer class="bg-grey-lighten-1">
    <v-row justify="center" no-gutters>
      <v-btn v-for="item in items" class="mx-2" color="white" rounded="xl" variant="text">
        <nuxt-link :to="`${item.URL}`" style="text-decoration: none" class="text-button text-textColor">
          <div class="d-flex link">
            <v-icon class="text-sm-center my-auto ml-2" color="white">{{ item.icon }}</v-icon>
            <p class="rounded-lg px-2 text-white">{{ item.name }}</p>
          </div>
        </nuxt-link>
      </v-btn>
      <v-col class="text-center mt-4" cols="12">
        <strong>Ⓒ taksuhi sato 2024</strong>
      </v-col>
    </v-row>
  </v-footer>
</template>
<script lang="ts">
export default defineComponent({
  name: "LayoutFooterMenuList",
  setup() {
    const items = [
      {
        name: "AIに聞く",
        URL: "/",
        icon: "mdi-ghost",
      },
      {
        name: "各種設定",
        URL: "/",
        icon: "mdi-wrench",
      },
      {
        name: "お問い合わせ",
        URL: "/",
        icon: "mdi-comment-question-outline",
      },
    ];
    return {
      items,
    };
  },
});
</script>
<style scoped>
.link {
  width: 100%;
}

.link:hover {
  background: lightgray;
  border-radius: 4px;
}
</style>
