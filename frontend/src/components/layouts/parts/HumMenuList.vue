<script lang="ts">
export default defineComponent({
  name: "HumMenuList",
  setup() {
    const product = [
      {
        name: "AIに聞く",
        URL: "/ai-assistant",
        icon: "mdi-loop",
      },
      // {
      //   name: 'お気に入りの商品',
      //   URL: '/',
      //   icon: 'mdi-heart',
      // },
    ];
    // const seller = [
    //   {
    //     name: '新規出品する',
    //     URL: '/items/create',
    //     icon: 'mdi-human-greeting',
    //   },
    //   {
    //     name: '下書きを見る',
    //     URL: '/',
    //     icon: 'mdi-book-multiple-variant',
    //   },
    //   {
    //     name: '出品履歴',
    //     URL: '/',
    //     icon: 'mdi-camera',
    //   },
    // ];
    // const timeline = [
    //   {
    //     name: '一覧を見る',
    //     URL: '/',
    //     icon: 'mdi-instagram',
    //   },
    //   {
    //     name: '投稿する',
    //     URL: '/',
    //     icon: 'mdi-robot',
    //   },
    //   {
    //     name: 'いいね！した投稿',
    //     URL: '/',
    //     icon: 'mdi-lightbulb-on',
    //   },
    // ];
    // const directMessage = [
    //   {
    //     name: '一覧を見る',
    //     URL: '/',
    //     icon: 'mdi-email',
    //   },
    // ];
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
      // {
      //   title: '出品する',
      //   menuItem: seller,
      // },
      // {
      //   title: 'タイムライン',
      //   menuItem: timeline,
      // },
      // {
      //   title: 'メッセージ',
      //   menuItem: directMessage,
      // },
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
<style scoped>
.link {
  width: 100%;
}

.link:hover {
  background: #f5f5f5;
}
</style>
