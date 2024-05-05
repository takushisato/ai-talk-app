import { useAuthStore } from "~/composables/common/use-auth-store";

export default defineNuxtRouteMiddleware((to, _from) => {
  const authStore = useAuthStore();
  const noAuthRequired = ["/", "/auth/login"];

  // 認証が不要なページのチェック
  if (noAuthRequired.includes(to.path)) {
    return;
  }

  // 認証が必要なページで認証されていなければログインページへ
  if (!authStore.isAuthenticated) {
    return navigateTo("/auth/login");
  }
});
