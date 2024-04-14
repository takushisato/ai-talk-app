import { readonly } from "vue";
import { urlStore } from "./urlStore";
import type { User } from "~/@types/models/user";

const hostURL = urlStore();

type AuthState = {
  user: User;
  isAuthenticated: boolean;
  token: string;
};

const userInitialValue = {
  id: -1,
  name: "",
  email: "",
};

const initialAuthState: AuthState = {
  user: userInitialValue,
  isAuthenticated: false,
  token: "",
};

/**
 * ログイン
 * @param state
 * @returns
 */
const login = (state: Ref<AuthState>) => {
  return async (email: string, password: string) => {
    const postData = {
      email: email,
      password: password,
    };
    const { data, error } = await useFetch(hostURL + "/api-token-auth/", {
      method: "POST",
      body: postData,
    });
    if (!!error.value) {
      // エラーはそのままreturnして呼び出し元で処理する
      return { result: false, error: error };
    } else {
      // dataの戻り値からtokenを摘出
      const dataValue: any = data.value;
      const token: any = dataValue.auth_token;
      // tokenをCookieにセット。有効期限はとりあえず24時間（86,400秒）に設定
      useCookie("token", {
        secure: true,
        maxAge: 86400,
      }).value = token;
      // tokenをstateにセット
      state.value.token = dataValue.auth_token;
      // ログイン中のUser情報を取得
      state.value.user = await getUser(state);
      state.value.isAuthenticated = true;
      // 呼び出し元にエラーなしを返す
      return { result: true, error: null };
    }
  };
};

/**
 * 自動ログイン
 * @returns
 */
const autoLogin = async (state: Ref<AuthState>) => {
  const LoginFunc = async () => {
    // トークンがcookieにある場合はcookieからstateにセットしてユーザー情報を取得
    if (useCookie("token").value != null) {
      const cookieToken: any = useCookie("token").value;
      state.value.token = cookieToken;
      state.value.isAuthenticated = true;
      state.value.user = await getUser(state);
    }
  };
  await LoginFunc();
};

/**
 * ログアウト
 * @param state
 * @returns
 */
const logout = (state: Ref<AuthState>) => {
  return async () => {
    const { data, error } = await useFetch(hostURL + "/api/auth/token/logout/", {
      method: "POST",
      headers: {
        Authorization: "Token " + state.value.token,
      },
    });
    const errorValue = error.value;
    if (errorValue?.statusCode != 401) {
      // ログアウト成功したらCookieを消し、認証状態をリセット
      useCookie("token").value = null;
      state.value.user = userInitialValue;
      state.value.isAuthenticated = false;
      state.value.token = "";
      return { result: true, error: null };
    } else {
      // エラー発生時は呼び出し元で処理
      return { result: false, error: error };
    }
  };
};

/**
 * ログイン中のユーザーのデータを取得
 */
async function getUser(state: Ref<AuthState>): Promise<User> {
  const { data, error } = await useFetch<User>(hostURL + "/api/auth/users/me/", {
    method: "GET",
    headers: { Authorization: "Token " + state.value.token },
    credentials: "include",
  });
  // APIの戻り値を一旦anyにして変数に代入
  const dataValue: any = data.value;
  return dataValue;
}

export const useAuthStore = () => {
  const state = useState<AuthState>("auth_state", () => initialAuthState);
  return {
    state: readonly(state),
    login: login(state),
    autoLogin: autoLogin(state),
    logout: logout(state),
  };
};
