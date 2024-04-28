<template>
  <v-list nav>
    <v-list-item v-for="link in links" variant="text" class="border-b-sm">
      <h4>{{ link.title }}</h4>
      <v-list-item v-for="menu in link.menuItem" variant="text">
        <nuxt-link :to="`${menu.URL}`" style="text-decoration: none" class="text-button text-textColor">
          <div class="d-flex">
            <v-icon class="text-sm-center my-auto mr-2" color="grey-lighten-1">{{ menu.icon }}</v-icon>
            <p class="link rounded-lg px-2">{{ menu.name }}</p>
          </div>
        </nuxt-link>
      </v-list-item>
    </v-list-item>
  </v-list>
</template>
<script lang="ts">
export default defineComponent({
  name: "LayoutHumMenuList",
  setup() {
    const product = [
      {
        name: "AIに聞く",
        URL: "/ai-assistant",
        icon: "mdi-ghost",
      },
    ];
    const settings = [
      {
        name: "各種設定",
        URL: "/settings",
        icon: "mdi-wrench",
      },
      {
        name: "お問い合わせ",
        URL: "/",
        icon: "mdi-comment-question-outline",
      },
    ];
    const links = [
      {
        title: "AIと会話",
        menuItem: product,
      },
      {
        title: "ユーザー補助",
        menuItem: settings,
      },
    ];
    return {
      links,
    };
  },
});
</script>
<style scoped>
.link {
  width: 100%;
}

.link:hover {
  background: #f5f5f5;
}
</style>
