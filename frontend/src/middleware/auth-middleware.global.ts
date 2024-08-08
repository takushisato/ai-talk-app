import { useAuthStore } from '~/composables/common/use-auth-store';

export default defineNuxtRouteMiddleware(async (to, _from) => {
    const authStore = useAuthStore();

    // 認証が不要なページのパス
    const noAuthRequired = [
        '/',
        '/auth/login',
        '/settings/auth/reset-password',
        '/settings/auth/confirm-password',
        '/auth/register',
    ];

    // オートログイン処理
    // URLのパスを正規化（末尾のスラッシュを削除し、重複するスラッシュを単一化）
    const normalizedPath = to.path.replace(/\/+$/, '').replace(/\/\/+/g, '/');

    if (!authStore.isAuthenticated) {
        await authStore.authenticateFromCookie();

        // 認証が必要なページで未認証ならログインページへリダイレクト
        if (!noAuthRequired.includes(normalizedPath) && !authStore.isAuthenticated) {
            return navigateTo('/auth/login');
        }
    }
});
