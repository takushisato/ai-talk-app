import { useAuthStore } from "~/composables/common/use-auth-store";

export default defineNuxtRouteMiddleware((to, _from) => {
  const authStore = useAuthStore();

  // 認証が不要なページのパス
  const noAuthRequired = ["/", "/auth/login"];

  // オートログイン処理
  if (!authStore.isAuthenticated) {
    authStore.authenticateFromCookie();

    // 認証が必要なページで未認証ならログインページへリダイレクト
    if (!noAuthRequired.includes(to.path)) {
      return navigateTo("/auth/login");
    }
  }
});
