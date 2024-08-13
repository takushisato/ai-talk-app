// emailの正規表現
const regex = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/;

// passwordの正規表現
const passSync = /(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-z0-9]{8,}/;

/**
 * VuetifyのFormのエラー表示用のバリデーション
 * 必須項目の入力の有無を返します
 */
export const requiredValid = (value: string | number | null | undefined): true | string => {
    if (!!value) {
        return true;
    } else {
        return '必須項目です。必ず入力してください。';
    }
};

/**
 * VuetifyのFormのエラー表示用のバリデーション
 * nameの文字数を判定します（現在は１～２０文字で判定）
 */
export const nameLengthValid = (value: string): true | string => {
    if (value.length <= 20) {
        return true;
    } else {
        return '20文字以内で入力してください。';
    }
};

/**
 * VuetifyのFormのエラー表示用のバリデーション
 * passwordの正規表現を判定します
 */
export const passwordLengthValid = (password: string): true | string => {
    if (!passSync.test(password)) {
        return 'パスワードは半角英数字8文字以上で入力してください。';
    } else {
        return true;
    }
};

/**
 * VuetifyのFormのエラー表示用のバリデーション
 * emailの正規表現を判定します
 */
export const mailValid = (email: string): true | string => {
    if (!regex.test(email)) {
        return '@マークを含めた形式のメールアドレスを入力してください。';
    } else {
        return true;
    }
};

/**
 * VuetifyのFormのsubmitボタン表示管理用のバリデーション
 * nameを判定します
 */
export const formNameValid = (name: { value: string }): { result: boolean } => {
    if (name.value.length !== 0 && name.value.length <= 20) {
        return { result: true };
    }
    return { result: false };
};

/**
 * VuetifyのFormのsubmitボタン表示管理用のバリデーション
 * emailを判定します
 */
export const formEmailValid = (email: string) => {
    if (regex.test(email) == true) {
        return { result: true };
    }
};

/**
 * VuetifyのFormのsubmitボタン表示管理用のバリデーション
 * passwordを判定します
 */
export const formPasswordValid = (password: string) => {
    if (passSync.test(password) == true) {
        return { result: true };
    }
};

/**
 * VuetifyのFormのsubmitボタン表示管理用のバリデーション
 * 確認用passwordを判定します
 */
export const formRePasswordValid = (rePassword: string) => {
    // rePassword が undefined または null でないことを確認
    if (!rePassword || typeof rePassword !== 'string') {
        return { result: false };
    }
    // パスワードの長さが1以上であるか確認
    if (rePassword.length >= 1) {
        return { result: true };
    } else {
        return { result: false };
    }
};

/**
 * VuetifyのFormのsubmitボタン表示管理用のバリデーション
 * passwordと確認用passwordの一致を判定します
 */
export const formRePasswordComparison = (password: string, rePassword: string) => {
    if (password == rePassword) {
        return { result: true };
    }
};

/**
 * VuetifyのFormのsubmitボタン表示管理用のバリデーション
 * emailと確認用emailの一致を判定します
 */
export const formReEmailComparison = (email: string, reEmail: string) => {
    if (email == reEmail) {
        return { result: true };
    }
};
