<template>
  <div>
    <!-- ハンバーガーメニュー -->
    <v-navigation-drawer temporary v-model="drawer">
      <div class="text-center mt-8">
        <LayoutLoginStateButton />
      </div>
      <LayoutHumMenuList />
    </v-navigation-drawer>

    <!-- ヘッダーメニュー -->
    <v-app-bar app dark scroll-behavior="hide">
      <v-container fluid class="d-flex align-center headerContainer">
        <div>
          <nuxt-link to="/">
            <p class="mr-auto ml-4">TOP</p>
          </nuxt-link>
        </div>
        <v-app-bar-nav-icon @click="drawer = !drawer" class="mr-0 ml-auto"></v-app-bar-nav-icon>
      </v-container>
    </v-app-bar>
  </div>
</template>
<script lang="ts">
import { ref } from "vue";
import { useDisplay } from "vuetify";
import LayoutHumMenuList from "./parts/LayoutHumMenuList.vue";
import LayoutLoginStateButton from "./parts/LayoutLoginStateButton.vue";
export default {
  name: "Header",
  components: {
    LayoutHumMenuList,
    LayoutLoginStateButton,
  },
  setup() {
    const { mdAndUp } = useDisplay();
    const drawer = ref(false);
    const seach = ref("");

    function seachClick() {
      // 後で検索のギミックを仕込むこと
      alert("クリックしました");
    }
    return {
      mdAndUp,
      drawer,
      seach,
      seachClick,
    };
  },
};
</script>
<style scoped lang="scss">
.headerContainer {
  max-width: 768px;
}
.logo {
  width: 100%;
}
</style>
