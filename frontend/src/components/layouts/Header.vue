<template>
  <div>
    <!-- ハンバーガーメニュー -->
    <v-navigation-drawer temporary v-model="drawer">
      <div class="text-center mt-8">
        <LoginLogoutButton />
      </div>
      <HumMenuList />
    </v-navigation-drawer>

    <!-- ヘッダーメニュー -->
    <v-app-bar app dark>
      <v-container fluid class="d-flex align-center headerContainer">
        <div v-if="mdAndUp">
          <nuxt-link to="/">
            <p class="mr-4">TOP</p>
          </nuxt-link>
        </div>

        <v-text-field v-model="seach" label="検索" single-line hide-details></v-text-field>
        <v-icon @click="seachClick" class="pl-4 ma-2">mdi-magnify</v-icon>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      </v-container>
    </v-app-bar>
  </div>
</template>
<script lang="ts">
import { ref } from "vue";
import { useDisplay } from "vuetify";
import HumMenuList from "./parts/HumMenuList.vue";
export default {
  name: "Header",
  components: {
    HumMenuList,
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
  max-width: 1200px;
}
.logo {
  width: 100%;
}
</style>
