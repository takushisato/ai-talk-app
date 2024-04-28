<template>
  <div vclass="text-center">
    <v-snackbar v-model="togle" multi-line location="center">
      <p>申し訳ございません、問題が発生しました。下記内容をご確認いただき入力の内容を修正してください</p>
      <br />
      <p>問題：</p>
      <div v-for="errorMessage in errorMessages">
        <p v-if="errorMessage[0] == 'Invalid password.'">現在のパスワードが間違っています。</p>
        <p v-if="errorMessage[0] == '不'">不正なトークンです。既にログアウトされているか認証情報が間違っています。</p>
        <p v-else>{{ errorMessage[0] }}</p>
      </div>
      <template v-slot:actions>
        <v-btn color="red" variant="text" @click="returnEmits()"> Close </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
<script lang="ts">
export default defineComponent({
  name: "SnackBar",
  setup() {
    const togle = true;

    let errorMessages = "";
    const props = defineProps<{
      errorMessages: any;
    }>();
    errorMessages = props.errorMessages;

    const emits = defineEmits<{
      (e: "closeSnack"): void;
    }>();

    function returnEmits() {
      emits("closeSnack");
    }
    return { togle, errorMessages, returnEmits };
  },
});
</script>
