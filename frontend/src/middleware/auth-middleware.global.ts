import { useAuthStore } from "~/composables/common/use-auth-store";

export default defineNuxtRouteMiddleware(async (to, _from) => {
  const authStore = useAuthStore();

  // 認証が不要なページのパス
  const noAuthRequired = ["/", "/auth/login", "/settings/auth/reset-password"];

  // オートログイン処理
  if (!authStore.isAuthenticated) {
    await authStore.authenticateFromCookie();

    // 認証が必要なページで未認証ならログインページへリダイレクト
    if (!noAuthRequired.includes(to.path) && !authStore.isAuthenticated) {
      return navigateTo("/auth/login");
    }
  }
});
