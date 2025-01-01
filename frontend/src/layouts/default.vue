<template>
    <v-app id="inspire">
        <v-main class="bg-background">
            <v-container fluid class="pa-0">
                <Header />
                <div class="main">
                    <slot />
                </div>
                <Footer />
            </v-container>
        </v-main>
        <CommonSnackBar
            v-model="layoutStore.$state.error.isError"
            :errorMessage="layoutStore.$state.error.errorMessage"
        />
    </v-app>
</template>
<script lang="ts">
import Header from '~/components/layouts/Header.vue';
import Footer from '~/components/layouts/Footer.vue';
import { useLayoutStore } from '~/composables/common/use-layout-store';
export default defineComponent({
    components: {
        Header,
        Footer,
    },
    setup() {
        const layoutStore = useLayoutStore();
        return {
            layoutStore,
        };
    },
});
</script>
<style scoped>
.main {
    min-height: 90vh;
    max-width: 700px;
    margin: 0 auto;
}
</style>
